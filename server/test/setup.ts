import winston from 'winston';
import 'winston-daily-rotate-file';

const formatter = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} - [${level}]: ${message}`;
});

const loggingDir = 'logs';

winston.add(
  new winston.transports.DailyRotateFile({
    dirname: loggingDir,
    filename: 'mindmap-test-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '1d',
    format: winston.format.combine(winston.format.timestamp(), formatter)
  })
);