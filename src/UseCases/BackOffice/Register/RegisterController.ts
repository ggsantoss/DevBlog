import { Request, Response } from 'express';
import { RegisterRequestDTO } from './RegisterDTO';
import { UserRepository } from '../../../repositories/UserRepository';
import { RegisterUseCase } from './RegisterUseCase';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../../../config.json';

export class RegisterController {
  static async register(req: Request, res: Response) {
    const data: RegisterRequestDTO = req.body;

    try {
      const userRepository = new UserRepository();
      const registerUserUseCase = new RegisterUseCase(userRepository);

      const result = await registerUserUseCase.execute(data);

      if (result.success) {
        console.log(result);
        res.redirect('/login');
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({
        success: false,
        error: 'Ocorreu um erro ao processar sua solicitação',
      });
    }
  }
}
