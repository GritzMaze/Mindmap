import { User } from '@prisma/client';
import { prisma } from './prisma.service';

class UserService {
    async find(id: number): Promise<User | null> {
        return await prisma.user.findUnique({
            where: {
                id
            }
        });
    }

    async findOrThrow(id: number): Promise<User> {
        const user = await this.find(id);

        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }

        return user;
    }

    async findManyByIds(ids: number[]): Promise<User[]> {
        return await prisma.user.findMany({
            where: {
                id: {
                    in: ids
                }
            }
        });
    }

    async create(data: User): Promise<User> {
        return await prisma.user.create({
            data
        });
    }
}