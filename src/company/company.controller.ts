import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MultiAuthGuard } from 'src/auth/guards/multi-auth.guard';
import { PaginationDto } from 'src/types/pagination.dto';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';

@ApiTags('Companies')
@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  @UseGuards(MultiAuthGuard)
  @ApiOperation({ summary: 'Get all public companies' })
  @ApiResponse({
    status: 200,
    description: 'List of companies returned successfully',
  })
  findAllPublic(@Query() paginationDto: PaginationDto) {
    return this.companyService.findAllPublic(paginationDto);
  }

  @Get('personal')
  @UseGuards(MultiAuthGuard)
  @ApiOperation({ summary: 'Get personal companies' })
  @ApiResponse({
    status: 200,
    description: 'List of companies returned successfully',
  })
  findPersonal(@Query() paginationDto: PaginationDto, @GetUser() user: User) {
    return this.companyService.findPersonal(paginationDto, user);
  }

  @Get(':id')
  @UseGuards(MultiAuthGuard)
  @ApiOperation({ summary: 'Get a company by id' })
  @ApiResponse({ status: 200, description: 'Company found and returned' })
  @ApiResponse({ status: 404, description: 'Company not found' })
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }

  @Post()
  @UseGuards(MultiAuthGuard)
  @ApiOperation({ summary: 'Create a new company' })
  @ApiResponse({ status: 201, description: 'Company created successfully' })
  @ApiResponse({ status: 400, description: 'Company already exists' })
  createCompany(
    @Body() createCompanyDto: CreateCompanyDto,
    @GetUser() user: User,
  ) {
    return this.companyService.createCompany(createCompanyDto, user);
  }

  @Put(':id')
  @UseGuards(MultiAuthGuard)
  @ApiOperation({ summary: 'Update company information' })
  @ApiResponse({ status: 200, description: 'Company updated successfully' })
  @ApiResponse({ status: 403, description: 'You are not the owner' })
  @ApiResponse({ status: 404, description: 'Company not found' })
  updateCompany(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @GetUser() user: User,
  ) {
    return this.companyService.updateCompany(id, updateCompanyDto, user);
  }

  @Delete(':id')
  @UseGuards(MultiAuthGuard)
  @ApiOperation({ summary: 'Delete a company' })
  @ApiResponse({ status: 200, description: 'Company deleted successfully' })
  @ApiResponse({ status: 403, description: 'You are not the owner' })
  @ApiResponse({ status: 404, description: 'Company not found' })
  deleteCompany(@Param('id') id: string, @GetUser() user: User) {
    return this.companyService.deleteCompany(id, user);
  }
}
