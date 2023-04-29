import { authService, userService } from '../../../src/services';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

describe('Auth Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    describe('with valid user', () => {
      it('should return a token', async () => {
        const serverUser = {
          id: 1,
          username: faker.internet.userName(),
          password: faker.internet.password(),
          email: faker.internet.email(),
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent()
        };

        const user = {
          id: serverUser.id,
          username: serverUser.username,
          password: serverUser.password,
          email: serverUser.email,
          createdAt: serverUser.createdAt,
          updatedAt: serverUser.updatedAt
        };

        const encryptedPassword = await bcrypt.hash(
          serverUser.password,
          10
        );
        serverUser.password = encryptedPassword;

        jest
          .spyOn(userService, 'findByUsername')
          .mockImplementationOnce(() => Promise.resolve(serverUser));

        const token = await authService.login(user);
        expect(userService.findByUsername).toHaveBeenCalled();
        expect(token).toBeDefined();
        expect(token).not.toBeNull();
      });
    });

    describe('with not existing user', () => {
      it('should return null', async () => {
        const user = {
          id: faker.datatype.number(),
          username: faker.internet.userName(),
          password: faker.internet.password(),
          email: faker.internet.email(),
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent()
        };

        jest
          .spyOn(userService, 'findByUsername')
          .mockImplementationOnce(() => Promise.resolve(null));
        const token = await authService.login(user);

        expect(token).toBeNull();
      });
    });

    describe('with invalid password', () => {
      it('should return null', async () => {
        const serverUser = {
          id: faker.datatype.number(),
          username: faker.internet.userName(),
          password: faker.internet.password(),
          email: faker.internet.email(),
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent()
        };
    
        const user = {
          id: serverUser.id,
          username: serverUser.username,
          password: faker.internet.password(),
          email: serverUser.email,
          createdAt: serverUser.createdAt,
          updatedAt: serverUser.updatedAt
        };
        const encryptedPassword = await bcrypt.hash(
          serverUser.password,
          10
        );
        serverUser.password = encryptedPassword;
    
        jest
          .spyOn(userService, 'findByUsername')
          .mockImplementationOnce(() => Promise.resolve(serverUser));
    
        const token = await authService.login(user);
    
        expect(token).toBeNull();
      });
    });
  });

  describe('validateUser', () => {
    it('should return a user', async () => {
      const user = {
        id: faker.datatype.number(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        email: faker.internet.email(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent()
      };

      jest
        .spyOn(userService, 'find')
        .mockImplementationOnce(() => Promise.resolve(user));

      const validatedUser = await authService.validateUser(user);

      expect(userService.find).toHaveBeenCalled();
      expect(validatedUser).toBeDefined();
      expect(validatedUser).not.toBeNull();
    });
  });

  describe('register', () => {
    describe('with valid user', () => {
      it('should return a user', async () => {
        const user = {
          id: faker.datatype.number(),
          username: faker.internet.userName(),
          password: faker.internet.password(),
          email: faker.internet.email(),
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent()
        };

        jest
          .spyOn(userService, 'findByUsername')
          .mockImplementationOnce(() => Promise.resolve(null));

        jest
          .spyOn(userService, 'create')
          .mockImplementationOnce(() => Promise.resolve(user));

        const createdUser = await authService.register(user);

        expect(userService.findByUsername).toHaveBeenCalled();
        expect(userService.create).toHaveBeenCalled();
        expect(createdUser).toBeDefined();
        expect(createdUser).not.toBeNull();
      });
    });

    describe('with existing user', () => {
      it('should throw an error', async () => {
        const user = {
          id: faker.datatype.number(),
          username: faker.internet.userName(),
          password: faker.internet.password(),
          email: faker.internet.email(),
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent()
        };

        jest
          .spyOn(userService, 'findByUsername')
          .mockImplementationOnce(() => Promise.resolve(user));

        await expect(authService.register(user)).rejects.toThrow(
          'User already exists'
        );
      });
    });
  });
});
