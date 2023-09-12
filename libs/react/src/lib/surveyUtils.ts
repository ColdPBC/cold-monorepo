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
