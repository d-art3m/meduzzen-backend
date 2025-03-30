import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { QuizQuestion } from './entities/quiz-question.entity';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { Company } from '../company/entities/company.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quiz, QuizQuestion, Company]),
    AuthModule,
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
