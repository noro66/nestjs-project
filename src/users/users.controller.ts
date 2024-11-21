import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Headers, UseGuards, Req,
} from '@nestjs/common';
import { UserService } from './users.service';
import RegisterDto from './dtos/rejister.dto';
import { AuthGuard } from './auth.guard';
import { CURRENT_USER_KEY } from '../utils/constants';
import { CurrentUser } from '../decorators/current-user.decorator';
import { JWTPayloadType } from '../utils/types';
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}
  // @Get()
  // public getAllUsers() {
  //   return this.userService.getAll();
  // }

  // POST ~api/users/auth/register
  @Post('auth/register')
  public register(@Body() body: RegisterDto) {
    return this.userService.register(body);
  }

  // POST ~api/users/auth/login
  @Post('auth/login')
  @HttpCode(HttpStatus.OK) //200
  public login(@Body() body: RegisterDto) {
    return this.userService.login(body);
  }

  // GET ~api/users/auth/current-user
  @UseGuards(AuthGuard)
  @Get('auth/current-user')
  public async getCurrentUser(@CurrentUser() payload: JWTPayloadType) {
    return this.userService.getCurrentUser(payload.id);
    // return this.userService.getCurrentUser();
  }
}
