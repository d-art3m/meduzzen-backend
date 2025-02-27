import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HealthCheckDetail } from './types/health-check.types';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Health Check',
    description: 'Checks if the app is running',
  })
  public async healthCheck(): Promise<HealthCheckDetail> {
    return this.appService.healthCheck();
  }
}
