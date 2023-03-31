import { NextFunction, Request, Response } from 'express';
import winston from 'winston';

const SLOW_THRESHOLD = 1500;
const VERY_SLOW_THRESHOLD = 3000;

export enum LogLevel {
  error = 'error',
  warn = 'warn',
  info = 'info',
  verbose = 'verbose',
  debug = 'debug',
  silly = 'silly',
  http = 'http'
}

const DURATION_LEVEL_TO_MESSAGE = {
  [LogLevel.warn]: '[SLOW]',
  [LogLevel.error]: '[VERY SLOW]'
};

function logRequestStart(req: Request) {
  const message = `[REQUEST START] ${req.method} ${req.originalUrl}`;
  winston.log(LogLevel.verbose, message);
}

function getDurationLevel(duration: number): LogLevel {
  if (duration > VERY_SLOW_THRESHOLD) {
    return LogLevel.error;
  }

  if (duration > SLOW_THRESHOLD) {
    return LogLevel.warn;
  }

  return null;
}

function getLevel(res: Response, endState: string, duration: number): string {
  const defaultLevel =
    res.locals.defaultRequestLoggingLevel || LogLevel.verbose;

  if (res.statusCode === 500) {
    return LogLevel.error;
  }

  const durationLevel = getDurationLevel(duration);

  if (durationLevel) {
    return durationLevel;
  }

  if (endState === 'CLOSED') {
    return LogLevel.verbose;
  }

  if (res.statusCode !== 200) {
    return LogLevel.info;
  }

  return defaultLevel;
}

function logRequestTiming(
  req: Request,
  res: Response,
  endState: string,
  startTimeStamp: number
) {
  const endTimestamp = Date.now();
  const duration = endTimestamp - startTimeStamp;
  const durationLevel = getDurationLevel(duration);
  const statusCode = res.statusCode || 'NULL';
  const level = getLevel(res, endState, duration);

  const durationMessage = DURATION_LEVEL_TO_MESSAGE[durationLevel] || '';
  const durationStr = `${duration}ms ${durationMessage}`;
  const requestString = `${req.method} ${req.originalUrl}`;
  const responseString = `${statusCode} [${endState}] ${durationStr}`;

  const message = `[REQUEST]: ${requestString} - ${responseString}`;

  winston.log(level, message);
}

export function requestLogLevel(level: string = LogLevel.verbose) {
  return (req: Request, res: Response, next: NextFunction) => {
    res.locals.defaultRequestLogLevel = level;
    next();
  };
}

export function logRequest(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  logRequestStart(req);

  const closeListener = () => {
    logRequestTiming(req, res, 'CLOSED', start);
  };

  res.on('finish', () => {
    res.off('close', closeListener);
    logRequestTiming(req, res, 'FINISHED', start);
  });
  res.on('close', closeListener);
  next();
}
