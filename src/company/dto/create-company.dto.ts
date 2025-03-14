import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CompanyVisibility } from 'src/types/company-visibility';

export class CreateCompanyDto {
  @ApiProperty({ description: 'Company name', example: 'Acme Inc.' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Company description',
    example: 'Leading provider of solutions',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiPropertyOptional({
    description: 'Company visibility status',
    example: CompanyVisibility.PUBLIC,
    enum: CompanyVisibility,
  })
  @IsOptional()
  @IsEnum(CompanyVisibility)
  visibility?: CompanyVisibility;
}
