import { HttpStatus } from '@nestjs/common';

export enum HealthCheckDetail {
  OK = 'ok',
  ERROR = 'error',
}

export enum HealthCheckResult {
  WORKING = 'working',
  NOT_WORKING = 'not_working',
}

export interface HealthCheckResponse {
  status_code: HttpStatus;
  detail: HealthCheckDetail;
  result: HealthCheckResult;
}
