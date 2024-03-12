import { Compliance, OrgCompliance } from '@coldpbc/interfaces';

export function getComplianceMock(): Compliance[] {
  return [
    {
      id: 'cmp-2',
      name: 'bcorp',
      title: 'B Corp',
      logo_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/Certified_B_Corporation.svg',
      surveys: ['rei_mfg_survey', 'rei_ghg_survey', 'rei_pkg_survey'],
      created_at: '2020-03-03T23:50:31.000Z',
      updated_at: '2020-03-03T23:50:31.000Z',
    },
    {
      id: 'cmp-1',
      name: 'rei',
      title: 'REI',
      logo_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/rei-logo-1.svg',
      surveys: ['rei_mfg_survey', 'rei_ghg_survey', 'rei_pkg_survey'],
      created_at: '2020-03-03T23:50:31.000Z',
      updated_at: '2020-03-03T23:50:31.000Z',
    },
    {
      id: 'cmp-3',
      name: 'amazon',
      title: 'Amazon',
      logo_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/amazon_logo.svg',
      surveys: ['rei_mfg_survey', 'rei_ghg_survey', 'rei_pkg_survey'],
      created_at: '2020-03-03T23:50:31.000Z',
      updated_at: '2020-03-03T23:50:31.000Z',
    },
    {
      id: 'cmp-4',
      name: 'rei2',
      logo_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/rei-logo-1.svg',
      surveys: ['rei_consolidated_survey'],
      created_at: '2024-02-21T21:24:24.574Z',
      updated_at: '2024-02-21T15:24:14.000Z',
      title: 'REI Consolidated',
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
      id: '1',
      organization_id: '3412521521355',
      compliance_id: 'cmp-1',
      created_at: '2020-03-03T23:50:31.000Z',
      updated_at: '2020-03-03T23:50:31.000Z',
      organization: {},
      compliance_definition: getComplianceMockByName('rei'),
    },
    {
      id: '2',
      organization_id: '3412521521355',
      compliance_id: 'cmp-2',
      created_at: '2020-03-03T23:50:31.000Z',
      updated_at: '2020-03-03T23:50:31.000Z',
      organization: {},
      compliance_definition: getComplianceMockByName('bcorp'),
    },
    {
      id: '3',
      organization_id: '3412521521355',
      compliance_id: 'cmp-3',
      created_at: '2020-03-03T23:50:31.000Z',
      updated_at: '2020-03-03T23:50:31.000Z',
      organization: {},
      compliance_definition: getComplianceMockByName('amazon'),
    },
    {
      id: '4',
      organization_id: '3412521521355',
      compliance_id: 'cmp-4',
      created_at: '2020-03-03T23:50:31.000Z',
      updated_at: '2020-03-03T23:50:31.000Z',
      organization: {},
      compliance_definition: getComplianceMockByName('rei2'),
    }
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
      "id": "orgcomp_s5nd91vh8jduzw0m",
      "organization_id": "org_q8G8YXcencJjsCnv",
      "compliance_id": "compdef_s4h9rd5wuorvhthy",
      "created_at": "2024-03-01T20:05:01.181Z",
      "updated_at": "2024-03-01T20:05:01.181Z",
      "organization": {
        "id": "org_q8G8YXcencJjsCnv",
        "name": "peak-staging-test",
        "enabled_connections": [
          {
            "connection_id": "con_Asb5pjVccChYIxa5",
            "assign_membership_on_login": false
          },
          {
            "connection_id": "con_kYFtdnBxyBdYzTtK",
            "assign_membership_on_login": false
          }
        ],
        "display_name": "Peak Staging Test",
        "branding": null,
        "phone": null,
        "email": null,
        "created_at": "2024-03-01T19:34:31.251Z",
        "updated_at": "2024-03-01T19:34:31.252Z",
        "isTest": false
      },
      "compliance_definition": {
        "id": "compdef_s4h9rd5wuorvhthy",
        "name": "rei_pia_2024",
        "logo_url": "https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/rei-logo-1.svg",
        "surveys": [
          "rei_pia_2024_2"
        ],
        "created_at": "2024-03-01T19:51:37.808Z",
        "updated_at": "2024-03-06T05:05:43.546Z",
        "title": "REI Product Impact Assessment 2024"
      }
    },
    {
      "id": "orgcomp_wqtyy2rtvusmcm46",
      "organization_id": "org_q8G8YXcencJjsCnv",
      "compliance_id": "compdef_obu8yu9fbhex3inz",
      "created_at": "2024-03-08T20:40:06.829Z",
      "updated_at": "2024-03-08T20:40:06.829Z",
      "organization": {
        "id": "org_q8G8YXcencJjsCnv",
        "name": "peak-staging-test",
        "enabled_connections": [
          {
            "connection_id": "con_Asb5pjVccChYIxa5",
            "assign_membership_on_login": false
          },
          {
            "connection_id": "con_kYFtdnBxyBdYzTtK",
            "assign_membership_on_login": false
          }
        ],
        "display_name": "Peak Staging Test",
        "branding": null,
        "phone": null,
        "email": null,
        "created_at": "2024-03-01T19:34:31.251Z",
        "updated_at": "2024-03-01T19:34:31.252Z",
        "isTest": false
      },
      "compliance_definition": {
        "id": "compdef_obu8yu9fbhex3inz",
        "name": "amazon",
        "logo_url": "https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/Amazon_icon.svg",
        "surveys": [
          "rei_pia_2024"
        ],
        "created_at": "2024-02-05T19:28:02.001Z",
        "updated_at": "2024-02-05T20:36:23.025Z",
        "title": "Amazon"
      }
    }
  ];
}
