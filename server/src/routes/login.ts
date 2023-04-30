import { NextFunction, Request, Response, Router } from 'express';
import createError from 'http-errors';
import { authService } from '../services';
import { User } from '@prisma/client';
import { InvalidCredentialsError, UserNotExistError } from '../services/errors';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next(createError(400, 'Username and password are required'));
    return;
  }

  try {
    const token = await authService.login({ username, password } as User);
    if (!token) {
      next(createError(401, 'Invalid credentials'));
      return;
    }
    res.json({ token });
  } catch (err) {
    if (err instanceof UserNotExistError || err instanceof InvalidCredentialsError) {
      next(createError(401, err));
      return;
    }

    next(createError(500, err));
    return;
  }
});

export default router;
