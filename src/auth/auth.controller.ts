import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { Auth0Guard } from './guards/auth0.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiOperation({ summary: 'Sign in using login and password' })
  @ApiResponse({ status: 200, description: 'JWT token returned' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('auth0')
  @ApiOperation({ summary: 'Sign in using Auth0' })
  @ApiResponse({ status: 200, description: 'User authenticated via Auth0' })
  @UseGuards(Auth0Guard)
  async auth0SignIn(@Request() req: any) {
    return this.authService.signInAuth0(req.user);
  }
}
