import * as z from 'zod';
import { external_id_schema } from './external_id_schema';

export const webhook_events_schema = z.enum([
  'new_bill',
  'updated_bill',
  'bills_ready',
  'intervals_ready',
  'customer_has_filled_credentials',
  'new_unparsed_bill',
  'customer_must_reauthenticate',
]);

export const meters_schema = z.array(
  z
    .object({
      id: z.string(),
      type: z.string(),
      billing_period_from: z.string().pipe(z.coerce.date()).optional(),
      billing_period_to: z.string().pipe(z.coerce.date()).optional(),
      consumption: z.string().pipe(z.coerce.number()) || z.number(),
      tariff: z.string().optional(),
      periods: z
        .array(
          z.object({
            period_from: z.string().pipe(z.coerce.date()),
            period_to: z.string().pipe(z.coerce.date()),
          }),
        )
        .optional(),
    })
    .strip(),
);

export const available_data_schema = z
  .object({
    account_numbers: z.array(
      z.object({
        id: z.string(),
        meters: meters_schema.optional(),
      }),
    ),
  })
  .strip();

export const bill_parsed_schema = z
  .object({
    id: z.number(),
    external_id: external_id_schema.nullable().optional(),
    status: z.enum(['unlocked', 'locked', 'paid']),
    customer_id: z.number(),
    customer_external_id: z.string().nullable(),
    billed_on: z.string(),
    past_due: z.boolean().nullable().optional(),
    outstanding_balance: z.number(),
    billing_period_from: z.string().pipe(z.coerce.date()),
    billing_period_to: z.string().pipe(z.coerce.date()),
    utility: z.string(),
    account_number: z.string() || z.number(),
    electricity_consumption: z.number().nullable(),
    electricity_amount: z.number().nullable().nullable(),
    delivery_charge: z.number().nullable(),
    supply_charge: z.number().nullable(),
    community_solar_bill_credit: z.number().nullable(),
    gas_consumption: z.string().pipe(z.coerce.number()) || z.number().nullable(),
    gas_consumption_unit: z.enum(['therms', 'ccf']),
    gas_amount: z.number(),
    total_amount: z.number(),
    meters: meters_schema,
    file_url: z.string().url(),
  })
  .strip();

export const bill_unparsed_schema = z
  .object({
    external_id: external_id_schema.optional(),
    id: z.number(),
    status: z.string().optional(),
    customer_id: z.number().optional(),
    customer_external_id: z.string().optional(),
    utility: z.string().optional(),
    utility_data_velocity: z.string().optional(),
    file_url: z.string().url().optional(),
  })
  .strip();

export const bill_schema = z.object({
  event: z.enum(['new_bill', 'updated_bill']),
  object: bill_parsed_schema,
});

export const bills_ready_schema = z
  .object({
    event: z.literal('bills_ready'),
    object: z.object({
      id: z.number(),
      external_id: external_id_schema,
      bills_parsed: z.array(bill_parsed_schema).optional(),
      bills_unparsed: z.array(bill_unparsed_schema).optional(),
      available_data: available_data_schema,
    }),
  })
  .strip();

export type bills_readyDTO = z.infer<typeof bills_ready_schema>;

export const intervals_ready_schema = z
  .object({
    event: z.literal('intervals_ready'),
    object: z.object({
      id: z.number(),
      external_id: external_id_schema,
      first_interval_discovered: z.string().datetime({ offset: true }).pipe(z.coerce.date()),
      last_interval_discovered: z.string().datetime({ offset: true }).pipe(z.coerce.date()),
      available_data: available_data_schema,
    }),
  })
  .strip();

export const customer_has_filled_credentials_schema = z
  .object({
    event: z.literal('customer_has_filled_credentials'),
    object: z.object({
      id: z.number(),
      external_id: z.string(),
      utility: z.string(),
      utility_data_velocity: z.string(),
      has_filled_credentials: z.boolean(),
      has_filled_credentials_on: z.string().datetime({ offset: true }).pipe(z.coerce.date()),
    }),
  })
  .strip();

export const new_unparsed_bill_schema = z.object({
  event: z.literal('new_unparsed_bill'),
  object: z.object({
    external_id: external_id_schema,
    id: z.number(),
    status: z.string(),
    customer_id: z.number(),
    customer_external_id: z.string(),
    utility: z.string(),
    utility_data_velocity: z.string(),
    file_url: z.string().url(),
  }),
});

export const customer_must_reauthenticate_schema = z.object({
  event: z.literal('customer_must_reauthenticate'),
  object: z.object({
    id: z.number(),
    external_id: external_id_schema,
    reason: z.string(),
    onboarding_token: z.string(),
    onboarding_link: z.string().url(),
  }),
});

export const bayou_webhook_schema = z.union([
  bill_schema,
  bills_ready_schema,
  intervals_ready_schema,
  customer_has_filled_credentials_schema,
  new_unparsed_bill_schema,
  customer_must_reauthenticate_schema,
]);

export type BayouWebhookDTO = z.infer<typeof bayou_webhook_schema>;
