import { PostRepository } from '../../repositories/PostRepository';

export class GetPostUseCase {
  constructor(private userRepository: PostRepository) {}

  async execute(skip: number, take: number) {
    return await this.userRepository.findUsers(skip, take);
  }
}
