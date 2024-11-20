import { Module } from '@nestjs/common';
import { UsresContorller } from './users.controller';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from '../reviews/review.entity';
import { UserEntity } from './user.entity';

@Module({
  controllers: [UsresContorller],
  providers: [UserService],
  exports: [UserService],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UsersModule {}
