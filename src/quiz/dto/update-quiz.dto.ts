import {
  IsOptional,
  IsString,
  IsArray,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { QuizQuestionDto } from './quiz-question.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateQuizDto {
  @ApiPropertyOptional({
    description: 'Quiz title',
    example: 'General Knowledge Quiz',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Quiz description',
    example: 'A quiz to test your general knowledge',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'List of quiz questions',
    type: [QuizQuestionDto],
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => QuizQuestionDto)
  questions?: QuizQuestionDto[];
}
