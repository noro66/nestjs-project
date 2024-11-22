import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put, UseGuards,
  ValidationPipe,
  // Req,
  // Res,
} from '@nestjs/common';
import { createNewProductDto } from './dtos/create-products.dto';
// import { NotFoundError } from 'rxjs';
import { UpdateProductDto } from './dtos/update-products.dto';
import { ProductService } from './products.service';
import { AuthGuard } from '../users/guards/auth.guard';
import { TypeUser } from '../utils/enums';
import { Roles } from '../users/decorators/user-role.decorator';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { JWTPayloadType } from '../utils/types';
import { AuthRolesGuard } from '../users/guards/auth-roles.guard';
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
  @Roles(TypeUser.ADMIN)
  @UseGuards(AuthRolesGuard)
  public createNewProduct(
    @Body(new ValidationPipe())
    body: createNewProductDto,
    @CurrentUser() payload: JWTPayloadType,
  ) {
    return this.productService.createNewProduct(body, payload.id);
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
  @Roles(TypeUser.ADMIN)
  @UseGuards(AuthRolesGuard)
  public updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) body: UpdateProductDto,
  ) {
    return this.productService.updateProduct(id, body);
  }

  @Delete('/:id')
  @Roles(TypeUser.ADMIN)
  @UseGuards(AuthRolesGuard)
  public deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProduct(id);
  }
}
