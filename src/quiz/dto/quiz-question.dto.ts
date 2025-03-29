import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsArray, ArrayMinSize } from 'class-validator';

export class QuizQuestionDto {
  @ApiProperty({
    description: 'The question text',
    example: 'What is the capital of France?',
  })
  @IsNotEmpty()
  @IsString()
  question: string;

  @ApiProperty({
    description: 'List of possible answers',
    example: ['London', 'Paris', 'Berlin', 'Madrid'],
    isArray: true,
    type: String,
  })
  @IsArray()
  @ArrayMinSize(2)
  @IsString({ each: true })
  answerOptions: string[];

  @ApiProperty({
    description: 'The correct answer',
    example: 'Paris',
  })
  @IsNotEmpty()
  @IsString()
  correctAnswer: string;
}
