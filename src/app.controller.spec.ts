import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpStatus } from '@nestjs/common';
import {
  HealthCheckDetail,
  HealthCheckResult,
} from './types/health-check.types';

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
    it('should return health check status with code 200', async () => {
      const expectedResult = {
        status_code: HttpStatus.OK,
        detail: HealthCheckDetail.OK,
        result: HealthCheckResult.WORKING,
      };
      const result = await appController.healthCheck();
      expect(result).toEqual(expectedResult);
    });
  });
});
