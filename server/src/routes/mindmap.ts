import { NextFunction, Request, Response, Router } from 'express';
import createError from 'http-errors';
import { MindmapCreateInput, mindmapService } from '../services/mindmap.service';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const ids = req.query.ids as string;
  try {
    const result = await mindmapService.findManyByIds(ids.split(',').map((id) => parseInt(id)));
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

  try {
    const result = await mindmapService.create(mindmap);
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