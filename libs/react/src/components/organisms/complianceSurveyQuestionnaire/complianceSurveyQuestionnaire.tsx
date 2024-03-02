import { ComplianceSurveyActiveKeyType, ComplianceSurveyPayloadType, IButtonProps, SurveyActiveKeyType } from '@coldpbc/interfaces';
import { useAuth0Wrapper } from '@coldpbc/hooks';
import React from 'react';
import { findIndex, size } from 'lodash';
import { getQuestionValue, getSectionIndex, ifAdditionalContextConditionMet, isComponentTypeValid, putSurveyData, updateSurveyQuestion } from '@coldpbc/lib';
import { BaseButton, SurveyInput } from '@coldpbc/components';
import { ButtonTypes, GlobalSizes } from '@coldpbc/enums';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useSWRConfig } from 'swr';

export interface ComplianceSurveyQuestionnaireProps {
  activeKey: ComplianceSurveyActiveKeyType;
  setActiveKey: (activeKey: ComplianceSurveyActiveKeyType) => void;
  submitSurvey: () => void;
  surveyData: ComplianceSurveyPayloadType;
  setSurveyData: (surveyData: ComplianceSurveyPayloadType) => void;
}

export const ComplianceSurveyQuestionnaire = (props: ComplianceSurveyQuestionnaireProps) => {
  const { activeKey, setActiveKey, submitSurvey, surveyData, setSurveyData } = props;
  const { getOrgSpecificUrl } = useAuth0Wrapper();
  const [sendingSurvey, setSendingSurvey] = React.useState<boolean>(false);
  const nextQuestionTransitionClassNames = {
    enter: 'transform translate-x-full',
    enterDone: 'transition ease-out duration-200 transform translate-x-0',
    exitActive: 'transition ease-in duration-200 transform -translate-x-full',
  };
  const previousQuestionTransitionClassNames = {
    enter: 'transform -translate-x-full',
    enterDone: 'transition ease-out duration-200 transform translate-x-0',
    exitActive: 'transition ease-in duration-200 transform translate-x-full',
  };
  const { mutate } = useSWRConfig();
  const [transitionClassNames, setTransitionClassNames] = React.useState<any>(nextQuestionTransitionClassNames);
  const { definition, id, name } = surveyData;
  const { sections } = definition;

  const updateTransitionClassNames = (nextDirection: boolean) => {
    if (nextDirection) {
      setTransitionClassNames(nextQuestionTransitionClassNames);
    } else {
      setTransitionClassNames(previousQuestionTransitionClassNames);
    }
  };

  const onFieldUpdated = (key: string, value: any, additional = false) => {
    setActiveKey({
      value: activeKey.value,
      previousValue: activeKey.value,
      isFollowUp: activeKey.isFollowUp,
      section: activeKey.section,
      category: activeKey.category,
    });
    const newSurvey = updateSurveyQuestion(surveyData, activeKey, { value }, undefined, additional);
    setSurveyData(newSurvey as ComplianceSurveyPayloadType);
  };

  const getQuestionForKey = (key: ComplianceSurveyActiveKeyType, additional = false) => {
    const activeSectionIndex = getSectionIndex(sections, activeKey);
    const activeSectionKey = Object.keys(sections)[activeSectionIndex];
    if (key.isFollowUp) {
      const followUpIndex = findIndex(Object.keys(sections[activeSectionKey].follow_up), followUpKey => {
        return followUpKey === key.value;
      });
      const followUpKey = Object.keys(sections[activeSectionKey].follow_up)[followUpIndex];
      const followUp = sections[activeSectionKey].follow_up[followUpKey];
      if (additional && followUp.additional_context) {
        return (
          <SurveyInput
            {...followUp.additional_context}
            options={[]}
            input_key={key.value}
            onFieldUpdated={(name, value) => {
              onFieldUpdated(key.value, value, true);
            }}
            value={followUp.additional_context.value}
            isAdditional={true}
          />
        );
      }
      if (followUp) {
        return <SurveyInput {...followUp} input_key={key.value} onFieldUpdated={onFieldUpdated} value={followUp.value} />;
      }
    } else {
      const section = sections[key.value];
      if (section && isComponentTypeValid(section.component)) {
        if (additional && section.additional_context) {
          return (
            <SurveyInput
              {...section.additional_context}
              options={[]}
              input_key={key.value}
              onFieldUpdated={(name, value) => {
                onFieldUpdated(key.value, value, true);
              }}
              value={section.additional_context.value}
              isAdditional={true}
            />
          );
        }
        return (
          <SurveyInput
            {...section}
            input_key={key.value}
            onFieldUpdated={onFieldUpdated}
            component={section.component}
            options={[]}
            tooltip={''}
            placeholder={''}
            value={section.value}
          />
        );
      }
    }

    return <></>;
  };

  const getPreviousButton = () => {
    const buttonProps = {
      label: '',
      variant: ButtonTypes.secondary,
      onClick: () => {
        onPreviousButtonClicked();
      },
      textSize: GlobalSizes.small,
    };
    const activeSectionIndex = getSectionIndex(sections, activeKey);
    const activeSectionKey = Object.keys(sections)[activeSectionIndex];
    if (!activeKey.isFollowUp) {
      if (activeSectionIndex !== 0) {
        buttonProps.label = 'Previous';
        buttonProps.onClick = () => {
          onPreviousButtonClicked();
        };
      }
    } else {
      const activeFollowUpIndex = findIndex(Object.keys(sections[activeSectionKey].follow_up), followUpKey => {
        return followUpKey === activeKey.value;
      });
      if (!isComponentTypeValid(sections[activeSectionKey].component) && sections[activeSectionKey].prompt === '') {
        if (activeFollowUpIndex === 0) {
          if (activeSectionIndex !== 0) {
            buttonProps.label = 'Previous';
            buttonProps.onClick = () => {
              onPreviousButtonClicked();
            };
          }
        } else {
          buttonProps.label = 'Previous';
          buttonProps.onClick = () => {
            onPreviousButtonClicked();
          };
        }
      } else {
        buttonProps.label = 'Previous';
        buttonProps.onClick = () => {
          onPreviousButtonClicked();
        };
      }
    }
    if (buttonProps.label === '') {
      return <></>;
    } else {
      return <BaseButton {...buttonProps} />;
    }
  };

  const getNextButton = () => {
    const buttonProps: IButtonProps = {
      label: 'Continue',
      variant: ButtonTypes.primary,
      onClick: () => {
        onNextButtonClicked();
      },
      textSize: GlobalSizes.small,
      loading: sendingSurvey,
    };
    const activeSectionIndex = getSectionIndex(sections, activeKey);
    const activeSectionKey = Object.keys(sections)[activeSectionIndex];
    if (activeKey.isFollowUp) {
      const activeFollowUpIndex = Object.keys(sections[activeSectionKey].follow_up).findIndex(followUpKey => {
        return followUpKey === activeKey.value;
      });
      const activeFollowUpKey = Object.keys(sections[activeSectionKey].follow_up)[activeFollowUpIndex];
      if (
        additionalContextQuestion &&
        sections[activeSectionKey].follow_up[activeFollowUpKey].additional_context &&
        (sections[activeSectionKey].follow_up[activeFollowUpKey].additional_context?.value === undefined ||
          sections[activeSectionKey].follow_up[activeFollowUpKey].additional_context?.value === null)
      ) {
        buttonProps.disabled = true;
      }

      if (
        sections[activeSectionKey].follow_up[activeFollowUpKey].value === undefined &&
        sections[activeSectionKey].follow_up[activeFollowUpKey].ai_response !== undefined &&
        sections[activeSectionKey].follow_up[activeFollowUpKey].ai_response?.answer !== undefined
      ) {
        buttonProps.label = 'Confirm';
        if (activeSectionIndex === Object.keys(sections).length - 1 && activeFollowUpIndex === Object.keys(sections[activeSectionKey].follow_up).length - 1) {
          buttonProps.onClick = () => {
            onSubmitButtonClicked();
          };
        } else {
          buttonProps.onClick = () => {
            onNextButtonClicked();
          };
        }
      } else {
        if (activeSectionIndex === Object.keys(sections).length - 1 && activeFollowUpIndex === Object.keys(sections[activeSectionKey].follow_up).length - 1) {
          buttonProps.label = 'Submit';
          buttonProps.onClick = () => {
            onSubmitButtonClicked();
          };
        } else {
          if (sections[activeSectionKey].follow_up[activeFollowUpKey].value === null || sections[activeSectionKey].follow_up[activeFollowUpKey].value === undefined) {
            buttonProps.label = 'Skip';
            buttonProps.onClick = () => {
              onSkipButtonClicked();
            };
          } else {
            buttonProps.label = 'Continue';
            buttonProps.onClick = () => {
              onNextButtonClicked();
            };
          }
        }
      }
    } else {
      if (
        additionalContextQuestion &&
        sections[activeSectionKey].additional_context &&
        (sections[activeSectionKey].additional_context?.value === undefined || sections[activeSectionKey].additional_context?.value === null)
      ) {
        buttonProps.disabled = true;
      }
      if (sections[activeSectionKey].value === undefined && sections[activeSectionKey].ai_response !== undefined && sections[activeSectionKey].ai_response?.answer !== undefined) {
        buttonProps.label = 'Confirm';
        buttonProps.onClick = () => {
          onNextButtonClicked();
        };
      } else {
        if (sections[activeSectionKey].value === null || sections[activeSectionKey].value === undefined) {
          if (activeSectionIndex === Object.keys(sections).length - 1) {
            buttonProps.label = 'Submit';
            buttonProps.onClick = () => {
              onSubmitButtonClicked();
            };
          } else {
            buttonProps.label = 'Skip';
            buttonProps.onClick = () => {
              onSkipButtonClicked();
            };
          }
        } else {
          if (sections[activeSectionKey].value === false) {
            buttonProps.label = 'Submit';
            buttonProps.onClick = () => {
              onSubmitButtonClicked();
            };
          } else {
            buttonProps.label = 'Continue';
            buttonProps.onClick = () => {
              onNextButtonClicked();
            };
          }
        }
      }
    }

    return <BaseButton {...buttonProps} />;
  };

  const goToNextQuestion = () => {
    const activeSectionIndex = getSectionIndex(sections, activeKey);
    const activeSectionKey = Object.keys(sections)[activeSectionIndex];
    const nextSectionKey = Object.keys(sections)[activeSectionIndex + 1];
    const nextSection = sections[nextSectionKey];

    if (activeKey.isFollowUp) {
      const activeFollowUpIndex = findIndex(Object.keys(sections[activeSectionKey].follow_up), followUpKey => {
        return followUpKey === activeKey.value;
      });
      if (activeFollowUpIndex === Object.keys(sections[activeSectionKey].follow_up).length - 1) {
        if (!isComponentTypeValid(nextSection.component) && nextSection.prompt === '') {
          setActiveKey({
            value: Object.keys(nextSection.follow_up)[0],
            previousValue: activeKey.value,
            isFollowUp: true,
            section: nextSectionKey,
            category: nextSection.category,
          });
        } else {
          setActiveKey({
            value: nextSectionKey,
            previousValue: activeKey.value,
            isFollowUp: false,
            section: nextSectionKey,
            category: nextSection.category,
          });
        }
      } else {
        const nextFollowUpKey = Object.keys(sections[activeSectionKey].follow_up)[activeFollowUpIndex + 1];
        setActiveKey({
          value: nextFollowUpKey,
          previousValue: activeKey.value,
          isFollowUp: true,
          section: activeSectionKey,
          category: sections[activeSectionKey].category,
        });
      }
    } else {
      if (sections[activeSectionKey].value !== true) {
        if (!isComponentTypeValid(nextSection.component) && nextSection.prompt === '') {
          setActiveKey({
            value: Object.keys(nextSection.follow_up)[0],
            previousValue: activeKey.value,
            isFollowUp: true,
            section: nextSectionKey,
            category: nextSection.category,
          });
        } else {
          setActiveKey({
            value: nextSectionKey,
            previousValue: activeKey.value,
            isFollowUp: false,
            section: nextSectionKey,
            category: nextSection.category,
          });
        }
      } else {
        const nextFollowUpKey = Object.keys(sections[activeSectionKey].follow_up)[0];
        setActiveKey({
          value: nextFollowUpKey,
          previousValue: activeKey.value,
          isFollowUp: true,
          section: activeSectionKey,
          category: sections[activeSectionKey].category,
        });
      }
    }
  };

  const onNextButtonClicked = async () => {
    setSendingSurvey(true);
    const newSurvey = updateSurveyQuestion(surveyData, activeKey, { value: getQuestionValue(surveyData, activeKey), skipped: false });
    const response = (await putSurveyData(newSurvey as ComplianceSurveyPayloadType, getOrgSpecificUrl)) as ComplianceSurveyPayloadType;
    setSurveyData(response);
    await mutate([getOrgSpecificUrl(`/surveys/${newSurvey.name}`), 'GET'], response);
    updateTransitionClassNames(true);
    setSendingSurvey(false);
    goToNextQuestion();
  };

  const onSkipButtonClicked = async () => {
    setSendingSurvey(true);
    const newSurvey = updateSurveyQuestion(surveyData, activeKey, {
      skipped: true,
      value: null,
    });
    const response = (await putSurveyData(newSurvey as ComplianceSurveyPayloadType, getOrgSpecificUrl)) as ComplianceSurveyPayloadType;
    setSurveyData(response);
    await mutate([getOrgSpecificUrl(`/surveys/${newSurvey.name}`), 'GET'], response);
    updateTransitionClassNames(true);
    setSendingSurvey(false);
    goToNextQuestion();
  };

  const onSubmitButtonClicked = async () => {
    // tell the difference between a skipped question and a question that was answered
    setSendingSurvey(true);
    const newSurvey = updateSurveyQuestion(surveyData, activeKey, { value: getQuestionValue(surveyData, activeKey), skipped: false }, true);
    const response = (await putSurveyData(newSurvey as ComplianceSurveyPayloadType, getOrgSpecificUrl)) as ComplianceSurveyPayloadType;
    setSurveyData(response);
    updateTransitionClassNames(true);
    setSendingSurvey(false);
    submitSurvey();
  };

  const onPreviousButtonClicked = () => {
    const activeSectionIndex = getSectionIndex(sections, activeKey);
    const activeSectionKey = Object.keys(sections)[activeSectionIndex];
    if (activeKey.isFollowUp) {
      const activeFollowUpIndex = findIndex(Object.keys(sections[activeSectionKey].follow_up), followUpKey => {
        return followUpKey === activeKey.value;
      });
      if (activeFollowUpIndex === 0) {
        const section = sections[activeSectionKey];
        if (!isComponentTypeValid(section.component) && section.prompt === '') {
          const previousSectionKey = Object.keys(sections)[activeSectionIndex - 1];
          const previousSection = sections[previousSectionKey];
          if (previousSection.value !== true && isComponentTypeValid(previousSection.component) && previousSection.prompt !== '') {
            setActiveKey({
              value: previousSectionKey,
              previousValue: activeKey.value,
              isFollowUp: false,
              section: previousSectionKey,
              category: previousSection.category,
            });
          } else {
            setActiveKey({
              value: Object.keys(previousSection.follow_up)[Object.keys(previousSection.follow_up).length - 1],
              previousValue: activeKey.value,
              isFollowUp: true,
              section: previousSectionKey,
              category: previousSection.category,
            });
          }
        } else {
          setActiveKey({
            value: activeSectionKey,
            previousValue: activeKey.value,
            isFollowUp: false,
            section: activeSectionKey,
            category: sections[activeSectionKey].category,
          });
        }
      } else {
        const previousFollowUpKey = Object.keys(sections[activeSectionKey].follow_up)[activeFollowUpIndex - 1];
        setActiveKey({
          value: previousFollowUpKey,
          previousValue: activeKey.value,
          isFollowUp: true,
          section: activeSectionKey,
          category: sections[activeSectionKey].category,
        });
      }
    } else {
      const previousSectionKey = Object.keys(sections)[activeSectionIndex - 1];
      const previousSection = sections[previousSectionKey];
      if (previousSection.value !== true && isComponentTypeValid(previousSection.component) && previousSection.prompt !== '') {
        setActiveKey({
          value: previousSectionKey,
          previousValue: activeKey.value,
          isFollowUp: false,
          section: previousSectionKey,
          category: previousSection.category,
        });
      } else {
        const previousSectionLastFollowUpKey = Object.keys(previousSection.follow_up)[Object.keys(previousSection.follow_up).length - 1];
        setActiveKey({
          value: previousSectionLastFollowUpKey,
          previousValue: activeKey.value,
          isFollowUp: true,
          section: previousSectionKey,
          category: previousSection.category,
        });
      }
    }
    updateTransitionClassNames(false);
  };

  const checkAdditionalContext = (key: SurveyActiveKeyType) => {
    let condition = false;
    const activeSectionIndex = getSectionIndex(sections, activeKey);
    const activeSectionKey = Object.keys(sections)[activeSectionIndex];
    const section = sections[activeSectionKey];
    if (key.isFollowUp) {
      const followUp = section.follow_up[key.value];
      const value = getQuestionValue(surveyData, key);
      // if the follow up is unanswered then
      if (value === null || value === undefined) {
        condition = false;
      } else {
        if (followUp && followUp.additional_context) {
          condition = ifAdditionalContextConditionMet(value, followUp.additional_context);
        }
      }
    } else {
      const value = getQuestionValue(surveyData, key);
      if (value === null || value === undefined) {
        condition = false;
      } else {
        if (section.additional_context) {
          condition = ifAdditionalContextConditionMet(value, section.additional_context);
        }
      }
    }
    if (condition) {
      return getQuestionForKey(activeKey, true);
    } else {
      return undefined;
    }
  };

  const questions = Object.keys(sections)
    .map(sectionKey => {
      const category = getQuestionForKey({
        value: sectionKey,
        previousValue: '',
        isFollowUp: false,
        section: sectionKey,
        category: sections[sectionKey].category,
      });
      const followUps = Object.keys(sections[sectionKey].follow_up).map(followUpKey => {
        return getQuestionForKey({
          value: followUpKey,
          previousValue: '',
          isFollowUp: true,
          section: sectionKey,
          category: sections[sectionKey].category,
        });
      });
      return [category, ...followUps];
    })
    .flat();

  const question = questions.find(question => {
    return question.props.input_key === activeKey.value;
  });

  const additionalContextQuestion = checkAdditionalContext(activeKey);

  if (question !== undefined) {
    return (
      <div className={'w-full h-full relative flex flex-col space-y-[24px]'} data-testid={'survey-question-container'}>
        <div className={'flex flex-col'}>
          <div className={'text-caption font-bold'}>{activeKey.category}</div>
          <div className={'text-h2'}>{surveyData.definition.sections[activeKey.section].title}</div>
          <div className={'text-caption'}>
            ( Question {surveyData.definition.sections[activeKey.section].follow_up[activeKey.value].idx + 1}
            {' of '}
            {size(surveyData.definition.sections[activeKey.section].follow_up)})
          </div>
        </div>
        <div className={'h-full w-full flex items-start justify-center overflow-y-auto'}>
          <SwitchTransition>
            <CSSTransition key={question.props.input_key} timeout={150} classNames={transitionClassNames}>
              <div className={'w-full space-y-6 items-start'}>
                {question}
                {additionalContextQuestion}
              </div>
            </CSSTransition>
          </SwitchTransition>
        </div>
        <div className={'w-full space-x-[15px] h-[80px] flex justify-end right-0 bottom-0 pb-[40px]'}>
          {getPreviousButton()}
          {getNextButton()}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};
