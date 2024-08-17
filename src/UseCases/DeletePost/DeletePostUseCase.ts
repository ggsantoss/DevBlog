import { PostRepository } from '../../repositories/PostRepository';
import { DeletePostRequestDTO } from './DeletePostDTO';

export class DeletePostUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(data: DeletePostRequestDTO) {
    this.postRepository.deletePost(data.id);
  }
}
