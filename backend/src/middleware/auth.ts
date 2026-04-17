import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET || 'super-secret-jwt-key', (err: any, user: any) => {
      if (err) {
        return res.status(403).json({ error: 'Token expired or invalid' });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ error: 'Authorization cookie missing' });
  }
};
