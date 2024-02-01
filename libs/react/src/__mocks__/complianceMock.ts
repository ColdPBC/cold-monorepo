import { Compliance, OrgCompliance } from '@coldpbc/interfaces';

export function getComplianceMock(): Compliance[] {
  return [
    {
      id: '3412521521355',
      name: 'rei',
      title: 'REI',
      logo_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/ReiLogo.png',
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
      id: '3412521521355',
      organization_id: '3412521521355',
      compliance_id: '3412521521355',
      created_at: '2020-03-03T23:50:31.000Z',
      updated_at: '2020-03-03T23:50:31.000Z',
      organization: {},
      compliance_definition: getComplianceMock()[0],
    },
  ];
}

export function getOrganizationComplianceMockByName(name: string): any {
  const orgCompliances = getOrganizationComplianceMock();
  const compliance = getComplianceMockByName(name);
  const orgCompliance = orgCompliances.find(c => c.compliance_definition.id === compliance.id);
  return {
    ...orgCompliance,
    compliance_definition: compliance,
    compliance_id: compliance.id,
  };
}
