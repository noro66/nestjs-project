import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CURRENT_USER_KEY } from '../../utils/constants';
import { Reflector } from '@nestjs/core';
import { TypeUser } from '../../utils/enums';
import { UserService } from '../users.service';
import { UserEntity } from '../user.entity';
@Injectable()
export class AuthRolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles: TypeUser = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if(!roles && roles.length === 0) return false;
    const request: Request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(' ');
    if (token && type === 'Bearer') {
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: this.config.get<string>('JWT_SECRET'),
        });
        const user: UserEntity = await this.userService.getCurrentUser(payload.id);
        if (!user) return false;
        if (roles.includes(user.userType)){
          request[CURRENT_USER_KEY] = payload;
          return true;
        }
        return false;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        throw new UnauthorizedException('access denied, invalid token');
      }
    } else {
      throw new UnauthorizedException('access denied, invalid token');
    }
  }
}
