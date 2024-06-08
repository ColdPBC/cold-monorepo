import { Compliance, OrgCompliance, QuestionnaireQuestion } from '@coldpbc/interfaces';

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

export function getQuestionnaireSidebarComplianceMock(): {
  name: string;
  key: string;
  sections: {
    name: string;
    key: string;
    questions: QuestionnaireQuestion[];
  }[];
}[] {
  return [
    {
      name: 'Practices',
      key: 'PRA',
      sections: [
        {
          name: 'Brand Information',
          key: 'GEN',
          questions: [
            {
              order: 9,
              prompt: 'How many employees, if any, are currently dedicated to product sustainability at your brand?',
              options: ['0', '1', '2-5', '6-10', '11-25', '26-50', '51+'],
              tooltip:
                'Note: Select the total number of full-time equivalents working on sustainability at your corporate headquarters, in regional offices, and/or at your parent company.',
              component: 'select',
              placeholder: '',
              value: null,
              user_answered: true,
              bookmarked: true,
              not_started: false,
              ai_answered: false,
              key: 'GEN-1',
            },
            {
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
            },
            {
              order: 0,
              prompt: 'What is your REI Vendor ID?',
              options: [],
              tooltip: '',
              component: 'text',
              placeholder: '',
              value: '213523532',
              user_answered: true,
              bookmarked: false,
              not_started: false,
              ai_answered: false,
              key: 'GEN-3',
            },
            {
              order: 1,
              prompt: 'What is your Vendor Name?',
              options: [],
              tooltip: '',
              component: 'text',
              placeholder: '',
              value: "Ben's Amazing Wool Company",
              user_answered: true,
              bookmarked: false,
              not_started: false,
              ai_answered: false,
              key: 'GEN-4',
            },
            {
              order: 2,
              prompt: 'For which brand(s) are you completing the assessment?',
              options: [],
              tooltip: '',
              component: 'multi_text',
              placeholder: '',
              value: ['Socks', 'Hats', 'Other good stuff'],
              user_answered: true,
              bookmarked: true,
              not_started: false,
              ai_answered: false,
              key: 'GEN-5',
            },
          ],
        },
        {
          name: 'Manufacturing Code of Conduct',
          key: 'MFG',
          questions: [
            {
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
            },
            {
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
              value: true,
              max_score: 1,
              key: 'MFG-8',
              user_answered: true,
              bookmarked: true,
              not_started: false,
              ai_answered: false,
            },
            {
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
            },
            {
              order: 24,
              prompt: 'Does your brand have a formal process for utilizing social and/or environmental performance data in sourcing decisions?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              score: 1,
              value: true,
              max_score: 1,
              key: 'MFG-10',
              user_answered: false,
              bookmarked: true,
              not_started: false,
              ai_answered: false,
            },
            {
              order: 25,
              prompt: 'Does your brand have an ongoing training program(s) for suppliers to promote improved sustainability performance within your supply chain?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              score: 0,
              value: null,
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
          name: 'Core Practices',
          key: 'CRP',
          questions: [
            {
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
              },
              ai_attempted: true,
              key: 'CRP-1',
              user_answered: false,
              bookmarked: false,
              not_started: false,
            },
            {
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
              ai_response: {
                answer: true,
                justification:
                  "The company has an ongoing commitment to donating a specific portion of sales or profits to philanthropic causes, as documented by their participation in the '1% for the Planet' initiative since 2016. They have committed to donate at least 1% of all revenue to grassroots environmental nonprofits and have donated over $4,500,000 to date.",
              },
              ai_attempted: true,
              key: 'CRP-2',
              user_answered: false,
              bookmarked: false,
              not_started: false,
              ai_answered: true,
            },
            {
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
              ai_response: {
                answer: true,
                justification:
                  'The brand publishes an annual progress report that provides updates on their sustainability commitments and progress. This is indicated by the existence of the 2022 (IN) Progress report found within the files provided.',
              },
              ai_attempted: true,
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
      name: 'Materials',
      key: 'MAT',
      sections: [
        {
          name: 'Restricted Substances List & Chemicals Management',
          key: 'CHEM',
          questions: [
            {
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
              ai_response: {
                answer: true,
                justification:
                  "The document provided explicitly lists 'REI RSL' under Key Partners within the materials section, indicating that the brand has an REI Restricted Substances List (RSL) in place for the products they supply to REI【7†source】.",
              },
              ai_attempted: true,
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
      name: 'Environment',
      key: 'ENV',
      sections: [
        {
          name: 'GHG Emissions & Climate',
          key: 'GHG',
          questions: [
            {
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
              ai_response: {
                answer: true,
                justification:
                  'According to the document, the brand Peak Design, as part of their sustainability efforts, has measured and verified its annual carbon emissions for the year 2021 through Climate Neutral, accounting for a footprint of 30125 t CO2. Scope 3 emissions comprised over 99% of this footprint. Furthermore, the document outlines that the company has offset the entirety of its footprint using verified credits【7†source】.',
              },
              ai_attempted: true,
              key: 'GHG-1',
              user_answered: false,
              bookmarked: false,
              not_started: false,
              ai_answered: true,
            },
            {
              order: 39,
              prompt: 'Has your brand set a quantitative target(s) to reduce your carbon emissions?',
              options: [],
              tooltip: '',
              component: 'yes_no',
              placeholder: '',
              corresponding_question: 'GHG-7',
              score: 1,
              value: true,
              max_score: 1,
              ai_response: {
                answer: true,
                justification:
                  'The document states the company has committed to a Science Based Targets initiative (SBTi) reduction target. Specifically, they set a Scope 1 & 2 absolute reduction of 50% by 2030 from a 2021 baseline and a Scope 3 economic intensity reduction of 30% by 2025 from a 2020 baseline, which indicates that Peak Design has indeed set quantitative targets to reduce their carbon emissions【0†source】.',
              },
              ai_attempted: true,
              key: 'GHG-7',
              user_answered: false,
              bookmarked: false,
              not_started: false,
              ai_answered: true,
            },
            {
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
              ai_response: {
                answer: [
                  'Scope 1: Direct emissions from company vehicles & facilities',
                  'Scope 2: Indirect emission from purchased electricity, steam, heating & cooling for own use',
                  'Scope 3: Indirect emissions from all other upstream and downstream sources (i.e., Categories 2-15)',
                ],
                justification:
                  'The document specifies that as a Small to Medium Sized Enterprise (SME) under SBTi standards, the company is only required to set Scope 1 & 2 emission reduction targets, but they have also set a Scope 3 target. This indicates that the quantitative reduction target covers Scope 1, Scope 2, and Scope 3 emissions, which include direct emissions from company vehicles and facilities, indirect emissions from purchased energy, and all other indirect emissions from upstream and downstream value chain sources【115†source】.',
              },
              ai_attempted: true,
              key: 'GHG-7A',
              user_answered: false,
              bookmarked: false,
              not_started: false,
              ai_answered: true,
            },
            {
              order: 41,
              prompt:
                'Please tell us about your quantitative Scope 3 reduction targets.\n\nWhat percent reduction are you aiming to achieve from your baseline year to your target year?',
              options: [],
              tooltip: '',
              component: 'percent_slider',
              placeholder: '',
              corresponding_question: 'GHG-7B',
              ai_response: {
                answer: "Peak Design's Scope 3 target is an economic intensity reduction of 30% by 2025 from a 2020 baseline.",
              },
              ai_attempted: true,
              key: 'GHG-7B:1',
              user_answered: false,
              bookmarked: false,
              not_started: false,
              ai_answered: true,
            },
            {
              order: 42,
              prompt: 'Please tell us about your quantitative Scope 3 reduction targets.\n\nWhat year are you using as your baseline year?',
              options: [],
              tooltip: '',
              component: 'text',
              placeholder: '',
              corresponding_question: 'GHG-7B',
              ai_response: {
                answer: 'The baseline year used by Peak Design for its quantitative Scope 3 reduction target is the year 2020.',
              },
              ai_attempted: true,
              key: 'GHG-7B:2',
              user_answered: false,
              bookmarked: false,
              not_started: false,
              ai_answered: true,
            },
            {
              order: 43,
              prompt: 'Please tell us about your quantitative Scope 3 reduction targets.\n\nWhat year are you using as your target year?',
              options: [],
              tooltip: '',
              component: 'text',
              placeholder: '',
              corresponding_question: 'GHG-7B',
              ai_response: {
                answer: "The target year for Peak Design's quantitative Scope 3 reduction is 2025.",
              },
              ai_attempted: true,
              key: 'GHG-7B:3',
              user_answered: false,
              bookmarked: false,
              not_started: false,
              ai_answered: true,
            },
            {
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
              ai_response: {
                answer: ['Absolute emissions reduction'],
                justification:
                  'The document specifies that the brand has set an absolute reduction target of 50% by 2030 from a 2021 baseline for Scope 1 & 2 emissions. Although they have also set an economic intensity reduction target for Scope 3 emissions, the prompt specifically asks for the type of target set for the absolute emissions reduction, which is clearly stated for Scope 1 & 2 emissions【123†source】.',
              },
              ai_attempted: true,
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
  ];
}

export function getQuestionnaireContainerMock(sectionGroupName: string, sectionName: string): QuestionnaireQuestion[] {
  const mock = getQuestionnaireSidebarComplianceMock();
  const sectionGroup = mock.find(g => g.name === sectionGroupName);
  if (!sectionGroup) {
    return [];
  }
  const section = sectionGroup.sections.find(s => s.name === sectionName);
  if (!section) {
    return [];
  }
  return section.questions;
}
