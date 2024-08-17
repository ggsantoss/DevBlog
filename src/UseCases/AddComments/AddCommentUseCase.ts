import { CommentRepository } from '../../repositories/CommentRepository';
import { AddCommentRequestDTO } from './AddCommentDTO';

export class AddCommentUseCase {
  constructor(private commentRepository: CommentRepository) {}

  async execute(data: AddCommentRequestDTO, postId: string) {
    try {
      const result = await this.commentRepository.create(data, postId);
    } catch (error) {
      console.error('Error saving post:', error);
      return { success: false, error: 'Erro ao salvar o post' };
    }
  }
}
