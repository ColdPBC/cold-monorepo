import React, { PropsWithChildren } from 'react';
import {AssessmentsContext} from "../context/assessmentsContext";
import useSWR from "swr";
import {OrgCompliance} from "@coldpbc/interfaces";
import {axiosFetcher} from "@coldpbc/fetchers";
import {useAuth0Wrapper, useColdContext, useOrgSWR} from "@coldpbc/hooks";
import {Spinner} from "@coldpbc/components";
import {ErrorType} from "@coldpbc/enums";
import {sortComplianceSurvey} from "@coldpbc/lib";

export const ColdAssessmentsProvider = ({ children }: PropsWithChildren) => {
  const { logError } = useColdContext();

  let currentAssessment = '';
  const data = {};

  const { orgId } = useAuth0Wrapper();

  // get the compliance sets
  const orgCompliances = useSWR<OrgCompliance[], any, any>([`/compliance_definitions/organizations/${orgId}`, 'GET'], axiosFetcher);

  // select the first one as the default
  let surveySWR = null;
  if (orgCompliances.data && orgCompliances.data[0].compliance_definition.name) {
    currentAssessment = orgCompliances.data[0].compliance_definition.name;
    if (orgCompliances.data[0].compliance_definition.surveys) {
      surveySWR = [`/surveys/${orgCompliances.data[0].compliance_definition.surveys[0]}`, 'GET'];
    }
  }

  // get the survey data and populate the context
  const surveyData = useOrgSWR(surveySWR, axiosFetcher);

  if (orgCompliances.isLoading || surveyData.isLoading) {
    return <Spinner />;
  }

  if (orgCompliances.error) {
    logError(orgCompliances.error, ErrorType.SWRError);
  }
  if (surveyData.error) {
    logError(surveyData.error, ErrorType.SWRError);
  }

  if (surveyData.data) {
    //let surveyInfo = sortComplianceSurvey(surveyData.data);
    //console.log(surveyData.data.progress);

  }

  return (
    <AssessmentsContext.Provider
      value={{
        currentAssessment: currentAssessment,
        data: data
      }}
    >
      {children}
    </AssessmentsContext.Provider>
  );
}
