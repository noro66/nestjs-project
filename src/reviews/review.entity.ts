import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { CURRENT_TIMESTAMP } from '../utils/constants';
import { ProductEntity } from '../products/product.entity';
import { UserEntity } from '../users/user.entity';

@Entity({ name: 'reviews' })
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'int' })
  rating: number;
  @Column()
  comment: string;

  @ManyToOne(() => ProductEntity, (product) => product.reviews)
  product: ProductEntity;

  @CreateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => CURRENT_TIMESTAMP,
    onUpdate: CURRENT_TIMESTAMP,
  })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.reviews)
  user: UserEntity;
}
