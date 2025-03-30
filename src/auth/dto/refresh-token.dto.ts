import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh token',
    example: 'your-refresh-token',
  })
  @IsNotEmpty()
  @IsString()
  refresh_token: string;
}
