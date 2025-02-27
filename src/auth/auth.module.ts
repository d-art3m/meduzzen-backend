import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { User } from 'src/user/entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Auth0Strategy } from './strategies/auth0.strategy';
import { UserService } from 'src/user/user.service';
import { MultiAuthGuard } from './guards/multi-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Auth0Guard } from './guards/auth0.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth, User]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    JwtStrategy,
    Auth0Strategy,
    Auth0Guard,
    JwtAuthGuard,
    MultiAuthGuard,
  ],
  exports: [Auth0Guard, JwtAuthGuard, MultiAuthGuard],
})
export class AuthModule {}
