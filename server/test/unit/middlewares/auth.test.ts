import auth from '../../../src/middlewares/auth';
import jwt from 'jsonwebtoken';
import { userService } from '../../../src/services';
import { faker } from '@faker-js/faker';

describe('Auth Middleware', () => {
  let req;
  let res;
  let next;
  beforeEach(() => {
    req = {
      method: 'GET',
      path: '/test'
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      locals: {}
    };

    next = jest.fn();
  });

  describe('auth middleware', () => {
    describe('when token is valid', () => {
      it('should append the user to the response', async () => {
        req.headers = {
          authorization: 'Bearer token'
        };

        jest.spyOn(jwt, 'verify').mockImplementationOnce(() => ({ id: 1 }));

        const mockedUser = {
          id: 1,
          username: faker.internet.userName(),
          password: faker.internet.password(),
          email: faker.internet.email(),
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent()
        };

        jest
          .spyOn(userService, 'find')
          .mockImplementationOnce(() => Promise.resolve(mockedUser));
        await auth(req, res, next);
        expect(userService.find).toHaveBeenCalled();
        expect(res.locals.currentUser).toEqual(mockedUser);
        expect(next).toHaveBeenCalled();
      });
    });

    describe('when token is invalid', () => {
      it('should return 401 if no authorization header is present', async () => {
        req.headers = {};
        await auth(req, res, next);
        expect(next).toHaveBeenCalledWith(expect.any(Error));
        expect(next).toHaveBeenCalledWith(
          expect.objectContaining({ status: 401 })
        );
      });

      it('should return 400 if token type is not Bearer', async () => {
        req.headers = {
          authorization: 'Token token'
        };
        await auth(req, res, next);
        expect(next).toHaveBeenCalledWith(expect.any(Error));
        expect(next).toHaveBeenCalledWith(
          expect.objectContaining({ status: 400 })
        );
      });

      it('should return 401 if user is not found', async () => {
        req.headers = {
          authorization: 'Bearer token'
        };

        jest.spyOn(jwt, 'verify').mockImplementationOnce(() => ({ id: 1 }));

        jest
          .spyOn(userService, 'find')
          .mockImplementationOnce(() => Promise.resolve(null));
        await auth(req, res, next);
        expect(next).toHaveBeenCalledWith(expect.any(Error));
        expect(next).toHaveBeenCalledWith(
          expect.objectContaining({ status: 401 })
        );
      });

      it('should return 401 if token is invalid', async () => {
        req.headers = {
          authorization: 'Bearer token'
        };

        jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
          throw new jwt.JsonWebTokenError('invalid token');
        });

        await auth(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(Error));
        expect(next).toHaveBeenCalledWith(
          expect.objectContaining({ status: 401 })
        );
      });

      it('should return 401 if token is expired', async () => {
        req.headers = {
          authorization: 'Bearer token'
        };

        jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
          throw new jwt.TokenExpiredError('token expired', new Date());
        });

        await auth(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(Error));
        expect(next).toHaveBeenCalledWith(
          expect.objectContaining({ status: 401 })
        );
      });
    });
  });
});
