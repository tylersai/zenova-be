import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginPayload from './dto/login';
import SignupPayload from './dto/signup';
import { Request } from 'express';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() payload: LoginPayload) {
    return this.authService.login(payload);
  }

  @Post('signup')
  async signup(@Body() payload: SignupPayload) {
    return this.authService.signup(payload);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Req() request: Request) {
    return this.authService.getProfile(request);
  }
}
