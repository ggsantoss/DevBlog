import { PostRepository } from '../../repositories/PostRepository';
import { CreatePostRequestDTO } from './CreatePostDTO';
import Joi from '@hapi/joi'; 

export class CreatePostUseCase {
  constructor(private createPostRepository: PostRepository) {}

  async execute(data: CreatePostRequestDTO, imagePath: string) {
    const schemaJoi = Joi.object({
      title: Joi.string().required().min(2).max(80),
      content: Joi.string().required().min(5).max(10000),
      imagePath: Joi.string().required(),
      tag: Joi.string().required().min(1).max(20)
    });

    const { error } = schemaJoi.validate(data);
    if (error) {
      console.error('ValidationError:', error);
      return {
        success: false,
        error: 'Dados inválidos',
        details: error.details,
      };
    }

    data.imagePath = imagePath;

    try {
      await this.createPostRepository.create(data);
      return { success: true, message: 'Post criado com sucesso' };
    } catch (error) {
      console.error('Error saving post:', error);
      return { success: false, error: 'Erro ao salvar o post' };
    }
  }
}
