import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { DatabaseModule } from 'src/database/database.module';
import { Cart, CartSchema } from './model/cart.schema';
import { CartRepository } from './cart.repository';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    ProductModule,
  ],
  controllers: [CartController],
  providers: [CartRepository, CartService],
  exports: [CartService],
})
export class CartModule {}
