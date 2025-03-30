import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { PaginationDto } from 'src/types/pagination.dto';
import { PaginatedResult } from 'src/types/paginated-result';
import { CompanyVisibility } from 'src/types/company-visibility';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async findAllPublic(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResult<Company>> {
    const page = paginationDto.page || 1;
    const limit = paginationDto.limit || 10;
    const skip = (page - 1) * limit;

    const [items, total] = await this.companyRepository.findAndCount({
      where: { visibility: CompanyVisibility.PUBLIC },
      skip,
      take: limit,
      relations: ['owner'],
      order: { createdAt: 'DESC' },
    });
    return { items, total };
  }

  async findPersonal(
    paginationDto: PaginationDto,
    user: User,
  ): Promise<PaginatedResult<Company>> {
    const page = paginationDto.page || 1;
    const limit = paginationDto.limit || 10;
    const skip = (page - 1) * limit;

    const [items, total] = await this.companyRepository.findAndCount({
      where: {
        owner: { id: user.id },
      },
      skip,
      take: limit,
      relations: ['owner'],
      order: { createdAt: 'DESC' },
    });
    return { items, total };
  }

  async findOne(id: string): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!company) {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    }

    return company;
  }

  async createCompany(
    createCompanyDto: CreateCompanyDto,
    owner: User,
  ): Promise<Company> {
    const existingCompany = await this.companyRepository.findOne({
      where: { name: createCompanyDto.name },
    });

    if (existingCompany) {
      throw new HttpException('Company already exists', HttpStatus.BAD_REQUEST);
    }

    const company = this.companyRepository.create({
      ...createCompanyDto,
      owner,
    });

    return await this.companyRepository.save(company);
  }

  async updateCompany(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
    user: User,
  ): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!company) {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    }
    if (company.owner.id !== user.id) {
      throw new HttpException('You are not the owner', HttpStatus.FORBIDDEN);
    }

    Object.assign(company, updateCompanyDto);
    return await this.companyRepository.save(company);
  }

  async deleteCompany(id: string, user: User): Promise<Company> {
    const company = await this.companyRepository.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!company) {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    }
    if (company.owner.id !== user.id) {
      throw new HttpException('You are not the owner', HttpStatus.FORBIDDEN);
    }

    return await this.companyRepository.remove(company);
  }
}
