import { Image } from './../product/model/product.schema';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Customer } from 'src/customer/model/customer.schema';
import { Order } from 'src/order/model/order.schema';
import Handlebars from 'handlebars';
import { FeedbackDto } from './dto/feeback.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async placeOrder(order: Order, customer: Customer) {
    Handlebars.registerHelper('formatNumber', function (number) {
      return new Intl.NumberFormat('de-DE').format(number);
    });
    const image = {
      src: 'https://res-console.cloudinary.com/dbvlf8qv0/thumbnails/v1/image/upload/v1729248809/aGpubm9ucTNiOW92N3Q1Mnphc3c=/preview',
    };
    await this.mailerService.sendMail({
      to: order.email, // list of receivers
      from: 'phanhuuluan2003@gmail.com', // sender address
      subject: 'Thanh toán hoá đơn thành công ✔', // Subject line
      template: 'place-order', // plaintext body
      context: {
        orderId: order._id, // dữ liệu để truyền vào template
        date: order.created_at,
        image: image,
        customer: {
          name: customer.name,
          address: order.address,
          phone_number: order.phone_number,
        },
        items: order.order_detail,
        total: order.total,
      },
    });
  }

  async forgotPassword(email: string, url: string) {
    await this.mailerService.sendMail({
      to: email, // list of receivers
      from: 'phanhuuluan2003@gmail.com', // sender address
      subject: 'Thay đổi mật khẩu của bạn', // Subject line
      template: 'forgot-password', // plaintext body
      context: {
        url: url,
      },
    });
  }
  async feedBack(feedback: FeedbackDto) {
    await this.mailerService.sendMail({
      to: feedback.email, // list of receivers
      from: 'phanhuuluan2003@gmail.com', // sender address
      subject: 'Phản hồi khách hàng', // Subject line
      template: 'feedbacks', // plaintext body
      context: {
        email: feedback.email,
        phone_number: feedback.phone_number,
        name: feedback.name,
        message: feedback.message,
      },
    });
  }
}
