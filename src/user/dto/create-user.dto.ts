import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateUserAuthDto } from './create-user-auth.dto';

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Authentication credentials',
    required: false,
    example: { login: 'johndoe', password: 'password123' },
  })
  @ValidateNested()
  @Type(() => CreateUserAuthDto)
  auth?: CreateUserAuthDto;
}
