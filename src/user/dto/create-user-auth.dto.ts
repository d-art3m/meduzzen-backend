import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserAuthDto {
  @ApiProperty({
    description: 'User login',
    example: 'johndoe',
  })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({
    description: 'User password (at least 6 characters)',
    example: 'password',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
