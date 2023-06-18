import { PrismaClient, Node } from '@prisma/client';
import { prisma as prismaService } from './prisma.service';
import { BaseDatabaseService } from './base-database.service';
import { NodeNotFoundError } from './errors/node-not-found.error';

export interface NodeCreateInput {
  label: string;
  xPos: number;
  yPos: number;
  mindmapId: number;
}

export class NodeService extends BaseDatabaseService<Node> {
  constructor(protected readonly prisma: PrismaClient = prismaService) {
    super(prisma);
  }

  async find(id: number): Promise<Node | null> {
    return await this.prisma.node.findUnique({
      where: {
        id,
      },
    });
  }

  async findOrThrow(id: number): Promise<Node> {
    const node = await this.find(id);

    if (!node) {
      throw new NodeNotFoundError(`Node with id ${id} not found`);
    }

    return node;
  }

  async findManyByIds(ids: number[]): Promise<Node[]> {
    return await this.prisma.node.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async create(data: NodeCreateInput): Promise<Node> {
    return await this.prisma.node.create({
      data
    });
  }

  async delete(id: number): Promise<Node> {
    const _node = await this.findOrThrow(id);
    return await this.prisma.node.delete({
      where: {
        id,
      },
    });
  }

  async updateLabel(id: number, label: string): Promise<Node> {
    return await this.prisma.node.update({
      where: {
        id
      },
      data: {
        label
      }
    });
  }

  async updatePosition(id: number, xPos: number, yPos: number): Promise<Node> {
    return await this.prisma.node.update({
      where: {
        id
      },
      data: {
        xPos,
        yPos
      }
    });
  }
}

export const nodeService = new NodeService();