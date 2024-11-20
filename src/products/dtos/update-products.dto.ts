import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min, MinLength,
} from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  // @MinLength(2)
  // @MaxLength(150)
  @IsOptional()
  @Length(2, 150)
  title?: string;

  @IsString()
  @IsOptional()
  @MinLength(5)
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'price should not be less than zero !' })
  @IsOptional()
  price?: number;
}
