import { User } from '@prisma/client';
import { PrismaService, prisma as prismaService } from './prisma.service';

// TODO: Maybe move this to a separate file
// in a folder called interfaces and split
// the interfaces by model-related
export interface UserCreateInput {
    username: string;
    password: string;
    email?: string;
}

export class UserService {

  constructor(
    private readonly prisma: PrismaService = prismaService,
  ) {}

  async find(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({
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
    return await this.prisma.user.findMany({
      where: {
        id: {
          in: ids
        }
      }
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        username
      }
    });
  }

  async create(data: UserCreateInput): Promise<Partial<User>> {
    return await this.prisma.user.create({
      data,
      select: {id: true, username: true, email: true, createdAt: true }
    },
    );
  }
}

export const userService = new UserService();