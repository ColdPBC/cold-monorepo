import { organizations } from '@prisma/client';
import { IAuthenticatedUser } from '../../primitives';
import { PrismaService } from '../../prisma/prisma.service';
import { FilteringService } from '../filtering/filtering.service';
import { ScoringService } from './scoring.service';

// Exercise scoring and validation without starting tracing or metrics clients.
jest.mock('../../worker', () => ({
	BaseWorker: class {
		logger = { warn: jest.fn(), error: jest.fn(), info: jest.fn() };
	},
}));

type AnswerCase = { label: string; component: string; value: unknown; aiAnswer: unknown; scoreMap: Record<string, number> };

describe('Compliance answer precedence', () => {
	let service: ScoringService;
	const org = {} as organizations;
	const user = {} as IAuthenticatedUser;

	beforeEach(() => {
		const prisma = {} as PrismaService;
		service = new ScoringService(new FilteringService(prisma), prisma);
	});

	const question = (component: string, orgResponse: unknown, aiAnswer: unknown, scoreMap: Record<string, number>) => ({
		id: 'question_one',
		component,
		rubric: { max_score: 4, score_map: scoreMap },
		compliance_responses: [{ org_response: orgResponse, ai_response: { answer: aiAnswer } }],
	});

	it.each<AnswerCase>([
		{ label: 'false', component: 'yes_no', value: false, aiAnswer: true, scoreMap: { false: 0, true: 4 } },
		{ label: 'false array', component: 'yes_no', value: [false], aiAnswer: true, scoreMap: { false: 0, true: 4 } },
		{ label: 'false string', component: 'yes_no', value: 'false', aiAnswer: true, scoreMap: { false: 0, true: 4 } },
		{ label: 'numeric zero', component: 'number', value: 0, aiAnswer: 1, scoreMap: { 0: 0, 1: 4 } },
		{ label: 'numeric zero array', component: 'number', value: [0], aiAnswer: 1, scoreMap: { 0: 0, 1: 4 } },
		{ label: 'zero-scoring text', component: 'text', value: 'none', aiAnswer: 'best', scoreMap: { none: 0, best: 4 } },
		{ label: 'valid unmapped text', component: 'text', value: 'other', aiAnswer: 'best', scoreMap: { none: 0, best: 4 } },
	])('keeps the human $label answer instead of awarding AI points', async ({ component, value, aiAnswer, scoreMap }) => {
		const input = question(component, { value }, aiAnswer, scoreMap);
		const result = await service.scoreQuestion(input, org, user, { responses: true });

		expect(result).toMatchObject({ score: 0, ai_score: 0, max_score: 4, counts: { org_answered: 1, ai_answered: 0, progress: 100 } });
		// Validating an answer must not normalize the returned scalar into an array.
		expect(input.compliance_responses[0].org_response).toEqual({ value });
	});

	it.each<AnswerCase & { expectedScore: number }>([
		{ label: 'positive human score', component: 'yes_no', value: true, aiAnswer: false, scoreMap: { false: 0, true: 4 }, expectedScore: 4 },
		{ label: 'capped human score', component: 'number', value: 2, aiAnswer: 1, scoreMap: { 1: 3, 2: 9 }, expectedScore: 4 },
		{ label: 'partial human score', component: 'text', value: 'good', aiAnswer: 'best', scoreMap: { good: 2, best: 4 }, expectedScore: 2 },
	])('preserves the $label', async ({ component, value, aiAnswer, scoreMap, expectedScore }) => {
		const input = question(component, { value }, aiAnswer, scoreMap);
		expect(await service.scoreQuestion(input, org, user, { responses: true })).toMatchObject({ score: expectedScore, ai_score: 0, max_score: 4 });
		expect(input.compliance_responses[0].org_response).toEqual({ value });
	});

	it.each([
		{ label: 'absent response', orgResponse: undefined },
		{ label: 'null response', orgResponse: null },
		{ label: 'absent value', orgResponse: {} },
		{ label: 'null value', orgResponse: { value: null } },
		{ label: 'undefined value', orgResponse: { value: undefined } },
		{ label: 'empty string', orgResponse: { value: '' } },
		{ label: 'empty array', orgResponse: { value: [] } },
	])('retains AI fallback for a human $label', async ({ orgResponse }) => {
		const input = question('yes_no', orgResponse, true, { false: 0, true: 4 });
		expect(await service.scoreQuestion(input, org, user)).toMatchObject({ score: 0, ai_score: 4, max_score: 4 });
	});

	it('keeps zero scores when both answers are absent', async () => {
		const input = question('yes_no', undefined, undefined, { false: 0, true: 4 });
		expect(await service.scoreQuestion(input, org, user)).toMatchObject({ score: 0, ai_score: 0, max_score: 4 });
	});

	it('retains the AI maximum-score cap', async () => {
		const input = question('number', undefined, 2, { 1: 3, 2: 9 });
		expect(await service.scoreQuestion(input, org, user)).toMatchObject({ score: 0, ai_score: 4, max_score: 4 });
	});

	it.each(['select', 'multi_select'])('preserves zero-scoring human %s answers', async component => {
		const input = question(component, { value: ['none'] }, ['best'], { none: 0, best: 4 });
		expect(await service.scoreQuestion(input, org, user)).toMatchObject({ score: 0, ai_score: 0, max_score: 4 });
	});

	it('preserves multi-select summing and capping', async () => {
		const input = question('multi_select', { value: ['good', 'best'] }, ['none'], { none: 0, good: 2, best: 4 });
		expect(await service.scoreQuestion(input, org, user)).toMatchObject({ score: 4, ai_score: 0, max_score: 4 });
	});

	it('preserves multi-select AI fallback for an empty human selection', async () => {
		const input = question('multi_select', { value: [] }, ['good', 'best'], { good: 2, best: 4 });
		expect(await service.scoreQuestion(input, org, user)).toMatchObject({ score: 0, ai_score: 4, max_score: 4 });
	});

	it('does not add overridden AI points to section, group or compliance estimates', async () => {
		const input = {
			compliance_section_groups: [
				{
					compliance_sections: [
						{
							compliance_questions: [
								question('yes_no', { value: false }, true, { false: 0, true: 4 }),
								question('yes_no', { value: true }, true, { false: 0, true: 4 }),
								question('yes_no', undefined, true, { false: 0, true: 4 }),
							],
						},
					],
				},
			],
		};
		const result = await service.scoreComplianceResponse(input, org, user);

		expect(result).toMatchObject({ score: 4, ai_score: 4, estimated_score: 8, max_score: 12 });
		expect(result.compliance_section_groups[0]).toMatchObject({ score: 4, ai_score: 4, estimated_score: 8, max_score: 12 });
		expect(result.compliance_section_groups[0].compliance_sections[0]).toMatchObject({ score: 4, ai_score: 4, estimated_score: 8, max_score: 12 });
	});

	it('retains corrected scores in the counts-only response projection', async () => {
		const input = question('yes_no', { value: false }, true, { false: 0, true: 4 });
		const result = await service.scoreQuestion(input, org, user, { onlyCounts: true });
		expect(result).toMatchObject({ score: 0, ai_score: 0, max_score: 4, counts: { org_answered: 1, ai_answered: 0 } });
		expect(result).not.toHaveProperty('compliance_responses');
	});
});
