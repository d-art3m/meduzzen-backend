import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { UpdateUserAuthDto } from './update-user-auth.dto';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  auth?: UpdateUserAuthDto;
}
