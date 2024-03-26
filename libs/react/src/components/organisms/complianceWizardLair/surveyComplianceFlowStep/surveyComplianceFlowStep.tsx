import React, { useContext, useEffect } from 'react';
import {
  ComplianceSurveyLeftNav,
  ComplianceSurveyQuestionnaire,
  ComplianceSurveyRightNav,
  ComplianceSurveySavedQuestionnaire,
  ErrorFallback,
  Spinner,
  Takeover,
  WizardContext,
} from '@coldpbc/components';
import { ComplianceSurveyActiveKeyType, ComplianceSurveyPayloadType, ComplianceSurveySavedQuestionType } from '@coldpbc/interfaces';
import {
  getAccurateBookmarkedValue,
  getOrgStorage,
  getQuestionValue,
  getSavedQuestionsInSurvey,
  getStartingKey,
  putSurveyData,
  setOrgStorage,
  sortComplianceSurvey,
  updateSurveyQuestion,
} from '@coldpbc/lib';
import { GlobalSizes } from '@coldpbc/enums';
import { withErrorBoundary } from 'react-error-boundary';
import { useAuth0Wrapper, useColdContext } from '@coldpbc/hooks';
import { get, set } from 'lodash';
import { mutate } from 'swr';

const _SurveyComplianceFlowStep = () => {
  const { data } = useContext(WizardContext);
  const { logBrowser } = useColdContext();
  const { orgId, getOrgSpecificUrl } = useAuth0Wrapper();
  const { surveyData, name } = data as { surveyData: ComplianceSurveyPayloadType; name: string };
  const [activeKey, setActiveKey] = React.useState<ComplianceSurveyActiveKeyType>({
    value: '',
    section: '',
    category: '',
    isFollowUp: false,
    previousValue: '',
  });
  const [surveyOpen, setSurveyOpen] = React.useState(false);
  const sortedSurvey = sortComplianceSurvey(surveyData);
  const originalSavedQuestionsState = getSavedQuestionsInSurvey(sortedSurvey);
  const [surveyState, setSurveyState] = React.useState<ComplianceSurveyPayloadType>(sortedSurvey);
  const [savedQuestions, setSavedQuestions] = React.useState<Array<ComplianceSurveySavedQuestionType>>(originalSavedQuestionsState);
  const [bookmarked, setBookmarked] = React.useState<{
    [key: string]: boolean;
  }>({});

  const onSurveyClose = async () => {
    if (activeKey.section === 'savedQuestions') {
      logBrowser('Saved question closed', 'info', {
        data,
        orgId,
        surveyData,
        activeKey,
        bookmarked,
      });
      const bookmarkedQuestion = getAccurateBookmarkedValue(surveyState.definition.sections, activeKey, bookmarked);
      const newSurvey = updateSurveyQuestion(surveyData, activeKey, {
        value: getQuestionValue(surveyData, activeKey),
        skipped: false,
        saved: bookmarkedQuestion,
      });
      const response = (await putSurveyData(newSurvey as ComplianceSurveyPayloadType, getOrgSpecificUrl)) as ComplianceSurveyPayloadType;
      const sortedSurvey = sortComplianceSurvey(response);
      setSurveyState(sortedSurvey);
      await mutate([getOrgSpecificUrl(`/surveys/${newSurvey.name}`), 'GET'], sortedSurvey, {
        revalidate: false,
      });
    }
  };

  useEffect(() => {
    if (!surveyData || !orgId) {
      return;
    }
    // runs when the component mounts and/or when the orgId changes via impersonation
    const key = getStartingKey(sortedSurvey);
    const parsedOrgStorage = getOrgStorage(orgId);
    const activeKeyFromStorage = get(parsedOrgStorage, `compliance.${name}.complianceActiveKey`, null);
    const keyToBeUsed = activeKeyFromStorage ? activeKeyFromStorage : key;
    setActiveKey(keyToBeUsed);
  }, [orgId]);

  useEffect(() => {
    if (activeKey.section !== '' && orgId) {
      const parsedOrgStorage = getOrgStorage(orgId);
      set(parsedOrgStorage, `compliance.${name}.complianceActiveKey`, activeKey);
      setOrgStorage(orgId, parsedOrgStorage);
      logBrowser('Active key updated', 'info', {
        data,
        orgId,
        activeKey,
        surveyData,
      });
    }
  }, [activeKey]);

  useEffect(() => {
    const newSavedQuestions = getSavedQuestionsInSurvey(surveyState);
    logBrowser('Saved questions updated', 'info', {
      oldSavedQuestions: savedQuestions,
      newSavedQuestions,
      data,
      orgId,
      activeKey,
    });
    setSavedQuestions(newSavedQuestions);
    if (newSavedQuestions.length === 0 && activeKey.section === 'savedQuestions') {
      const key = getStartingKey(sortedSurvey);
      setActiveKey(key);
    }
  }, [surveyState]);

  if (!sortedSurvey) {
    return null;
  }

  if (activeKey.section === '') {
    return <Spinner size={GlobalSizes.xLarge} />;
  }

  logBrowser('Survey Compliance Flow Step', 'info', {
    data,
    orgId,
    surveyData,
    activeKey,
    bookmarked,
    savedQuestions,
  });

  return (
    <div className={'h-[708px] w-full flex flex-row relative text-tc-primary'}>
      <div className={'flex w-auto h-full'}>
        <ComplianceSurveyLeftNav surveyData={surveyState} savedQuestions={savedQuestions} activeKey={activeKey} setActiveKey={setActiveKey} />
      </div>
      <div className={'flex w-full h-full'}>
        <ComplianceSurveyRightNav
          surveyData={surveyState}
          savedQuestions={savedQuestions}
          activeKey={activeKey}
          setActiveKey={setActiveKey}
          surveyOpen={surveyOpen}
          setSurveyOpen={setSurveyOpen}
        />
      </div>
      <Takeover show={surveyOpen} setShow={setSurveyOpen} className={'absolute h-full w-full p-[30px] bg-transparent'} containClassName={'bg-bgc-elevated rounded-lg'}>
        {activeKey.section === 'savedQuestions' ? (
          <ComplianceSurveySavedQuestionnaire
            surveyData={surveyState}
            setSurveyData={setSurveyState}
            activeKey={activeKey}
            setActiveKey={setActiveKey}
            submitSurvey={() => {
              onSurveyClose();
              setSurveyOpen(false);
            }}
            savedQuestions={savedQuestions}
            bookmarked={bookmarked}
            setBookmarked={setBookmarked}
          />
        ) : (
          <ComplianceSurveyQuestionnaire
            surveyData={surveyState}
            setSurveyData={setSurveyState}
            activeKey={activeKey}
            setActiveKey={setActiveKey}
            submitSurvey={() => {
              setSurveyOpen(false);
            }}
            savedQuestions={savedQuestions}
          />
        )}
      </Takeover>
    </div>
  );
};

export const SurveyComplianceFlowStep = withErrorBoundary(_SurveyComplianceFlowStep, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in SurveyComplianceFlowStep: ', error);
  },
});
