import { Controller, Get } from '@nestjs/common';

@Controller()
export class UsresContorller {
  @Get('api/users')
  public getAllUsers() {
    return [
      { id: 1, name: 'osama' },
      { id: 2, name: 'osama' },
      { id: 3, name: 'osama' },
      { id: 4, name: 'osama' },
      { id: 5, name: 'osama' },
    ];
  }
}
