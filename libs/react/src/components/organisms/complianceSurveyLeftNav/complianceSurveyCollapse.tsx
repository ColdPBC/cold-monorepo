import { ColdIcon, WizardContext } from '@coldpbc/components';
import { IconNames } from '@coldpbc/enums';
import { Collapse } from 'react-collapse';
import { every, filter, find, get, map, set, some } from 'lodash';
import React, { useContext, useEffect } from 'react';
import { getFirstFollowUpKeyFromSection, getOrgStorage, setOrgStorage } from '@coldpbc/lib';
import { ComplianceSurveyActiveKeyType, ComplianceSurveyPayloadType, ComplianceSurveySectionProgressType, ComplianceSurveySectionType } from '@coldpbc/interfaces';
import { useAuth0Wrapper } from '@coldpbc/hooks';

export interface ComplianceSurveyCollapseProps {
  category: string;
  complianceSet: ComplianceSurveyPayloadType;
  sections: { [p: string]: ComplianceSurveySectionType };
  setActiveKey: (activeKey: ComplianceSurveyActiveKeyType) => void;
  activeKey: ComplianceSurveyActiveKeyType;
}

export const ComplianceSurveyCollapse = (props: ComplianceSurveyCollapseProps) => {
  const { orgId } = useAuth0Wrapper();
  const { complianceSet, category, sections, setActiveKey, activeKey } = props;
  const { data } = useContext(WizardContext);
  const [expanded, setExpanded] = React.useState(false);

  const goToSection = (section: string) => {
    const activeKey = getFirstFollowUpKeyFromSection(section, complianceSet.definition.sections[section]);
    setActiveKey(activeKey);
  };

  const getCategoryIcon = (category: string) => {
    const progressSections = filter(complianceSet.progress.sections, (section: ComplianceSurveySectionProgressType) => {
      const foundSection = find(complianceSet.definition.sections, { title: section.title });
      return foundSection?.section_type === category;
    });
    const categoryComplete = every(progressSections, (section, index) => {
      return section.complete;
    });
    const someQuestionsComplete = some(progressSections, (section, index) => {
      return some(section.questions, (question, key) => {
        return question.user_answered;
      });
    });

    if (categoryComplete) {
      return (
        <div className={'w-[24px] h-[24px]'}>
          <ColdIcon name={IconNames.ColdComplianceSurveyCheckBoxIcon} />
        </div>
      );
    } else if (someQuestionsComplete) {
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
    const section = complianceSet.definition.sections[sectionKey];
    const progressSection = find(complianceSet.progress.sections, { title: section.title });
    if (activeKey.section === sectionKey) {
      return <div className={'w-[12px] h-[12px] flex justify-center items-center rounded-full bg-white'}></div>;
    } else {
      if (progressSection?.complete) {
        return (
          <div className={'w-[12px] h-[12px]'}>
            <ColdIcon name={IconNames.ColdComplianceSurveyCheckBoxIcon} />
          </div>
        );
      } else {
        if (progressSection === undefined) {
          return <div className={'w-[12px] h-[12px] flex justify-center items-center rounded-full bg-gray-70'}></div>;
        }
        const someComplete = some(
          map(progressSection.questions, (question, key) => {
            return question.user_answered;
          }),
          question => question === true,
        );
        if (someComplete) {
          return (
            <div className={'w-[12px] h-[12px] flex justify-center items-center rounded-full bg-gray-70'}>
              <ColdIcon name={IconNames.SubtractIcon} />
            </div>
          );
        } else {
          return <div className={'w-[12px] h-[12px] flex justify-center items-center rounded-full bg-gray-70'}></div>;
        }
      }
    }
  };

  const isSectionActive = (section: string) => {
    return activeKey.section === section;
  };

  const onCategoryClick = () => {
    const name: string = data.name;
    if (orgId) {
      const orgStorage = getOrgStorage(orgId);
      set(orgStorage, `compliance.${name}.expandedSections.${category}`, !expanded);
      setOrgStorage(orgId, orgStorage);
    }
    setExpanded(!expanded);
  };

  useEffect(() => {
    let expandedInStorage = false;
    if (orgId) {
      const orgStorage = getOrgStorage(orgId);
      expandedInStorage = get(orgStorage, `compliance.${data.name}.expandedSections.${category}`, false);
      set(orgStorage, `compliance.${data.name}.expandedSections.${category}`, activeKey.category === category || expanded || expandedInStorage);
      setOrgStorage(orgId, orgStorage);
    }
    setExpanded(activeKey.category === category || expanded || expandedInStorage);
  }, [activeKey.section]);

  return (
    <div className={'flex flex-col bg-transparent w-full'}>
      <div
        className={'text-h3 text-tc-primary cursor-pointer flex flex-row space-x-3 items-center'}
        onClick={() => {
          onCategoryClick();
        }}>
        {getCategoryIcon(category)}
        <div className={`text-left whitespace-normal`}>{category}</div>
        <div className={'flex justify-center items-center'}>
          {expanded ? (
            <ColdIcon name={IconNames.SubtractIcon} />
          ) : (
            <div className={'w-[24px] h-[24px] flex justify-center items-center'}>
              <ColdIcon name={IconNames.PlusIcon} />
            </div>
          )}
        </div>
      </div>
      <Collapse
        isOpened={expanded}
        theme={{
          collapse: 'transition-all h-auto duration-300 ease-in-out',
        }}>
        <div className={'flex flex-col space-y-[7px]'}>
          {map(sections, (section, key) => {
            return (
              <div
                className={`w-full h-[25px] pl-5 flex flex-row space-x-3 items-center cursor-pointer ${isSectionActive(key) ? 'bg-bgc-accent' : ''}`}
                onClick={() => goToSection(key)}
                key={key}>
                {getSectionIcon(key)}
                <div className={'text-caption bg-transparent line-clamp-1'}>{section.title}</div>
              </div>
            );
          })}
        </div>
      </Collapse>
    </div>
  );
};
