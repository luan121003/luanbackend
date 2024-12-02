import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { CartModule } from 'src/cart/cart.module';
import { Product } from 'src/product/model/product.schema';
import { ProductModule } from 'src/product/product.module';
import { OrderModule } from 'src/order/order.module';
import { MailModule } from 'src/mail/mail.module';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports: [CartModule, ProductModule, OrderModule, MailModule, CustomerModule],
  controllers: [CheckoutController],
  providers: [CheckoutService],
  exports: [],
})
export class CheckoutModule {}
