import * as zod from 'zod';
import { EnergyUnitsSchema } from '../enums/unit.enums';

export const rabbitRequestSchema = zod.object({
	emission_factor: zod.object({
		activity_id: zod.string(),
		data_version: zod.string().optional(),
		region: zod.string().optional(),
		year: zod.number().optional(),
		source_lca_activity: zod.string().optional(),
		source: zod.string().optional(),
	}),
	parameters: zod.object({
		energy: zod.number(),
		energy_unit: EnergyUnitsSchema,
	}),
});

export const EnergyResponsePayloadSchema = zod.object({
	emission_factor: zod.object({
		activity_id: zod.string(),
		data_version: zod.string(),
		region: zod.string(),
	}),
	parameters: zod.object({
		energy: zod.number(),
		energy_unit: EnergyUnitsSchema,
	}),
});
