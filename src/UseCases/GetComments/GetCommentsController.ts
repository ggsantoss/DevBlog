import { Request, Response } from 'express';
import { CommentRepository } from '../../repositories/CommentRepository';
import { GetCommentsUseCase } from './GetCommentsUseCase';

export class GetCommentsController {
  static async getPostComments(req: Request, res: Response) {
    const postId = req.params.id;

    if (typeof postId !== 'string' || !postId) {
      return res.status(400).send('Invalid postId');
    }

    try {
      const commentRepository = new CommentRepository();
      const getCommentsUseCase: GetCommentsUseCase = new GetCommentsUseCase(
        commentRepository,
      );

      const result = await getCommentsUseCase.execute(postId);
      if (result.success) {
        res.status(200).json(result.data);
      } else {
        res.status(500).json(result.error);
      }
    } catch (err) {
      console.error('Error retrieving comments:', err);
      res.status(500).send('Erro ao recuperar os comentários');
    }
  }
}
