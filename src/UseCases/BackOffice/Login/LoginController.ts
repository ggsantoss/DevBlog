import { Request, Response } from 'express';
import { LoginRequestDTO } from './LoginDTO';
import { UserRepository } from '../../../repositories/UserRepository';
import { LoginUseCase } from './LoginUseCase';

export class LoginController {
  static async login(req: Request, res: Response) {
    try {
      const userData: LoginRequestDTO = req.body;

      if (!userData) {
        return res.status(400).json({ error: 'Dados invalidos!' });
      }

      const userRepository: UserRepository = new UserRepository();
      const loginUserUseCase = new LoginUseCase(userRepository);
      const result = await loginUserUseCase.execute(userData);

      if (result && result.success) {
        res.redirect(`/admin?token=${result.token}`);
      } else {
        res.status(400).json({ error: result.error });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
