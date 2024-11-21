import {
  BadGatewayException,
  BadRequestException,
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
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
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
  private async generateJWT(payload: JWTPayloadType): Promise<AcceTokenType> {
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }

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
}
