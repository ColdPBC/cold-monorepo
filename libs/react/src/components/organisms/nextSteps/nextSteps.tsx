import React from 'react';
import { Card, ErrorFallback, NextStepCard, Spinner } from '@coldpbc/components';
import { useAuth0Wrapper, useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { axiosFetcher } from '@coldpbc/fetchers';
import { OrgCompliance, SurveyNextStep, SurveyPayloadType } from '@coldpbc/interfaces';
import { find, flatMap, includes, startCase } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorType } from '@coldpbc/enums';
import useSWR from 'swr';

const _NextSteps = () => {
  const { orgId } = useAuth0Wrapper();
  const orgCompliances = useSWR<OrgCompliance[], any, any>([`/compliance_definitions/organizations/${orgId}`, 'GET'], axiosFetcher);

  const { data, isLoading, error } = useOrgSWR<SurveyPayloadType[]>(['/surveys', 'GET'], axiosFetcher);
  const { logError, logBrowser } = useColdContext();
  const navigate = useNavigate();

  const getSurveyProgress = (survey: SurveyPayloadType): number => {
    let totalQuestions = 0;
    let completedQuestions = 0;
    Object.keys(survey.definition.sections).forEach(section => {
      const sectionData = survey.definition.sections[section];
      if (sectionData.component !== null) {
        totalQuestions += 1;
        if (sectionData.skipped !== undefined && sectionData.value !== undefined) {
          completedQuestions += 1;
        }
      }
      Object.keys(sectionData.follow_up).forEach(followUp => {
        const followUpData = sectionData.follow_up[followUp];
        totalQuestions += 1;
        if (followUpData.skipped !== undefined && followUpData.value !== undefined) {
          completedQuestions += 1;
        }
      });
    });
    if (completedQuestions === 0) {
      return 0;
    } else {
      return Math.round((completedQuestions / totalQuestions) * 100);
    }
  };

  if (isLoading || orgCompliances.isLoading) {
    return <Spinner />;
  }

  if (error) {
    logBrowser('Error fetching surveys', 'error', { ...error }, error);
    logError(error, ErrorType.SWRError);
    return;
  }
  if (orgCompliances.error) {
    logBrowser('Error fetching org compliances', 'error', { ...orgCompliances.error }, orgCompliances.error);
    logError(orgCompliances.error, ErrorType.SWRError);
    return;
  }

  logBrowser('Next steps loaded', 'info', {
    orgId,
  });

  if (!orgCompliances.data?.length) {
    return;
  }

  const compliances = orgCompliances.data;
  const complianceSurveys = flatMap(compliances, compliance => {
    if (compliance.surveys_override)
      return compliance.surveys_override;
    return compliance.compliance_definition.surveys;
  });

  const nextSteps = data
    ?.filter(survey => {
      return !survey.definition.submitted && includes(complianceSurveys, survey.name);
    })
    .sort((a, b) => {
      const aDate = new Date(a.updated_at);
      const bDate = new Date(b.updated_at);
      return bDate.getTime() - aDate.getTime();
    })
    .map((survey): SurveyNextStep => {
      const progress = getSurveyProgress(survey);
      return {
        compliance: find(compliances, compliance => {
          //if (compliance.surveys_override)
            //return includes(compliance.surveys_override, survey.name);
          return includes(compliance.compliance_definition.surveys, survey.name);
        }),
        name: survey.name,
        title: startCase(survey.name),
        started: progress > 0,
        surveyProgress: progress,
      };
    })
    .splice(0, 3);

  if (!nextSteps?.length) {
    return null;
  } else {
    return (
      <Card data-testid="next-steps-card" title={'Next Steps'} className={'max-w-[668px]'}>
        <div className={'space-y-6 w-full'}>
          {nextSteps?.map(nextStep => {
            return (
              <div key={nextStep.title} data-testid={`next-step-card`}>
                <NextStepCard
                  nextStep={nextStep}
                  onNextStepClick={() => {
                    navigate(`/wizard/compliance/${nextStep.compliance?.compliance_definition.name}`);
                  }}
                />
              </div>
            );
          })}
        </div>
      </Card>
    );
  }
};

export const NextSteps = withErrorBoundary(_NextSteps, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
