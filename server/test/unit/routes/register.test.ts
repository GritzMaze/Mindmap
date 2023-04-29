import { faker } from '@faker-js/faker';
import request = require('supertest');
import App from '../../../src/app';

describe('Register router', () => {
  const app: App = new App();
  const server = app.express;
  beforeAll(async () => {
    await app.init();
    app.express.listen();
  });
  
  afterAll(async () => {
    await app.exit();
  });


  describe('POST /register', () => {
    describe('with valid credentials', () => {
      it('should return a user', async () => {
        const user = {
          username: faker.internet.userName(),
          password: faker.internet.password(),
          email: faker.internet.email()
        };

        const response = await request(server)
          .post('/api/register')
          .send(user)
          .set('Accept', 'application/json');
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.username).toBe(user.username);
        expect(response.body.email).toBe(user.email);
      });
    });

    describe('with invalid credentials', () => {
      describe('with already existing username', () => {
        it('should return 401', async () => {
          const user = {
            username: faker.internet.userName(),
            password: faker.internet.password(),
            email: faker.internet.email()
          };
    
          await request(server)
            .post('/api/register')
            .send(user)
            .set('Accept', 'application/json');
    
          const response = await request(server)
            .post('/api/register')
            .send(user)
            .set('Accept', 'application/json');
          expect(response.status).toBe(409);
          expect(response.body).toBeDefined();
          expect(response.headers['content-type']).toMatch(/json/);
          expect(response.body.message).toBe('Username already exists');
        });
      });
    });       
  });
});