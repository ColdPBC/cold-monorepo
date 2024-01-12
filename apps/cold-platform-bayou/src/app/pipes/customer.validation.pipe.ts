import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BaseWorker } from '@coldpbc/nest';
import { BayouWebhookValidationPipe } from './webhook.validation.pipe';
import { bayou_customer_payload_schema } from '../schemas/bayou.customer.schema';

export class BayouCustomerPayloadValidationPipe extends BaseWorker implements PipeTransform {
  constructor(private method?: 'POST' | 'PATCH' | 'PUT' | 'GET' | 'DELETE') {
    super(BayouWebhookValidationPipe.name);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validateMethod() {
    if (!this.method || this.method !== 'POST') {
      throw new BadRequestException('Method not provided');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(value: any) {
    try {
      return bayou_customer_payload_schema.parse(value);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.name === 'ZodError') {
        this.logger.error('received invalid customer payload', { issues: error.issues, payload: value });
        throw new BadRequestException({ message: 'payload validation failed', issues: error.issues, payload: value });
      }

      throw new BadRequestException(error);
    }
  }
}
