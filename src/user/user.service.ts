import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Auth } from 'src/auth/entities/auth.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PaginationDto } from 'src/types/pagination.dto';
import { PaginatedResult } from 'src/types/paginated-result';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {}

  async findAll(paginationDto: PaginationDto): Promise<PaginatedResult<User>> {
    const page = paginationDto.page || 1;
    const limit = paginationDto.limit || 10;
    const skip = (page - 1) * limit;

    const [items, total] = await this.userRepository.findAndCount({
      skip,
      take: limit,
    });

    return { items, total };
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, auth } = createUserDto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    const user = this.userRepository.create({ name, email });
    const savedUser = await this.userRepository.save(user);

    if (auth) {
      const existingAuth = await this.authRepository.findOne({
        where: { login: auth.login },
      });
      if (existingAuth) {
        throw new HttpException('Login already exists', HttpStatus.BAD_REQUEST);
      }

      const hashedPassword = await bcrypt.hash(auth.password, 10);
      const newAuth = this.authRepository.create({
        userId: savedUser.id,
        login: auth.login,
        password: hashedPassword,
        user: savedUser,
      });
      const savedAuth = await this.authRepository.save(newAuth);
      savedUser.auth = savedAuth;
    }

    return savedUser;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['auth'],
    });

    if (updateUserDto.name) {
      user.name = updateUserDto.name;
    }

    if (updateUserDto.auth?.password && user.auth) {
      user.auth.password = await bcrypt.hash(updateUserDto.auth.password, 10);

      const savedAuth = await this.authRepository.save(user.auth);
      user.auth = savedAuth;
    }

    return await this.userRepository.save(user);
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.findOne(id);
    return await this.userRepository.remove(user);
  }
}
