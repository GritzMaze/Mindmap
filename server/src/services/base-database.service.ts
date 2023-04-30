import { PrismaClient } from '@prisma/client';
import { prisma as prismaService } from './prisma.service';

export abstract class BaseDatabaseService<TModel> {
  protected prisma: PrismaClient;
  constructor(protected readonly prismaPassed: PrismaClient = prismaService) {
    this.prisma = prismaPassed;
  }

  // TODO: This is supposed to omit fields like the user's password
  // as there is no way to omit it from the prisma query
  // Determine how to handle the types
  protected exclude<TModel, Key extends keyof TModel>(
    user: TModel,
    keys: Key[]
  ): Omit<TModel, Key> {
    for (const key of keys) {
      delete user[key];
    }
    return user;
  }
}
