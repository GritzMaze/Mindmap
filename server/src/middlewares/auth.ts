import { NextFunction, Request, Response } from 'express';
import { config } from '../config/config';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import { prisma } from '../services';

export default async function auth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    next(createError(401, 'Unauthorized'));
    return;
  }

  const jwtKey = config.get('jwt.secret');
  if (authHeader) {
    const [tokenType, jwtToken] = authHeader.split(' ');

    if (tokenType !== 'Bearer') {
      next(createError(400, 'Invalid token type'));
      return;
    }

    try {
      const payload = jwt.verify(jwtToken, jwtKey);
      const { id } = payload as any;
      const currentUser = await prisma.user.findUnique({
        where: {
          id
        }
      });

      if (!currentUser) {
        next(createError(401, 'User not found'));
        return;
      }

      res.locals.currentUser = currentUser;
      next();
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        next(createError(401, 'Session expired'));
        return;
      }

      next(createError(401, 'Invalid token'));
      return;
    }
  }
}
