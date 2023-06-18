import { NextFunction, Request, Response, Router } from 'express';
import createError from 'http-errors';
import { ConnectionCreateInput, connectionService } from '../services';

const router = Router();

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);

  try {
    const result = await connectionService.findOrThrow(id);
    res.json(result);
  } catch (err) {
    next(createError(500, err));
    return;
  }
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const connection = req.body as ConnectionCreateInput;

  try {
    const result = await connectionService.create(connection);
    res.json(result);
  } catch (err) {
    next(createError(500, err));
    return;
  }
});

router.put('/:id/label', async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  const label = req.body.label;

  try {
    const connection = await connectionService.findOrThrow(id);

    const newConnection = {
      ...connection,
      label: label
    };

    const result = await connectionService.update(id, newConnection);
    res.json(result);
  } catch (err) {
    next(createError(500, err));
    return;
  }
});

router.put('/:id/sourceNodeId', async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  const sourceNodeId = parseInt(req.body.sourceNodeId);

  try {
    const connection = await connectionService.findOrThrow(id);

    const newConnection = {
      ...connection,
      sourceNodeId: sourceNodeId
    };

    const result = await connectionService.update(id, newConnection);
    res.json(result);
  } catch (err) {
    next(createError(500, err));
    return;
  }
});

router.put('/:id/targetNodeId', async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  const targetNodeId = parseInt(req.body.targetNodeId);

  try {
    const connection = await connectionService.findOrThrow(id);

    const newConnection = {
      ...connection,
      targetNodeId: targetNodeId
    };

    const result = await connectionService.update(id, newConnection);
    res.json(result);
  } catch (err) {
    next(createError(500, err));
    return;
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);

  try {
    await connectionService.delete(id);
    res.json({ success: true, message: 'Connection deleted' });
  } catch (err) {
    next(createError(500, err));
    return;
  }
});

export default router;