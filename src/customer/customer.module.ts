import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerRepository } from './customer.repository';
import { CustomerService } from './customer.service';
import { DatabaseModule } from 'src/database/database.module';
import { Customer, CustomerSchema } from './model/customer.schema';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    DatabaseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
    MailModule,
  ],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository],
  exports: [CustomerRepository, CustomerService],
})
export class CustomerModule {}
