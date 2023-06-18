import { NextFunction, Request, Response, Router } from 'express';
import createError from 'http-errors';
import { MindmapCreateInput, mindmapService } from '../services/mindmap.service';
import { userService } from '../services';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const offset = parseInt(req.query.offset as string) || 0;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await mindmapService.findAll(offset, limit);
    res.json(result);
  } catch (err) {
    next(createError(500, err));
    return;
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  try {
    const result = await mindmapService.find(id);
    res.json(result);
  } catch (err) {
    next(createError(500, err));
    return;
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const mindmap = req.body as MindmapCreateInput;

  if (!mindmap.name) {
    next(createError(400, 'Name is required'));
    return;
  }

  const user = await userService.findByUsername('admin');

  try {
    const result = await mindmapService.create({ ...mindmap, userId: user.id });
    
    res.json(result);
  } catch (err) {
    next(createError(500, err));
    return;
  }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  const name = req.body.name as string;

  if (!name) {
    next(createError(400, 'Name is required'));
    return;
  }

  try {
    const mindmap = await mindmapService.findOrThrow(id);

    const newMindmap = {
      ...mindmap,
      name
    };

    const result = await mindmapService.update(id, newMindmap);
    res.json(result);
  } catch (err) {
    next(createError(500, err));
    return;
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  try {
    await mindmapService.delete(id);
    res.json({ success: true, message: 'Mindmap deleted' });
  } catch (err) {
    next(createError(500, err));
    return;
  }
});

export default router;