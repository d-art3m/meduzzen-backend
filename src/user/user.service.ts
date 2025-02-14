import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Auth } from 'src/auth/entities/auth.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
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
    const user = await this.findOne(id);
    return await this.userRepository.save(Object.assign(user, updateUserDto));
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.findOne(id);
    return await this.userRepository.remove(user);
  }
}
