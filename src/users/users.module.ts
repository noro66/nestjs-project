import { Module } from '@nestjs/common';
import { UsresContorller } from './users.controller';

@Module({
  controllers: [UsresContorller],
})
export class UsersModule {}
