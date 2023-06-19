import { NextFunction, Request, Response, Router } from 'express';
import createError from 'http-errors';
import { NodeCreateInput, nodeService } from '../services';
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
  if (!mindmapId) {
    next(createError(400, 'Missing mindmapId'));
    return;
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
    await nodeService.delete(id);
    res.json({ message: 'Node deleted' });
  } catch (err) {
    if (err instanceof NodeNotFoundError) {
      next(createError(404, err));
      return;
    }
    next(createError(500, err));
    return;
  }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  const node = req.body as NodeCreateInput;

  try {
    const result = await nodeService.update(id, node);
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

router.put('/:id/label', async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  const label = req.body.label;

  try {
    const node = await nodeService.findOrThrow(id);

    const newNode = {
      ...node,
      label: label
    };

    const result = await nodeService.update(id, newNode);
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

router.put('/:id/position', async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  const xPos = req.body.xPos;
  const yPos = req.body.yPos;

  try {
    const node = await nodeService.findOrThrow(id);
    if (node.xPos === xPos && node.yPos === yPos) {
      next(createError(409, 'Node already has this position'));
      return;
    }

    const newNode = {
      ...node,
      xPos: xPos,
      yPos: yPos
    };

    const result = await nodeService.update(id, newNode);
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

router.put('/:id/color', async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  const color = req.body.color;

  try {
    const node = await nodeService.findOrThrow(id);
    if (node.color === color) {
      next(createError(409, 'Node already has this color'));
      return;
    }

    const newNode = {
      ...node,
      color: color
    };

    const result = await nodeService.update(id, newNode);
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

router.put('/:id/shape', async (req: Request, res: Response, next: NextFunction) => {
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
    
    const newNode = {
      ...node,
      shape: shape
    };

    const result = await nodeService.update(id, newNode);
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