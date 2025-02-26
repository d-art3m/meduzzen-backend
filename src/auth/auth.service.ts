import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const { login, password } = signInDto;
    const userAuth = await this.authRepository.findOne({
      where: { login },
      relations: ['user'],
    });
    if (!userAuth || !(await bcrypt.compare(password, userAuth.password))) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    const payload = {
      sub: userAuth.user.id,
      email: userAuth.user.email,
      name: userAuth.user.name,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
