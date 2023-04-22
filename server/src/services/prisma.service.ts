import { PrismaClient } from '@prisma/client';
import { config } from '../config/config';

class PrismaService extends PrismaClient {

  readonly readClient: PrismaClient;

  constructor() {
    super({
      datasources: {
        db: {
          url: config.get('db.databaseUrl'),
        },
      }
      // Uncomment the following line to enable debug mode
      // Will log all queries to the console
      // log: ['query', 'info', 'warn', 'error'],
    });

    this.readClient = new PrismaClient({
      datasources: {
        db: {
          url: config.get('db.databaseUrl'),
        },
      },
      // log: ['query', 'info', 'warn', 'error'],
    });
  }

  async init(): Promise<void> {
    await this.$connect();
    await this.readClient.$connect();
  }

  async exit(): Promise<void> {
    await this.$disconnect();
    await this.readClient.$disconnect();
  }
}

export const prisma = new PrismaService();