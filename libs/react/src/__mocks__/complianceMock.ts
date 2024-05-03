import { Compliance, ComplianceManager, OrgCompliance, OrgComplianceManager } from '@coldpbc/interfaces';
import { getComplianceManagerSectionGroupMock } from './surveyDataMock';

export function getComplianceMock(): Compliance[] {
  return [
    {
      id: 'compdef_n90xd3j15im42aqr',
      name: 'b_corp_2024',
      logo_url: 'https://cold-public-assets.s3.amazonaws.com/3rdPartyLogos/compliance_svgs/bcorp_logo.svg',
      surveys: ['b_corp_2024'],
      created_at: '2024-03-19T16:22:59.959Z',
      updated_at: '2024-04-10T20:44:44.763Z',
      title: 'B Corp',
    },
    {
      id: 'compdef_s4h9rd5wuorvhthy',
      name: 'rei_pia_2024',
      logo_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/compliance_svgs/rei_logo.svg',
      surveys: ['rei_pia_2024'],
      created_at: '2024-03-01T19:51:37.808Z',
      updated_at: '2024-03-06T05:05:43.546Z',
      title: 'REI Product Impact Assessment 2024',
    },
    {
      id: 'compdef_q8ctv3dxn00s3bic',
      name: 'one_percent_for_planet_DEMO',
      logo_url: 'https://cold-public-assets.s3.amazonaws.com/3rdPartyLogos/compliance_svgs/1_percent_for_the_planet_logo.svg',
      surveys: ['one_percent_for_planet_DEMO'],
      created_at: '2024-03-18T16:42:54.309Z',
      updated_at: '2024-03-18T16:42:54.309Z',
      title: '1% for the Planet',
    },
    {
      id: 'compdef_q4si19qzwqh0h03g',
      name: 'oia_climate_report_2023',
      logo_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/compliance_svgs/oia_logo.svg',
      surveys: ['oia_climate_report_2023'],
      created_at: '2024-03-18T15:55:36.193Z',
      updated_at: '2024-03-26T19:09:13.312Z',
      title: 'Climate Action Corps Progress Report 2023',
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
      },
    },
    {
      id: 'orgcomp_2',
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
        id: 'compdef_q8ctv3dxn00s3bic',
        name: 'one_percent_for_planet_DEMO',
        logo_url: 'https://cold-public-assets.s3.amazonaws.com/3rdPartyLogos/compliance_svgs/1_percent_for_the_planet_logo.svg',
        surveys: ['one_percent_for_planet_DEMO'],
        created_at: '2024-03-18T16:42:54.309Z',
        updated_at: '2024-03-18T16:42:54.309Z',
        title: '1% for the Planet',
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
  return getComplianceMock();
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

export function getAllComplianceManagerMock(): Array<ComplianceManager> {
  return [
    {
      id: 'compdef_s4h9rd5wuorvhthy',
      name: 'rei_pia_2024',
      order: 0,
      version: 2024,
      title: 'REI 2024 Product Impact Assessment',
      image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/complianceBackgroundImages/rei.png',
      logo_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/compliance_svgs/rei_logo.svg',
      metadata: {
        due_date: '2024-10-01T19:51:37.808Z',
        term: '3_year_term',
      },
      visible: true,
      created_at: '2024-03-01T19:51:37.808Z',
      updated_at: '2024-05-02T01:09:03.925Z',
      compliance_section_groups: [getComplianceManagerSectionGroupMock()],
    },
  ];
}

export function getSingleComplianceManagerMock(): ComplianceManager {
  return {
    id: 'compdef_s4h9rd5wuorvhthy',
    name: 'rei_pia_2024',
    order: 0,
    version: 2024,
    title: 'REI 2024 Product Impact Assessment',
    image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/complianceBackgroundImages/rei.png',
    logo_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/compliance_svgs/rei_logo.svg',
    metadata: {
      due_date: '2024-10-01T19:51:37.808Z',
      term: '3_year_term',
    },
    visible: true,
    created_at: '2024-03-01T19:51:37.808Z',
    updated_at: '2024-05-02T01:09:03.925Z',
    compliance_section_groups: [getComplianceManagerSectionGroupMock()],
  };
}

export function getOrganizationComplianceManagerMock(): Array<OrgComplianceManager> {
  return [
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
      compliance_definition: getSingleComplianceManagerMock(),
    },
  ];
}
