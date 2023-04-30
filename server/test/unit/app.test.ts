import App from '../../src/app';
import { prisma as prismaService } from '../../src/services';

describe('App', () => {
  describe('constructor', () => {
    it('should initialize express', () => {
      const app = new App();
      expect(app.express).toBeDefined();
    });
  });

  describe('init', () => {
    it('should initialize dependencies', async () => {
      const app = new App();
      
      jest.spyOn(prismaService, 'init');
      await app.init();

      expect(prismaService.init).toHaveBeenCalled();
    });
  });

  describe('exit', () => {
    it('should stop dependencies', async () => {
      const app = new App();
      
      jest.spyOn(prismaService, 'exit');
      await app.exit();

      expect(prismaService.exit).toHaveBeenCalled();
    });
  });
});
