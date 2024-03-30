import React, { PropsWithChildren, useEffect, useState } from 'react';
import { AssessmentsContext, AssessmentsContextData } from '../context/assessmentsContext';
import useSWR from 'swr';
import { ComplianceSurveyPayloadType, OrgCompliance } from '@coldpbc/interfaces';
import { axiosFetcher } from '@coldpbc/fetchers';
import { useAuth0Wrapper, useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { Spinner } from '@coldpbc/components';
import { ErrorType } from '@coldpbc/enums';
import { find, isArray } from 'lodash';

export const ColdAssessmentsProvider = ({ children }: PropsWithChildren) => {
  const { logError } = useColdContext();

  const data: AssessmentsContextData = {};

  const { orgId } = useAuth0Wrapper();

  // get the compliance sets
  const orgCompliances = useSWR<OrgCompliance[], any, any>([`/compliance_definitions/organizations/${orgId}`, 'GET'], axiosFetcher);

  const [currentAssessmentState, setCurrentAssessmentState] = useState('');

  useEffect(() => {
    if (orgCompliances.data?.length && orgCompliances.data[0].compliance_definition.name) {
      setCurrentAssessmentState(orgCompliances.data[0].compliance_definition.name);
    }
  }, [orgCompliances.data]);

  // get the org surveys related to the compliance sets
  const surveysList: string[] = [];
  const surveyMap: { [k: string]: string } = {};
  const complianceMap: { [compliance_name: string]: OrgCompliance } = {};
  if (orgCompliances.data?.length) {
    // use the first compliance set as a default

    // Code assumes new model of just one survey per compliance set
    orgCompliances.data.forEach(compliance => {
      surveysList.push(`/surveys/${compliance.compliance_definition.surveys[0]}`);
      surveyMap[compliance.compliance_definition.surveys[0]] = compliance.compliance_definition.name;
      complianceMap[compliance.compliance_definition.name] = compliance;
    });
  }

  // get the survey data and populate the context
  const surveyData = useOrgSWR([surveysList, 'GET'], axiosFetcher);

  if (orgCompliances.isLoading || surveyData.isLoading) {
    return <Spinner />;
  }

  if (orgCompliances.error) {
    logError(orgCompliances.error, ErrorType.SWRError);
    return;
  }
  if (surveyData.error) {
    logError(surveyData.error, ErrorType.SWRError);
  }

  if (surveyData.data) {
    surveyData.data.forEach((survey: ComplianceSurveyPayloadType) => {
      // find all the sections in the progress element
      if (survey.progress !== undefined && isArray(survey.progress.sections)) {
        survey.progress.sections.forEach(section => {
          // bucket them by their section type
          if (survey.definition?.sections) {
            const sectionType = find(survey.definition.sections, { title: section.title })?.section_type;

            if (section.section_score !== undefined && section.section_max_score !== undefined && sectionType !== undefined) {
              if (!data[surveyMap[survey.name]]) {
                data[surveyMap[survey.name]] = {
                  compliance: complianceMap[surveyMap[survey.name]],
                  section_types: {},
                  progress_data: survey.progress,
                  survey_type: survey.type,
                };
              }
              if (!data[surveyMap[survey.name]].section_types[sectionType]) {
                data[surveyMap[survey.name]].section_types[sectionType] = { score: 0, max: 0 };
              }

              const sectionTypeData = data[surveyMap[survey.name]]['section_types'][sectionType];

              // put them in the data block based on the compliance name
              sectionTypeData.score = sectionTypeData.score + section.section_score;
              sectionTypeData.max = sectionTypeData.max + section.section_max_score;

              if (sectionTypeData.max !== 0) {
                sectionTypeData.percentage = sectionTypeData.score / sectionTypeData.max;
              }
            }
          }
        });
      }
    });
  }

  return (
    <AssessmentsContext.Provider
      value={{
        currentAssessment: currentAssessmentState,
        setCurrentAssessment: setCurrentAssessmentState,
        data: data,
      }}>
      {children}
    </AssessmentsContext.Provider>
  );
};
