import { ApiProperty } from '@nestjs/swagger';
import { Auth } from 'src/auth/entities/auth.entity';

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Authentication credentials',
    required: false,
    example: { login: 'johndoe', password: 'password123' },
  })
  auth?: Auth;
}
