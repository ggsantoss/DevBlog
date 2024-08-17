import { UserRepository } from '../../../repositories/UserRepository';
import { RegisterRequestDTO } from './RegisterDTO';
import bcrypt from 'bcrypt'; // Usando bcrypt diretamente
import Joi from '@hapi/joi';
import { SECRET_KEY } from '../../../../config.json'

export class RegisterUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: RegisterRequestDTO) {
    const userSchema = Joi.object({
      name: Joi.string().required().min(1).max(200),
      password: Joi.string().required().min(1).max(500),
      secretkey: Joi.string().required()
    });

    if(data.secretkey != SECRET_KEY) {
      return {
        success: false,
        message: 'Sem autorização para finalizar essa operação',
      };
    }

    const { error } = userSchema.validate(data);
    if (error) {
      console.error('ValidationError:', error);
      return {
        success: false,
        error: 'Dados inválidos',
        details: error.details,
      };
    }

    const existingUser = await this.userRepository.findUserByEmail(data.name);
    if (existingUser) {
      return {
        success: false,
        error: 'Usuário já existe',
      };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10); // Usando await para o hash

    const userData = {
      name: data.name,
      password: hashedPassword,
    };

    await this.userRepository.create(userData);

    return {
      success: true,
      message: 'Usuário registrado com sucesso',
    };
  }
}
