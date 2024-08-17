import { Request, Response } from 'express';
import { CommentRepository } from '../../repositories/CommentRepository';
import { AddCommentUseCase } from './AddCommentUseCase';

export class AddCommentController {
  static async add(req: Request, res: Response) {
    try {
      const data = req.body;
      const postIdParam = req.params.id;

      if (typeof postIdParam !== 'string' || !postIdParam) {
        return res.status(400).send('Invalid postId');
      }

      if (!data || !data.comment) {
        return res.status(400).send('No data provided or missing comment');
      }

      const commentRepository: CommentRepository = new CommentRepository();
      const addCommentUseCase: AddCommentUseCase = new AddCommentUseCase(
        commentRepository,
      );

      const result = await addCommentUseCase.execute(data, postIdParam);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
