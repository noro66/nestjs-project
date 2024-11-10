import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  // Req,
  // Res,
} from '@nestjs/common';
import { createNewProductDto } from './dtos/create-products.dto';
// import { NotFoundError } from 'rxjs';
import { UpdateProductDto } from './dtos/update-products.dto';
// import { Request, Response } from 'express';
type ProductType = { id: number; title: string; price: number };

@Controller('/api/products')
export class ProductsController {
  private products: ProductType[] = [
    { id: 1, title: 'book', price: 10 },
    { id: 2, title: 'pen', price: 105 },
    { id: 3, title: 'laptop', price: 104 },
    { id: 4, title: 'smartphone', price: 140 },
    { id: 5, title: 'tablet', price: 130 },
  ];
  // @Post('express-way')
  // public createNewProductExpressWay(@Req() req: Request, @Res() res: Response) {
  //   const newProduct: ProductType = {
  //     id: this.products.length + 1,
  //     title: req.body.title,
  //     price: req.body.price,
  //   };
  //   this.products.push(newProduct);
  //   res.status(201).json(newProduct);
  // }

  @Post()
  public createNewProduct(@Body() body: createNewProductDto) {
    const newProduct: ProductType = {
      id: this.products.length + 1,
      title: body.title,
      price: body.price,
    };
    this.products.push(newProduct);
    return newProduct;
  }
  @Get()
  public getAllProducts() {
    return this.products;
  }
  @Get('/:id')
  public getProductById(@Param('id', ParseIntPipe) id: number) {
    const product = this.products.find((product) => product.id === id);
    if (!product)
      throw new NotFoundException(
        'product not found !',
        // {
        //   description: 'this is the error desctiption',
        // }
      );
    return product;
  }
  @Put('/:id')
  public updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductDto,
  ) {
    const product = this.products.find((product) => product.id === Number(id));
    if (!product)
      throw new NotFoundException(
        'product not found !',
        // {
        //   description: 'this is the error desctiption',
        // }
      );
    console.log(body);
    return { message: 'product updated successdully with id ' + id };
  }
  @Delete('/:id')
  public deleteProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductDto,
  ) {
    const product = this.products.find((product) => product.id === Number(id));
    if (!product)
      throw new NotFoundException(
        'product not found !',
        // {
        //   description: 'this is the error desctiption',
        // }
      );
    console.log(body);
    return { message: 'product deleted successdully with id ' + id };
  }
}
