import {
  Controller,
  Post,
  Body,
  UseGuards,
  Put,
  Param,
  Delete,
  Get,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { MultiAuthGuard } from '../auth/guards/multi-auth.guard';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../user/entities/user.entity';
import { PaginationDto } from '../types/pagination.dto';

@ApiTags('Quizzes')
@Controller('quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  @ApiOperation({ summary: 'Get all public quizzes' })
  @ApiResponse({
    status: 200,
    description: 'List of public quizzes returned successfully',
  })
  getPublicQuizzes(@Query() paginationDto: PaginationDto) {
    return this.quizService.getPublicQuizzes(paginationDto);
  }

  @Get('company/:companyId')
  @UseGuards(MultiAuthGuard)
  @ApiOperation({ summary: 'Get all quizzes for a specific company' })
  @ApiResponse({
    status: 200,
    description: 'List of company quizzes returned successfully',
  })
  getCompanyQuizzes(
    @Param('companyId') companyId: string,
    @Query() paginationDto: PaginationDto,
    @GetUser() user: User,
  ) {
    return this.quizService.getCompanyQuizzes(companyId, paginationDto, user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a quiz by id' })
  @ApiResponse({ status: 200, description: 'Quiz found and returned' })
  @ApiResponse({ status: 404, description: 'Quiz not found' })
  getQuizById(@Param('id') id: string) {
    return this.quizService.getQuizById(id);
  }

  @Post()
  @UseGuards(MultiAuthGuard)
  @ApiOperation({ summary: 'Create a new quiz' })
  @ApiResponse({ status: 201, description: 'Quiz created successfully' })
  @ApiResponse({
    status: 403,
    description: 'You are not the owner of this company',
  })
  createQuiz(@Body() createQuizDto: CreateQuizDto, @GetUser() user: User) {
    return this.quizService.createQuiz(createQuizDto, user);
  }

  @Put(':id')
  @UseGuards(MultiAuthGuard)
  @ApiOperation({ summary: 'Update an existing quiz' })
  @ApiResponse({ status: 200, description: 'Quiz updated successfully' })
  @ApiResponse({
    status: 403,
    description: 'You are not the owner of this company',
  })
  @ApiResponse({ status: 404, description: 'Quiz not found' })
  updateQuiz(
    @Param('id') id: string,
    @Body() updateQuizDto: UpdateQuizDto,
    @GetUser() user: User,
  ) {
    return this.quizService.updateQuiz(id, updateQuizDto, user);
  }

  @Delete(':id')
  @UseGuards(MultiAuthGuard)
  @ApiOperation({ summary: 'Delete a quiz' })
  @ApiResponse({ status: 200, description: 'Quiz deleted successfully' })
  @ApiResponse({
    status: 403,
    description: 'You are not the owner of this company',
  })
  @ApiResponse({ status: 404, description: 'Quiz not found' })
  deleteQuiz(@Param('id') id: string, @GetUser() user: User) {
    return this.quizService.deleteQuiz(id, user);
  }
}
