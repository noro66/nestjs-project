import { Injectable, NotFoundException } from '@nestjs/common';
import { createNewProductDto } from './dtos/create-products.dto';
import { UpdateProductDto } from './dtos/update-products.dto';

type ProductType = { id: number; title: string; price: number };
@Injectable()
export class ProductService {
  private products: ProductType[] = [
    { id: 1, title: 'book', price: 10 },
    { id: 2, title: 'pen', price: 105 },
    { id: 3, title: 'laptop', price: 104 },
    { id: 4, title: 'smartphone', price: 140 },
    { id: 5, title: 'tablet', price: 130 },
  ];

  /**
   * create new product
   */
  public createNewProduct({ title, price }: createNewProductDto) {
    const newProduct: ProductType = {
      id: this.products.length + 1,
      title,
      price,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  /**
   * get All products
   */
  public getAllProducts() {
    return this.products;
  }

  /**
   * get single product by id
   */
  public getProductById(id: number) {
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

  /**
   * update product
   *
   */
  public updateProduct(id: number, UpdateProductDto: UpdateProductDto) {
    const product = this.products.find((product) => product.id === Number(id));
    if (!product)
      throw new NotFoundException(
        'product not found !',
        // {
        //   description: 'this is the error desctiption',
        // }
      );
    console.log(UpdateProductDto);
    return { message: 'product updated successdully with id ' + id };
  }

  /**
   * delete product
   *
   */
  public deleteProduct(id: number) {
    const product = this.products.find((product) => product.id === Number(id));
    if (!product)
      throw new NotFoundException(
        'product not found !',
        // {
        //   description: 'this is the error desctiption',
        // }
      );
    return { message: 'product deleted successdully with id ' + id };
  }
}
