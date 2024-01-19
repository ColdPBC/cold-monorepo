import React, { useEffect } from 'react';
import { SurveyInput } from '../index';
import { cloneDeep, findIndex, forEach } from 'lodash';
import { IButtonProps, SurveyActiveKeyType, SurveyAdditionalContext, SurveyPayloadType, SurveySectionType } from '@coldpbc/interfaces';
import { BaseButton } from '../../atoms';
import { ButtonTypes, GlobalSizes } from '@coldpbc/enums';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { getSectionIndex, isKeyValueFollowUp } from '@coldpbc/lib';
import { axiosFetcher } from '@coldpbc/fetchers';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';
import { useAuth0Wrapper } from '@coldpbc/hooks';
import { isDefined } from 'class-validator';

export interface SurveyQuestionContainerProps {
  activeKey: SurveyActiveKeyType;
  setActiveKey: (activeKey: SurveyActiveKeyType) => void;
  submitSurvey: () => void;
  surveyData: SurveyPayloadType;
  setSurveyData: (surveyData: SurveyPayloadType) => void;
}

const _SurveyQuestionContainer = ({ activeKey, setActiveKey, submitSurvey, surveyData, setSurveyData }: SurveyQuestionContainerProps) => {
  const { getOrgSpecificUrl } = useAuth0Wrapper();
  const nextQuestionTransitionClassNames = {
    enter: 'transform translate-y-full',
    enterDone: 'transition ease-out duration-200 transform translate-y-0',
    exitActive: 'transition ease-in duration-200 transform -translate-y-full',
  };
  const previousQuestionTransitionClassNames = {
    enter: 'transform -translate-y-full',
    enterDone: 'transition ease-out duration-200 transform translate-y-0',
    exitActive: 'transition ease-in duration-200 transform translate-y-full',
  };
  const [activeQuestion, setActiveQuestion] = React.useState<JSX.Element | undefined>(undefined);
  const [additionalContextQuestion, setAdditionalContextQuestion] = React.useState<JSX.Element | undefined>(undefined);
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

  const updateSurveyQuestion = (
    key: string,
    update: {
      value?: any | null;
      skipped?: boolean;
    },
    submit?: boolean,
    additional?: boolean,
  ) => {
    let newSection: SurveySectionType;
    const activeSectionIndex = getSectionIndex(sections, activeKey);
    const activeSectionKey = Object.keys(sections)[activeSectionIndex];
    if (isKeyValueFollowUp(key, sections)) {
      const section = sections[activeSectionKey];
      const followUp = section.follow_up[key];
      if (submit) {
        update.skipped = followUp.value === null || followUp.value === undefined;
      }
      if (followUp.additional_context) {
        if (additional) {
          newSection = {
            ...section,
            follow_up: {
              ...section.follow_up,
              [key]: {
                ...section.follow_up[key],
                additional_context: {
                  ...section.follow_up[key].additional_context,
                  ...update,
                } as SurveyAdditionalContext,
              },
            },
          };
        } else {
          const value = update.value;
          const conditionMet = ifAdditionalContextConditionMet(value, followUp.additional_context);
          if (!conditionMet) {
            newSection = {
              ...section,
              follow_up: {
                ...section.follow_up,
                [key]: {
                  ...section.follow_up[key],
                  ...update,
                  additional_context: {
                    ...section.follow_up[key].additional_context,
                    value: null,
                  } as SurveyAdditionalContext,
                },
              },
            };
          } else {
            newSection = {
              ...section,
              follow_up: {
                ...section.follow_up,
                [key]: {
                  ...section.follow_up[key],
                  ...update,
                },
              },
            };
          }
        }
      } else {
        newSection = {
          ...section,
          follow_up: {
            ...section.follow_up,
            [key]: {
              ...section.follow_up[key],
              ...update,
            },
          },
        };
      }
    } else {
      const section = sections[key];
      if (submit) {
        update.skipped = section.value === null || section.value === undefined;
        update.value = section.value ? section.value : null;
      }
      if (section.additional_context) {
        if (additional) {
          newSection = {
            ...section,
            additional_context: {
              ...section.additional_context,
              ...update,
            } as SurveyAdditionalContext,
          };
        } else {
          const value = update.value;
          const conditionMet = ifAdditionalContextConditionMet(value, section.additional_context);
          if (!conditionMet) {
            newSection = {
              ...section,
              ...update,
              additional_context: {
                ...section.additional_context,
                value: null,
              } as SurveyAdditionalContext,
            };
          } else {
            newSection = {
              ...section,
              ...update,
            };
          }
        }
      } else {
        newSection = {
          ...section,
          ...update,
        };
      }
      if (update.value === false || update.skipped === true) {
        forEach(Object.keys(section.follow_up), followUpKey => {
          newSection.follow_up[followUpKey].value = null;
          newSection.follow_up[followUpKey].skipped = true;
        });
      }
    }
    const newSurvey: SurveyPayloadType = cloneDeep(surveyData);
    newSurvey.definition.sections[activeSectionKey] = newSection;
    newSurvey.definition.submitted = submit;
    return newSurvey;
  };

  const onFieldUpdated = (key: string, value: any, additional = false) => {
    setActiveKey({
      value: activeKey.value,
      previousValue: activeKey.value,
      isFollowUp: activeKey.isFollowUp,
    });
    const survey = updateSurveyQuestion(key, { value }, undefined, additional);
    setSurveyData(survey);
  };

  const getQuestionForKey = (key: SurveyActiveKeyType, additional = false) => {
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
      if (section && section.component !== null) {
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
      if (sections[activeSectionKey].component === null && sections[activeSectionKey].prompt === '') {
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

      if (sections[activeSectionKey].follow_up[activeFollowUpKey].value === undefined && sections[activeSectionKey].follow_up[activeFollowUpKey].ai_value !== undefined) {
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
      if (additionalContextQuestion && sections[activeSectionKey].additional_context && sections[activeSectionKey].additional_context?.value === undefined) {
        buttonProps.disabled = true;
      }
      if (sections[activeSectionKey].value === undefined && sections[activeSectionKey].ai_value !== undefined) {
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
        if (nextSection.component === null && nextSection.prompt === '') {
          setActiveKey({
            value: Object.keys(nextSection.follow_up)[0],
            previousValue: activeKey.value,
            isFollowUp: true,
          });
        } else {
          setActiveKey({
            value: nextSectionKey,
            previousValue: activeKey.value,
            isFollowUp: false,
          });
        }
      } else {
        const nextFollowUpKey = Object.keys(sections[activeSectionKey].follow_up)[activeFollowUpIndex + 1];
        setActiveKey({
          value: nextFollowUpKey,
          previousValue: activeKey.value,
          isFollowUp: true,
        });
      }
    } else {
      if (sections[activeSectionKey].value !== true) {
        if (nextSection.component === null && nextSection.prompt === '') {
          setActiveKey({
            value: Object.keys(nextSection.follow_up)[0],
            previousValue: activeKey.value,
            isFollowUp: true,
          });
        } else {
          setActiveKey({
            value: nextSectionKey,
            previousValue: activeKey.value,
            isFollowUp: false,
          });
        }
      } else {
        const nextFollowUpKey = Object.keys(sections[activeSectionKey].follow_up)[0];
        setActiveKey({
          value: nextFollowUpKey,
          previousValue: activeKey.value,
          isFollowUp: true,
        });
      }
    }
  };

  const onNextButtonClicked = () => {
    const newSurvey = updateSurveyQuestion(activeKey.value, { value: getQuestionValue(activeKey), skipped: false });
    setSurveyData(newSurvey);
    goToNextQuestion();
    updateTransitionClassNames(true);
    putSurveyData(newSurvey);
  };

  const onSkipButtonClicked = () => {
    const newSurvey = updateSurveyQuestion(activeKey.value, {
      skipped: true,
      value: null,
    });
    setSurveyData(newSurvey);
    goToNextQuestion();
    updateTransitionClassNames(true);
    putSurveyData(newSurvey);
  };

  const onSubmitButtonClicked = async () => {
    // tell the difference between a skipped question and a question that was answered
    const newSurvey = updateSurveyQuestion(activeKey.value, { value: getQuestionValue(activeKey), skipped: false }, true);
    setSurveyData(newSurvey);
    updateTransitionClassNames(true);
    await putSurveyData(newSurvey);
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
        if (section.component === null && section.prompt === '') {
          const previousSectionKey = Object.keys(sections)[activeSectionIndex - 1];
          const previousSection = sections[previousSectionKey];
          if (previousSection.value !== true && previousSection.component !== null && previousSection.prompt !== '') {
            setActiveKey({
              value: previousSectionKey,
              previousValue: activeKey.value,
              isFollowUp: false,
            });
          } else {
            setActiveKey({
              value: Object.keys(previousSection.follow_up)[Object.keys(previousSection.follow_up).length - 1],
              previousValue: activeKey.value,
              isFollowUp: true,
            });
          }
        } else {
          setActiveKey({
            value: activeSectionKey,
            previousValue: activeKey.value,
            isFollowUp: false,
          });
        }
      } else {
        const previousFollowUpKey = Object.keys(sections[activeSectionKey].follow_up)[activeFollowUpIndex - 1];
        setActiveKey({
          value: previousFollowUpKey,
          previousValue: activeKey.value,
          isFollowUp: true,
        });
      }
    } else {
      const previousSectionKey = Object.keys(sections)[activeSectionIndex - 1];
      const previousSection = sections[previousSectionKey];
      if (previousSection.value !== true && previousSection.component !== null && previousSection.prompt !== '') {
        setActiveKey({
          value: previousSectionKey,
          previousValue: activeKey.value,
          isFollowUp: false,
        });
      } else {
        const previousSectionLastFollowUpKey = Object.keys(previousSection.follow_up)[Object.keys(previousSection.follow_up).length - 1];

        setActiveKey({
          value: previousSectionLastFollowUpKey,
          previousValue: activeKey.value,
          isFollowUp: true,
        });
      }
    }
    updateTransitionClassNames(false);
  };

  const putSurveyData = (survey: SurveyPayloadType) => {
    axiosFetcher([
      getOrgSpecificUrl(`/surveys/${name}`),
      'PUT',
      JSON.stringify({
        definition: survey.definition,
      }),
    ]);
  };

  const checkAdditionalContext = (key: SurveyActiveKeyType) => {
    let condition = false;
    const activeSectionIndex = getSectionIndex(sections, activeKey);
    const activeSectionKey = Object.keys(sections)[activeSectionIndex];
    const section = sections[activeSectionKey];
    if (key.isFollowUp) {
      const followUp = section.follow_up[key.value];
      const value = followUp.value;
      // if the follow up is unanswered then
      if (value === null || value === undefined) {
        condition = false;
      } else {
        if (followUp && followUp.additional_context) {
          condition = ifAdditionalContextConditionMet(value, followUp.additional_context);
        }
      }
    } else {
      const value = section.value;
      if (value === null || value === undefined) {
        condition = false;
      } else {
        if (section.additional_context) {
          condition = ifAdditionalContextConditionMet(value, section.additional_context);
        }
      }
    }
    if (condition) {
      setAdditionalContextQuestion(getQuestionForKey(activeKey, true));
    } else {
      setAdditionalContextQuestion(undefined);
    }
  };

  const ifAdditionalContextConditionMet = (value: any, additionalContext: SurveyAdditionalContext) => {
    switch (additionalContext.operator) {
      case '==':
        return value === additionalContext.comparison;
      case '!=':
        return value !== additionalContext.comparison;
      case '>':
        return value > additionalContext.comparison;
      case '<':
        return value < additionalContext.comparison;
      case '>=':
        return value >= additionalContext.comparison;
      case '<=':
        return value <= additionalContext.comparison;
      default:
        return false;
    }
  };

  const getQuestionValue = (key: SurveyActiveKeyType) => {
    const activeSectionIndex = getSectionIndex(sections, activeKey);
    const activeSectionKey = Object.keys(sections)[activeSectionIndex];
    if (key.isFollowUp) {
      const followUpIndex = findIndex(Object.keys(sections[activeSectionKey].follow_up), followUpKey => {
        return followUpKey === key.value;
      });
      const followUpKey = Object.keys(sections[activeSectionKey].follow_up)[followUpIndex];
      const followUp = sections[activeSectionKey].follow_up[followUpKey];
      if (followUp) {
        if (followUp.ai_value !== undefined && (followUp.value === null || followUp.value === undefined)) {
          return followUp.ai_value;
        } else {
          return followUp.value;
        }
      }
    } else {
      const section = sections[key.value];
      if (section) {
        return section.value;
      }
    }
  };

  const questions = Object.keys(sections)
    .map(sectionKey => {
      const category = getQuestionForKey({
        value: sectionKey,
        previousValue: '',
        isFollowUp: false,
      });
      const followUps = Object.keys(sections[sectionKey].follow_up).map(followUpKey => {
        return getQuestionForKey({
          value: followUpKey,
          previousValue: '',
          isFollowUp: true,
        });
      });
      return [category, ...followUps];
    })
    .flat();

  const getActiveQuestion = () => {
    const question = questions.find(question => {
      return question.props.input_key === activeKey.value;
    });
    // show additional context
    checkAdditionalContext(activeKey);
    setActiveQuestion(question);
  };

  useEffect(() => {
    getActiveQuestion();
  }, [activeKey, surveyData]);

  if (activeQuestion !== undefined) {
    return (
      <div className={'w-full h-full relative flex items-center justify-center overflow-hidden pb-[93px]'}>
        <SwitchTransition>
          <CSSTransition key={activeQuestion.props.input_key} timeout={150} classNames={transitionClassNames}>
            <div className={'h-full w-full flex items-center justify-center px-[139px] shortScreen:px-[32px] shortWideScreen:px-[139px]'}>
              <div className={'w-full space-y-6'}>
                {activeQuestion}
                {additionalContextQuestion}
              </div>
            </div>
          </CSSTransition>
        </SwitchTransition>
        <div className={'absolute w-[540px] space-x-[15px] h-[40px] flex justify-end right-0 bottom-0 mb-[37px]'}>
          {getPreviousButton()}
          {getNextButton()}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export const SurveyQuestionContainer = withErrorBoundary(_SurveyQuestionContainer, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in SurveyQuestionContainer: ', error);
  },
});
