import { z } from 'zod';

export const MqttTargetSchema = z.enum(['public', 'cold', 'ui', 'replyTo']);
export const MqttActionSchema = z.enum(['get', 'create', 'update', 'delete']);
export const MqttStatusSchema = z.enum(['complete', 'failed', 'active', 'queued', 'delayed', 'stalled']);
export const MqttEventSchema = z.enum(['classify-file', 'extract-file-data', 'vectorize-file']);

export const MqttResourceSchema = z.enum([
	'actions',
	'action_templates',
	'attribute_assurances',
	'category_data',
	'category_definitions',
	'compliance_definitions',
	'compliance_question_dependency_chains',
	'compliance_questions',
	'compliance_section_dependency_chains',
	'compliance_section_groups',
	'compliance_sections',
	'component_definitions',
	'emission_scopes',
	'emissions',
	'facility_footprints',
	'integrations',
	'material_suppliers',
	'materials',
	'news',
	'organization_compliance',
	'organization_compliance_ai_response_files',
	'organization_compliance_ai_responses',
	'organization_compliance_note_files',
	'organization_compliance_notes',
	'organization_compliance_question_bookmarks',
	'organization_compliance_responses',
	'organization_compliance_statuses',
	'organization_facilities',
	'organization_files',
	'import_files',
	'organizations',
	'policy_data',
	'policy_definitions',
	'product_materials',
	'products',
	'service_definitions',
	'supported_utilities',
	'survey_data',
	'survey_definitions',
	'survey_status',
	'sustainability_attributes',
	'utility_bills',
	'vector_records',
]);

export const MqttBasePayloadSchema = z
	.object({
		action: MqttActionSchema,
		status: MqttStatusSchema,
		event: MqttEventSchema.optional(),
		resource: MqttResourceSchema.optional(),
		data: z.any().optional(),
	})
	.strip();

export const MqttSocketAPIPayloadSchema = MqttBasePayloadSchema.extend({
	reply_to: z.string().optional(),
	compliance_set_name: z.string(),
	user: z.object({
		coldclimate_claims: z.object({
			email: z.string().email(),
			roles: z.array(z.string()),
		}),
	}),
	token: z.string(),
	resource: z.string().optional(),
	method: z.enum(['get', 'post', 'put', 'delete', 'patch']).optional(),
	org_id: z.string().startsWith('org_'),
}).strip();

export const MqttUIPayloadSchema = MqttBasePayloadSchema.extend({
	swr_key: z.string(),
	org_id: z.string(),
	user: z.any(),
}).strip();

export const MqttAPIComplianceSectionPayloadSchema = MqttSocketAPIPayloadSchema.extend({
	compliance_section_group_id: z.string().startsWith('csg_'),
	compliance_section_id: z.string().startsWith('cs_').optional(),
});

export type MqttAPIComplianceSectionPayload = z.infer<typeof MqttAPIComplianceSectionPayloadSchema>;
export type MqttSocketAPIPayload = z.infer<typeof MqttSocketAPIPayloadSchema>;
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
