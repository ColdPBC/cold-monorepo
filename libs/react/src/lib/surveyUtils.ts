import { findIndex } from 'lodash';
import { SurveySectionType } from '@coldpbc/interfaces';

export const getSectionIndex = (sections: SurveySectionType[], key: string) => {
  if (isFollowUp(sections, key)) {
    let activeIndex = 0;
    sections.forEach((section, index) => {
      section.follow_up.forEach((followUp) => {
        if (followUp.key === key) {
          activeIndex = index;
        }
      });
    });
    return activeIndex;
  } else {
    return findIndex(sections, { category_key: key });
  }
};

export const isFollowUp = (sections: SurveySectionType[], key: string) => {
  const followUp = sections.filter((section) => {
    return (
      section.follow_up.filter((followUp) => {
        return followUp.key === key;
      }).length > 0
    );
  });

  return followUp.length > 0;
};
