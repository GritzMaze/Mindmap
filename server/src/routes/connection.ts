import { NextFunction, Request, Response, Router } from 'express';
import createError from 'http-errors';
import { ConnectionCreateInput, connectionService, mindmapService } from '../services';

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

  const mindmapId = connection.MindmapId;
  const connections = await mindmapService.getConnections(mindmapId);

  for (let i = 0; i < connections.length; i++) {
    if (connections[i].label === connection.label) {
      next(createError(409, 'Connection already exists'));
      return;
    }
  }

  try {
    const result = await connectionService.create(connection);
    res.json(result);
  } catch (err) {
    next(createError(500, err));
    return;
  }
});

router.patch('/:id/label', async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  const label = req.body.label;

  try {
    const result = await connectionService.updateLabel(id, label);
    res.json(result);
  } catch (err) {
    next(createError(500, err));
    return;
  }
});

router.patch('/:id/sourceNodeId', async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  const sourceNodeId = parseInt(req.body.sourceNodeId);

  try {
    const result = await connectionService.updateSourceNodeId(id, sourceNodeId);
    res.json(result);
  } catch (err) {
    next(createError(500, err));
    return;
  }
});

router.patch('/:id/targetNodeId', async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  const targetNodeId = parseInt(req.body.targetNodeId);

  try {
    const result = await connectionService.updateTargetNodeId(id, targetNodeId);
    res.json(result);
  } catch (err) {
    next(createError(500, err));
    return;
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);

  try {
    const result = await connectionService.delete(id);
    res.json(result);
  } catch (err) {
    next(createError(500, err));
    return;
  }
});

export default router;