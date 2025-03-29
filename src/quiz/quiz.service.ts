import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { User } from '../user/entities/user.entity';
import { Company } from '../company/entities/company.entity';
import { PaginationDto } from '../types/pagination.dto';
import { CompanyVisibility } from '../types/company-visibility';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async getPublicQuizzes(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;
    const [quizzes, total] = await this.quizRepository.findAndCount({
      where: {
        company: {
          visibility: CompanyVisibility.PUBLIC,
        },
      },
      relations: ['company'],
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });
    return { items: quizzes, total };
  }

  async getCompanyQuizzes(
    companyId: string,
    paginationDto: PaginationDto,
    user: User,
  ) {
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
      relations: ['owner'],
    });
    if (!company) {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    }
    if (
      company.visibility === CompanyVisibility.PRIVATE &&
      company.owner.id !== user.id
    ) {
      throw new HttpException(
        'You are not the owner of this company',
        HttpStatus.FORBIDDEN,
      );
    }
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;
    const [quizzes, total] = await this.quizRepository.findAndCount({
      where: { company: { id: companyId } },
      relations: ['company'],
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });
    return { items: quizzes, total };
  }

  async getQuizById(id: string): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne({
      where: { id },
      relations: ['company'],
    });
    if (!quiz) {
      throw new HttpException('Quiz not found', HttpStatus.NOT_FOUND);
    }
    return quiz;
  }

  async createQuiz(createQuizDto: CreateQuizDto, user: User): Promise<Quiz> {
    const { companyId, ...quizData } = createQuizDto;
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
      relations: ['owner'],
    });
    if (!company) {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    }
    if (company.owner.id !== user.id) {
      throw new HttpException(
        'You are not the owner of this company',
        HttpStatus.FORBIDDEN,
      );
    }
    const quiz = this.quizRepository.create({
      ...quizData,
      company,
      questions: createQuizDto.questions,
    });
    return await this.quizRepository.save(quiz);
  }

  async updateQuiz(
    id: string,
    updateQuizDto: UpdateQuizDto,
    user: User,
  ): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne({
      where: { id },
      relations: ['company', 'company.owner'],
    });
    if (!quiz) {
      throw new HttpException('Quiz not found', HttpStatus.NOT_FOUND);
    }
    if (quiz.company.owner.id !== user.id) {
      throw new HttpException(
        'You are not the owner of this company',
        HttpStatus.FORBIDDEN,
      );
    }
    Object.assign(quiz, updateQuizDto);
    return await this.quizRepository.save(quiz);
  }

  async deleteQuiz(id: string, user: User): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne({
      where: { id },
      relations: ['company', 'company.owner'],
    });
    if (!quiz) {
      throw new HttpException('Quiz not found', HttpStatus.NOT_FOUND);
    }
    if (quiz.company.owner.id !== user.id) {
      throw new HttpException(
        'You are not the owner of this company',
        HttpStatus.FORBIDDEN,
      );
    }
    return await this.quizRepository.remove(quiz);
  }
}
