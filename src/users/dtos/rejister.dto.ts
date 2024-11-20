import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class RejisterDto {
  @IsEmail()
  @MaxLength(250)
  @IsNotEmpty()
  email: string;

  @IsString()
  @MaxLength(250)
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @MaxLength(250)
  @IsNotEmpty()
  username: string;
}
