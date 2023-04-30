import { faker } from '@faker-js/faker';
import { jwtService } from '../../../src/services';

describe('JWT Service', () => {
    
  describe('sign', () => {
    it('should return a token', async () => {
      const payload = {
        id: 1,
        username: faker.internet.userName(),
        email: faker.internet.email()
      };

      const token = await jwtService.sign(payload);
      expect(token).toBeDefined();
      expect(token).not.toBeNull();
    });
  });
});