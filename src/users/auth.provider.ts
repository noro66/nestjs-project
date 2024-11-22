import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import RegisterDto from './dtos/rejister.dto';
import { AcceTokenType, JWTPayloadType } from '../utils/types';
import { BadGatewayException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

export class AuthProvider {
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
  public async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
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
}