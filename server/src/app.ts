import express from 'express';
import nocache from 'nocache';
import winston from 'winston';
import 'winston-daily-rotate-file';
import handleError from './middlewares/errorHandler';
import routes from './routes';
import { prisma as prismaService } from './services';

export default class App {
  public express;

  constructor() {
    this.express = express();
    this.initLogger();
    this.setupPrerequisites();
    this.mountRoutes();
  }

  public initLogger() {
    // TODO: Get directory from config
    const loggingDir = 'logs';

    const formatter = winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} - [${level}]: ${message}`;
    });

    winston
      .add(
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          )
        })
      )
      .add(
        new winston.transports.DailyRotateFile({
          dirname: loggingDir,
          filename: 'trading-bot-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '14d',
          format: winston.format.combine(winston.format.timestamp(), formatter)
        })
      );
    winston.info(`Logger activated in directory ${loggingDir}`);
  }

  public async init() {
    winston.info('Initializing application');
    prismaService.init();
  }

  public async exit() {
    winston.info('Exiting application');
    prismaService.exit();
  }

  private setupPrerequisites() {
    const jsonParser = express.json({ limit: '20mb' });

    this.express.use(jsonParser);
    this.express.use(nocache());
  }

  private mountRoutes() {
    this.express.use('/api', routes);
    this.express.use(handleError);
  }
}
