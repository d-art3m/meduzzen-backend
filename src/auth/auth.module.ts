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
  providers: [AuthService, JwtStrategy, Auth0Strategy],
})
export class AuthModule {}
