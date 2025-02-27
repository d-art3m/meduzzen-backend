/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Auth0Guard } from './auth0.guard';

@Injectable()
export class MultiAuthGuard implements CanActivate {
  constructor(
    private readonly auth0Guard: Auth0Guard,
    private readonly jwtAuthGuard: JwtAuthGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const auth0Result = await this.auth0Guard.canActivate(context);
      return auth0Result as boolean;
    } catch (auth0Error) {
      try {
        const jwtResult = await this.jwtAuthGuard.canActivate(context);
        return jwtResult as boolean;
      } catch (jwtError) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
    }
  }
}
