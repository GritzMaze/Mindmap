import { NextFunction, Request, Response, Router } from 'express';
import createError from 'http-errors';
import { UserCreateInput, authService } from '../services';
import { DuplicatedUsernameError } from '../services/errors';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const user = req.body as UserCreateInput;
  try {
    const result = await authService.register(user);
    res.json(result);
  } catch (err) {
    if (err instanceof DuplicatedUsernameError) {
      next(createError(409, err));
      return;
    }
    next(createError(500, err));
    return;
  }
});

export default router;
