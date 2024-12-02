import { Module } from '@nestjs/common';
import { report } from 'process';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { Order } from 'src/order/model/order.schema';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [OrderModule],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [],
})
export class ReportModule {}
