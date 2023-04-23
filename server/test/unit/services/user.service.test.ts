import { UserService } from '../../../src/services/user.service';
import faker from 'faker';
import prisma from '../../client';


describe('UserService', () => {
  let userService: UserService;
  
  beforeAll(async () => {
    await prisma.$connect();
    userService = new UserService(prisma);
  }); 

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('find', () => {
    describe('with valid id', () => {
      it('should return user', async () => {
        const user = await userService.create({
          username: faker.internet.userName(),
          password: faker.internet.password(),
          email: faker.internet.email()
        });

        const foundUser = await userService.find(user.id);
        expect(foundUser).toBeDefined();
        expect(foundUser).toMatchObject(user);
      });
    });

    describe('with invalid id', () => {
      it('should return null', async () => {
        const foundUser = await userService.find(0);
        expect(foundUser).toBeNull();
      });
    });
  });

  describe('findOrThrow', () => {
    describe('with valid id', () => {
      it('should return user', async () => {
        const user = await userService.create({
          username: faker.internet.userName(),
          password: faker.internet.password(),
          email: faker.internet.email()
        });

        const foundUser = await userService.findOrThrow(user.id);
        expect(foundUser).toBeDefined();
        expect(foundUser).toMatchObject(user);
      });
    });

    describe('with invalid id', () => {
      it('should throw error', async () => {
        await expect(userService.findOrThrow(0)).rejects.toThrow();
      });
    });
  });

  describe('findManyByIds', () => {
    describe('with valid ids', () => {
      it('should return users', async () => {
        const createUser = () => userService.create({
          username: faker.internet.userName(),
          password: faker.internet.password(),
          email: faker.internet.email()
        });
        const users = [
          await createUser(),
          await createUser(),
          await createUser()
        ];

        const ids = users.map((user) => user.id);
        const foundUsers = await userService.findManyByIds(ids);
        expect(foundUsers).toBeDefined();
        expect(foundUsers).toHaveLength(3);
      });
    });

    describe('with invalid ids', () => {
      it('should return empty array', async () => {
        const foundUsers = await userService.findManyByIds([0, 0]);
        expect(foundUsers).toBeDefined();
        expect(foundUsers).toHaveLength(0);
      });
    });
  });

  describe('findByUsername', () => {
    describe('with valid username', () => {
      it('should return user', async () => {
        const user = await userService.create({
          username: faker.internet.userName(),
          password: faker.internet.password(),
          email: faker.internet.email()
        });

        const foundUser = await userService.findByUsername(user.username);
        expect(foundUser).toBeDefined();
        expect(foundUser).toMatchObject(user);
      });
    });

    describe('with invalid username', () => {
      it('should return null', async () => {
        const foundUser = await userService.findByUsername(faker.internet.userName());
        expect(foundUser).toBeNull();
      });
    });
  });


  describe('create', () => {
    describe('with valid data', () => {
      it('should return user', async () => {
        const user = await userService.create({
          username: faker.internet.userName(),
          password: faker.internet.password(),
          email: faker.internet.email()
        });

        expect(user).toBeDefined();
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('username');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('createdAt');
      });
    });

    describe('with already existing username', () => {
      it('should throw error', async () => {
        const user = await userService.create({
          username: faker.internet.userName(),
          password: faker.internet.password(),
          email: faker.internet.email()
        });

        await expect(userService.create({
          username: user.username,
          password: faker.internet.password(),
          email: faker.internet.email()
        })).rejects.toThrow();
      });
    });
    // describe('with invalid data', () => {
    //   it('should throw error', async () => {
    //     await expect(userService.create({
    //       username: faker.internet.userName(),
    //       password: faker.internet.password(),
    //       email: faker.internet.email()
    //     })).rejects.toThrow();
    //   });
    // });
  });
});
