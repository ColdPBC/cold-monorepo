import React from 'react';
import useSWR from 'swr';
import { Outlet, useParams } from 'react-router-dom';
import { ComplianceWizardLair, ErrorFallback, MainContent, Spinner, Wizard } from '@coldpbc/components';
import { Compliance, OrgCompliance } from '@coldpbc/interfaces';
import { axiosFetcher } from '@coldpbc/fetchers';
import { useAuth0Wrapper, useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { ErrorType } from '@coldpbc/enums';
import { withErrorBoundary } from 'react-error-boundary';

const _ComplianceWizard = () => {
  const { name } = useParams();
  const { orgId } = useAuth0Wrapper();
  const { logBrowser } = useColdContext();
  const compliances = useSWR<Compliance[], any, any>(['/compliance_definitions', 'GET'], axiosFetcher);
  const orgCompliances = useSWR<OrgCompliance[], any, any>([`/compliance_definitions/organizations/${orgId}`, 'GET'], axiosFetcher);

  const getSurveyURL = () => {
    if (name && compliances.data && orgCompliances.data) {
      const compliance = orgCompliances.data.find(orgCompliance => orgCompliance.compliance_definition.name === name)?.compliance_definition;
      return [`/surveys/${compliance?.surveys[0]}`, 'GET'];
    } else {
      return null;
    }
  };

  const surveyData = useOrgSWR<any, any>(getSurveyURL(), axiosFetcher, {
    keepPreviousData: true,
  });

  const filesSWR = useOrgSWR<any, any>(['/files', 'GET'], axiosFetcher);

  const { logError } = useColdContext();

  if (compliances.isLoading || orgCompliances.isLoading || surveyData.isLoading || filesSWR.isLoading) {
    return <Spinner />;
  }

  if (compliances.error || orgCompliances.error || surveyData.error || filesSWR.error) {
    if (compliances.error) {
      logBrowser('Error fetching compliances', 'error', { error: compliances.error }, compliances.error);
      logError(compliances.error, ErrorType.SWRError);
    }
    if (orgCompliances.error) {
      logBrowser('Error fetching org compliances', 'error', { error: orgCompliances.error }, orgCompliances.error);
      logError(orgCompliances.error, ErrorType.SWRError);
    }
    if (surveyData.error) {
      logBrowser('Error fetching survey data', 'error', { error: surveyData.error }, surveyData.error);
      logError(surveyData.error, ErrorType.SWRError);
    }
    return null;
  }

  if (name && compliances.data && orgCompliances.data) {
    logBrowser('Compliance wizard loaded', 'info', {
      name,
      orgId,
    });
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
            surveyData: surveyData.data,
            files: filesSWR.data,
            baseURL: `/wizard/compliance/${name}`,
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

export const ComplianceWizard = withErrorBoundary(_ComplianceWizard, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in ComplianceWizard: ', error);
  },
});
