import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CURRENT_TIMESTAMP } from '../utils/constants';
import { ReviewEntity } from '../reviews/review.entity';
import { UserEntity } from '../users/user.entity';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '150' })
  title: string;

  @Column()
  description: string;

  @Column({ type: 'float' })
  price: number;

  @ManyToOne(() => UserEntity, (user) => user.products, { eager: true })
  user: UserEntity;

  @OneToMany(() => ReviewEntity, (review) => review.product, { eager: true })
  reviews: ReviewEntity[];

  @CreateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => CURRENT_TIMESTAMP,
    onUpdate: CURRENT_TIMESTAMP,
  })
  updatedAt: Date;
}
