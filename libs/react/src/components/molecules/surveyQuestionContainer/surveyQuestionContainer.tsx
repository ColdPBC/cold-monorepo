import React, { useEffect } from 'react';
import { SurveyInput } from '../index';
import { cloneDeep, findIndex, forEach } from 'lodash';
import {
  SurveyActiveKeyType,
  SurveyPayloadType,
  SurveySectionType,
} from '@coldpbc/interfaces';
import { BaseButton } from '../../atoms';
import { ButtonTypes, GlobalSizes } from '@coldpbc/enums';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { getSectionIndex, isKeyValueFollowUp } from '@coldpbc/lib';
import { axiosFetcher } from '@coldpbc/fetchers';

export interface SurveyQuestionContainerProps {
  activeKey: SurveyActiveKeyType;
  setActiveKey: (activeKey: SurveyActiveKeyType) => void;
  submitSurvey: () => void;
  surveyData: SurveyPayloadType;
  setSurveyData: (surveyData: SurveyPayloadType) => void;
}

export const SurveyQuestionContainer = ({
  activeKey,
  setActiveKey,
  submitSurvey,
  surveyData,
  setSurveyData,
}: SurveyQuestionContainerProps) => {
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
  const [activeQuestion, setActiveQuestion] = React.useState<
    JSX.Element | undefined
  >(undefined);
  const [transitionClassNames, setTransitionClassNames] = React.useState<any>(
    nextQuestionTransitionClassNames,
  );
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
  ) => {
    let newSection: SurveySectionType;
    const activeSectionIndex = getSectionIndex(sections, activeKey);
    const activeSectionKey = Object.keys(sections)[activeSectionIndex];
    if (isKeyValueFollowUp(key, sections)) {
      const section = sections[activeSectionKey];
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
    } else {
      const section = sections[key];
      newSection = {
        ...section,
        ...update,
      };
      if (update.value === false || update.skipped === true) {
        forEach(Object.keys(section.follow_up), (followUpKey) => {
          newSection.follow_up[followUpKey].value = null;
          newSection.follow_up[followUpKey].skipped = true;
        });
      }
    }
    const newSurvey: SurveyPayloadType = cloneDeep(surveyData);
    newSurvey.definition.sections[activeSectionKey] = newSection;
    setSurveyData(newSurvey);
  };

  const onFieldUpdated = (key: string, value: any) => {
    updateSurveyQuestion(key, { value });
  };

  const getQuestionForKey = (key: SurveyActiveKeyType) => {
    const activeSectionIndex = getSectionIndex(sections, activeKey);
    const activeSectionKey = Object.keys(sections)[activeSectionIndex];
    if (key.isFollowUp) {
      const followUpIndex = findIndex(
        Object.keys(sections[activeSectionKey].follow_up),
        (followUpKey) => {
          return followUpKey === key.value;
        },
      );
      const followUpKey = Object.keys(sections[activeSectionKey].follow_up)[
        followUpIndex
      ];
      const followUp = sections[activeSectionKey].follow_up[followUpKey];
      if (followUp) {
        return (
          <SurveyInput
            {...followUp}
            input_key={key.value}
            onFieldUpdated={onFieldUpdated}
            value={followUp.value === undefined ? null : followUp.value}
          />
        );
      }
    } else {
      const section = sections[key.value];
      if (section && section.component !== null) {
        return (
          <SurveyInput
            {...section}
            input_key={key.value}
            onFieldUpdated={onFieldUpdated}
            component={section.component}
            options={[]}
            tooltip={''}
            placeholder={''}
            value={section.value === undefined ? null : section.value}
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
      const activeFollowUpIndex = findIndex(
        Object.keys(sections[activeSectionKey].follow_up),
        (followUpKey) => {
          return followUpKey === activeKey.value;
        },
      );
      if (
        sections[activeSectionKey].component === null &&
        sections[activeSectionKey].prompt === ''
      ) {
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
    const buttonProps = {
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
      const activeFollowUpIndex = Object.keys(
        sections[activeSectionKey].follow_up,
      ).findIndex((followUpKey) => {
        return followUpKey === activeKey.value;
      });
      const activeFollowUpKey = Object.keys(
        sections[activeSectionKey].follow_up,
      )[activeFollowUpIndex];
      if (
        activeSectionIndex === Object.keys(sections).length - 1 &&
        activeFollowUpIndex ===
          Object.keys(sections[activeSectionKey].follow_up).length - 1
      ) {
        buttonProps.label = 'Submit';
        buttonProps.onClick = () => {
          onSubmitButtonClicked();
        };
      } else {
        if (
          sections[activeSectionKey].follow_up[activeFollowUpKey].value ===
            null ||
          sections[activeSectionKey].follow_up[activeFollowUpKey].value ===
            undefined
        ) {
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
    } else {
      if (
        sections[activeSectionKey].value === null ||
        sections[activeSectionKey].value === undefined
      ) {
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

    return <BaseButton {...buttonProps} />;
  };

  const goToNextQuestion = () => {
    const activeSectionIndex = getSectionIndex(sections, activeKey);
    const activeSectionKey = Object.keys(sections)[activeSectionIndex];
    const nextSectionKey = Object.keys(sections)[activeSectionIndex + 1];
    const nextSection = sections[nextSectionKey];

    if (activeKey.isFollowUp) {
      const activeFollowUpIndex = findIndex(
        Object.keys(sections[activeSectionKey].follow_up),
        (followUpKey) => {
          return followUpKey === activeKey.value;
        },
      );
      if (
        activeFollowUpIndex ===
        Object.keys(sections[activeSectionKey].follow_up).length - 1
      ) {
        if (nextSection.component === null && nextSection.prompt === '') {
          setActiveKey({
            value: Object.keys(nextSection.follow_up)[0],
            isFollowUp: true,
          });
        } else {
          setActiveKey({
            value: nextSectionKey,
            isFollowUp: false,
          });
        }
      } else {
        const nextFollowUpKey = Object.keys(
          sections[activeSectionKey].follow_up,
        )[activeFollowUpIndex + 1];
        setActiveKey({
          value: nextFollowUpKey,
          isFollowUp: true,
        });
      }
    } else {
      if (sections[activeSectionKey].value !== true) {
        if (nextSection.component === null && nextSection.prompt === '') {
          setActiveKey({
            value: Object.keys(nextSection.follow_up)[0],
            isFollowUp: true,
          });
        } else {
          setActiveKey({
            value: nextSectionKey,
            isFollowUp: false,
          });
        }
      } else {
        const nextFollowUpKey = Object.keys(
          sections[activeSectionKey].follow_up,
        )[0];
        setActiveKey({
          value: nextFollowUpKey,
          isFollowUp: true,
        });
      }
    }
  };

  const onNextButtonClicked = () => {
    goToNextQuestion();
    updateSurveyQuestion(activeKey.value, { skipped: false });
    updateTransitionClassNames(true);
    patchSurveyData();
  };

  const onSkipButtonClicked = () => {
    goToNextQuestion();
    updateSurveyQuestion(activeKey.value, { skipped: true });
    updateTransitionClassNames(true);
    patchSurveyData();
  };

  const onSubmitButtonClicked = () => {
    updateSurveyQuestion(activeKey.value, { skipped: true });
    updateTransitionClassNames(true);
    patchSurveyData();
    submitSurvey();
  };

  const onPreviousButtonClicked = () => {
    const activeSectionIndex = getSectionIndex(sections, activeKey);
    const activeSectionKey = Object.keys(sections)[activeSectionIndex];
    if (activeKey.isFollowUp) {
      const activeFollowUpIndex = findIndex(
        Object.keys(sections[activeSectionKey].follow_up),
        (followUpKey) => {
          return followUpKey === activeKey.value;
        },
      );
      if (activeFollowUpIndex === 0) {
        const section = sections[activeSectionKey];
        if (section.component === null && section.prompt === '') {
          const previousSectionKey =
            Object.keys(sections)[activeSectionIndex - 1];
          const previousSection = sections[previousSectionKey];
          if (previousSection.value !== true) {
            setActiveKey({
              value: previousSectionKey,
              isFollowUp: false,
            });
          } else {
            setActiveKey({
              value: Object.keys(previousSection.follow_up)[
                Object.keys(previousSection.follow_up).length - 1
              ],
              isFollowUp: true,
            });
          }
        } else {
          setActiveKey({
            value: activeSectionKey,
            isFollowUp: false,
          });
        }
      } else {
        const previousFollowUpKey = Object.keys(
          sections[activeSectionKey].follow_up,
        )[activeFollowUpIndex - 1];
        setActiveKey({
          value: previousFollowUpKey,
          isFollowUp: true,
        });
      }
    } else {
      const previousSectionKey = Object.keys(sections)[activeSectionIndex - 1];
      const previousSection = sections[previousSectionKey];
      if (
        previousSection.value !== true &&
        previousSection.component !== null &&
        previousSection.prompt !== ''
      ) {
        setActiveKey({
          value: previousSectionKey,
          isFollowUp: false,
        });
      } else {
        const previousSectionLastFollowUpKey = Object.keys(
          previousSection.follow_up,
        )[Object.keys(previousSection.follow_up).length - 1];

        setActiveKey({
          value: previousSectionLastFollowUpKey,
          isFollowUp: true,
        });
      }
    }
    updateTransitionClassNames(false);
  };

  const patchSurveyData = () => {
    axiosFetcher([
      `/surveys/${name}`,
      'PATCH',
      JSON.stringify({
        definition: surveyData.definition,
      }),
    ]);
  };

  const questions = Object.keys(sections)
    .map((sectionKey) => {
      const category = getQuestionForKey({
        value: sectionKey,
        isFollowUp: false,
      });
      const followUps = Object.keys(sections[sectionKey].follow_up).map(
        (followUpKey) => {
          return getQuestionForKey({
            value: followUpKey,
            isFollowUp: true,
          });
        },
      );
      return [category, ...followUps];
    })
    .flat();

  const getActiveQuestion = () => {
    const question = questions.find((question) => {
      return question.props.input_key === activeKey.value;
    });
    setActiveQuestion(question);
  };

  useEffect(() => {
    getActiveQuestion();
  }, [activeKey, surveyData]);

  if (activeQuestion !== undefined) {
    return (
      <div
        className={
          'w-[668px] h-[923px] relative flex items-center justify-center overflow-hidden'
        }
      >
        <SwitchTransition>
          <CSSTransition
            key={activeQuestion.props.input_key}
            timeout={150}
            classNames={transitionClassNames}
          >
            <div
              className={'h-full w-[438px] flex items-center justify-center'}
            >
              {activeQuestion}
            </div>
          </CSSTransition>
        </SwitchTransition>
        <div
          className={
            'absolute w-[540px] space-x-[15px] h-[40px] flex justify-end right-0 bottom-0'
          }
        >
          {getPreviousButton()}
          {getNextButton()}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};
