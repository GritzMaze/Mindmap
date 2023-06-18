import { PrismaClient, Mindmap } from '@prisma/client';
import { prisma as prismaService } from './prisma.service';
import { BaseDatabaseService } from './base-database.service';

export interface MindmapCreateInput {
  name: string;
  userId: number;
}

export class MindmapService extends BaseDatabaseService<Mindmap> {
  constructor(protected readonly prisma: PrismaClient = prismaService) {
    super(prisma);
  }

  async find(id: number): Promise<Mindmap | null> {
    return await this.prisma.mindmap.findUnique({
      where: {
        id,
      },
      include: {
        Node: true,
        Connection: true,
      }
    });
  }

  async findOrThrow(id: number): Promise<Mindmap> {
    const mindmap = await this.find(id);

    if (!mindmap) {
      throw new Error(`Mindmap with id ${id} not found`);
    }

    return mindmap;
  }

  async findManyByIds(ids: number[]): Promise<Mindmap[]> {
    return await this.prisma.mindmap.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async create(data: MindmapCreateInput): Promise<Mindmap> {
    return await this.prisma.mindmap.create({
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.mindmap.delete({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: MindmapCreateInput): Promise<Mindmap> {
    return await this.prisma.mindmap.update({
      where: {
        id,
      },
      data: {
        ...data,
        createdAt: new Date(),
      },
    });
  }
}

export const mindmapService = new MindmapService();