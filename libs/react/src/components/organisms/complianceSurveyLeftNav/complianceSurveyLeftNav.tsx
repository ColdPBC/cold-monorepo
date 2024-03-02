import { ComplianceSurveyActiveKeyType, ComplianceSurveyPayloadType, ComplianceSurveySectionProgressType, ComplianceSurveySectionType } from '@coldpbc/interfaces';
import { every, filter, find, forOwn, map, some, uniq } from 'lodash';
import { ReactNode, useState } from 'react';
import { getFirstFollowUpKeyFromSection } from '@coldpbc/lib';
import { Collapse } from 'react-collapse';
import { IconNames } from '@coldpbc/enums';
import { ColdIcon } from '../../atoms';

export interface ComplianceSurveyLeftNavProps {
  complianceSet: ComplianceSurveyPayloadType;
  goToKey: (key: string) => void;
  activeKey: ComplianceSurveyActiveKeyType;
  setActiveKey: (activeKey: ComplianceSurveyActiveKeyType) => void;
}
export const ComplianceSurveyLeftNav = (props: ComplianceSurveyLeftNavProps) => {
  const { complianceSet, activeKey, setActiveKey } = props;
  const [categoryOpened, setCategoryOpened] = useState<string>(activeKey.category);
  // group and sort sections by section category. 1. Practices, 2. Product, 3. Environment, 4. Diversity & Inclusion
  const getGroupedSections = (): {
    [key: string]: {
      [key: string]: ComplianceSurveySectionType;
    };
  } => {
    const sections = complianceSet.definition.sections;
    // get all the unique section categories
    const sectionCategories = uniq(Object.keys(sections).map(key => sections[key].category));
    // create grouped section object with keys as section categories and empty to start with
    const groupedSections: {
      [key: string]: {
        [key: string]: ComplianceSurveySectionType;
      };
    } = {};
    sectionCategories.forEach(category => {
      groupedSections[category] = {};
    });
    forOwn(sections, (section, key) => {
      groupedSections[section.category][key] = section;
    });
    return groupedSections;
  };

  const goToKey = (key: string) => {
    const activeKey = getFirstFollowUpKeyFromSection(key, complianceSet);
    console.log(activeKey);
    setActiveKey(activeKey);
  };

  const getSidebarIcon = (category: string) => {
    // function to get the right icon.
    // check progress of the section. if all questions are answered, show a checkmark. if not, show a circle.
    const progressSections = filter(complianceSet.definition.progress, (section: ComplianceSurveySectionProgressType) => {
      return complianceSet.definition.sections[section.section]?.category === category;
    });
    console.log(progressSections);
    const categoryComplete = every(progressSections, (section, index) => {
      return section.complete;
    });
    const someComplete = some(progressSections, (section, index) => {
      return section.complete;
    });
    // if the category is complete, show a checkmark.
    // if not, show a circle, but if the category is open, show a subtract icon.
    // else, show empty icon.

    if (categoryComplete) {
      return (
        <div className={'w-[24px] h-[24px]'}>
          <ColdIcon name={IconNames.ColdSmallCheckBoxIcon} />
        </div>
      );
    } else if (someComplete) {
      return (
        <div className={'w-[24px] h-[24px] flex justify-center items-center rounded-full bg-gray-70'}>
          <ColdIcon name={IconNames.SubtractIcon} />
        </div>
      );
    } else {
      return <div className={'w-[24px] h-[24px] flex justify-center items-center rounded-full bg-gray-70'}></div>;
    }
  };

  const getSectionIcon = (sectionKey: string) => {
    // check progress check if the section is complete, show a checkmark. if not, show a circle.
    const progressSection = find(complianceSet.definition.progress, section => section.section === sectionKey);
    if (progressSection?.complete) {
      return (
        <div className={'w-[12px] h-[12px]'}>
          <ColdIcon name={IconNames.ColdSmallCheckBoxIcon} />
        </div>
      );
    } else {
      if (activeKey.section === sectionKey) {
        return <div className={'w-[12px] h-[12px] flex justify-center items-center rounded-full bg-cold-starkWhite'}></div>;
      } else {
        return <div className={'w-[12px] h-[12px] flex justify-center items-center rounded-full bg-gray-70'}></div>;
      }
    }
  };

  const isCollapseOpen = (sections: { [key: string]: ComplianceSurveySectionType }, category: string) => {
    return category === categoryOpened;
  };

  const openCategory = (category: string) => {
    setCategoryOpened(category);
  };

  const getNavbar = (): ReactNode => {
    return (
      <div className={'text-tc-primary w-[351px] bg-transparent h-full p-[30px] flex flex-col space-y-4'}>
        {map(getGroupedSections(), (sections, key) => {
          return (
            <div className={'flex flex-col bg-transparent w-full'}>
              <div
                className={'text-h3 text-tc-primary cursor-pointer flex flex-row space-x-2 items-center'}
                onClick={() => {
                  openCategory(key);
                }}>
                {getSidebarIcon(key)}
                <div>{key}</div>
                <div className={'flex justify-center items-center'}>
                  {isCollapseOpen(sections, key) ? <ColdIcon name={IconNames.ColdChevronUpIcon} /> : <ColdIcon name={IconNames.ColdChevronDownIcon} />}
                </div>
              </div>
              <Collapse
                isOpened={isCollapseOpen(sections, key)}
                theme={{
                  collapse: 'transition-all h-auto duration-300 ease-in-out',
                }}>
                <div className={'flex flex-col space-y-[7px]'}>
                  {map(sections, (section, key) => {
                    return (
                      <div className={'w-full pl-5 flex flex-row space-x-2 items-center'}>
                        {getSectionIcon(key)}
                        <div className={'text-caption bg-transparent cursor-pointer'} onClick={() => goToKey(key)}>
                          {section.title}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Collapse>
            </div>
          );
        })}
      </div>
    );
  };

  return <div className={'flex flex-col bg-bgc-main border-[3px] border-bgc-accent h-full'}>{getNavbar()}</div>;
};
