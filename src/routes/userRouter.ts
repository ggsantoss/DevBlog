import express, { Request, Response } from 'express';
import { CreatePostController } from '../UseCases/CreatePost/CreatePostController';
import { GetPostController } from '../UseCases/GetPost/GetPostController';
import axios, { all } from 'axios';
import { DeletePostController } from '../UseCases/DeletePost/DeletePostController';
import { RegisterController } from '../UseCases/BackOffice/Register/RegisterController';
import { LoginController } from '../UseCases/BackOffice/Login/LoginController';
import { AuthMiddleware } from '../middlewares/verifyToken';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config.json';

const routerUser = express.Router();

routerUser.get('/admin', async (req: Request, res: Response) => {
  const token = req.query.token || req.headers.authorization;

  if (!token) {
    return res.redirect('/login');
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  res.render('admin');
});

routerUser.get('/login', (req: Request, res: Response) => {
  try {
    res.render('login');
  } catch (error) {
    res.render('error');
  }
});
routerUser.post('/register', RegisterController.register);
routerUser.post('/login', LoginController.login);

export { routerUser };
