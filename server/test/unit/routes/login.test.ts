import App from '../../../src/app';
import winston from 'winston';
import { faker } from '@faker-js/faker';
import { authService } from '../../../src/services';
import request = require('supertest');

describe('login router', () => {
  const app: App = new App();
  const server = app.express;
  beforeAll(async () => {
    await app.init();
    const port = process.env.PORT || 3000;
    app.express.listen(port, () => {
      winston.info(`Server listening on port ${port}`);
    });
  });

  afterAll(async () => {
    await app.exit();
  });

  describe('POST /login', () => {
    describe('with valid credentials', () => {
      it('should return a token', async () => {
        const user = {
          username: faker.internet.userName(),
          password: faker.internet.password()
        };

        await authService.register(user);

        const response = await request(server)
          .post('/api/login')
          .send({
            username: user.username,
            password: user.password
          })
          .set('Accept', 'application/json');
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.token).toBeDefined();
        expect(response.body.token).not.toBeNull();
      });

      describe('with invalid credentials', () => {
        describe('with invalid password', () => {
          it('should return 401', async () => {
            const user = {
              username: faker.internet.userName(),
              password: faker.internet.password()
            };

            await authService.register(user);

            const response = await request(server)
              .post('/api/login')
              .send({
                username: user.username,
                password: faker.internet.password()
              })
              .set('Accept', 'application/json');
            expect(response.status).toBe(401);
            expect(response.body).toBeDefined();
            expect(response.headers['content-type']).toMatch(/json/);
            expect(response.body.token).toBeUndefined();
          });
        });

        describe('with non existent user', () => {
          it('should return 401', async () => {
            const user = {
              username: faker.internet.userName(),
              password: faker.internet.password()
            };

            const response = await request(server)
              .post('/api/login')
              .send({
                username: user.username,
                password: user.password
              })
              .set('Accept', 'application/json');
            expect(response.status).toBe(401);
            expect(response.body).toBeDefined();
            expect(response.headers['content-type']).toMatch(/json/);
            expect(response.body.token).toBeUndefined();
          });
        });
      });
    });
  });
});
