import { Prisma } from '@prisma/client';
import { prisma } from '../db/prisma';

export class UserRepository {
  async create(data: any) {
    const newUser = await prisma.user.create({
      data,
    });

    return newUser;
  }

  async findUser(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async findUserByEmail(name: string) {
    const user = await prisma.user.findFirst({
      where: {
        name,
      },
    });
    return user;
  }
}
