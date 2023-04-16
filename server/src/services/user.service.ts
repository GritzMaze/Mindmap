import { User } from '@prisma/client';
import { prisma } from './prisma.service';

// TODO: Maybe move this to a separate file
// in a folder called interfaces and split
// the interfaces by model-related
export interface UserCreateInput {
    username: string;
    password: string;
    email?: string;
}

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

    async create(data: UserCreateInput): Promise<User> {
        return await prisma.user.create({
            data
        });
    }
}

export const userService = new UserService();