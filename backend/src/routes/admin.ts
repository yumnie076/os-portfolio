import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { strictLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/login', strictLimiter, (req: Request, res: Response) => {
  const { password } = req.body;

  if (password === (process.env.ADMIN_PASSWORD || 'admin')) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || 'super-secret-jwt-key', { expiresIn: '15m' });
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000 // 15 mins
    });
    
    res.json({ message: 'Ingelogd' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

router.post('/logout', (req: Request, res: Response) => {
  res.clearCookie('token');
  res.json({ message: 'Uitgelogd' });
});

export default router;
