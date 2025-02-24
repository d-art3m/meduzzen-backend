import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';
import { SignInDto } from './dto/signin.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
      user: userAuth.user,
    };
  }

  async signInAuth0(auth0UserData: any) {
    const { email } = auth0UserData;

    let user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      user = this.userRepository.create({ name: email.split('@')[0], email });
      user = await this.userRepository.save(user);
    }
    const payload = { sub: user.id, email: user.email, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
