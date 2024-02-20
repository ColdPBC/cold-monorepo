import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { MainContent, Wizard, ComplianceWizardLair, Spinner } from '@coldpbc/components';
import useSWR from 'swr';
import { Compliance, OrgCompliance } from '@coldpbc/interfaces';
import { axiosFetcher } from '@coldpbc/fetchers';
import { useAuth0Wrapper, useColdContext } from '@coldpbc/hooks';
import { ErrorType } from '@coldpbc/enums';

export const ComplianceWizard = () => {
  const { name } = useParams();
  const { orgId } = useAuth0Wrapper();
  const compliances = useSWR<Compliance[], any, any>(['/compliance_definitions', 'GET'], axiosFetcher);
  const orgCompliances = useSWR<OrgCompliance[], any, any>([`/compliance_definitions/organization/${orgId}`, 'GET'], axiosFetcher);
  const { logError } = useColdContext();

  if (compliances.isLoading || orgCompliances.isLoading) {
    return <Spinner />;
  }

  if (compliances.error || orgCompliances.error) {
    logError(compliances.error, ErrorType.SWRError);
    return null;
  }

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
          baseURL={`/wizard/compliance/${name}`}
          data={{
            name: name,
            compliances: compliances.data,
            orgCompliances: orgCompliances.data,
          }}>
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
