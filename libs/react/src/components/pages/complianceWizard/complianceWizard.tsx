import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { MainContent, Wizard, ComplianceWizardLair } from '@coldpbc/components';

export const ComplianceWizard = () => {
  const { name } = useParams();
  if (name) {
    return (
      <MainContent>
        <Wizard
          steps={[
            {
              title: 'Documents',
              name: 'documents',
              route: '/documents',
            },
            {
              title: 'Automate',
              name: 'automate',
              route: '/automate',
            },
            {
              title: 'Processing',
              name: 'processing',
              route: '/processing',
            },
            {
              title: 'Questionnaire',
              name: 'questionnaire',
              route: '/questionnaire',
            },
          ]}
          baseURL={`/wizard/compliance/${name}`}>
          <ComplianceWizardLair name={name}>
            <Outlet />
          </ComplianceWizardLair>
        </Wizard>
      </MainContent>
    );
  } else {
    return null;
  }
};
