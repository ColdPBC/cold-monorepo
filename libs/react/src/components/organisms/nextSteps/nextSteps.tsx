import React from 'react';
import { Card, Spinner, NextStepCard } from "@coldpbc/components";
import { useOrgSWR } from "@coldpbc/hooks";
import { axiosFetcher } from "@coldpbc/fetchers";
import { SurveyNextStep, SurveyPayloadType } from "@coldpbc/interfaces";
import { startCase } from "lodash";
import { useNavigate } from "react-router-dom";

export const NextSteps = () => {
  const {data, isLoading, error} = useOrgSWR<SurveyPayloadType[]>(['/surveys', 'GET'], axiosFetcher);
  const navigate = useNavigate();

  const getSurveyProgress = (survey: SurveyPayloadType): number => {
    let totalQuestions = 0;
    let completedQuestions = 0;
    Object.keys(survey.definition.sections).forEach((section) => {
      const sectionData = survey.definition.sections[section];
      if(sectionData.component !== null){
        totalQuestions += 1;
        if(sectionData.skipped !== undefined && sectionData.value !== undefined){
          completedQuestions += 1;
        }
      }
      Object.keys(sectionData.follow_up).forEach((followUp) => {
        const followUpData = sectionData.follow_up[followUp];
        totalQuestions += 1;
        if(followUpData.skipped !== undefined && followUpData.value !== undefined){
          completedQuestions += 1;
        }
      });
    });
    if(completedQuestions === 0) {
      return 0;
    } else {
      return Math.round((completedQuestions / totalQuestions) * 100);
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return <div>Error loading surveys</div>
  }

  const nextSteps = data?.filter((survey) => {
    return !survey.definition.submitted;
  }).map((survey) : SurveyNextStep => {
    const progress = getSurveyProgress(survey)
      return {
        name: survey.name,
        title: startCase(survey.name),
        started: progress > 0,
        surveyProgress: progress
      }
  });

  return (
    <Card
      data-testid="next-steps"
      title={'Next Steps'}
      className={'max-w-[668px]'}
    >
      <div className={"space-y-6 w-full"}>
        {
          nextSteps?.map((nextStep) => {
            return (
              <div key={nextStep.title}>
                <NextStepCard nextStep={nextStep} onNextStepClick={() => {
                  navigate(`?surveyName=${nextStep.name}`);
                }} />
              </div>
            )
          })
        }
      </div>
    </Card>
  )
}
