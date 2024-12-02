import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryModule } from 'src/category/category.module';
import { ProductModule } from 'src/product/product.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CustomerModule } from './customer/customer.module';
import { Cart } from './cart/model/cart.schema';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { CheckoutModule } from './checkout/checkout.module';
import { MailModule } from './mail/mail.module';
import { ReportModule } from './report/report.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    CategoryModule,
    ProductModule,
    CloudinaryModule,
    CustomerModule,
    CartModule,
    OrderModule,
    CheckoutModule,
    MailModule,
    ReportModule,
    BlogModule,
  ],
})
export class AppModule {}
