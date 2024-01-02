import { BadRequestException, PipeTransform, UnprocessableEntityException } from '@nestjs/common';
import { BaseWorker } from '@coldpbc/nest';
import {
  bill_schema,
  bills_ready_schema,
  customer_has_filled_credentials_schema,
  customer_must_reauthenticate_schema,
  intervals_ready_schema,
  new_unparsed_bill_schema,
} from '../schemas/bayou.webhook.schema';

export class BayouValidationPipe extends BaseWorker implements PipeTransform {
  constructor(private method?: 'POST' | 'PATCH' | 'PUT' | 'GET' | 'DELETE') {
    super(BayouValidationPipe.name);
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
      switch (value.event) {
        case 'updated_bill':
        case 'new_bill':
          return bill_schema.parse(value);
        case 'bills_ready':
          return bills_ready_schema.parse(value);
        case 'intervals_ready':
          return intervals_ready_schema.parse(value);
        case 'customer_has_filled_credentials':
          return customer_has_filled_credentials_schema.parse(value);
        case 'new_unparsed_bill':
          return new_unparsed_bill_schema.parse(value);
        case 'customer_must_reauthenticate':
          return customer_must_reauthenticate_schema.parse(value);
        default:
          throw new UnprocessableEntityException('Invalid event');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('received invalid webook payload', { ...JSON.parse(error.message), payload: value });
      throw new BadRequestException(JSON.parse(error.message));
    }
  }
}
