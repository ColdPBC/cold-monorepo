import { Compliance } from '../interfaces/compliance';
import { getCompliancePageSurveysMocksByName } from './surveyDataMock';

export function getComplianceMock(): Compliance[] {
  return [
    {
      id: '3412521521355',
      name: 'rei',
      title: 'REI',
      surveys: [
        getCompliancePageSurveysMocksByName('rei_mfg_survey'),
        getCompliancePageSurveysMocksByName('rei_ghg_survey'),
        getCompliancePageSurveysMocksByName('rei_pkg_survey'),
      ],
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
