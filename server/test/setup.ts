// import { Prisma } from '@prisma/client';
// import 'jest';
// import prisma from './client';

import winston from 'winston';

// const tables = Prisma.dmmf.datamodel.models
//   .map((model) => model.dbName)
//   .filter((table) => table);

// global.beforeAll(async () => {
//   await prisma.$connect();
//   await prisma.$transaction([
//     ...tables.map((table) =>
//       prisma.$executeRawUnsafe(table ? `TRUNCATE ${table} CASCADE;` : ''),
//     ),
//   ]);
// });

// global.afterAll(async () => {
//   await prisma.$disconnect();
// });

winston.add(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
    ),
  }),
);
