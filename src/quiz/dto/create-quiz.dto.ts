import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsArray,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { QuizQuestionDto } from './quiz-question.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuizDto {
  @ApiProperty({
    description: 'Quiz title',
    example: 'General Knowledge Quiz',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Quiz description',
    example: 'A quiz to test your general knowledge',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Company ID to which the quiz belongs',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsNotEmpty()
  @IsUUID()
  companyId: string;

  @ApiProperty({
    description: 'List of quiz questions',
    type: [QuizQuestionDto],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => QuizQuestionDto)
  questions: QuizQuestionDto[];
}
