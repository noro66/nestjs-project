import { Injectable, NotFoundException } from '@nestjs/common';
import { createNewProductDto } from './dtos/create-products.dto';
import { UpdateProductDto } from './dtos/update-products.dto';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}
  /**
   * create new product
   */
  public async createNewProduct(dto: createNewProductDto) {
    const newProduct = this.productRepository.create(dto);
    return await this.productRepository.save(newProduct);
  }

  /**
   * get All products
   */
  public getAllProducts() {
    return this.productRepository.find();
  }

  /**
   * get single product by id
   */
  public async getProductById(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
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
  public async updateProduct(id: number, UpdateProductDto: UpdateProductDto) {
    const product = await this.getProductById(id);
    product.title = UpdateProductDto.title ?? product.title;
    product.description = UpdateProductDto.description ?? product.description;
    product.price = UpdateProductDto.price ?? product.price;

    return this.productRepository.save(product);
  }

  /**
   * delete product
   *
   */
  public async deleteProduct(id: number) {
    const product = await this.getProductById(id);
    await this.productRepository.remove(product);
    return { message: 'product delted successfully' };
  }
}
