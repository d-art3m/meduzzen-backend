import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    description: 'User login',
    example: 'johndoe',
  })
  login: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
  })
  password: string;
}
