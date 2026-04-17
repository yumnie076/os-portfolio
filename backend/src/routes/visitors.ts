import { Router, Request, Response } from 'express';
import Visitor from '../models/Visitor';
import { authenticateJWT } from '../middleware/auth';

const router = Router();

router.get('/stats', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const totalVisitors = await Visitor.countDocuments();
    res.json({ totalVisitors });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch visitor stats' });
  }
});

export default router;
