import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
  // Req,
  // Res,
} from '@nestjs/common';
import { createNewProductDto } from './dtos/create-products.dto';
// import { NotFoundError } from 'rxjs';
import { UpdateProductDto } from './dtos/update-products.dto';
import { ProductService } from './products.service';
// import { Request, Response } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

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
  public createNewProduct(
    @Body(new ValidationPipe())
    body: createNewProductDto,
  ) {
    return this.productService.createNewProduct(body);
  }

  @Get()
  public getAllProducts() {
    return this.productService.getAllProducts();
  }
  @Get('/:id')
  public getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getProductById(id);
  }
  @Put('/:id')
  public updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) body: UpdateProductDto,
  ) {
    return this.productService.updateProduct(id, body);
  }
  @Delete('/:id')
  public deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProduct(id);
  }
}

// function getAllProducts() {
//   throw new Error('Function not implemented.');
// }
