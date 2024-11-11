import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
  // MaxLength,
  // MinLength,
} from 'class-validator';

export class createNewProductDto {
  @IsString()
  @IsNotEmpty()
  // @MinLength(2)
  // @MaxLength(150)
  @Length(2, 150)
  title: string;
  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'price should not be less than zero !' })
  price: number;
}
