import { z } from 'zod';

export const MqttTargetSchema = z.enum(['public', 'cold', 'ui']);
export const MqttActionSchema = z.enum(['create', 'update', 'delete']);
export const MqttStatusSchema = z.enum(['complete', 'failed', 'active', 'queued', 'delayed', 'stalled']);

export const MqttBasePayloadSchema = z
  .object({
    swr_key: z.string(),
    action: MqttActionSchema,
    status: MqttStatusSchema,
    data: z.any().optional(),
  })
  .strip();

export const MqttUIPayloadSchema = MqttBasePayloadSchema.extend({
  org_id: z.string(),
  user: z.union([z.string().email(), z.record(z.unknown())]),
}).strip();

export type MqttTarget = z.infer<typeof MqttTargetSchema>;
export type MqttSystemPayload = z.infer<typeof MqttBasePayloadSchema>;
export type MqttBasePayload = z.infer<typeof MqttBasePayloadSchema>;
export type MqttUIPayload = z.infer<typeof MqttUIPayloadSchema>;

export class MqttValidatorService {
  target: MqttTarget | undefined;
  payload: MqttUIPayload | MqttBasePayload | undefined;

  constructor(target?: MqttTarget, payload?: MqttUIPayload | MqttBasePayload) {
    if (target) {
      this.target = this.validateTarget(target);
      if (payload) {
        switch (target) {
          case 'ui':
            this.payload = this.validateUIPayload(payload);
            break;
          default:
            this.payload = this.validateBasePayload(payload);
        }
      }
    }
  }

  validateUIPayload(payload: any) {
    return MqttUIPayloadSchema.parse(payload);
  }

  validateBasePayload(payload: any) {
    return MqttBasePayloadSchema.parse(payload);
  }

  validateTarget(value: string) {
    return z.enum(['public', 'cold', 'ui']).parse(value);
  }
}
