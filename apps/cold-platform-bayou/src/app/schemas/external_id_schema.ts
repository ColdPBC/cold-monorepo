import { z } from 'zod';

export const external_id_schema = z.string().refine(val => val.startsWith('org_'), { message: 'invalid external_id' });
