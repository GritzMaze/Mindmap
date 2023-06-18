import { NextFunction, Request, Response, Router } from 'express';
import createError from 'http-errors';
import { NodeCreateInput, nodeService, mindmapService } from '../services';
import { NodeNotFoundError } from '../services/errors';

const router = Router();

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);

  try {
    const result = await nodeService.findOrThrow(id);
    res.json(result);
  } catch (err) {
    if (err instanceof NodeNotFoundError) {
      next(createError(404, err));
      return;
    }
    next(createError(500, err));
    return;
  }
});



router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const node = req.body as NodeCreateInput;

  const mindmapId = node.mindmapId;
  const nodes = await mindmapService.getNodes(mindmapId);

  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].label === node.label) {
      next(createError(409, 'Node already exists'));
      return;
    }
  }

  try {
    const result = await nodeService.create(node);
    res.json(result);
  } catch (err) {
    next(createError(500, err));
    return;
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);

  try {
    const result = await nodeService.delete(id);
    res.json(result);
  } catch (err) {
    if (err instanceof NodeNotFoundError) {
      next(createError(404, err));
      return;
    }
    next(createError(500, err));
    return;
  }
});

router.patch('/:id/label', async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  const label = req.body.label;

  try {
    const result = await nodeService.updateLabel(id, label);
    res.json(result);
  } catch (err) {
    if (err instanceof NodeNotFoundError) {
      next(createError(404, err));
      return;
    }

    next(createError(500, err));
    return;
  }
});

router.patch('/:id/position', async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  const xPos = req.body.xPos;
  const yPos = req.body.yPos;

  try {
    const result = await nodeService.updatePosition(id, xPos, yPos);
    res.json(result);
  } catch (err) {
    if (err instanceof NodeNotFoundError) {
      next(createError(404, err));
      return;
    }
    next(createError(500, err));
    return;
  }
});

router.patch('/:id/color', async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  const color = req.body.color;

  try {
    const result = await nodeService.updateColor(id, color);
    res.json(result);
  } catch (err) {
    if (err instanceof NodeNotFoundError) {
      next(createError(404, err));
      return;
    }
    next(createError(500, err));
    return;
  }
});

router.patch('/:id/shape', async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  const shape = req.body.shape;

  if (shape !== 'circle' && shape !== 'square') {
    next(createError(400, 'Invalid shape'));
    return;
  }

  try {
    const node = await nodeService.findOrThrow(id);
    if (node.shape === shape) {
      next(createError(409, 'Node already has this shape'));
      return;
    }

    const result = await nodeService.updateShape(id, shape);
    res.json(result);
  } catch (err) {
    if (err instanceof NodeNotFoundError) {
      next(createError(404, err));
      return;
    }
    next(createError(500, err));
    return;
  }
});

export default router;