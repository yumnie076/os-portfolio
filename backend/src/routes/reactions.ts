import { Router, Request, Response } from 'express';
import Reaction from '../models/Reaction';
import { apiLimiter } from '../middleware/rateLimiter';

const router = Router();

router.get('/:projectId', apiLimiter, async (req: Request, res: Response) => {
  try {
    const reactions = await Reaction.find({ projectId: req.params.projectId });
    res.json(reactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reactions' });
  }
});

router.post('/', apiLimiter, async (req: Request, res: Response) => {
  try {
    const { projectId, emoji, visitorId } = req.body;
    const newReaction = await Reaction.create({ projectId, emoji, visitorId });
    res.status(201).json(newReaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create reaction' });
  }
});

export default router;
