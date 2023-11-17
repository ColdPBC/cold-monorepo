import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodObject } from 'zod';
import { BaseWorker } from 'nest';

export class ResourceValidationPipe extends BaseWorker implements PipeTransform {
  constructor(private schema: ZodObject<any>, private method?: 'POST' | 'PATCH' | 'PUT') {
    super(ResourceValidationPipe.name);
  }

  stripDates(value: any) {
    if (value.updated_at) {
      delete value.updated_at;
    }

    if (value.created_at) {
      delete value.created_at;
    }
  }

  stripId(value: any) {
    if (value.id) {
      delete value.id;
    }
  }

  transform(value: any) {
    try {
      this.stripId(value);
      this.stripDates(value);

      switch (this.method) {
        case 'POST':
          this.schema = this.schema.omit({ id: true, created_at: true, updated_at: true });
          this.schema.parse(value);
          break;
        case 'PATCH':
          this.schema = this.schema.partial().omit({ id: true, created_at: true, updated_at: true });
          this.schema.parse(value);
          break;
        case 'PUT':
          this.schema = this.schema.partial().omit({ id: true, created_at: true, updated_at: true });
          if (value) {
            this.schema.parse(value);
          }
          break;
      }

      return value;
    } catch (error) {
      console.error('error', error);
      throw new BadRequestException(error.message);
    }
  }
}
