import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import LoginPayload from './dto/login';
import { UsersService } from 'src/users/users.service';
import { verifyPassword } from 'src/utils/auth';
import SignupPayload from './dto/signup';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async login(payload: LoginPayload) {
    const { email, password } = payload;
    const user = await this.userService.findByEmail(email);
    if (user?.email && (await verifyPassword(password, user.password))) {
      const access_token = await this.jwtService.signAsync(
        { email },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '1h',
        },
      );
      return {
        access_token,
      };
    } else throw new UnauthorizedException();
  }

  async signup(payload: SignupPayload) {
    const existingUser = await this.userService.getProfileByEmail(
      payload.email,
    );
    if (existingUser) {
      throw new BadRequestException(
        `User with ${payload.email} already exists. Please try logging in.`,
      );
    }

    const user = await this.userService.createUser(payload);
    const access_token = await this.generateToken({
      email: user.email,
      id: user.id,
    });
    return {
      access_token,
    };
  }

  async getProfile(request: Request) {
    const profile = await this.userService.getProfileByEmail(
      request['user'].email,
    );
    if (profile) {
      delete profile['password'];
      return profile;
    } else throw new NotFoundException();
  }

  private async generateToken(payload: { email: string; id: string }) {
    return await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });
  }

  async verifyToken(jwtToken: string) {
    return await this.jwtService.verifyAsync(jwtToken, {
      secret: process.env.JWT_SECRET,
    });
  }
}
