import React, { useEffect } from 'react';
import { SurveyInput } from '../../molecules';
import { find, findIndex, findKey, forEach, forOwn } from 'lodash';
import {
  SurveyActiveKeyType,
  SurveyDataType,
  SurveyFormDefinitionType,
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
  surveyData: SurveyDataType;
  setSurveyData: (surveyData: SurveyDataType) => void;
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
  const [activeQuestion, setActiveQuestion] = React.useState<any>(null);
  const [transitionClassNames, setTransitionClassNames] = React.useState<any>(
    nextQuestionTransitionClassNames,
  );
  const { definition, name: surveyName } = surveyData;
  const { sections } = definition;

  const updateTransitionClassNames = (nextDirection: boolean) => {
    if (nextDirection) {
      setTransitionClassNames(nextQuestionTransitionClassNames);
    } else {
      setTransitionClassNames(previousQuestionTransitionClassNames);
    }
  };

  const onFieldUpdated = (key: string, value: any) => {
    let newSection: SurveySectionType;
    const activeSectionIndex = getSectionIndex(sections, activeKey);
    if (isKeyValueFollowUp(key, sections)) {
      const section = sections[activeSectionIndex];
      newSection = {
        ...section,
        follow_up: {
          ...section.follow_up,
          [key]: {
            ...section.follow_up[key],
            value: value,
          },
        },
      };
    } else {
      const section = sections[key];
      newSection = {
        ...section,
        value: value,
      };
      if (value === false) {
        forEach(Object.keys(section.follow_up), (followUpKey) => {
          newSection.follow_up[followUpKey].value = null;
        });
      }
    }
    // get the section key from the active key
    const activeSectionKey: string = Object.keys(sections)[activeSectionIndex];
    const newSurvey: SurveyDataType = {
      ...surveyData,
      definition: {
        ...surveyData.definition,
        sections: {
          ...surveyData.definition.sections,
          [activeSectionKey]: newSection,
        },
      },
    };
    patchSurveyData(newSurvey);
    setSurveyData(newSurvey);
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
    if (!activeKey.isFollowUp) {
      const activeSectionIndex = getSectionIndex(sections, activeKey);
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
        sections[activeSectionIndex].follow_up,
      ).findIndex((followUpKey) => {
        return followUpKey === activeKey.value;
      });
      const activeFollowUpKey = Object.keys(
        sections[activeSectionKey].follow_up,
      )[activeFollowUpIndex];
      if (
        sections[activeSectionKey].follow_up[activeFollowUpKey].value === null
      ) {
        buttonProps.label = 'Skip';
        buttonProps.onClick = () => {
          onNextButtonClicked();
        };
      } else {
        if (
          activeFollowUpIndex ===
          Object.keys(sections[activeSectionKey].follow_up).length - 1
        ) {
          if (activeSectionIndex === Object.keys(sections).length - 1) {
            buttonProps.label = 'Submit';
            buttonProps.onClick = () => {
              submitSurvey();
            };
          } else {
            buttonProps.label = 'Continue';
            buttonProps.onClick = () => {
              onNextButtonClicked();
            };
          }
        } else {
          buttonProps.label = 'Continue';
          buttonProps.onClick = () => {
            onNextButtonClicked();
          };
        }
      }
    } else {
      if (sections[activeSectionKey].value === null) {
        buttonProps.label = 'Skip';
        buttonProps.onClick = () => {
          onNextButtonClicked();
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

  const onNextButtonClicked = () => {
    const activeSectionIndex = getSectionIndex(sections, activeKey);
    const nextSectionKey = Object.keys(sections)[activeSectionIndex + 1];
    const nextSection = sections[nextSectionKey];

    if (activeKey.isFollowUp) {
      const activeFollowUpIndex = findIndex(
        Object.keys(sections[activeSectionIndex].follow_up),
        (followUpKey) => {
          return followUpKey === activeKey.value;
        },
      );

      if (
        activeFollowUpIndex ===
        Object.keys(sections[activeKey.value].follow_up).length - 1
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
        // get next follow up key
        const nextFollowUpKey = Object.keys(
          sections[activeSectionIndex].follow_up,
        )[activeFollowUpIndex + 1];
        setActiveKey({
          value: nextFollowUpKey,
          isFollowUp: true,
        });
      }
    } else {
      const activeSectionIndex = getSectionIndex(sections, activeKey);
      if (sections[activeSectionIndex].value === false) {
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
          sections[activeSectionIndex].follow_up,
        )[0];
        setActiveKey({
          value: nextFollowUpKey,
          isFollowUp: true,
        });
      }
    }
    updateTransitionClassNames(true);
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
        const section = sections[activeKey.value];
        if (section.component === null && section.prompt === '') {
          const previousSectionKey =
            Object.keys(sections)[activeSectionIndex - 1];
          const previousSection = sections[previousSectionKey];
          if (previousSection.value === false) {
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
      if (previousSection.value === false) {
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

  const patchSurveyData = (surveyData: SurveyDataType) => {
    axiosFetcher([
      `/survey-data/${surveyName}`,
      'PATCH',
      JSON.stringify(surveyData.definition),
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
    return questions.find((question) => {
      return question.props.input_key === activeKey;
    });
  };

  useEffect(() => {
    setActiveQuestion(getActiveQuestion());
  }, [activeKey, surveyData]);

  if (activeQuestion !== null) {
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
