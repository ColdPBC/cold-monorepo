import { http, HttpResponse } from 'msw';
import { getSidebarMock } from '../sidebarMock';
import { getCategoriesDataMock, getFootprintDataMock } from '../categoriesMock';
import { getDataGridCompaniesMock, getDataGridUsersMock, getDefaultFormDataGridMock, getOrganizationMembersMock, getTeamMemberDataGridMock } from '../datagridMock';
import { getSurveyFormDataByName, getSurveysMock } from '../surveyDataMock';
import { getRoles } from '../roleMock';
import { resolveAPIUrl, resolveStripeIntegrationUrl } from '@coldpbc/fetchers';
import { getOrganizationMock, getOrganizationsMock } from '../organizationMock';
import { getPoliciesSignedMock, getPolicyMockByName } from '../policyMock';
import { auth0UserMock } from '../userMock';
import { getNewsDefault } from '../newsMock';
import { getActionMock, getActionsMock } from '../action';
import { v4 as uuidv4 } from 'uuid';
import {
	getAllComplianceMocks,
	getComplianceCountsMock,
	getComplianceMockByName,
	getQuestionAIDetailsMock,
	getQuestionnaireContainerMock,
	getQuestionnaireSidebarComplianceMock,
} from '../complianceMock';
import { getDocumentsListTableMock } from '../componentMock';
import { getFilesWithCertificateClaimsMock } from '../filesMock';
import { returnUpdatedSurvey } from '../helpers';
import { ComplianceSurveyPayloadType } from '@coldpbc/interfaces';
import { getDefaultEmissionMock } from '../emissionMocks';
import { getNotesMock } from '../notesMock';
import { getClaimsMock, getSupplierClaimsMock } from '../claimsMock';
import { getSupplierMockById, getSupplierWithCertificationClaimsMock } from '../suppliersMock';
import { getMaterialDetailMockById, getMaterialsMock } from '../materialsMock';
import { getCustomerWithSubscriptionMock, getPortalSessionMock, getStripeProductsMock } from '../stripeMocks';

export const getStripeAPIUrl = (path: string) => {
	return `${resolveStripeIntegrationUrl()}${path}`;
};

export const stripeHandlers = [
	http.get(getStripeAPIUrl('/stripe_products'), ({ request, params, cookies }) => {
		return HttpResponse.json(getStripeProductsMock());
	}),
	http.get(getStripeAPIUrl('/customer_subscriptions/:orgId'), ({ request, params, cookies }) => {
		return HttpResponse.json(getCustomerWithSubscriptionMock());
	}),
	http.get(getStripeAPIUrl('/portal_session/:orgId'), ({ request, params, cookies }) => {
		return HttpResponse.json(getPortalSessionMock());
	}),
];

export const getApiUrl = (path: string) => {
	return `${resolveAPIUrl()}${path}`;
};

export const handlers = [
	/*
     How To Test Your Components Against The API:
     in order to test these requests against the actual api, you will need to run the api locally, and then change the
     url path of the mock below so that it doesn't match the url path you are requesting in your component.

     For example:
     if you are requesting '/components/sidebar_navigation', and you want to see that it works with the API
     then you will need to change the url path below to something like '/components/sidebar_navigations_disable'.
     then you can paste a valid accessToken in the textbox in storybook, and it should authenticate to the API and return the data.

     this is useful if you want to make sure your mocks match what the API is returning.
     */

	...stripeHandlers,
	//Mock SideBar Request
	http.get(getApiUrl('/components/sidebar_navigation'), ({ request, params, cookies }) => {
		return HttpResponse.json({ ...getSidebarMock() });
	}),

	// Mock data for journey modules
	http.get(getApiUrl('/organizations/:orgId/categories'), ({ request, params, cookies }) => {
		return HttpResponse.json({ ...getCategoriesDataMock() });
	}),

	// Mock data for footprint modules
	http.get(getApiUrl('/organizations/:orgId/categories/company_decarbonization'), ({ request, params, cookies }) => {
		return HttpResponse.json({ ...getFootprintDataMock() });
	}),

	http.get(getApiUrl('/company-users'), ({ request, params, cookies }) => {
		return HttpResponse.json(getDataGridUsersMock());
	}),

	http.get(getApiUrl('/components/team_member_table'), ({ request, params, cookies }) => {
		return HttpResponse.json(getTeamMemberDataGridMock());
	}),

	http.get(getApiUrl('/components/datagrid'), ({ request, params, cookies }) => {
		return HttpResponse.json(getDefaultFormDataGridMock());
	}),

	http.get(getApiUrl('/data/datagrid'), ({ request, params, cookies }) => {
		return HttpResponse.json(getDefaultFormDataGridMock());
	}),

	http.post(getApiUrl('/invites'), ({ request, params, cookies }) => {
		return HttpResponse.json({});
	}),

	http.delete(getApiUrl('/invites/:id'), ({ request, params, cookies }) => {
		return HttpResponse.json(getDefaultFormDataGridMock());
	}),

	http.get(getApiUrl('/companies/:id'), ({ request, params, cookies }) => {
		const { id } = params;
		return HttpResponse.json(getDataGridCompaniesMock(id as string));
	}),

	http.get(getApiUrl('/organizations/:orgId'), ({ request, params, cookies }) => {
		return HttpResponse.json({ ...getOrganizationMock() });
	}),

	http.get(getApiUrl('/organizations'), ({ request, params, cookies }) => {
		return HttpResponse.json(getOrganizationsMock());
	}),

	http.get(getApiUrl('/organizations/:orgId/members'), ({ request, params, cookies }) => {
		const { orgId } = params;
		const mock = getOrganizationMembersMock();
		return HttpResponse.json({ ...getOrganizationMembersMock() });
	}),

	http.put(getApiUrl('/organizations/:orgId/roles/:roleName/members/:userId'), async ({ request, params, cookies }) => {
		const { orgId, roleName, userId } = params;
		return HttpResponse.json({
			...getOrganizationMembersMock(),
			members: getOrganizationMembersMock().members.map(member => {
				if (member.user_id === userId) {
					member.role = roleName as string;
				}
				return member;
			}),
		});
	}),

	http.delete(getApiUrl('/organizations/:orgId/members'), async ({ request, params, cookies }) => {
		return HttpResponse.json({});
	}),

	http.delete(getApiUrl('/organizations/:orgId/invitations/:userId'), async ({ request, params, cookies }) => {
		return HttpResponse.json({});
	}),

	http.post(getApiUrl('/organizations/:orgId/invitation'), async ({ request, params, cookies }) => {
		const data = (await request.json()) as {
			user_email: string;
			inviter_name: string;
			roleId: string;
		};
		const { orgId } = params;

		try {
			const { user_email, inviter_name, roleId } = data;
			return HttpResponse.json({
				id: uuidv4(),
				client_id: 'i8rCPXsLq9b2YKOOWUTfvgUj0iYD7dE3',
				inviter: {
					name: inviter_name,
				},
				invitee: {
					email: user_email,
				},
				invitation_url: '',
				ticket_id: 'KpfUpW3PE6GwqgNsLUlLfwdkZS4373XO',
				created_at: new Date().toISOString(),
				expires_at: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
				organization_id: orgId,
				roles: [roleId],
			});
		} catch (error) {
			let message;
			if (error instanceof Error) message = error.message;
			else message = String(error);
			return HttpResponse.json({ message: message }, { status: 500 });
		}
	}),

	http.post(getApiUrl('/resources/:name'), async ({ request, params, cookies }) => {
		return HttpResponse.json({});
	}),

	http.get(getApiUrl('/roles'), async ({ request, params, cookies }) => {
		return HttpResponse.json(getRoles());
	}),

	http.get(getApiUrl('/organizations/:orgId/surveys/:name'), ({ request, params, cookies }) => {
		const { name } = params;

		return HttpResponse.json(getSurveyFormDataByName(name as string));
	}),

	http.put(getApiUrl('/organizations/:orgId/surveys/:name'), async ({ request, params, cookies }) => {
		const response = (await request.json()) as ComplianceSurveyPayloadType;
		const surveys = getSurveysMock() as ComplianceSurveyPayloadType[];
		const updatedSurvey = returnUpdatedSurvey(response, surveys);
		return HttpResponse.json(updatedSurvey);
	}),

	http.patch(getApiUrl(`/members/:emailOrId`), ({ request, params, cookies }) => {
		return HttpResponse.json({});
	}),

	http.post(getApiUrl(`/organizations`), async ({ request, params, cookies }) => {
		const body = (await request.json()) as {
			name: string;
		};
		return HttpResponse.json({});
	}),

	http.post(getApiUrl(`/policies/:id/signed`), async ({ request, params, cookies }) => {
		const body = (await request.json()) as {
			name: string;
		};
		return HttpResponse.json({});
	}),

	http.get(getApiUrl('/policies/signed/user'), ({ request, params, cookies }) => {
		return HttpResponse.json(getPoliciesSignedMock());
	}),

	http.get(getApiUrl('/policies/:name'), ({ request, params, cookies }) => {
		const name = params.name as string;
		return HttpResponse.json(getPolicyMockByName(name));
	}),

	http.get(getApiUrl('/members/:emailOrId'), ({ request, params, cookies }) => {
		return HttpResponse.json(auth0UserMock);
	}),

	http.get(getApiUrl('/news'), ({ request, params, cookies }) => {
		return HttpResponse.json(getNewsDefault());
	}),

	http.get(getApiUrl('/organizations/:orgId/actions'), ({ request, params, cookies }) => {
		return HttpResponse.json([...getActionsMock()]);
	}),

	http.get(getApiUrl('/organizations/:orgId/actions/:id'), ({ request, params, cookies }) => {
		return HttpResponse.json({ ...getActionMock() });
	}),

	http.patch(getApiUrl('/organizations/:orgId/actions/:actionId'), ({ request, params, cookies }) => {
		return HttpResponse.json({});
	}),

	http.get(getApiUrl('/organizations/:orgId/surveys'), ({ request, params, cookies }) => {
		return HttpResponse.json(getSurveysMock());
	}),

	http.get(getApiUrl('/components/documents_list_table'), ({ request, params, cookies }) => {
		return HttpResponse.json(getDocumentsListTableMock());
	}),

	http.get(getApiUrl('/organizations/:orgId/files'), ({ request, params, cookies }) => {
		return HttpResponse.json(getFilesWithCertificateClaimsMock());
	}),

	http.post(getApiUrl('/organizations/:orgId/files'), ({ request, params, cookies }) => {
		return HttpResponse.json({}, { status: 200 });
	}),

	http.get(getApiUrl('/organizations/:orgId/footprints'), ({ request, params, cookies }) => {
		return HttpResponse.json(getDefaultEmissionMock());
	}),

	http.get(getApiUrl('/compliance/:complianceName/organizations/:orgId/section_groups/responses'), ({ request, params, cookies }) => {
		return HttpResponse.json(getQuestionnaireSidebarComplianceMock());
	}),

	http.get(getApiUrl('/compliance/:name/organizations/:orgId/section_groups/:sectionGroupId/sections/:sectionId/responses'), ({ request, params, cookies }) => {
		// get query params from url
		const { name, orgId, sectionGroupId, sectionId } = params as {
			name: string;
			orgId: string;
			sectionGroupId: string;
			sectionId: string;
		};
		return HttpResponse.json(getQuestionnaireContainerMock(sectionGroupId, sectionId));
	}),

	// delete compliance question bookmark
	http.delete(getApiUrl('/compliance/:name/organizations/:orgId/questions/:id/bookmarks'), ({ request, params, cookies }) => {
		// return 200 status code
		return HttpResponse.json({}, { status: 200 });
	}),

	// create compliance question bookmark
	http.post(getApiUrl('/compliance/:name/organizations/:orgId/questions/:id/bookmarks'), ({ request, params, cookies }) => {
		return HttpResponse.json({}, { status: 200 });
	}),

	// answer compliance question in questionnaire
	http.put(getApiUrl('/compliance/:name/organizations/:orgId/section_groups/:sectionGroupId/sections/:sectionId/questions/:id/responses'), ({ request, params, cookies }) => {
		return HttpResponse.json({}, { status: 200 });
	}),

	http.get(getApiUrl('/compliance/:name/organizations/:orgId/questions/:id/notes'), ({ request, params, cookies }) => {
		const { name, orgId, id } = params as { name: string; orgId: string; id: string };

		return HttpResponse.json(getNotesMock(id));
	}),

	// POST /compliance/${name}/organizations/${orgId}/questions/${focusQuestion?.key}/notes
	http.post(getApiUrl('/compliance/:name/organizations/:orgId/questions/:id/notes'), ({ request, params, cookies }) => {
		return HttpResponse.json({}, { status: 200 });
	}),

	// PATCH /compliance/${name}/organizations/${orgId}/questions/${focusQuestion?.key}/notes/${firstNote.id}
	http.patch(getApiUrl('/compliance/:name/organizations/:orgId/questions/:id/notes/:noteId'), ({ request, params, cookies }) => {
		return HttpResponse.json({}, { status: 200 });
	}),

	// delete compliance question response
	http.delete(getApiUrl('/compliance/:name/organizations/:orgId/section_groups/:sectionGroupId/sections/:sectionId/questions/:id/responses'), ({ request, params, cookies }) => {
		return HttpResponse.json({}, { status: 200 });
	}),

	http.get(getApiUrl('/compliance/:name/organizations/:orgId/responses/counts'), ({ request, params, cookies }) => {
		return HttpResponse.json(getComplianceCountsMock());
	}),

	http.get(getApiUrl('/compliance/all/organizations/:orgId'), ({ request, params, cookies }) => {
		return HttpResponse.json(getAllComplianceMocks());
	}),

	http.get(getApiUrl('/compliance/:name'), ({ request, params, cookies }) => {
		const name = params.name as string;
		return HttpResponse.json(getComplianceMockByName(name));
	}),

	http.get(
		getApiUrl('/compliance/:name/organizations/:orgId/section_groups/:sectionGroupId/sections/:sectionId/questions/:questionId/responses'),
		({ request, params, cookies }) => {
			const { name, orgId, sectionGroupId, sectionId, questionId } = params as {
				name: string;
				orgId: string;
				sectionGroupId: string;
				sectionId: string;
				questionId: string;
			};
			return HttpResponse.json(getQuestionAIDetailsMock(sectionGroupId, sectionId, questionId));
		},
	),

	http.get(getApiUrl('/claims'), ({ request, params, cookies }) => {
		return HttpResponse.json(getClaimsMock());
	}),

	http.get(getApiUrl('/organizations/:orgId/suppliers'), ({ request, params, cookies }) => {
		return HttpResponse.json(getSupplierWithCertificationClaimsMock());
	}),

	http.get(getApiUrl('/organizations/:orgId/suppliers/claims/names'), ({ request, params, cookies }) => {
		return HttpResponse.json(getSupplierClaimsMock());
	}),

	http.get(getApiUrl('/organizations/:orgId/suppliers/:id'), ({ request, params, cookies }) => {
		const { orgId, id } = params as { orgId: string; id: string };
		return HttpResponse.json(getSupplierMockById(id));
	}),

	http.patch(getApiUrl('/organizations/:orgId/files/:fileId'), ({ request, params, cookies }) => {
		return HttpResponse.json({}, { status: 200 });
	}),

	http.post(getApiUrl('/compliance/:name/organizations/:orgId'), ({ request, params, cookies }) => {
		return HttpResponse.json({}, { status: 200 });
	}),

	http.put(getApiUrl('/compliance/:name/organizations/:orgI/activate'), ({ request, params, cookies }) => {
		return HttpResponse.json({}, { status: 200 });
	}),

	http.delete(getApiUrl('/organizations/:orgId/files/:fileId'), ({ request, params, cookies }) => {
		return HttpResponse.json({}, { status: 200 });
	}),

	http.post(getApiUrl('/compliance/:name/organizations/:orgId'), ({ request, params, cookies }) => {
		return HttpResponse.json({}, { status: 200 });
	}),

	http.get(getApiUrl('/organizations/:orgId/materials'), ({ request, params, cookies }) => {
		return HttpResponse.json(getMaterialsMock());
	}),

	http.get(getApiUrl('/organizations/:orgId/materials/:id'), ({ request, params, cookies }) => {
		const { id } = params as { id: string };
		return HttpResponse.json(getMaterialDetailMockById(id));
	}),

	http.patch(getApiUrl('/organizations/:orgId/materials/:id'), ({ request, params, cookies }) => {
		return HttpResponse.json({}, { status: 200 });
	}),

	http.delete(getApiUrl('/organizations/:orgId/materials/:id'), ({ request, params, cookies }) => {
		return HttpResponse.json({}, { status: 200 });
	}),

	http.post(getApiUrl('/organizations/:orgId/materials/:materialId/supplier/:supplierId'), ({ request, params, cookies }) => {
		return HttpResponse.json({}, { status: 200 });
	}),

	http.delete(getApiUrl('/organizations/:orgId/materials/:materialId/supplier/:supplierId'), ({ request, params, cookies }) => {
		return HttpResponse.json({}, { status: 200 });
	}),

	http.get(getApiUrl('/organizations/:orgId/files/:fileId/url'), ({ request, params, cookies }) => {
		return HttpResponse.json('', { status: 200 });
	}),
];
