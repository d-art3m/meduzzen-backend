import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserAuthDto {
  @ApiPropertyOptional({
    description: 'The new password (at least 6 characters)',
    example: 'new-password',
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;
}
