import React from 'react';
import useSWR from 'swr';
import { Outlet, useParams } from 'react-router-dom';
import { ComplianceWizardLair, ErrorFallback, MainContent, Spinner, Wizard } from '@coldpbc/components';
import { Compliance, OrgCompliance } from '@coldpbc/interfaces';
import { axiosFetcher } from '@coldpbc/fetchers';
import { useAuth0Wrapper, useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { ErrorType } from '@coldpbc/enums';
import { withErrorBoundary } from 'react-error-boundary';
import { useLDClient } from 'launchdarkly-react-client-sdk';
import { LDContext } from '@launchdarkly/node-server-sdk';
import { checkContextValue, getUpdatedContext } from '@coldpbc/lib';

const _ComplianceWizard = () => {
  const { name } = useParams();
  const { orgId } = useAuth0Wrapper();
  const ldClient = useLDClient();
  const compliances = useSWR<Compliance[], any, any>(['/compliance_definitions', 'GET'], axiosFetcher);
  const orgCompliances = useSWR<OrgCompliance[], any, any>([`/compliance_definitions/organizations/${orgId}`, 'GET'], axiosFetcher);

  const getSurveyURL = () => {
    if (name && compliances.data) {
      const compliance = compliances.data.find(compliance => compliance.name === name);
      return [`/surveys/${compliance?.surveys[0]}`, 'GET'];
    } else {
      return null;
    }
  };

  const surveyData = useOrgSWR(getSurveyURL(), axiosFetcher);
  const filesSWR = useOrgSWR<any, any>(['/files', 'GET'], axiosFetcher);

  const setLDContext = () => {
    if (ldClient && orgId && name) {
      const orgContext: LDContext = {
        kind: 'organization',
        key: orgId,
      };
      const complianceContext: LDContext = {
        kind: 'complianceSet',
        key: name,
      };
      const isContextSet = checkContextValue(ldClient.getContext() as LDContext, {
        kind: 'complianceSet',
        key: name,
      });
      if (!isContextSet) {
        ldClient.identify(
          getUpdatedContext(
            ldClient.getContext() as LDContext,
            {
              kind: 'complianceSet',
              key: name,
            },
            true,
          ),
        );
      }
    }
  };

  const { logError } = useColdContext();

  setLDContext();

  if (compliances.isLoading || orgCompliances.isLoading || surveyData.isLoading || filesSWR.isLoading) {
    return <Spinner />;
  }

  if (compliances.error || orgCompliances.error || surveyData.error || filesSWR.error) {
    if (compliances.error) {
      logError(compliances.error, ErrorType.SWRError);
    }
    if (orgCompliances.error) {
      logError(orgCompliances.error, ErrorType.SWRError);
    }
    if (surveyData.error) {
      logError(surveyData.error, ErrorType.SWRError);
    }
    return null;
  }

  if (name && compliances.data && orgCompliances.data) {
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
