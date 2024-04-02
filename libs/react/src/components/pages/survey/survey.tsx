import React, { useEffect } from 'react';
import { SurveyActiveKeyType, SurveyPayloadType } from '@coldpbc/interfaces';
import { Spinner, SurveyLeftNav, SurveyRightNav, Takeover } from '../../index';
import { find, isEmpty } from 'lodash';
import { mutate } from 'swr';
import { axiosFetcher } from '@coldpbc/fetchers';
import { ErrorType, GlobalSizes } from '@coldpbc/enums';
import { useSearchParams } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application/errors/errorFallback';
import { useAuth0Wrapper, useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { isComponentTypeValid } from '@coldpbc/lib';

export interface SurveyProps {
  surveyName: string;
}

const _Survey = (props: SurveyProps) => {
  const { getOrgSpecificUrl } = useAuth0Wrapper();
  const { surveyName } = props;
  const [activeKey, setActiveKey] = React.useState<SurveyActiveKeyType>({
    value: '',
    previousValue: '',
    isFollowUp: false,
  });
  const [show, setShow] = React.useState<boolean>(true);
  const [surveyData, setSurveyData] = React.useState<SurveyPayloadType>();
  const { data, error, isLoading } = useOrgSWR<SurveyPayloadType, any>([`/surveys/${surveyName}`, 'GET'], axiosFetcher);
  const [searchParams, setSearchParams] = useSearchParams();
  const [submitted, setSubmitted] = React.useState<boolean>(false);
  const { logError, logBrowser } = useColdContext();

  const submitSurvey = () => {
    setSubmitted(true);
  };

  const getStartKey = (surveyData: SurveyPayloadType) => {
    // loop the sections and follow up and find the first question that has not been answered yet
    let firstActiveKey: SurveyActiveKeyType | undefined = undefined;
    find(Object.keys(surveyData.definition.sections), key => {
      const section = surveyData.definition.sections[key];
      if (!isComponentTypeValid(section.component) && isEmpty(section.prompt)) {
        // check the followups
        const foundInFollowUp = find(Object.keys(section.follow_up), followUpKey => {
          const followUp = section.follow_up[followUpKey];
          if (followUp.value === undefined && followUp.skipped === undefined) {
            firstActiveKey = {
              value: followUpKey,
              previousValue: '',
              isFollowUp: true,
            };
            return true;
          } else {
            return false;
          }
        });
        return foundInFollowUp !== undefined;
      } else {
        let foundQuestion = section.value === undefined && section.skipped === undefined;
        // check the followups
        if (!foundQuestion) {
          // use find
          const foundInFollowUp = find(Object.keys(section.follow_up), followUpKey => {
            const followUp = section.follow_up[followUpKey];
            if (followUp.value === undefined && followUp.skipped === undefined) {
              firstActiveKey = {
                value: followUpKey,
                previousValue: '',
                isFollowUp: true,
              };
              return true;
            } else {
              return false;
            }
          });
          foundQuestion = foundInFollowUp !== undefined;
        } else {
          firstActiveKey = {
            value: key,
            previousValue: '',
            isFollowUp: false,
          };
        }
        return foundQuestion;
      }
    });
    return firstActiveKey;
  };

  const startSurvey = () => {
    if (surveyData) {
      const firstQuestionKey = getStartKey(surveyData);
      if (!firstQuestionKey) {
        const firstSectionKey = Object.keys(surveyData.definition.sections)[0];
        const firstSection = surveyData.definition.sections[firstSectionKey];
        if (!isComponentTypeValid(firstSection.component) && isEmpty(firstSection.prompt)) {
          const firstFollowUpKey = Object.keys(firstSection.follow_up)[0];
          // get the first followup
          setActiveKey({
            value: firstFollowUpKey,
            previousValue: '',
            isFollowUp: true,
          });
        } else {
          setActiveKey({
            value: firstSectionKey,
            previousValue: '',
            isFollowUp: false,
          });
        }
      } else {
        setActiveKey(firstQuestionKey);
      }
    }
  };

  const hasSurveyBeenStarted = (surveyData: SurveyPayloadType) => {
    // check if the survey has values and skipped values
    // check the survey definition
    if (surveyData) {
      const sections = surveyData.definition.sections;
      const sectionKeys = Object.keys(sections);
      for (let i = 0; i < sectionKeys.length; i++) {
        const section = sections[sectionKeys[i]];
        if (isComponentTypeValid(section.component) && !isEmpty(section.prompt)) {
          if (section.value !== undefined && section.skipped !== undefined) {
            return true;
          }
        }
        const followUpKeys = Object.keys(section.follow_up);
        for (let j = 0; j < followUpKeys.length; j++) {
          const followUp = section.follow_up[followUpKeys[j]];
          if (followUp.value !== undefined && followUp.skipped !== undefined) {
            return true;
          }
        }
      }
    }
  };

  const onSurveyClose = async () => {
    const param = searchParams.get('surveyName');
    if (param) {
      searchParams.delete('surveyName');
      setSearchParams(searchParams);
    }
    await mutate([getOrgSpecificUrl(`/surveys/${surveyName}`), 'GET'], {
      ...surveyData,
    });
    setShow(false);
  };

  const dismiss = {
    label: 'Close',
    dismissible: surveyName !== 'journey_overview',
    onClick: onSurveyClose,
  };

  useEffect(() => {
    if (data) {
      // sort the sections and followups by the idx field
      // data.definition.sections is an object with keys as the section name
      // data.definition[section].followups is an object with keys as the followup name
      const copy = {
        ...data,
        definition: {
          ...data.definition,
          sections: {},
        },
      } as SurveyPayloadType;
      // sort the sections and set the sorted sections in the copy
      Object.keys(data.definition.sections)
        .sort((a, b) => {
          return data.definition.sections[a].category_idx - data.definition.sections[b].category_idx;
        })
        .forEach(key => {
          copy.definition.sections[key] = {
            ...data.definition.sections[key],
            follow_up: {},
          };
          // sort the followups and set the sorted followups in the copy
          Object.keys(data.definition.sections[key].follow_up)
            .sort((a, b) => {
              return data.definition.sections[key].follow_up[a].idx - data.definition.sections[key].follow_up[b].idx;
            })
            .forEach(followupKey => {
              copy.definition.sections[key].follow_up[followupKey] = data.definition.sections[key].follow_up[followupKey];
            });
        });
      setSurveyData(copy);
      // start the survey if the getStartKey returns a key
      // only run once when the component is first rendered
      const key = getStartKey(copy);
      if (key && hasSurveyBeenStarted(copy)) {
        setActiveKey(key);
      }
    }
  }, [data]);

  if (error) {
    logError(error, ErrorType.SWRError);
    logBrowser('Error fetching survey data', 'error', { data, error });
    return <div></div>;
  }

  if (isLoading) {
    return (
      <Takeover
        show={show}
        setShow={setShow}
        header={{
          title: {},
          dismiss: dismiss,
        }}>
        <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <Spinner size={GlobalSizes.xLarge} />
        </div>
      </Takeover>
    );
  }

  if (surveyData) {
    logBrowser('Survey data fetched', 'info', { surveyData, searchParams, activeKey });
    return (
      <Takeover
        show={show}
        setShow={setShow}
        header={{
          title: {},
          dismiss: dismiss,
        }}
        className={'z-20'}
        data-testid={'survey-takeover'}>
        <div
          className={'flex flex-1'}
          style={{
            maxHeight: 'min(1000px, calc(100vh - 100px))',
          }}>
          <SurveyLeftNav surveyData={surveyData} activeKey={activeKey} setActiveKey={setActiveKey} submitted={submitted} />
          <SurveyRightNav
            activeKey={activeKey}
            setActiveKey={setActiveKey}
            surveyData={surveyData}
            setSurveyData={setSurveyData}
            submitSurvey={submitSurvey}
            startSurvey={startSurvey}
            submitted={submitted}
            closeSurvey={onSurveyClose}
          />
        </div>
      </Takeover>
    );
  } else {
    return <></>;
  }
};

export const Survey = withErrorBoundary(_Survey, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in Survey: ', error);
  },
});
