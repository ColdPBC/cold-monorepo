import { findIndex, forOwn } from 'lodash';
import { SurveyActiveKeyType, SurveySectionType } from '@coldpbc/interfaces';

export const getSectionIndex = (
  sections: {
    [key: string]: SurveySectionType;
  },
  key: SurveyActiveKeyType,
) => {
  if (key.isFollowUp) {
    let activeIndex = 0;
    Object.keys(sections).find((sectionKey, sectionIndex) => {
      return Object.keys(sections[sectionKey].follow_up).find((followUpKey) => {
        return followUpKey === key.value ? (activeIndex = sectionIndex) : null;
      });
    });
    return activeIndex;
  } else {
    return findIndex(Object.keys(sections), (sectionKey) => {
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
  forOwn(sections, (section) => {
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
      const currentFollowUpIndex = findIndex(
        Object.keys(currentSection.follow_up),
        (followUpKey) => {
          return followUpKey === key.value;
        },
      );
      const previousFollowUpIndex = findIndex(
        Object.keys(currentSection.follow_up),
        (followUpKey) => {
          return followUpKey === key.previousValue;
        },
      );
      return previousFollowUpIndex > currentFollowUpIndex;
    }
  }
  return previousSectionIndex > currentSectionIndex;
};
