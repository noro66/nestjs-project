import { Injectable, NotFoundException } from '@nestjs/common';
import { createNewProductDto } from './dtos/create-products.dto';
import { UpdateProductDto } from './dtos/update-products.dto';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../users/users.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly userService: UserService,
  ) {}
  /**
   * create new product
   * @param dto data for creating new product
   * @param userId id for the logged user (Admin)
   * @returns Promise<ProductEntity> created product from the database
   */
  public async createNewProduct(dto: createNewProductDto, userId: number) {
    const user = await this.userService.getCurrentUser(userId);
    const newProduct = this.productRepository.create({
      ...dto,
      title: dto.title.toLowerCase(),
      user,
    });
    return this.productRepository.save(newProduct);
  }

  /**
   * get All products
   * @returns collection of products
   */
  public getAllProducts() {
    return this.productRepository.find();
  }

  /**
   * get single product by id
   * @param id of the product
   * @returns product with the id provided from the database
   */
  public async getProductById(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
    });
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
   *@param id of the product
   * @returns the product updated
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
   *  @param id of the product to delete
   * @returns success message
   */
  public async deleteProduct(id: number) {
    const product = await this.getProductById(id);
    await this.productRepository.remove(product);
    return { message: 'product delted successfully' };
  }
}
