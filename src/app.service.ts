import { Injectable, HttpStatus } from '@nestjs/common';
import {
  HealthCheckDetail,
  HealthCheckResult,
  HealthCheckResponse,
} from './types/health-check.types';

@Injectable()
export class AppService {
  public async healthCheck(): Promise<HealthCheckResponse> {
    return {
      status_code: HttpStatus.OK,
      detail: HealthCheckDetail.OK,
      result: HealthCheckResult.WORKING,
    };
  }
}
