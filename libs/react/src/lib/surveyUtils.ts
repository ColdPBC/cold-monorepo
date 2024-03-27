import { cloneDeep, find, findIndex, forEach, forOwn, get, isArray, isBoolean, isEmpty, isEqual, isNumber, isString, uniq } from 'lodash';
import {
  ComplianceSurveyActiveKeyType,
  ComplianceSurveyPayloadType,
  ComplianceSurveySavedQuestionType,
  ComplianceSurveySectionType,
  SurveyActiveKeyType,
  SurveyAdditionalContext,
  SurveyPayloadType,
  SurveySectionType,
} from '@coldpbc/interfaces';
import { SurveyComponentType } from '@coldpbc/enums';
import { axiosFetcher } from '@coldpbc/fetchers';

export const getSectionIndex = (
  sections: {
    [key: string]: SurveySectionType;
  },
  key: SurveyActiveKeyType,
) => {
  if (key.isFollowUp) {
    let activeIndex = 0;
    Object.keys(sections).find((sectionKey, sectionIndex) => {
      return Object.keys(sections[sectionKey].follow_up).find(followUpKey => {
        return followUpKey === key.value ? (activeIndex = sectionIndex) : null;
      });
    });
    return activeIndex;
  } else {
    return findIndex(Object.keys(sections), sectionKey => {
      return sectionKey === key.value;
    });
  }
};

export const isKeyValueFollowUp = (
  key: string,
  sections: {
    [key: string]: SurveySectionType;
  },
) => {
  // check all the keys in the sections for the follow_up key
  let isFollowUp = false;
  forOwn(sections, section => {
    if (section.follow_up[key]) {
      isFollowUp = true;
    }
  });
  return isFollowUp;
};

// function to check if the previous key value is ahead of the current key value
export const isPreviousKeyAhead = (
  key: SurveyActiveKeyType,
  sections: {
    [key: string]: SurveySectionType;
  },
) => {
  if (key.value === key.previousValue) {
    return false;
  }
  const previousIsFollowUp = isKeyValueFollowUp(key.previousValue, sections);
  const currentSectionIndex = getSectionIndex(sections, key);
  const previousSectionIndex = getSectionIndex(sections, {
    value: key.previousValue,
    previousValue: '',
    isFollowUp: previousIsFollowUp,
  });
  if (previousSectionIndex === currentSectionIndex) {
    const currentSection = sections[Object.keys(sections)[currentSectionIndex]];
    if (!key.isFollowUp) {
      return true;
    } else {
      // compare the index of the current follow_up to the index of the previous follow_up
      const currentFollowUpIndex = findIndex(Object.keys(currentSection.follow_up), followUpKey => {
        return followUpKey === key.value;
      });
      const previousFollowUpIndex = findIndex(Object.keys(currentSection.follow_up), followUpKey => {
        return followUpKey === key.previousValue;
      });
      return previousFollowUpIndex > currentFollowUpIndex;
    }
  }
  return previousSectionIndex > currentSectionIndex;
};

export const isComponentTypeValid = (componentType: any | null) => {
  return Object.keys(SurveyComponentType).includes(componentType);
};

/***
 * Function to get the starting key.
 * @param surveyData
 * @returns SurveyActiveKeyType | undefined : The first unanswered key. Returns undefined if all the questions have been answered
 */
export const getFirstUnansweredKey = (surveyData: ComplianceSurveyPayloadType): ComplianceSurveyActiveKeyType | undefined => {
  // loop the sections and follow up and find the first question that has not been answered yet
  let firstActiveKey: ComplianceSurveyActiveKeyType | undefined = undefined;
  find(Object.keys(surveyData.definition.sections), key => {
    const section = surveyData.definition.sections[key];
    if (!isComponentTypeValid(section.component) && isEmpty(section.prompt)) {
      // check the followups
      const foundInFollowUp = find(Object.keys(section.follow_up), followUpKey => {
        const followUp = section.follow_up[followUpKey];
        if (followUp.value === undefined && followUp.skipped === undefined) {
          firstActiveKey = {
            value: followUpKey,
            section: key,
            category: section.section_type,
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
              section: key,
              category: section.section_type,
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
          section: key,
          category: section.section_type,
          previousValue: '',
          isFollowUp: false,
        };
      }
      return foundQuestion;
    }
  });
  return firstActiveKey;
};

export const hasSurveyBeenStarted = (surveyData: SurveyPayloadType | ComplianceSurveyPayloadType) => {
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

/***
 * Function to set the active key
 * @param surveyData
 */
export const getStartingKey = (surveyData: ComplianceSurveyPayloadType): ComplianceSurveyActiveKeyType => {
  const firstQuestionKey = getFirstUnansweredKey(surveyData);
  if (!firstQuestionKey) {
    const firstSectionKey = Object.keys(surveyData.definition.sections)[0];
    const firstSection = surveyData.definition.sections[firstSectionKey];
    if (!isComponentTypeValid(firstSection.component) && isEmpty(firstSection.prompt)) {
      const firstFollowUpKey = Object.keys(firstSection.follow_up)[0];
      // get the first followup
      return {
        value: firstFollowUpKey,
        section: firstSectionKey,
        category: firstSection.section_type,
        previousValue: '',
        isFollowUp: true,
      };
    } else {
      return {
        value: firstSectionKey,
        section: firstSectionKey,
        category: firstSection.section_type,
        previousValue: '',
        isFollowUp: false,
      };
    }
  } else {
    return firstQuestionKey;
  }
};

export const getSectionFromKey = (key: SurveyActiveKeyType, surveyData: SurveyPayloadType | ComplianceSurveyPayloadType) => {
  if (key.isFollowUp) {
    return surveyData.definition.sections[key.value].follow_up[key.value];
  } else {
    return surveyData.definition.sections[key.value];
  }
};

export const getFirstFollowUpKeyFromSection = (sectionName: string, section: ComplianceSurveySectionType): ComplianceSurveyActiveKeyType => {
  const firstFollowUpKey = Object.keys(section.follow_up)[0];
  return {
    value: firstFollowUpKey,
    section: sectionName,
    category: section.section_type,
    previousValue: '',
    isFollowUp: true,
  };
};

export const sortComplianceSurvey = (surveyData: ComplianceSurveyPayloadType): ComplianceSurveyPayloadType => {
  const copy = {
    ...surveyData,
    definition: {
      ...surveyData.definition,
      sections: {},
    },
  } as ComplianceSurveyPayloadType;

  const sortedSectionKeys = Object.keys(surveyData.definition.sections).sort((a, b) => {
    return surveyData.definition.sections[a].category_idx - surveyData.definition.sections[b].category_idx;
  });

  const sectionCategories = uniq(
    sortedSectionKeys.map(key => {
      return surveyData.definition.sections[key].section_type;
    }),
  );

  sectionCategories.forEach(category => {
    const categorySections = sortedSectionKeys.filter(key => {
      return surveyData.definition.sections[key].section_type === category;
    });
    categorySections.forEach(key => {
      copy.definition.sections[key] = {
        ...surveyData.definition.sections[key],
        follow_up: {},
      };
      const followUpKeys = Object.keys(surveyData.definition.sections[key].follow_up).sort((a, b) => {
        return surveyData.definition.sections[key].follow_up[a].idx - surveyData.definition.sections[key].follow_up[b].idx;
      });
      followUpKeys.forEach(followUpKey => {
        copy.definition.sections[key].follow_up[followUpKey] = surveyData.definition.sections[key].follow_up[followUpKey];
      });
    });
  });
  return copy;
};

export const validateSurveyData = (surveyData: SurveyPayloadType | ComplianceSurveyPayloadType) => {
  const newSurvey = cloneDeep(surveyData);
  forOwn(newSurvey.definition.sections, (section: SurveySectionType, key: string) => {
    if (!isComponentTypeValid(section.component)) {
      newSurvey.definition.sections[key]['component'] = null;
    }
  });
  return newSurvey;
};

export const updateSurveyQuestion = (
  surveyData: SurveyPayloadType | ComplianceSurveyPayloadType,
  activeKey: SurveyActiveKeyType | ComplianceSurveyActiveKeyType,
  update: {
    value?: any | null;
    skipped?: boolean;
    saved?: boolean;
    document_link?: string;
  },
  submit?: boolean,
  additional?: boolean,
) => {
  let newSection: SurveySectionType;
  const key = activeKey.value;
  const sections = surveyData.definition.sections;
  const activeSectionIndex = getSectionIndex(sections, activeKey);
  const activeSectionKey = Object.keys(sections)[activeSectionIndex];
  if (activeKey.isFollowUp) {
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
  const newSurvey: SurveyPayloadType | ComplianceSurveyPayloadType = validateSurveyData(surveyData);
  newSurvey.definition.sections[activeSectionKey] = newSection;
  newSurvey.definition.submitted = submit;
  return newSurvey;
};

export const ifAdditionalContextConditionMet = (value: any, additionalContext: SurveyAdditionalContext) => {
  switch (additionalContext.operator) {
    case '==':
      // make comparison for arrays if both the value and comparison are arrays
      if (isArray(value) && isArray(additionalContext.comparison)) {
        return isEqual(value, additionalContext.comparison);
      }
      return isEqual(value, additionalContext.comparison);
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
    case 'in':
      // check if the value is in the comparison array
      if (isArray(additionalContext.comparison)) {
        if (!isArray(value)) {
          return additionalContext.comparison.includes(value);
        } else {
          // check if any values in the value array are in the comparison array
          return value.some((val: any) => {
            return additionalContext.comparison.includes(val);
          });
        }
      }
      return false;
    case 'has':
      // check if the comparison value is in the value array
      if (isArray(value)) {
        if (!isArray(additionalContext.comparison)) {
          return value.includes(additionalContext.comparison);
        } else {
          // check if any of the values in the comparison array are in the value array
          return additionalContext.comparison.some((val: any) => {
            return value.includes(val);
          });
        }
      }
      return false;
    default:
      return false;
  }
};

export const getQuestionValue = (surveyData: SurveyPayloadType | ComplianceSurveyPayloadType, key: SurveyActiveKeyType) => {
  const sections = surveyData.definition.sections;
  const activeSectionIndex = getSectionIndex(sections, key);
  const activeSectionKey = Object.keys(sections)[activeSectionIndex];
  if (key.isFollowUp) {
    const followUpIndex = findIndex(Object.keys(sections[activeSectionKey].follow_up), followUpKey => {
      return followUpKey === key.value;
    });
    const followUpKey = Object.keys(sections[activeSectionKey].follow_up)[followUpIndex];
    const followUp = sections[activeSectionKey].follow_up[followUpKey];
    if (followUp) {
      if (followUp.ai_response?.answer !== undefined && (followUp.value === null || followUp.value === undefined)) {
        return followUp.ai_response.answer;
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

export const putSurveyData = async (survey: ComplianceSurveyPayloadType, getOrgSpecificUrl: (url: string) => string) => {
  return await axiosFetcher([
    getOrgSpecificUrl(`/surveys/${survey.name}`),
    'PUT',
    JSON.stringify({
      definition: survey.definition,
    }),
  ]);
};

export const allOtherSurveyQuestionsAnswered = (surveyData: ComplianceSurveyPayloadType, activeKey: ComplianceSurveyActiveKeyType) => {
  // check all the questions in the section and follow up
  // use the progress to check all sections except the current one are complete
  const sections = surveyData.definition.sections;
  const activeSectionKey = activeKey.section;
  const section = sections[activeSectionKey];
  let allOtherSectionsComplete = true;
  forEach(surveyData.progress.sections, (progress, key) => {
    if (progress.title !== section.title) {
      if (!progress.complete) {
        allOtherSectionsComplete = false;
      }
    }
  });
  // check if all the questions in the section are answered
  let allOtherQuestionsAnswered = true;
  forEach(section.follow_up, (followUp, key) => {
    if (followUp.value === undefined && activeKey.value !== key) {
      allOtherQuestionsAnswered = false;
    }
  });

  return allOtherSectionsComplete && allOtherQuestionsAnswered;
};

export const getSavedQuestionsInSurvey = (surveyData: ComplianceSurveyPayloadType): Array<ComplianceSurveySavedQuestionType> => {
  const savedQuestions = Array<ComplianceSurveySavedQuestionType>();
  forOwn(surveyData.definition.sections, (section, sectionKey) => {
    if (sectionKey !== 'savedQuestions') {
      forOwn(section.follow_up, (followUp, followUpKey) => {
        if (followUp.saved) {
          savedQuestions.push({
            sectionKey: sectionKey,
            sectionTitle: section.title,
            followUpKey: followUpKey,
            category: section.section_type,
            ...followUp,
          });
        }
      });
    }
  });
  return savedQuestions;
};

export const getAccurateBookmarkedValue = (
  sections: { [p: string]: ComplianceSurveySectionType },
  activeKey: ComplianceSurveyActiveKeyType,
  bookmarked: {
    [key: string]: boolean;
  },
) => {
  const sectionIndex = getSectionIndex(sections, activeKey);
  const activeSection = sections[Object.keys(sections)[sectionIndex]];
  const question = activeSection.follow_up[activeKey.value];
  const bookMarkState = get(bookmarked, `${activeKey.value}`, undefined);
  return bookMarkState === undefined ? question.saved : bookMarkState;
};

export const isAIResponseValueValid = (followUp: {
  ai_response?: {
    justification?: string;
    answer?: string | boolean | number | Array<string>;
  };
  component: string;
  options: Array<string>;
}) => {
  const { ai_response, component, options } = followUp;
  let isValid = false;
  if (!ai_response || !ai_response.answer) {
    return isValid;
  }
  switch (component) {
    case 'yes_no':
      if (isBoolean(ai_response.answer)) {
        isValid = true;
      }
      break;
    case 'textarea':
    case 'text':
      if (isString(ai_response.answer)) {
        isValid = true;
      }
      break;
    case 'currency':
    case 'number':
      if (isNumber(ai_response.answer)) {
        isValid = true;
      }
      break;
    case 'percent_slider':
      if (isNumber(ai_response.answer) && ai_response.answer >= 0 && ai_response.answer <= 100) {
        isValid = true;
      }
      break;
    case 'multi_select':
    case 'select':
      if (Array.isArray(ai_response.answer) && ai_response.answer.length > 0) {
        let allStrings = true;
        let foundOptions = true;
        if (component === 'select' && ai_response.answer.length !== 1) {
          return false;
        }
        forEach(ai_response.answer, answer => {
          if (!isString(answer)) {
            allStrings = false;
          }
          if (!find(options, option => option === answer)) {
            foundOptions = false;
          }
        });
        isValid = allStrings && foundOptions;
      }
      break;
    case 'multi_text':
      if (Array.isArray(ai_response.answer) && ai_response.answer.length > 0) {
        let allStrings = true;
        forEach(ai_response.answer, answer => {
          if (!isString(answer)) {
            allStrings = false;
          }
        });
        isValid = allStrings;
      }
      break;
    default:
  }
  return isValid;
};
