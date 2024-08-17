import { Prisma } from '@prisma/client';
import { prisma } from '../db/prisma';

export class PostRepository {
  async create(data: any) {
    const newPost = await prisma.post.create({
      data,
    });

    return newPost;
  }

  async findUsers(skip: number, take: number): Promise<any | null> {
    const findPosts = await prisma.post.findMany({
      skip: skip,
      take: take,
    });

    return findPosts;
  }

  async findById(id: string): Promise<any | null> {
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });

    return post;
  }

  

  async deletePost(id: string): Promise<any | null> {
    const post = await prisma.post.delete({
      where: {
        id,
      },
    });
  }

  async findAllPosts(title: string) {
    const data = await prisma.post.findMany({
      where: {
        title: {
          contains: title,
          mode: 'insensitive',
        },
      },
    });
    return data;
  }
}
