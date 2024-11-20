import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [
    { id: 1, name: 'osama' },
    { id: 2, name: 'osama' },
    { id: 3, name: 'osama' },
    { id: 4, name: 'osama' },
    { id: 5, name: 'osama' },
  ];
  getAll() {
    return this.users;
  }
}
