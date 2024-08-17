import { Request, Response } from 'express';
import { PostRepository } from '../../repositories/PostRepository';
import { DeletePostUseCase } from './DeletePostUseCase';

export class DeletePostController {
  static async delete(req: Request, res: Response) {
    const id = req.params.id;

    const postRepository: PostRepository = new PostRepository();
    const deletePostUseCase = new DeletePostUseCase(postRepository);
    const data = deletePostUseCase.execute({ id });

    console.log(data);
  }
}
