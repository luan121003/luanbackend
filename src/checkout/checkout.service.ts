import { Customer } from './../customer/model/customer.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CartService } from 'src/cart/cart.service';
import { MailService } from 'src/mail/mail.service';
import { OrderService } from 'src/order/order.service';
import { ProductService } from 'src/product/product.service';
import { CheckoutDto } from './dto/checkout.dto';
import { CustomerService } from 'src/customer/customer.service';

@Injectable()
export class CheckoutService {
  constructor(
    private readonly cartService: CartService,
    private readonly orderService: OrderService,
    private readonly productService: ProductService,
    private readonly mailService: MailService,
    private readonly customerService: CustomerService,
  ) {}

  async placeorder(customer_id: string, checkout: CheckoutDto) {
    const carts = await this.cartService.findByCustomer(customer_id);

    carts.forEach(async (item: any) => {
      const product = await this.productService.findById(item.product_id._id);
      if (item.quantity > product.stock) {
        throw new BadRequestException('Sản phẩm không đủ để thanh toán');
      }
    });

    const order = await this.orderService.create(customer_id, carts, checkout);

    carts.forEach(async (item: any) => {
      await this.productService.updateStock(
        item.product_id._id,
        -item.quantity,
      );
    });

    await this.cartService.deleteCartCustomer(customer_id);

    const customer = await this.customerService.findById(customer_id);

    await this.mailService.placeOrder(order, customer);

    return order;
  }
}
