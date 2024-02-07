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
