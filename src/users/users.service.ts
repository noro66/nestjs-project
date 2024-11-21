import {
  BadGatewayException,
  BadRequestException, ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import RegisterDto from './dtos/rejister.dto';
import { JwtService } from '@nestjs/jwt';
import { AcceTokenType, JWTPayloadType } from '../utils/types';
import { ConfigService } from '@nestjs/config';
import UpdateUserDto from './dtos/update-user.dto';
import { TypeUser } from '../utils/enums';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  /**
   * Create new user
   * @param registerDto data for creating  new user
   * @returns JWT (access token)
   * */
  public async register(registerDto: RegisterDto): Promise<AcceTokenType> {
    const { email, password, username } = registerDto;

    const userFormDb = await this.userRepository.findOne({ where: { email } });
    if (userFormDb) {
      throw new BadGatewayException('user already exist');
    }
    const hashedPassword = await this.hashPassword(password);
    let newUser = this.userRepository.create({
      email,
      username,
      password: hashedPassword,
    });
    newUser = await this.userRepository.save(newUser);
    return this.generateJWT({
      id: newUser.id,
      userType: newUser.userType,
    });
  }

  /**
   * Log In user
   * @param loginDto data for log in  to user account
   * @returns JWT (access token)
   * */
  public async login(loginDto: RegisterDto): Promise<AcceTokenType> {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new BadRequestException('invalid  email or password');

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      throw new BadRequestException('invalid email or password');

    return this.generateJWT({ id: user.id, userType: user.userType });
  }

  /**
   * generate jwt token
   * @param payload JWT payload
   * @returns token
   * */

  /**
   * Get current user (logged-in user)
   * @returns the user  from  the database
   * @param id
   * */
  public async getCurrentUser(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  /**
   * Update User
   * @param id of logged user
   * @param updateUserDto data for updating user
   * @returns updated user  from  the database
   * */
  public async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const { password, username } = updateUserDto;
    const user = await this.userRepository.findOne({ where: { id } });

    user.username = username ?? user.username;
    if (password) {
      user.password = await this.hashPassword(password);
    }
    return this.userRepository.save(user);
  }
  /**
   * delete User
   * @param userId of logged user
   * @param payload JWTPayload
   * @returns a success message
   * */
  public async delete(userId: number, payload: JWTPayloadType){
    const user = await this.getCurrentUser(userId);
    if (user.id === payload?.id || payload?.userType === TypeUser.ADMIN){
      await this.userRepository.remove(user);
      return { message: 'User has been deleted successfully' };
    }
    throw new ForbiddenException('access denied  you are not allowed !');
  }
  /**
   * Get All users
   * @returns list of  users  from  the database
   * */
  public getAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  private async generateJWT(payload: JWTPayloadType): Promise<AcceTokenType> {
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}
