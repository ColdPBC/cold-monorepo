import { Compliance, OrgCompliance } from '@coldpbc/interfaces';
import { ComplianceProgressStatus } from '@coldpbc/enums';

export function getComplianceMock(): Compliance[] {
  return [
    {
      id: 'compdef_n90xd3j15im42aqr',
      name: 'b_corp_2024',
      logo_url: 'https://cold-public-assets.s3.amazonaws.com/3rdPartyLogos/compliance_svgs/b_corp_logo.svg',
      surveys: ['b_corp_2024'],
      created_at: '2024-03-19T16:22:59.959Z',
      updated_at: '2024-04-10T20:44:44.763Z',
      title: 'B Corp',
      metadata: {
        term: 'every_three_years',
      },
      visible: true,
      order: 1,
      version: 1,
    },
    {
      id: 'compdef_s4h9rd5wuorvhthy',
      name: 'rei_pia_2024',
      logo_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/compliance_svgs/rei_logo.svg',
      surveys: ['rei_pia_2024'],
      created_at: '2024-03-01T19:51:37.808Z',
      updated_at: '2024-03-06T05:05:43.546Z',
      title: 'REI Product Impact Assessment 2024',
      metadata: {
        term: 'annual',
        due_date: '2024-03-09T00:00:00.00',
      },
      visible: true,
      order: 2,
      version: 1,
    },
    {
      id: 'compdef_q8ctv3dxn00s3bic',
      name: 'one_percent_for_planet_DEMO',
      logo_url: 'https://cold-public-assets.s3.amazonaws.com/3rdPartyLogos/compliance_svgs/1_percent_for_the_planet_logo.svg',
      surveys: ['one_percent_for_planet_DEMO'],
      created_at: '2024-03-18T16:42:54.309Z',
      updated_at: '2024-03-18T16:42:54.309Z',
      title: '1% for the Planet',
      metadata: {
        term: 'annual',
      },
      visible: true,
      order: 3,
      version: 1,
    },
    {
      id: 'compdef_q4si19qzwqh0h03g',
      name: 'oia_climate_report_2023',
      logo_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/compliance_svgs/oia_logo.svg',
      surveys: ['oia_climate_report_2023'],
      created_at: '2024-03-18T15:55:36.193Z',
      updated_at: '2024-03-26T19:09:13.312Z',
      title: 'Climate Action Corps Progress Report 2023',
      metadata: {
        term: 'annual',
      },
      visible: true,
      order: 4,
      version: 1,
    },
  ];
}

export function getComplianceMockByName(name: string): Compliance {
  const compliance = getComplianceMock().find(c => c.name === name);
  if (compliance) {
    return compliance;
  } else {
    return getComplianceMock()[0];
  }
}

export function getOrganizationComplianceMock(): OrgCompliance[] {
  return [
    {
      id: 'orgcomp_j582d57w5b1l5k7p',
      organization_id: 'org_g2zzR5rwTKVAIwCn',
      compliance_id: 'compdef_n90xd3j15im42aqr',
      created_at: '2024-03-27T18:23:19.189Z',
      updated_at: '2024-03-27T18:23:19.189Z',
      organization: {
        id: 'org_g2zzR5rwTKVAIwCn',
        name: 'cold-climate-staging',
        enabled_connections: [
          {
            connection_id: 'con_7DptYmJNrY0PYCrx',
            assign_membership_on_login: false,
          },
          {
            connection_id: 'con_kYFtdnBxyBdYzTtK',
            assign_membership_on_login: false,
          },
        ],
        display_name: 'Cold Climate',
        branding: {
          colors: {
            primary: '#2892D7',
            page_background: '#0A1C2B',
          },
          logo_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/cold-climate-logo/black/Asset+2.svg',
        },
        phone: null,
        website: null,
        email: null,
        created_at: '2023-08-10T21:48:11.103Z',
        updated_at: '2023-08-10T21:48:11.106Z',
        isTest: false,
      },
      compliance_definition: {
        id: 'compdef_n90xd3j15im42aqr',
        name: 'b_corp_2024',
        logo_url: 'https://cold-public-assets.s3.amazonaws.com/3rdPartyLogos/compliance_svgs/bcorp_logo.svg',
        surveys: ['b_corp_2024'],
        created_at: '2024-03-19T16:22:59.959Z',
        updated_at: '2024-04-10T20:44:44.763Z',
        title: 'B Corp',
        metadata: {
          term: 'every_three_years',
        },
        visible: true,
        order: 1,
        version: 1,
      },
    },
    {
      id: 'orgcomp_uqt18enywdj4ncg8',
      organization_id: 'org_g2zzR5rwTKVAIwCn',
      compliance_id: 'compdef_s4h9rd5wuorvhthy',
      created_at: '2024-03-06T21:05:28.097Z',
      updated_at: '2024-03-06T21:05:28.097Z',
      organization: {
        id: 'org_g2zzR5rwTKVAIwCn',
        name: 'cold-climate-staging',
        enabled_connections: [
          {
            connection_id: 'con_7DptYmJNrY0PYCrx',
            assign_membership_on_login: false,
          },
          {
            connection_id: 'con_kYFtdnBxyBdYzTtK',
            assign_membership_on_login: false,
          },
        ],
        display_name: 'Cold Climate',
        branding: {
          colors: {
            primary: '#2892D7',
            page_background: '#0A1C2B',
          },
          logo_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/cold-climate-logo/black/Asset+2.svg',
        },
        phone: null,
        website: null,
        email: null,
        created_at: '2023-08-10T21:48:11.103Z',
        updated_at: '2023-08-10T21:48:11.106Z',
        isTest: false,
      },
      compliance_definition: {
        id: 'compdef_s4h9rd5wuorvhthy',
        name: 'rei_pia_2024',
        logo_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/compliance_svgs/rei_logo.svg',
        surveys: ['rei_pia_2024'],
        created_at: '2024-03-01T19:51:37.808Z',
        updated_at: '2024-03-06T05:05:43.546Z',
        title: 'REI Product Impact Assessment 2024',
        metadata: {
          term: 'annual',
          due_date: '2024-03-09T00:00:00.00',
        },
        visible: true,
        order: 2,
        version: 1,
      },
    },
    {
      id: 'orgcomp_g5e9g4dr1d1ve8m2',
      organization_id: 'org_g2zzR5rwTKVAIwCn',
      compliance_id: 'compdef_q4si19qzwqh0h03g',
      created_at: '2024-03-18T15:55:43.345Z',
      updated_at: '2024-03-18T15:55:43.345Z',
      organization: {
        id: 'org_g2zzR5rwTKVAIwCn',
        name: 'cold-climate-staging',
        enabled_connections: [
          {
            connection_id: 'con_7DptYmJNrY0PYCrx',
            assign_membership_on_login: false,
          },
          {
            connection_id: 'con_kYFtdnBxyBdYzTtK',
            assign_membership_on_login: false,
          },
        ],
        display_name: 'Cold Climate',
        branding: {
          colors: {
            primary: '#2892D7',
            page_background: '#0A1C2B',
          },
          logo_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/cold-climate-logo/black/Asset+2.svg',
        },
        phone: null,
        website: null,
        email: null,
        created_at: '2023-08-10T21:48:11.103Z',
        updated_at: '2023-08-10T21:48:11.106Z',
        isTest: false,
      },
      compliance_definition: {
        id: 'compdef_q4si19qzwqh0h03g',
        name: 'oia_climate_report_2023',
        logo_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/compliance_svgs/oia_logo.svg',
        surveys: ['oia_climate_report_2023'],
        created_at: '2024-03-18T15:55:36.193Z',
        updated_at: '2024-03-26T19:09:13.312Z',
        title: 'Climate Action Corps Progress Report 2023',
        metadata: {
          term: 'annual',
        },
        visible: true,
        order: 4,
        version: 1,
      },
    },
    {
      id: 'orgcomp_2',
      organization_id: 'org_g2zzR5rwTKVAIwCn',
      compliance_id: 'compdef_q8ctv3dxn00s3bic',
      created_at: '2024-03-18T15:55:43.345Z',
      updated_at: '2024-03-18T15:55:43.345Z',
      organization: {
        id: 'org_g2zzR5rwTKVAIwCn',
        name: 'cold-climate-staging',
        enabled_connections: [
          {
            connection_id: 'con_7DptYmJNrY0PYCrx',
            assign_membership_on_login: false,
          },
          {
            connection_id: 'con_kYFtdnBxyBdYzTtK',
            assign_membership_on_login: false,
          },
        ],
        display_name: 'Cold Climate',
        branding: {
          colors: {
            primary: '#2892D7',
            page_background: '#0A1C2B',
          },
          logo_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/cold-climate-logo/black/Asset+2.svg',
        },
        phone: null,
        website: null,
        email: null,
        created_at: '2023-08-10T21:48:11.103Z',
        updated_at: '2023-08-10T21:48:11.106Z',
        isTest: false,
      },
      compliance_definition: {
        id: 'compdef_q8ctv3dxn00s3bic',
        name: 'one_percent_for_planet_DEMO',
        logo_url: 'https://cold-public-assets.s3.amazonaws.com/3rdPartyLogos/compliance_svgs/1_percent_for_the_planet_logo.svg',
        surveys: ['one_percent_for_planet_DEMO'],
        created_at: '2024-03-18T16:42:54.309Z',
        updated_at: '2024-03-18T16:42:54.309Z',
        title: '1% for the Planet',
        metadata: {
          term: 'annual',
        },
        visible: true,
        order: 3,
        version: 1,
      },
    },
  ];
}

export function getOrganizationComplianceMockByName(name: string): OrgCompliance {
  const orgCompliances = getOrganizationComplianceMock();
  const compliance = getComplianceMockByName(name);
  const orgCompliance = orgCompliances.find(c => c.compliance_definition.id === compliance.id) || orgCompliances[0];
  return {
    ...orgCompliance,
    compliance_definition: compliance,
    compliance_id: compliance.id,
  };
}

export function getDefaultCompliancePageMock(): Compliance[] {
  return [
    ...getComplianceMock(),
    {
      id: 'compdef_s4h9rd5wuorvhthy',
      name: 'rei_pia_2024_test',
      logo_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/compliance_svgs/rei_logo.svg',
      surveys: ['rei_pia_2024'],
      created_at: '2024-03-01T19:51:37.808Z',
      updated_at: '2024-03-06T05:05:43.546Z',
      title: 'REI Product Impact Assessment 2024 Test',
      metadata: {
        term: 'annual',
        due_date: '2024-03-09T00:00:00.00',
      },
      visible: false,
      order: 2,
      version: 1,
    },
    {
      id: 'compdef_q8ctv3dxn00s3bic',
      name: 'one_percent_for_planet_DEMO_test',
      logo_url: 'https://cold-public-assets.s3.amazonaws.com/3rdPartyLogos/compliance_svgs/1_percent_for_the_planet_logo.svg',
      surveys: ['one_percent_for_planet_DEMO'],
      created_at: '2024-03-18T16:42:54.309Z',
      updated_at: '2024-03-18T16:42:54.309Z',
      title: '1% for the Planet Test',
      metadata: {
        term: 'annual',
      },
      visible: false,
      order: 3,
      version: 1,
    },
  ];
}

export function getActivateCompliancePageMock(): Compliance[] {
  return getComplianceMock();
}

export function getDefaultOrgCompliancePageMock(): OrgCompliance[] {
  return getOrganizationComplianceMock();
}

export function getActivateOrgCompliancePageMock(): OrgCompliance[] {
  return [];
}

export function getAssessmentsComplianceMock(): OrgCompliance[] {
  return [
    {
      id: 'orgcomp_s5nd91vh8jduzw0m',
      organization_id: 'org_q8G8YXcencJjsCnv',
      compliance_id: 'compdef_s4h9rd5wuorvhthy',
      created_at: '2024-03-01T20:05:01.181Z',
      updated_at: '2024-03-01T20:05:01.181Z',
      organization: {
        id: 'org_q8G8YXcencJjsCnv',
        name: 'peak-staging-test',
        enabled_connections: [
          {
            connection_id: 'con_Asb5pjVccChYIxa5',
            assign_membership_on_login: false,
          },
          {
            connection_id: 'con_kYFtdnBxyBdYzTtK',
            assign_membership_on_login: false,
          },
        ],
        display_name: 'Peak Staging Test',
        branding: null,
        phone: null,
        email: null,
        created_at: '2024-03-01T19:34:31.251Z',
        updated_at: '2024-03-01T19:34:31.252Z',
        isTest: false,
      },
      compliance_definition: {
        id: 'compdef_s4h9rd5wuorvhthy',
        name: 'rei_pia_2024',
        logo_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/compliance_svgs/rei_logo.svg',
        surveys: ['rei_pia_2024_2'],
        created_at: '2024-03-01T19:51:37.808Z',
        updated_at: '2024-03-06T05:05:43.546Z',
        title: 'REI Product Impact Assessment 2024',
        metadata: {
          term: 'annual',
          due_date: '2024-03-09T00:00:00.00',
        },
        visible: true,
        order: 2,
        version: 1,
      },
    },
    {
      id: 'orgcomp_wqtyy2rtvusmcm46',
      organization_id: 'org_q8G8YXcencJjsCnv',
      compliance_id: 'compdef_obu8yu9fbhex3inz',
      created_at: '2024-03-08T20:40:06.829Z',
      updated_at: '2024-03-08T20:40:06.829Z',
      organization: {
        id: 'org_q8G8YXcencJjsCnv',
        name: 'peak-staging-test',
        enabled_connections: [
          {
            connection_id: 'con_Asb5pjVccChYIxa5',
            assign_membership_on_login: false,
          },
          {
            connection_id: 'con_kYFtdnBxyBdYzTtK',
            assign_membership_on_login: false,
          },
        ],
        display_name: 'Peak Staging Test',
        branding: null,
        phone: null,
        email: null,
        created_at: '2024-03-01T19:34:31.251Z',
        updated_at: '2024-03-01T19:34:31.252Z',
        isTest: false,
      },
      compliance_definition: {
        id: 'compdef_obu8yu9fbhex3inz',
        name: 'amazon',
        logo_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/compliance_svgs/amazon_logo.svg',
        surveys: ['rei_pia_2024'],
        created_at: '2024-02-05T19:28:02.001Z',
        updated_at: '2024-02-05T20:36:23.025Z',
        title: 'Amazon',
        metadata: {
          term: 'annual',
        },
        visible: true,
        order: 1,
        version: 1,
      },
    },
    {
      id: '2',
      organization_id: '3412521521355',
      compliance_id: 'cmp-2',
      created_at: '2020-03-03T23:50:31.000Z',
      updated_at: '2020-03-03T23:50:31.000Z',
      organization: {},
      compliance_definition: getComplianceMockByName('b_corp_2024'),
    },
  ];
}

export function getQuestionnaireSidebarComplianceMock() {
  return [
    {
      name: 'Practices',
      sections: [
        {
          name: 'Brand Information',
          questions: [
            {
              id: 'question_1',
              prompt: 'What is your brand name?',
              order: 1,
              status: ComplianceProgressStatus.user_answered,
            },
            {
              id: 'question_2',
              prompt: 'What is your brand logo?',
              order: 2,
              status: ComplianceProgressStatus.user_answered,
            },
            {
              id: 'question_3',
              prompt: 'What is your brand tagline?',
              order: 3,
              status: ComplianceProgressStatus.bookmarked,
            },
            {
              id: 'question_4',
              prompt: 'What is your brand name?',
              order: 4,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_5',
              prompt: 'What is your brand logo?',
              order: 5,
              status: ComplianceProgressStatus.ai_answered,
            },
            {
              id: 'question_6',
              prompt: 'What is your brand tagline?',
              order: 6,
              status: ComplianceProgressStatus.ai_answered,
            },
            {
              id: 'question_7',
              prompt: 'What is your brand name?',
              order: 7,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_8',
              prompt: 'What is your brand logo?',
              order: 8,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_9',
              prompt: 'What is your brand tagline?',
              order: 9,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_10',
              prompt: 'What is your brand name?',
              order: 10,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_11',
              prompt: 'What is your brand logo?',
              order: 11,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_12',
              prompt: 'What is your brand tagline?',
              order: 12,
              status: ComplianceProgressStatus.bookmarked,
            },
          ],
        },
        {
          name: 'Manufacturing Code of Conduct',
          questions: [
            // 11 questions
            {
              id: 'question_13',
              prompt: 'What is your brand name?',
              order: 1,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_14',
              prompt: 'What is your brand logo?',
              order: 2,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_15',
              prompt: 'What is your brand tagline?',
              order: 3,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_16',
              prompt: 'What is your brand name?',
              order: 4,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_17',
              prompt: 'What is your brand logo?',
              order: 5,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_18',
              prompt: 'What is your brand tagline?',
              order: 6,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_19',
              prompt: 'What is your brand name?',
              order: 7,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_20',
              prompt: 'What is your brand logo?',
              order: 8,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_21',
              prompt: 'What is your brand tagline?',
              order: 9,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_22',
              prompt: 'What is your brand name?',
              order: 10,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_23',
              prompt: 'What is your brand logo?',
              order: 11,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_24',
              prompt: 'What is your brand tagline?',
              order: 12,
              status: ComplianceProgressStatus.not_started,
            },
          ],
        },
        {
          name: 'Core Practices',
          questions: [
            // 5 questions
            {
              id: 'question_25',
              prompt: 'What is your brand name?',
              order: 1,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_26',
              prompt: 'What is your brand logo?',
              order: 2,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_27',
              prompt: 'What is your brand tagline?',
              order: 3,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_28',
              prompt: 'What is your brand name?',
              order: 4,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_29',
              prompt: 'What is your brand logo?',
              order: 5,
              status: ComplianceProgressStatus.not_started,
            },
          ],
        },
      ],
    },
    {
      name: 'Materials',
      sections: [
        {
          name: 'Restricted Substances List & Chemicals Management',
          questions: [
            // 1 question
            {
              id: 'question_30',
              prompt: 'What is your brand name?',
              order: 1,
              status: ComplianceProgressStatus.not_started,
            },
          ],
        },
        {
          name: 'Per- and Polyfluoroalkyl Substances',
          questions: [
            // 2 questions
            {
              id: 'question_31',
              prompt: 'What is your brand name?',
              order: 1,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_32',
              prompt: 'What is your brand logo?',
              order: 2,
              status: ComplianceProgressStatus.not_started,
            },
          ],
        },
        {
          name: 'Wool',
          questions: [
            // 3 questions
            {
              id: 'question_33',
              prompt: 'What is your brand name?',
              order: 1,
              status: ComplianceProgressStatus.not_started,
            },
          ],
        },
        {
          name: 'Animal Fur & Exotic Leather',
          questions: [
            // 1 question
            {
              id: 'question_34',
              prompt: 'What is your brand name?',
              order: 1,
              status: ComplianceProgressStatus.not_started,
            },
          ],
        },
      ],
    },
    {
      name: 'Environment',
      sections: [
        {
          name: 'GHG Emissions & Climate',
          questions: [
            // 18 questions
            {
              id: 'question_35',
              prompt: 'What is your brand name?',
              order: 1,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_36',
              prompt: 'What is your brand logo?',
              order: 2,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_37',
              prompt: 'What is your brand tagline?',
              order: 3,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_38',
              prompt: 'What is your brand name?',
              order: 4,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_39',
              prompt: 'What is your brand logo?',
              order: 5,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_40',
              prompt: 'What is your brand tagline?',
              order: 6,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_41',
              prompt: 'What is your brand name?',
              order: 7,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_42',
              prompt: 'What is your brand logo?',
              order: 8,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_43',
              prompt: 'What is your brand tagline?',
              order: 9,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_44',
              prompt: 'What is your brand name?',
              order: 10,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_45',
              prompt: 'What is your brand logo?',
              order: 11,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_46',
              prompt: 'What is your brand tagline?',
              order: 12,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_47',
              prompt: 'What is your brand name?',
              order: 13,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_48',
              prompt: 'What is your brand logo?',
              order: 14,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_49',
              prompt: 'What is your brand tagline?',
              order: 15,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_50',
              prompt: 'What is your brand name?',
              order: 16,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_51',
              prompt: 'What is your brand logo?',
              order: 17,
              status: ComplianceProgressStatus.not_started,
            },
            {
              id: 'question_52',
              prompt: 'What is your brand tagline?',
              order: 18,
              status: ComplianceProgressStatus.not_started,
            },
          ],
        },
      ],
    },
  ];
}
