import { NextFunction, Request, Response, Router } from 'express';
import createError from 'http-errors';
import { authService, userService } from '../services';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next(createError(400, 'Username and password are required'));
    return;
  }

  try {
    const user = await userService.findByUsername(username);

    if (!user) {
      next(createError(404, 'User does not exist'));
      return;
    }
    const token = authService.login(user);
    if (!token) {
      next(createError(401, 'Invalid credentials'));
      return;
    }
    res.json({ token });
  } catch (err) {
    next(createError(500, err));
    return;
  }
});

export default router;
