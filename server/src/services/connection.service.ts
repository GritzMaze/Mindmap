import { PrismaClient, Connection } from '@prisma/client';
import { prisma as prismaService } from './prisma.service';
import { BaseDatabaseService } from './base-database.service';

export interface ConnectionCreateInput {
    label: string;
    sourceNodeId: number;
    targetNodeId: number;
    MindmapId: number;
}

export class ConnectionService extends BaseDatabaseService<Connection> {

    constructor(protected readonly prisma: PrismaClient = prismaService) {
        super(prisma);
    }

    async find(id: number): Promise<Connection | null> {
        return await this.prisma.connection.findUnique({
            where: {
                id
            }
        });
    }

    async findOrThrow(id: number): Promise<Connection> {
        const connection = await this.find(id);

        if (!connection) {
            throw new Error(`Connection with id ${id} not found`);
        }

        return connection;
    }

    async findManyByIds(ids: number[]): Promise<Connection[] | null> {
        return await this.prisma.connection.findMany({
            where: {
                id: {
                    in: ids
                }
            }
        });
    }

    async create(data: ConnectionCreateInput): Promise<Connection> {
        return await this.prisma.connection.create({
            data,
        });
    }

    async delete(id: number): Promise<Connection> {
        return await this.prisma.connection.delete({
            where: {
                id
            }
        });
    }

    async updateLabel(id: number, label: string): Promise<Connection> {
        return await this.prisma.connection.update({
            where: {
                id
            },
            data: {
                updatedAt: new Date(),
                label
            }
        });
    }


    async updateSourceNodeId(id: number, sourceNodeId: number): Promise<Connection> {
        return await this.prisma.connection.update({
            where: {
                id
            },
            data: {
                updatedAt: new Date(),
                sourceNodeId
            }
        });
    }

    async updateTargetNodeId(id: number, targetNodeId: number): Promise<Connection> {
        return await this.prisma.connection.update({
            where: {
                id
            },
            data: {
                updatedAt: new Date(),
                targetNodeId
            }
        });
    }
    
}

export const connectionService = new ConnectionService();