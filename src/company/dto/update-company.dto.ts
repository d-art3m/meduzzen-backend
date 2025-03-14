import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum } from 'class-validator';
import { CompanyVisibility } from 'src/types/company-visibility';

export class UpdateCompanyDto {
  @ApiPropertyOptional({ description: 'Company name', example: 'Acme Inc.' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Company description',
    example: 'Leading provider of solutions',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Company visibility status',
    example: CompanyVisibility.PUBLIC,
    enum: CompanyVisibility,
  })
  @IsOptional()
  @IsEnum(CompanyVisibility)
  visibility?: CompanyVisibility;
}
