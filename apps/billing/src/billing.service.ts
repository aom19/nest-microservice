import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class BillingService {
  //specific logger
  private readonly logger = new Logger(BillingService.name);
  getHello(): string {
    return 'Hello World!';
  }

  bill(data: any) {
    this.logger.log('Billing...', data);
  }
}
