import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const jwtToken = this.getTokenFromHeader(request);
    if (!jwtToken) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.authService.verifyToken(jwtToken);
      request['user'] = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  private getTokenFromHeader(request: Request): string | undefined {
    const arr = request.headers.authorization?.split(' ') || [];
    if (arr.length !== 2) {
      return undefined;
    }
    const [tokenType, accessToken] = arr;
    return tokenType === 'Bearer' ? accessToken : undefined;
  }
}
