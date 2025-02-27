import { Injectable } from '@nestjs/common';
import { HealthCheckDetail } from './types/health-check.types';

@Injectable()
export class AppService {
  public async healthCheck(): Promise<HealthCheckDetail> {
    return HealthCheckDetail.OK;
  }
}
