import { Request, Response } from 'express';
import { PostRepository } from '../../repositories/PostRepository';
import { GetPostUseCase } from './GetPostUseCase';

export class GetPostController {
  static async getPost(req: Request, res: Response) {
    try {
      const { skip, take } = req.query;

      if (!skip || !take) {
        return res
          .status(400)
          .json({ error: 'Skip e Take são obrigatórios na query' });
      }

      const parsedSkip = parseInt(skip as string);
      const parsedTake = parseInt(take as string);

      if (isNaN(parsedSkip) || isNaN(parsedTake)) {
        return res
          .status(400)
          .json({ error: 'Skip e take precisam ser números válidos' });
      }

      const userRepository = new PostRepository();
      const getUserUseCase = new GetPostUseCase(userRepository);

      const users = await getUserUseCase.execute(parsedSkip, parsedTake);

      return res.status(200).json({ message: users });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  static async getPostById(req: Request, res: Response) {
    try {
      const postId = req.params.id;

      const userRepository = new PostRepository();
      const post = await userRepository.findById(postId);

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      return res.status(200).json({ message: post });
    } catch (error) {
      console.error('Error fetching post by ID:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  static async getPostByTitle(req: Request, res: Response) {
    const dataQ = req.query.q as string;

    if (!dataQ) {
      return res.render('error');
    }

    const repository: PostRepository = new PostRepository();
    const data = await repository.findAllPosts(dataQ);

    const result = data;
    res.render('searchpage', { data });
  }
}
