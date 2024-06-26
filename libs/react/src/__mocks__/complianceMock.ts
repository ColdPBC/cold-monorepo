import { Compliance, ComplianceManagerCountsPayload, ComplianceSidebarPayload, OrgCompliance, QuestionnaireComplianceContainerPayLoad } from '@coldpbc/interfaces';

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
        compliance_type: 'target_score',
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
        compliance_type: 'impact_score',
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

export function getQuestionnaireSidebarComplianceMock(): ComplianceSidebarPayload {
  return {
    name: 'rei_pia_2024',
    compliance_section_groups: [
      {
        id: 'csg_1',
        order: 1,
        title: 'Practices',
        compliance_sections: [
          {
            id: 'sec_1',
            order: 1,
            title: 'Brand Information',
            key: 'GEN',
            compliance_questions: [
              {
                id: 'ques_1',
                order: 9,
                prompt: 'How many employees, if any, are currently dedicated to product sustainability at your brand?',
                user_answered: true,
                bookmarked: true,
                not_started: false,
                ai_answered: false,
                key: 'GEN-1',
              },
              {
                id: 'ques_2',
                order: 10,
                prompt:
                  'Please indicate if your brand has supplied to REI in the past 12 months, or anticipates supplying to REI in the next 12 months, products that fall into any of the following categories.',
                user_answered: false,
                bookmarked: true,
                not_started: true,
                ai_answered: false,
                key: 'GEN-2',
              },
              {
                id: 'ques_3',
                order: 0,
                prompt: 'What is your REI Vendor ID?',
                user_answered: true,
                bookmarked: false,
                not_started: false,
                ai_answered: false,
                key: 'GEN-3',
              },
              {
                id: 'ques_4',
                order: 1,
                prompt: 'What is your Vendor Name?',
                user_answered: true,
                bookmarked: false,
                not_started: false,
                ai_answered: false,
                key: 'GEN-4',
              },
              {
                id: 'ques_5',
                order: 2,
                prompt: 'For which brand(s) are you completing the assessment?',
                user_answered: true,
                bookmarked: true,
                not_started: false,
                ai_answered: false,
                key: 'GEN-5',
              },
            ],
          },
          {
            id: 'sec_2',
            order: 2,
            title: 'Manufacturing Code of Conduct',
            key: 'MFG',
            compliance_questions: [
              {
                id: 'ques_6',
                order: 11,
                prompt: 'Does your brand have in place a code of conduct for factories that manufacture the products you supply to REI?',
                score: 0,
                max_score: 1,
                key: 'MFG-0',
                user_answered: false,
                bookmarked: true,
                not_started: false,
                ai_answered: false,
              },
              {
                id: 'ques_7',
                order: 22,
                prompt: 'Is your brand’s supplier list publicly available?',
                score: 1,
                max_score: 1,
                key: 'MFG-8',
                user_answered: true,
                bookmarked: true,
                not_started: false,
                ai_answered: false,
              },
              {
                id: 'ques_8',
                order: 23,
                prompt: 'Please indicate which tiers of your supply chain are represented on your supplier list.',
                score: 0.75,
                max_score: 1,
                key: 'MFG-9',
                user_answered: false,
                bookmarked: false,
                not_started: false,
                ai_answered: false,
              },
              {
                id: 'ques_9',
                order: 24,
                prompt: 'Does your brand have a formal process for utilizing social and/or environmental performance data in sourcing decisions?',
                score: 1,
                max_score: 1,
                key: 'MFG-10',
                user_answered: false,
                bookmarked: true,
                not_started: false,
                ai_answered: false,
              },
              {
                id: 'ques_10',
                order: 25,
                prompt: 'Does your brand have an ongoing training program(s) for suppliers to promote improved sustainability performance within your supply chain?',
                score: 0,
                max_score: 1,
                key: 'MFG-11',
                user_answered: false,
                bookmarked: true,
                not_started: false,
                ai_answered: false,
              },
            ],
          },
          {
            id: 'sec_3',
            order: 3,
            title: 'Core Practices',
            key: 'CRP',
            compliance_questions: [
              {
                id: 'ques_11',
                order: 107,
                prompt: 'Is your brand an active member of or participant in any of the following globally recognized sustainability forums?',
                score: 0,
                max_score: 1,
                ai_answered: true,
                key: 'CRP-1',
                user_answered: false,
                bookmarked: false,
                not_started: false,
              },
              {
                id: 'ques_12',
                order: 108,
                prompt: 'Does your brand have an ongoing commitment to donating a specific portion of your sales or profits to philanthropic causes?',
                score: 0,
                max_score: 1,
                key: 'CRP-2',
                user_answered: false,
                bookmarked: false,
                not_started: false,
                ai_answered: true,
              },
              {
                id: 'ques_13',
                order: 109,
                prompt:
                  'Does your brand publish regular public-facing updates on your sustainability commitments and progress toward those commitments (e.g., annual sustainability report)?',
                score: 0,
                max_score: 1,
                key: 'CRP-3',
                user_answered: false,
                bookmarked: false,
                not_started: false,
                ai_answered: true,
              },
            ],
          },
        ],
      },
      {
        id: 'csg_2',
        order: 2,
        title: 'Materials',
        compliance_sections: [
          {
            id: 'sec_4',
            order: 4,
            title: 'Restricted Substances List & Chemicals Management',
            key: 'CHEM',
            compliance_questions: [
              {
                id: 'ques_14',
                order: 26,
                prompt:
                  'As part of the REI Product Impact Standards, REI expects each brand partner to have in place a Restricted Substances List (RSL) that specifies which substances are banned or restricted in products and that meets or exceeds all applicable regulatory requirements.\n\nDoes your brand have an RSL in place for the products you supply to REI?',
                score: 0,
                max_score: 1,
                key: 'CHEM-0',
                user_answered: false,
                bookmarked: false,
                ai_answered: true,
                not_started: false,
              },
            ],
          },
        ],
      },
      {
        id: 'csg_3',
        order: 3,
        title: 'Environment',
        compliance_sections: [
          {
            id: 'sec_5',
            order: 5,
            title: 'GHG Emissions & Climate',
            key: 'GHG',
            compliance_questions: [
              {
                id: 'ques_15',
                order: 32,
                prompt:
                  'As part of the REI Product Impact Standards, REI expects each brand partner to measure their annual greenhouse gas (GHG) emissions, set a reduction target, and implement an action plan for reducing their emissions. The following section focuses on the steps your brand is taking to address your contribution to climate change.\n\nHas your brand measured its carbon footprint this year or within the last calendar year?',
                score: 0,
                max_score: 1,
                key: 'GHG-1',
                user_answered: false,
                bookmarked: false,
                not_started: false,
                ai_answered: true,
              },
              {
                id: 'ques_16',
                order: 39,
                prompt: 'Has your brand set a quantitative target(s) to reduce your carbon emissions?',
                score: 1,
                max_score: 1,
                key: 'GHG-7',
                user_answered: false,
                bookmarked: false,
                not_started: false,
                ai_answered: true,
              },
              {
                id: 'ques_17',
                order: 40,
                prompt: 'Which components of your carbon footprint are covered by your quantitative reduction target?',
                score: 0,
                max_score: 1,
                key: 'GHG-7A',
                user_answered: false,
                bookmarked: false,
                not_started: false,
                ai_answered: true,
              },
              {
                id: 'ques_18',
                order: 41,
                prompt:
                  'Please tell us about your quantitative Scope 3 reduction targets.\n\nWhat percent reduction are you aiming to achieve from your baseline year to your target year?',
                key: 'GHG-7B:1',
                user_answered: false,
                bookmarked: false,
                not_started: false,
                ai_answered: true,
              },
              {
                id: 'ques_19',
                order: 42,
                prompt: 'Please tell us about your quantitative Scope 3 reduction targets.\n\nWhat year are you using as your baseline year?',
                key: 'GHG-7B:2',
                user_answered: false,
                bookmarked: false,
                not_started: false,
                ai_answered: true,
              },
              {
                id: 'ques_20',
                order: 43,
                prompt: 'Please tell us about your quantitative Scope 3 reduction targets.\n\nWhat year are you using as your target year?',
                key: 'GHG-7B:3',
                user_answered: false,
                bookmarked: false,
                not_started: false,
                ai_answered: true,
              },
              {
                id: 'ques_21',
                order: 44,
                prompt:
                  'Please select one of the following to indicate if your target is for absolute emissions reduction (i.e., total carbon emissions) or reduction in emissions intensity (i.e., carbon emissions per unit of product or dollar of revenue):',
                score: 0,
                max_score: 1,
                key: 'GHG-7C',
                user_answered: false,
                bookmarked: false,
                not_started: false,
                ai_answered: true,
              },
            ],
          },
        ],
      },
    ],
  };
}

export function getQuestionnaireContainerMock(sectionGroupId: string, sectionId: string): QuestionnaireComplianceContainerPayLoad | undefined {
  const mock: QuestionnaireComplianceContainerPayLoad = {
    name: 'rei_pia_2024',
    compliance_section_groups: [
      {
        id: 'csg_1',
        order: 1,
        title: 'Practices',
        compliance_sections: [
          {
            id: 'sec_1',
            order: 1,
            title: 'Brand Information',
            key: 'GEN',
            compliance_questions: [
              {
                id: 'ques_1',
                order: 9,
                prompt: 'How many employees, if any, are currently dedicated to product sustainability at your brand?',
                options: ['0', '1', '2-5', '6-10', '11-25', '26-50', '51+'],
                tooltip:
                  'Note: Select the total number of full-time equivalents working on sustainability at your corporate headquarters, in regional offices, and/or at your parent company.',
                component: 'select',
                placeholder: '',
                user_answered: true,
                bookmarked: true,
                not_started: false,
                ai_answered: false,
                key: 'GEN-1',
                compliance_responses: [
                  {
                    org_response: null,
                    ai_response: null,
                  },
                ],
              },
              {
                id: 'ques_2',
                order: 10,
                prompt:
                  'Please indicate if your brand has supplied to REI in the past 12 months, or anticipates supplying to REI in the next 12 months, products that fall into any of the following categories.',
                options: [
                  'Apparel',
                  'Accessories (textile-based)',
                  'Cookware',
                  'Footwear',
                  'Headwear',
                  'Other textile products',
                  'Packs',
                  'Products that contain down',
                  'Products that contain leather',
                  'Products that contain wool',
                  'Ski wax',
                  'Sleeping bags',
                  'Sunscreens or other formulated sun-protection products',
                  'Tents',
                  'Treatments for gear and clothing',
                  'Water bottles, food containers, dinnerware or utensils',
                  'None of the above',
                ],
                tooltip:
                  'Note: This is not an exhaustive list of product categories sold at REI. Your selection below will determine whether you see questions in the online version of the assessment that are specifically related to each product category.',
                component: 'multi_select',
                placeholder: '',
                user_answered: false,
                bookmarked: true,
                not_started: true,
                ai_answered: false,
                key: 'GEN-2',
                compliance_responses: [
                  {
                    org_response: null,
                    ai_response: null,
                  },
                ],
              },
              {
                id: 'ques_3',
                order: 0,
                prompt: 'What is your REI Vendor ID?',
                options: [],
                tooltip: '',
                component: 'text',
                placeholder: '',
                user_answered: true,
                bookmarked: false,
                not_started: false,
                ai_answered: false,
                key: 'GEN-3',
                compliance_responses: [
                  {
                    org_response: {
                      value: '213523532',
                    },
                    ai_response: null,
                  },
                ],
              },
              {
                id: 'ques_4',
                order: 1,
                prompt: 'What is your Vendor Name?',
                options: [],
                tooltip: '',
                component: 'text',
                placeholder: '',
                user_answered: true,
                bookmarked: false,
                not_started: false,
                ai_answered: false,
                key: 'GEN-4',
                compliance_responses: [
                  {
                    org_response: {
                      value: "Ben's Amazing Wool Company",
                    },
                    ai_response: null,
                  },
                ],
              },
              {
                id: 'ques_5',
                order: 2,
                prompt: 'For which brand(s) are you completing the assessment?',
                options: [],
                tooltip: '',
                component: 'multi_text',
                placeholder: '',
                user_answered: true,
                bookmarked: true,
                not_started: false,
                ai_answered: false,
                key: 'GEN-5',
                compliance_responses: [
                  {
                    org_response: {
                      value: ['Socks', 'Hats', 'Other good stuff'],
                    },
                    ai_response: null,
                  },
                ],
              },
            ],
          },
          {
            id: 'sec_2',
            order: 2,
            title: 'Manufacturing Code of Conduct',
            key: 'MFG',
            compliance_questions: [
              {
                id: 'ques_6',
                order: 11,
                prompt: 'Does your brand have in place a code of conduct for factories that manufacture the products you supply to REI?',
                options: [],
                tooltip: '',
                component: 'yes_no',
                placeholder: '',
                score: 0,
                max_score: 1,
                key: 'MFG-0',
                user_answered: false,
                bookmarked: true,
                not_started: false,
                ai_answered: false,
                compliance_responses: [
                  {
                    org_response: null,
                    ai_response: null,
                  },
                ],
              },
              {
                id: 'ques_7',
                order: 22,
                prompt: 'Is your brand’s supplier list publicly available?',
                options: [],
                tooltip: '',
                component: 'yes_no',
                placeholder: '',
                additional_context: {
                  prompt: 'Please provide the hyperlink.',
                  operator: '==',
                  component: 'textarea',
                  comparison: true,
                  placeholder: '',
                },
                score: 1,
                max_score: 1,
                key: 'MFG-8',
                user_answered: true,
                bookmarked: true,
                not_started: false,
                ai_answered: false,
                compliance_responses: [
                  {
                    org_response: {
                      value: true,
                    },
                    ai_response: null,
                  },
                ],
              },
              {
                id: 'ques_8',
                order: 23,
                prompt: 'Please indicate which tiers of your supply chain are represented on your supplier list.',
                options: [
                  'Tier 1 (finished product manufacturers)',
                  'Tier 2 (finished material/subcomponent manufacturers)',
                  'Tier 3 (raw material processors)',
                  'Tier 4 (raw material suppliers)',
                ],
                tooltip: '',
                component: 'multi_select',
                placeholder: '',
                score: 0.75,
                max_score: 1,
                key: 'MFG-9',
                user_answered: false,
                bookmarked: false,
                not_started: false,
                ai_answered: false,
                compliance_responses: [
                  {
                    org_response: null,
                    ai_response: null,
                  },
                ],
              },
              {
                id: 'ques_9',
                order: 24,
                prompt: 'Does your brand have a formal process for utilizing social and/or environmental performance data in sourcing decisions?',
                options: [],
                tooltip: '',
                component: 'yes_no',
                placeholder: '',
                score: 1,
                max_score: 1,
                key: 'MFG-10',
                user_answered: false,
                bookmarked: true,
                not_started: false,
                ai_answered: false,
                compliance_responses: [
                  {
                    org_response: {
                      value: true,
                    },
                    ai_response: null,
                  },
                ],
              },
              {
                id: 'ques_10',
                order: 25,
                prompt: 'Does your brand have an ongoing training program(s) for suppliers to promote improved sustainability performance within your supply chain?',
                options: [],
                tooltip: '',
                component: 'yes_no',
                placeholder: '',
                score: 0,
                max_score: 1,
                key: 'MFG-11',
                user_answered: false,
                bookmarked: true,
                not_started: false,
                ai_answered: false,
                compliance_responses: [
                  {
                    org_response: null,
                    ai_response: null,
                  },
                ],
              },
            ],
          },
          {
            id: 'sec_3',
            order: 3,
            title: 'Core Practices',
            key: 'CRP',
            compliance_questions: [
              {
                id: 'ques_11',
                order: 107,
                prompt: 'Is your brand an active member of or participant in any of the following globally recognized sustainability forums?',
                options: [
                  '1% for the Planet',
                  'American Apparel & Footwear Association: Social Responsibility or Environmental Committees',
                  'B Corp',
                  'bluesign®',
                  'Business Social Compliance Initiative',
                  'Change Climate (formerly known as Climate Neutral)',
                  'Ethical Trading Initiative',
                  'Fair Factories Clearinghouse',
                  'Fair Labor Association',
                  'Fair Wear Foundation',
                  'Footwear Distributors & Retailers of America',
                  'Global Social Compliance Programme',
                  'Green Chemistry & Commerce Council',
                  'International Labour Organization Better Work Programme',
                  'Leather Working Group',
                  'Outdoor Industry Association Climate Action Corps',
                  'Outdoor Industry Association Sustainability Working Group',
                  'PeopleForBikes Sustainability Working Group',
                  'Retail Industry Leaders Association: Sustainability Workgroups',
                  'Science Based Targets Initiative',
                  'Snowsports Industries America ClimateUnited',
                  'Social and Labor Convergence Program',
                  'Sustainable Apparel Coalition',
                  'Textile Exchange',
                  'The Microfibre Consortium',
                  'Zero Discharge of Hazardous Chemicals',
                  'Others',
                ],
                tooltip: '',
                component: 'multi_select',
                placeholder: '',
                additional_context: {
                  prompt: 'Please list here',
                  operator: 'has',
                  component: 'textarea',
                  comparison: 'Others',
                  placeholder: '',
                  ai_answered: false,
                  ai_response: {
                    justification:
                      "The information provided earlier does not include any membership or participation in sustainability forums that align with the 'Others' category. Without further context or definition of what 'Others' constitutes, it is not possible to state that the brand is a member or participant in an 'Others' category of sustainability forums.",
                  },
                  ai_attempted: true,
                },
                score: 0,
                max_score: 1,
                ai_answered: true,
                ai_attempted: true,
                key: 'CRP-1',
                user_answered: false,
                bookmarked: false,
                not_started: false,
                compliance_responses: [
                  {
                    org_response: null,
                    ai_response: {
                      answer: [
                        'Fair Trade Certified',
                        'Leather Working Group',
                        'Outdoor Industry Association Climate Action Corps',
                        'bluesign',
                        'Zero Discharge of Hazardous Chemicals',
                        'Change Climate (formerly known as Climate Neutral)',
                      ],
                      justification:
                        "The report mentions Fair Trade Certified manufacturing partners, the membership of Leather Working Group and Bluesign for materials, participation in the Outdoor Industry Association Climate Action Corps for climate initiatives, and their involvement with Climate Neutral (formerly known as Change Climate) for carbon emissions offsetting. The term 'Zero Discharge of Hazardous Chemicals' does not appear explicitly in the quotes, but Climate Neutral's mission to verify annual carbon emissions aligns with the goals of ZDHC, so it's included based on the context.",
                      references: null,
                    },
                  },
                ],
              },
              {
                id: 'ques_12',
                order: 108,
                prompt: 'Does your brand have an ongoing commitment to donating a specific portion of your sales or profits to philanthropic causes?',
                options: [],
                tooltip: '',
                component: 'yes_no',
                placeholder: '',
                additional_context: {
                  prompt: 'Please describe',
                  operator: '==',
                  component: 'textarea',
                  comparison: true,
                  placeholder: '',
                  ai_answered: true,
                  ai_response: {
                    answer:
                      "Since 2016, the brand has been committed to the '1% for the Planet' initiative, pledging to donate a minimum of 1% of its annual revenue to environmental nonprofits. Over the years, the company has contributed more than $4,500,000 to support various grassroots environmental causes.",
                  },
                  ai_attempted: true,
                },
                score: 0,
                max_score: 1,
                ai_attempted: true,
                key: 'CRP-2',
                user_answered: false,
                bookmarked: false,
                not_started: false,
                ai_answered: true,
                compliance_responses: [
                  {
                    org_response: null,
                    ai_response: {
                      answer: true,
                      justification:
                        "The company has an ongoing commitment to donating a specific portion of sales or profits to philanthropic causes, as documented by their participation in the '1% for the Planet' initiative since 2016. They have committed to donate at least 1% of all revenue to grassroots environmental nonprofits and have donated over $4,500,000 to date.",
                      references: null,
                    },
                  },
                ],
              },
              {
                id: 'ques_13',
                order: 109,
                prompt:
                  'Does your brand publish regular public-facing updates on your sustainability commitments and progress toward those commitments (e.g., annual sustainability report)?',
                options: [],
                tooltip: '',
                component: 'yes_no',
                placeholder: '',
                additional_context: {
                  prompt: 'Please provide the hyperlink.',
                  operator: '==',
                  component: 'textarea',
                  comparison: true,
                  placeholder: '',
                  ai_answered: false,
                  ai_response: {
                    justification:
                      "The document provided does not contain a hyperlink as it is a PDF file. Hyperlink information for a public-facing update would typically be found on the brand's official website or digital platforms, which is not available in the documents provided.",
                  },
                  ai_attempted: true,
                },
                score: 0,
                max_score: 1,
                ai_attempted: true,
                key: 'CRP-3',
                user_answered: false,
                bookmarked: false,
                not_started: false,
                ai_answered: true,
                compliance_responses: [
                  {
                    org_response: null,
                    ai_response: {
                      answer: true,
                      justification:
                        'The brand publishes an annual progress report that provides updates on their sustainability commitments and progress. This is indicated by the existence of the 2022 (IN) Progress report found within the files provided.',
                      references: [
                        {
                          file: 'Askov Demo Doc.pdf',
                          text: [
                            "does your company formally screen for regarding the social or \nenvironmental practices and performance of your suppliers?\nAskov Finlayson Answer:\nCompliance with all local laws and regulations, including those \nrelated to social and environmental performance\nGood governance, including policies related to ethics and corruption\nPositive practices beyond what is required by regulations (e.g. \nenvironmentally-friendly manufacturing process, excellent labor \npractices)\nB Corp Question 91\nCategory: Community - Supply Chain Management - Supplier Evaluation \nPractices\nQuestion:\nWhat methods does your company use to evaluate the social or \nenvironmental impact of your suppliers?\nAskov Finlayson Answer:\nWe share policies or rules with suppliers but we don't have a \n\nverification process in place\nB Corp Question 92\nCategory: Community - Supply Chain Management - Outsourced Staffing \nServices\nQuestion:\nDoes your company outsource support services (staffing) essential to \nthe delivery of your",
                            "and treatments that pollute \nwater; our other apparel items are made from certified organic pima \ncotton, which is produced without chemical fertilizers/pesticides/\nherbicides/defoliants and is hand-picked; and with the carbon offsets \npurchased at more than we used to produce the product, many positive \nenvironmental outcomes are realized (Google global warming \nexternalities). We’ve committed to investing more money fighting \nclimate change than running our business costs the planet. We call \nthis way of doing business climate positive, and we achieve it by \nmeasuring our annual carbon footprint, converting that amount of \ncarbon into a dollar amount using the social cost of carbon, and then \nGiving 110% of that amount every year to leading-edge organizations \nworking to solve the climate crisis.  #KeepTheNorthCold\nB Corp Question 101\nCategory: Environment - Environment Impact Area Introduction - \nEnvironmental Product or Service Impact\nQuestion:\nIs the environmental impact you've",
                            'your product/service conserve the \nenvironment?\nPlease select ONE option per product line. You may select an \nadditional option if your product line has two separate environmental \nattributes.\nAskov Finlayson Answer:\nConserves or diverts resources (including energy, water, materials, \netc.)\nReduces or is made of less toxic/hazardous substances (e.g. brownfield \nremediation services, organic certified food, non-toxic cleaners)\nB Corp Question 103\nCategory: Environment - Environment Impact Area Introduction - \nResource Conservation Overview\nQuestion:\nTell us more about how your product or service reduces energy, GHG \nemissions, water and/or waste.\nAskov Finlayson Answer:\nOur outerwear products and hats are made with recycled materials \n(e.g., 100% recycled polyester and nylon), which reduces waste by \nrepurposing existing materials. Our other apparel items (e.g., tees \nand crews) are produced with organic cotton that is hand-picked in \norder to reduce energy consumption and emissions',
                          ],
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'csg_2',
        order: 2,
        title: 'Materials',
        compliance_sections: [
          {
            id: 'sec_4',
            order: 4,
            title: 'Restricted Substances List & Chemicals Management',
            key: 'CHEM',
            compliance_questions: [
              {
                id: 'ques_14',
                order: 26,
                prompt:
                  'As part of the REI Product Impact Standards, REI expects each brand partner to have in place a Restricted Substances List (RSL) that specifies which substances are banned or restricted in products and that meets or exceeds all applicable regulatory requirements.\n\nDoes your brand have an RSL in place for the products you supply to REI?',
                options: [],
                tooltip:
                  'Note: Brands that sell products in categories regulated by the U.S. Food and Drug Administration (FDA) or U.S. Department of Agriculture (USDA) do not need to have a separate RSL for their products in these categories.',
                component: 'yes_no',
                placeholder: '',
                additional_context: {
                  prompt: "Describe how your brand plans to align with REI's expectation in this area.",
                  operator: '==',
                  component: 'textarea',
                  comparison: false,
                  placeholder: '',
                  ai_answered: true,
                  ai_response: {
                    answer:
                      "Our brand aligns with REI's expectations by having an established Restricted Substances List (RSL) that we strictly adhere to for the products we supply to REI, as indicated in the list of Key Partners within our materials section 【7†source】. This ensures compliance with all applicable regulatory requirements and upholds REI's Product Impact Standards.",
                  },
                  ai_attempted: true,
                },
                score: 0,
                max_score: 1,
                ai_attempted: true,
                key: 'CHEM-0',
                user_answered: false,
                bookmarked: false,
                ai_answered: true,
                not_started: false,
                compliance_responses: [
                  {
                    org_response: null,
                    ai_response: {
                      answer: true,
                      justification:
                        "The document provided explicitly lists 'REI RSL' under Key Partners within the materials section, indicating that the brand has an REI Restricted Substances List (RSL) in place for the products they supply to REI【7†source】.",
                      references: null,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'csg_3',
        order: 3,
        title: 'Environment',
        compliance_sections: [
          {
            id: 'sec_5',
            order: 5,
            title: 'GHG Emissions & Climate',
            key: 'GHG',
            compliance_questions: [
              {
                id: 'ques_15',
                order: 32,
                prompt:
                  'As part of the REI Product Impact Standards, REI expects each brand partner to measure their annual greenhouse gas (GHG) emissions, set a reduction target, and implement an action plan for reducing their emissions. The following section focuses on the steps your brand is taking to address your contribution to climate change.\n\nHas your brand measured its carbon footprint this year or within the last calendar year?',
                options: [],
                tooltip: 'Note: The term “carbon” is used here as a generally accepted shorthand for “greenhouse gas”.',
                component: 'yes_no',
                placeholder: '',
                corresponding_question: 'GHG-1',
                score: 0,
                max_score: 1,
                ai_attempted: true,
                key: 'GHG-1',
                user_answered: false,
                bookmarked: false,
                not_started: false,
                ai_answered: true,
                compliance_responses: [
                  {
                    org_response: null,
                    ai_response: {
                      answer: true,
                      justification:
                        'According to the document, the brand Peak Design, as part of their sustainability efforts, has measured and verified its annual carbon emissions for the year 2021 through Climate Neutral, accounting for a footprint of 30125 t CO2. Scope 3 emissions comprised over 99% of this footprint. Furthermore, the document outlines that the company has offset the entirety of its footprint using verified credits【7†source】.',
                      references: null,
                    },
                  },
                ],
              },
              {
                id: 'ques_16',
                order: 39,
                prompt: 'Has your brand set a quantitative target(s) to reduce your carbon emissions?',
                options: [],
                tooltip: '',
                component: 'yes_no',
                placeholder: '',
                corresponding_question: 'GHG-7',
                score: 1,
                max_score: 1,
                ai_attempted: true,
                key: 'GHG-7',
                user_answered: false,
                bookmarked: false,
                not_started: false,
                ai_answered: true,
                compliance_responses: [
                  {
                    org_response: {
                      value: true,
                    },
                    ai_response: {
                      answer: true,
                      justification:
                        'The document states the company has committed to a Science Based Targets initiative (SBTi) reduction target. Specifically, they set a Scope 1 & 2 absolute reduction of 50% by 2030 from a 2021 baseline and a Scope 3 economic intensity reduction of 30% by 2025 from a 2020 baseline, which indicates that Peak Design has indeed set quantitative targets to reduce their carbon emissions【0†source】.',
                      references: null,
                    },
                  },
                ],
              },
              {
                id: 'ques_17',
                order: 40,
                prompt: 'Which components of your carbon footprint are covered by your quantitative reduction target?',
                options: [
                  'Scope 1: Direct emissions from company vehicles & facilities',
                  'Scope 2: Indirect emission from purchased electricity, steam, heating & cooling for own use',
                  'Scope 3: Indirect emissions from purchased goods and services (i.e., Category 1)',
                  'Scope 3: Indirect emissions from all other upstream and downstream sources (i.e., Categories 2-15)',
                ],
                tooltip: '',
                component: 'multi_select',
                placeholder: '',
                corresponding_question: 'GHG-7A',
                score: 0,
                max_score: 1,
                ai_attempted: true,
                key: 'GHG-7A',
                user_answered: false,
                bookmarked: false,
                not_started: false,
                ai_answered: true,
                compliance_responses: [
                  {
                    org_response: null,
                    ai_response: {
                      answer: [
                        'Scope 1: Direct emissions from company vehicles & facilities',
                        'Scope 2: Indirect emission from purchased electricity, steam, heating & cooling for own use',
                        'Scope 3: Indirect emissions from all other upstream and downstream sources (i.e., Categories 2-15)',
                      ],
                      justification:
                        'The document specifies that as a Small to Medium Sized Enterprise (SME) under SBTi standards, the company is only required to set Scope 1 & 2 emission reduction targets, but they have also set a Scope 3 target. This indicates that the quantitative reduction target covers Scope 1, Scope 2, and Scope 3 emissions, which include direct emissions from company vehicles and facilities, indirect emissions from purchased energy, and all other indirect emissions from upstream and downstream value chain sources【115†source】.',
                      references: null,
                    },
                  },
                ],
              },
              {
                id: 'ques_18',
                order: 41,
                prompt:
                  'Please tell us about your quantitative Scope 3 reduction targets.\n\nWhat percent reduction are you aiming to achieve from your baseline year to your target year?',
                options: [],
                tooltip: '',
                component: 'percent_slider',
                placeholder: '',
                corresponding_question: 'GHG-7B',
                ai_attempted: true,
                key: 'GHG-7B:1',
                user_answered: false,
                bookmarked: false,
                not_started: false,
                ai_answered: true,
                compliance_responses: [
                  {
                    org_response: null,
                    ai_response: {
                      answer: "Peak Design's Scope 3 target is an economic intensity reduction of 30% by 2025 from a 2020 baseline.",
                      justification: '',
                      references: null,
                    },
                  },
                ],
              },
              {
                id: 'ques_19',
                order: 42,
                prompt: 'Please tell us about your quantitative Scope 3 reduction targets.\n\nWhat year are you using as your baseline year?',
                options: [],
                tooltip: '',
                component: 'text',
                placeholder: '',
                corresponding_question: 'GHG-7B',
                ai_attempted: true,
                key: 'GHG-7B:2',
                user_answered: false,
                bookmarked: false,
                not_started: false,
                ai_answered: true,
                compliance_responses: [
                  {
                    org_response: null,
                    ai_response: {
                      answer: 'The baseline year used by Peak Design for its quantitative Scope 3 reduction target is the year 2020.',
                      justification: '',
                      references: null,
                    },
                  },
                ],
              },
              {
                id: 'ques_20',
                order: 43,
                prompt: 'Please tell us about your quantitative Scope 3 reduction targets.\n\nWhat year are you using as your target year?',
                options: [],
                tooltip: '',
                component: 'text',
                placeholder: '',
                corresponding_question: 'GHG-7B',
                ai_attempted: true,
                key: 'GHG-7B:3',
                user_answered: false,
                bookmarked: false,
                not_started: false,
                ai_answered: true,
                compliance_responses: [
                  {
                    org_response: null,
                    ai_response: {
                      answer: "The target year for Peak Design's quantitative Scope 3 reduction is 2025.",
                      justification: '',
                      references: null,
                    },
                  },
                ],
              },
              {
                id: 'ques_21',
                order: 44,
                prompt:
                  'Please select one of the following to indicate if your target is for absolute emissions reduction (i.e., total carbon emissions) or reduction in emissions intensity (i.e., carbon emissions per unit of product or dollar of revenue):',
                options: ['Absolute emissions reduction', 'Reduction in emissions intensity'],
                tooltip: '',
                component: 'select',
                placeholder: '',
                corresponding_question: 'GHG-7C',
                score: 0,
                max_score: 1,
                ai_attempted: true,
                key: 'GHG-7C',
                user_answered: false,
                bookmarked: false,
                not_started: false,
                ai_answered: true,
                compliance_responses: [
                  {
                    org_response: null,
                    ai_response: {
                      answer: ['Absolute emissions reduction'],
                      justification:
                        'The document specifies that the brand has set an absolute reduction target of 50% by 2030 from a 2021 baseline for Scope 1 & 2 emissions. Although they have also set an economic intensity reduction target for Scope 3 emissions, the prompt specifically asks for the type of target set for the absolute emissions reduction, which is clearly stated for Scope 1 & 2 emissions【123†source】.',
                      references: null,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  // Find the section in each section group
  let questions: QuestionnaireComplianceContainerPayLoad | undefined;

  mock.compliance_section_groups.forEach(sectionGroup => {
    sectionGroup.compliance_sections.forEach(section => {
      if (sectionGroup.id === sectionGroupId && section.id === sectionId) {
        questions = {
          name: 'rei_pia_2024',
          compliance_section_groups: [
            {
              id: sectionGroup.id,
              order: sectionGroup.order,
              title: sectionGroup.title,
              compliance_sections: [
                {
                  id: section.id,
                  order: section.order,
                  title: section.title,
                  key: section.key,
                  compliance_questions: section.compliance_questions,
                },
              ],
            },
          ],
        };
      }
    });
  });

  return questions;
}

export function getComplianceCountsMock(): ComplianceManagerCountsPayload {
  return {
    name: 'rei_pia_2024',
    compliance_section_groups: [
      {
        id: 'csg_mnjg81nrtfgsphp4',
        title: 'Practices',
        order: 0,
        compliance_sections: [
          {
            id: 'cs_p03di0afkskmd6xs',
            key: 'GEN',
            title: 'Brand Information',
            order: 0,
            score: 0,
            ai_score: 0,
            max_score: 0,
            counts: {
              not_started: 11,
              org_answered: 0,
              ai_answered: 0,
              bookmarked: 1,
            },
          },
          {
            id: 'cs_g3xkxk4vkdwc7fjz',
            key: 'MFG',
            title: 'Manufacturing Code of Conduct & Responsible Sourcing',
            order: 1,
            score: 0,
            ai_score: 1,
            max_score: 4,
            counts: {
              not_started: 3,
              org_answered: 0,
              ai_answered: 1,
              bookmarked: 0,
            },
          },
          {
            id: 'cs_fqiwgmgebqp9il2e',
            key: 'CRP',
            title: 'Core Practices',
            order: 22,
            score: 0,
            ai_score: 3,
            max_score: 3,
            counts: {
              not_started: 2,
              org_answered: 0,
              ai_answered: 4,
              bookmarked: 0,
            },
          },
        ],
        counts: {
          not_started: 16,
          org_answered: 0,
          ai_answered: 5,
          bookmarked: 1,
        },
      },
      {
        id: 'csg_u52xp76tclba5djc',
        title: 'D & I',
        order: 0,
        compliance_sections: [
          {
            id: 'cs_a243nr32celxvegb',
            key: 'MKT',
            title: 'Diversity & Inclusion: Marketing Diversity',
            order: 12,
            score: 0,
            ai_score: 0.5,
            max_score: 1.5,
            counts: {
              not_started: 0,
              org_answered: 0,
              ai_answered: 1,
              bookmarked: 0,
            },
          },
        ],
        counts: {
          not_started: 0,
          org_answered: 0,
          ai_answered: 1,
          bookmarked: 0,
        },
      },
      {
        id: 'csg_gnawsv7bv67xumws',
        title: 'Product',
        order: 0,
        compliance_sections: [
          {
            id: 'cs_n7x4kqfvkm0hsw0u',
            key: 'PRD',
            title: 'Product Care, Repair, Reuse & End-of-life',
            order: 21,
            score: 0,
            ai_score: 2,
            max_score: 6,
            counts: {
              not_started: 4,
              org_answered: 0,
              ai_answered: 2,
              bookmarked: 0,
            },
          },
          {
            id: 'cs_knwupnz9o24amkfb',
            key: 'PSA',
            title: 'Product Sustainability & Preferred Attributes',
            order: 18,
            score: 0,
            ai_score: 1,
            max_score: 2,
            counts: {
              not_started: 1,
              org_answered: 0,
              ai_answered: 1,
              bookmarked: 0,
            },
          },
        ],
        counts: {
          not_started: 5,
          org_answered: 0,
          ai_answered: 3,
          bookmarked: 0,
        },
      },
    ],
    counts: {
      not_started: 21,
      org_answered: 0,
      ai_answered: 9,
      bookmarked: 1,
    },
  };
}
