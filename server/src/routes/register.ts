import { NextFunction, Request, Response, Router } from 'express';
import createError from 'http-errors';
import { UserCreateInput, authService, userService } from '../services';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const user = req.body as UserCreateInput;
  try {
    const result = authService.register(user);
    res.json(result);
  } catch (err) {
    next(createError(500, err));
    return;
  }
});

export default router;
