import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../../config.json';

interface AuthRequest extends Request {
  user?: JwtPayload;
}

export class AuthMiddleware {
  static async verifyToken(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    const authorizationHeader: string | undefined = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).json({ message: 'Token não fornecido.' });
    }

    const token: string = authorizationHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido.' });
    }

    try {
      const decodedToken = await jwt.verify(token, JWT_SECRET);
      if (typeof decodedToken === 'string') {
        throw new Error('Token inválido');
      }
      req.user = decodedToken as JwtPayload;
      next();
    } catch (err) {
      next(err);
    }
  }
}
