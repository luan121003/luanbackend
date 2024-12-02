import { Controller, Get, Param } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('reports')
export class ReportController {
  constructor(private readonly service: ReportService) {}

  @Get(':period')
  getReport(@Param('period') period: string) {
    return this.service.getReport(period);
  }
}
