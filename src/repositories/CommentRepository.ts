import { prisma } from '../db/prisma';

export class CommentRepository {
  async create(data: { comment: string }, postId: string) {
    const newComment = await prisma.comments.create({
      data: {
        comment: data.comment,
        postId: postId,
      },
    });

    return newComment;
  }

  async getComments(postId: string) {
    const comments = await prisma.comments.findMany({
      where: {
        postId,
      },
    });

    return comments;
  }
}
