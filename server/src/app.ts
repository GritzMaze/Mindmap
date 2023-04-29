import express from 'express';
import nocache from 'nocache';
import winston from 'winston';
import 'winston-daily-rotate-file';
import handleError from './middlewares/errorHandler';
import routes from './routes';
import { prisma as prismaService } from './services';
import { config } from './config/config';

export default class App {
  public express;

  constructor() {
    this.express = express();
    this.initLogger();
    this.setupPrerequisites();
    this.mountRoutes();
  }

  private initLogger() {
    const loggingDir = config.get('logger.directory');
    const environment = config.get('environment');

    const formatter = winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} - [${level}]: ${message}`;
    });

    winston.add(
      new winston.transports.DailyRotateFile({
        dirname: loggingDir,
        filename: 'mindmap-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        maxFiles: '14d',
        format: winston.format.combine(winston.format.timestamp(), formatter)
      })
    );

    if (environment === 'development') {
      winston
        .add(
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.colorize(),
              winston.format.simple()
            )
          })
        );
    }

    winston.level = config.get('logger.level');

    winston.info(`Logger activated in directory ${loggingDir}`);
  }

  public async init() {
    winston.info('Initializing application');
    await prismaService.init();
  }

  public async exit() {
    winston.info('Exiting application');
    await prismaService.exit();
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
