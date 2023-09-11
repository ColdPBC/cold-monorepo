import React, { useEffect } from 'react';
import { SurveyInput } from '../../molecules';
import { findIndex } from 'lodash';
import {
  SurveyFormDefinitionType,
  SurveySectionType,
} from '@coldpbc/interfaces';
import { BaseButton } from '../../atoms';
import { ButtonTypes, GlobalSizes } from '@coldpbc/enums';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { getSectionIndex, isFollowUp } from '@coldpbc/lib';
import { axiosFetcher } from '@coldpbc/fetchers';

export interface SurveyQuestionContainerProps {
  activeKey: string;
  setActiveKey: (key: string) => void;
  surveyFormDefinition: SurveyFormDefinitionType;
  setSurveyFormDefinition: (
    surveyFormDefinition: SurveyFormDefinitionType,
  ) => void;
  submitSurvey: () => void;
  surveyName: string;
}

export const SurveyQuestionContainer = ({
  activeKey,
  setActiveKey,
  surveyFormDefinition,
  setSurveyFormDefinition,
  submitSurvey,
  surveyName,
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
  const { sections } = surveyFormDefinition;

  const updateTransitionClassNames = (nextDirection: boolean) => {
    if (nextDirection) {
      setTransitionClassNames(nextQuestionTransitionClassNames);
    } else {
      setTransitionClassNames(previousQuestionTransitionClassNames);
    }
  };

  const onFieldUpdated = (key: string, value: any) => {
    let newSection;
    if (isFollowUp(sections, key)) {
      const activeSectionIndex = getSectionIndex(sections, activeKey);
      const section = sections[activeSectionIndex];
      if (section) {
        newSection = {
          ...section,
          follow_up: section.follow_up.map((followUp) => {
            if (followUp.key === key) {
              return {
                ...followUp,
                value: value,
              };
            } else {
              return followUp;
            }
          }),
        };
      }
    } else {
      const section = sections.find((section) => {
        return section.category_key === key;
      });
      if (section) {
        if (value === false) {
          newSection = {
            ...section,
            follow_up: section.follow_up.map((followUp) => {
              return {
                ...followUp,
                value: null,
              };
            }),
            value: value,
          };
        } else {
          newSection = {
            ...section,
            value: value,
          };
        }
      }
    }

    if (newSection) {
      const sectionIndex = findIndex(sections, {
        category_key: newSection.category_key,
      });
      const newSections = [...sections];
      newSections[sectionIndex] = newSection;
      postSurveyData(newSections);
      setSurveyFormDefinition({
        ...surveyFormDefinition,
        sections: newSections,
      });
    }
  };

  const getQuestionForKey = (key: string) => {
    if (isFollowUp(sections, key)) {
      const followUp = sections
        .map((section) => {
          return section.follow_up.find((followUp) => {
            return followUp.key === key;
          });
        })
        .filter((followUp) => {
          return followUp !== undefined;
        })[0];
      if (followUp) {
        return (
          <SurveyInput
            {...followUp}
            input_key={followUp.key}
            onFieldUpdated={onFieldUpdated}
          />
        );
      }
    } else {
      const section = sections.find((section) => {
        return section.category_key === key;
      });
      if (section && section.component !== null) {
        return (
          <SurveyInput
            {...section}
            input_key={section.category_key}
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
    if (!isFollowUp(sections, activeKey)) {
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
    if (isFollowUp(sections, activeKey)) {
      const activeSectionIndex = getSectionIndex(sections, activeKey);
      const activeFollowUpIndex = findIndex(
        sections[activeSectionIndex].follow_up,
        { key: activeKey },
      );
      if (
        sections[activeSectionIndex].follow_up[activeFollowUpIndex].value ===
        null
      ) {
        buttonProps.label = 'Skip';
        buttonProps.onClick = () => {
          onNextButtonClicked();
        };
      } else {
        if (
          activeFollowUpIndex ===
          sections[activeSectionIndex].follow_up.length - 1
        ) {
          if (activeSectionIndex === sections.length - 1) {
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
      const activeSectionIndex = getSectionIndex(sections, activeKey);
      if (sections[activeSectionIndex].value === null) {
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
    if (isFollowUp(sections, activeKey)) {
      const activeSectionIndex = getSectionIndex(sections, activeKey);
      const activeFollowUpIndex = findIndex(
        sections[activeSectionIndex].follow_up,
        { key: activeKey },
      );
      if (
        activeFollowUpIndex ===
        sections[activeSectionIndex].follow_up.length - 1
      ) {
        const nextSection = sections[activeSectionIndex + 1];
        if (nextSection.component === null && nextSection.prompt === '') {
          setActiveKey(nextSection.follow_up[0].key);
        } else {
          setActiveKey(nextSection.category_key);
        }
      } else {
        const nextFollowUp =
          sections[activeSectionIndex].follow_up[activeFollowUpIndex + 1];
        if (nextFollowUp) {
          setActiveKey(nextFollowUp.key);
        }
      }
    } else {
      const activeSectionIndex = getSectionIndex(sections, activeKey);
      if (sections[activeSectionIndex].value === false) {
        const nextSection = sections[activeSectionIndex + 1];
        if (nextSection.component === null && nextSection.prompt === '') {
          setActiveKey(nextSection.follow_up[0].key);
        } else {
          setActiveKey(nextSection.category_key);
        }
      } else {
        const nextFollowUp = sections[activeSectionIndex].follow_up[0];
        if (nextFollowUp) {
          setActiveKey(nextFollowUp.key);
        }
      }
    }
    updateTransitionClassNames(true);
  };

  const onPreviousButtonClicked = () => {
    if (isFollowUp(sections, activeKey)) {
      const activeSectionIndex = getSectionIndex(sections, activeKey);
      const activeFollowUpIndex = findIndex(
        sections[activeSectionIndex].follow_up,
        { key: activeKey },
      );
      if (activeFollowUpIndex === 0) {
        const section = sections[activeSectionIndex];
        if (section.component === null && section.prompt === '') {
          const previousSection = sections[activeSectionIndex - 1];
          if (previousSection.value === false) {
            setActiveKey(previousSection.category_key);
          } else {
            setActiveKey(
              previousSection.follow_up[previousSection.follow_up.length - 1]
                .key,
            );
          }
        } else {
          setActiveKey(section.category_key);
        }
      } else {
        const previousFollowUp =
          sections[activeSectionIndex].follow_up[activeFollowUpIndex - 1];
        if (previousFollowUp) {
          setActiveKey(previousFollowUp.key);
        }
      }
    } else {
      const activeSectionIndex = getSectionIndex(sections, activeKey);
      const previousSection = sections[activeSectionIndex - 1];
      if (previousSection.value === false) {
        setActiveKey(previousSection.category_key);
      } else {
        const previousSectionLastFollowUp =
          previousSection.follow_up[previousSection.follow_up.length - 1];
        if (previousSectionLastFollowUp) {
          setActiveKey(previousSectionLastFollowUp.key);
        }
      }
    }
    updateTransitionClassNames(false);
  };

  const postSurveyData = (sections: SurveySectionType[]) => {
    surveyFormDefinition.sections = sections;
    axiosFetcher([
      `/form-definitions/${surveyName}`,
      'PATCH',
      JSON.stringify(surveyFormDefinition),
    ]);
  };

  const questions = sections
    .map((section) => {
      const category = getQuestionForKey(section.category_key);
      const followUps = section.follow_up
        .filter((followUp) => {
          return followUp.component !== null;
        })
        .map((followUp) => {
          return getQuestionForKey(followUp.key);
        });
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
  }, [activeKey, surveyFormDefinition]);

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
