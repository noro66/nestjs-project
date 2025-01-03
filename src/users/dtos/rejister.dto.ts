import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString, Length,
  MaxLength,
} from 'class-validator';

export default class RegisterDto {
  @IsEmail()
  @MaxLength(250)
  @IsNotEmpty()
  email: string;

  @IsString()
  @MaxLength(250)
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @Length(2, 150)
  @IsNotEmpty()
  username: string;
}
