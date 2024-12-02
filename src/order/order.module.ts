import { Module } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { DatabaseModule } from 'src/database/database.module';
import { Order, OrderSchema } from './model/order.schema';
import { OrderDetail, OrderDetailSchema } from './model/order-detail.schema';

@Module({
  imports: [
    DatabaseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: OrderDetail.name, schema: OrderDetailSchema },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderRepository, OrderService],
  exports: [OrderService, OrderRepository],
})
export class OrderModule {}
