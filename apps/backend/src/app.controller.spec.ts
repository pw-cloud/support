import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return the welcome message', () => {
      expect(appController.getHello()).toEqual({
        message: 'Support API is running',
      });
    });
  });

  describe('health', () => {
    it('should return a healthy status with a timestamp', () => {
      const health = appController.getHealth();

      expect(health.status).toBe('ok');
      expect(typeof health.timestamp).toBe('string');
      expect(new Date(health.timestamp).getTime()).not.toBeNaN();
    });
  });
});
