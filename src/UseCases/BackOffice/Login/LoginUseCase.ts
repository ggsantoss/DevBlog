import { UserRepository } from '../../../repositories/UserRepository';
import { LoginRequestDTO } from './LoginDTO';
import hash from 'bcrypt';
import Joi from '@hapi/joi';
import { JWT_SECRET } from '../../../../config.json';
import jwt from 'jsonwebtoken';

export class LoginUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: LoginRequestDTO) {
    const userSchema = Joi.object({
      name: Joi.string().required().min(1).max(200),
      password: Joi.string().required().min(1).max(500),
    });

    const { error } = userSchema.validate(data);
    if (error) {
      console.error('ValidationError:', error);
      return {
        success: false,
        error: 'Dados inválidos',
        details: error.details,
      };
    }

    const user = await this.userRepository.findUserByEmail(data.name);
    console.log(user);

    if (!user) {
      return { success: false, error: 'Usuário não encontrado' };
    }

    const comparedPassword = await hash.compare(data.password, user.password);

    if (!comparedPassword) {
      return { success: false, error: 'Usuario invalido' };
    }

    const payload = {
      userId: user.id,
      role: 'Admin',
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '30s' });

    return { success: true, token: token };
  }
}
