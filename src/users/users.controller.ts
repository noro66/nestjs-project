import { Controller, Get } from '@nestjs/common';
import { UserService } from './users.service';
@Controller('api/users')
export class UsresContorller {
  constructor(private readonly userService: UserService) {}
  @Get()
  public getAllUsers() {
    return this.userService.getAll();
  }
}
