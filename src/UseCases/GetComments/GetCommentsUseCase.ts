import { CommentRepository } from '../../repositories/CommentRepository';

class GetCommentsUseCase {
  constructor(private commentRepository: CommentRepository) {}

  async execute(postId: string) {
    try {
      const comments = await this.commentRepository.getComments(postId);
      return { success: true, data: comments };
    } catch (error) {
      console.error('Error retrieving comments:', error);
      return { success: false, error: 'Erro ao recuperar os comentários' };
    }
  }
}

export { GetCommentsUseCase };
