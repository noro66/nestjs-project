import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString, Length,
  MaxLength, MinLength,
} from 'class-validator';

export default class UpdateUserDto {

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @IsOptional()
  password?: string;

  @IsOptional()
  @IsString()
  @Length(2, 150)
  username?: string;
}
