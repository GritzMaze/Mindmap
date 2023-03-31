import { NextFunction, Request, Response } from 'express';
import winston from 'winston';
import { errorFormattingService } from '../services/error-formatting.service';

export default function handleError(
  err,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(err.status || 500);

  winston.error(JSON.parse(JSON.stringify(err.message || err)));

  const result: any = {
    method: req.method,
    path: req.path,
    status: err.status
  };
  result.message = errorFormattingService.getErrorMessage(err);

  if (err.errors) {
    result.errors = err.errors;
  }

  res.json(result);
}
