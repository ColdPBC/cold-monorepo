import { ExecutionContext, INestApplication, UnauthorizedException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CacheService, IAuthenticatedUser, JwtAuthGuard, PrismaService, Role } from '@coldpbc/nest';
import request from 'supertest';
import { FootprintsController } from './footprints.controller';
import { FootprintsService } from './footprints.service';

describe('Facility footprint HTTP routes', () => {
	let app: INestApplication;
	let user: IAuthenticatedUser | undefined;
	const path = '/organizations/org_one/facilities/fac_one/footprints';
	const organizations = [
		{ id: 'org_one', name: 'One' },
		{ id: 'org_two', name: 'Two' },
	];
	const footprints = [
		{ id: 'fp_one', organization_id: 'org_one', facility_id: 'fac_one', type: 'year', value: 2024, emissions: [] },
		{ id: 'fp_other_facility', organization_id: 'org_one', facility_id: 'fac_two', type: 'year', value: 2024, emissions: [] },
		{ id: 'fp_other_org', organization_id: 'org_two', facility_id: 'fac_three', type: 'year', value: 2024, emissions: [] },
	];
	const prisma = {
		organizations: {
			findUnique: jest.fn(async ({ where }: { where: { id: string } }) => organizations.find(org => org.id === where.id)),
		},
		facility_footprints: {
			findMany: jest.fn(async (query?: { where?: Record<string, unknown> }) =>
				footprints.filter(footprint => Object.entries(query?.where ?? {}).every(([key, value]) => footprint[key] === value)),
			),
			upsert: jest.fn(),
			delete: jest.fn(),
		},
		$disconnect: jest.fn(),
	};

	beforeAll(async () => {
		const module = await Test.createTestingModule({
			controllers: [FootprintsController],
			providers: [FootprintsService, { provide: PrismaService, useValue: prisma }, { provide: CacheService, useValue: { get: jest.fn().mockResolvedValue(organizations) } }],
		})
			// Supply an already authenticated identity without contacting Auth0. Keep the
			// production role guard, organization interceptor, controller and service.
			.overrideGuard(JwtAuthGuard)
			.useValue({
				canActivate(context: ExecutionContext) {
					if (!user) throw new UnauthorizedException();
					context.switchToHttp().getRequest().user = user;
					return true;
				},
			})
			.compile();
		app = module.createNestApplication();
		await app.init();
	});

	beforeEach(() => {
		jest.clearAllMocks();
		user = {
			company_id: null,
			coldclimate_claims: { email: 'member@example.test', org_id: 'org_one', id: 'user_one', roles: [Role.CompanyMember] },
			iss: 'https://example.test/',
			sub: 'user_one',
			aud: ['test'],
			iat: 0,
			exp: 9999999999,
			azp: 'test',
			scope: '',
			permissions: [],
			isAdmin: false,
			isOwner: false,
			isColdAdmin: false,
			isMember: true,
		};
	});

	afterAll(async () => {
		await app?.close();
	});

	it.each([Role.CompanyMember, Role.CompanyAdmin, Role.CompanyOwner, Role.ColdAdmin])('lists only the requested organization and facility for %s', async role => {
		user!.coldclimate_claims.roles = [role];
		user!.isColdAdmin = role === Role.ColdAdmin;

		const response = await request(app.getHttpServer()).get(path).expect(200);

		expect(response.body).toEqual({ periods: [footprints[0]] });
		expect(prisma.facility_footprints.findMany).toHaveBeenCalledTimes(1);
		expect(prisma.facility_footprints.findMany).toHaveBeenCalledWith({
			where: { organization_id: 'org_one', facility_id: 'fac_one' },
		});
	});

	it('allows a platform administrator to select another organization without widening the result', async () => {
		user!.coldclimate_claims.roles = [Role.ColdAdmin];
		user!.isColdAdmin = true;
		const response = await request(app.getHttpServer()).get('/organizations/org_two/facilities/fac_three/footprints').expect(200);
		expect(response.body).toEqual({ periods: [footprints[2]] });
		expect(prisma.facility_footprints.findMany).toHaveBeenCalledWith({
			where: { organization_id: 'org_two', facility_id: 'fac_three' },
		});
	});

	it('preserves the scoped item lookup', async () => {
		const response = await request(app.getHttpServer()).get(`${path}/fp_one`).expect(200);
		expect(response.body).toEqual([footprints[0]]);
		expect(prisma.facility_footprints.findMany).toHaveBeenCalledWith({
			where: { organization_id: 'org_one', facility_id: 'fac_one', id: 'fp_one' },
		});
	});

	it('returns an empty collection when the facility belongs to another organization', async () => {
		const response = await request(app.getHttpServer()).get('/organizations/org_one/facilities/fac_three/footprints').expect(200);

		expect(response.body).toEqual({ periods: [] });
		expect(prisma.facility_footprints.findMany).toHaveBeenCalledWith({
			where: { organization_id: 'org_one', facility_id: 'fac_three' },
		});
	});

	it('rejects an unauthenticated request before reading footprint data', async () => {
		user = undefined;
		await request(app.getHttpServer()).get(path).expect(401);
		expect(prisma.facility_footprints.findMany).not.toHaveBeenCalled();
	});

	it('rejects a company member requesting another organization', async () => {
		await request(app.getHttpServer()).get('/organizations/org_two/facilities/fac_three/footprints').expect(401);
		expect(prisma.facility_footprints.findMany).not.toHaveBeenCalled();
	});

	it('rejects an identity without an allowed role', async () => {
		user!.coldclimate_claims.roles = [Role.Default];
		await request(app.getHttpServer()).get(path).expect(401);
		expect(prisma.facility_footprints.findMany).not.toHaveBeenCalled();
	});

	it('keeps footprint creation restricted to platform administrators', async () => {
		await request(app.getHttpServer()).post(path).send([]).expect(401);
		expect(prisma.facility_footprints.upsert).not.toHaveBeenCalled();
	});

	it('keeps footprint deletion restricted to platform administrators', async () => {
		await request(app.getHttpServer()).delete(`${path}/fp_one`).expect(401);
		expect(prisma.facility_footprints.delete).not.toHaveBeenCalled();
	});
});
