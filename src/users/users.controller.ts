import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import RegisterDto from './dtos/rejister.dto';
import { AuthGuard } from './guards/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { JWTPayloadType } from '../utils/types';
import { UserEntity } from './user.entity';
import { TypeUser } from '../utils/enums';
import { Roles } from './decorators/user-role.decorator';
import { AuthRolesGuard } from './guards/auth-roles.guard';
import UpdateUserDto from './dtos/update-user.dto';

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

  // GET ~api/users
  @Get()
  // @Roles(TypeUser.ADMIN, TypeUser.NORMAL_USER)
  // @UseGuards(AuthRolesGuard)
  public getAllUsers(): Promise<UserEntity[]> {
    return this.userService.getAll();
  }

  //@Put ~api/users/:id
  @Put()
  @Roles(TypeUser.ADMIN, TypeUser.NORMAL_USER)
  @UseGuards(AuthRolesGuard)
  public updateUser(
    @CurrentUser() payload: JWTPayloadType,
    @Body() body: UpdateUserDto,
  ) {
    return this.userService.updateUser(payload.id, body);
  }

  @Delete('/:id')
  @Roles(TypeUser.ADMIN, TypeUser.NORMAL_USER)
  @UseGuards(AuthRolesGuard)
  public deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() payload: JWTPayloadType,
  ) {
    return this.userService.delete(id, payload);
  }
}
