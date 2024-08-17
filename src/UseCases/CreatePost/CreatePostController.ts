import { Request, Response } from 'express';
import { CreatePostRequestDTO } from './CreatePostDTO';
import { PostRepository } from '../../repositories/PostRepository';
import { CreatePostUseCase } from './CreatePostUseCase';
import upload from '../../services/uploadConfig'; // Importe o serviço de upload corretamente

export class CreatePostController {
  static async create(req: Request, res: Response) {
    try {
      upload(req, res, async (err: any) => {
        if (err) {
          console.error('Error uploading file:', err);
          return res.status(400).json({ error: 'Error uploading file' });
        }

        const { title, content, tag } = req.body;
        const imagePath = req.file ? req.file.path : '';

        const postData: CreatePostRequestDTO = {
          title,
          content,
          imagePath,
          tag,
        };

        const postRepository = new PostRepository();
        const createPostUseCase = new CreatePostUseCase(postRepository);

        const result = await createPostUseCase.execute(postData, imagePath);

        if (result.success) {
          res.status(201).send(result.message);
        } else {
          res.status(400).json({ error: result.error, details: result.details });
        }
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
