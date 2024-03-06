import { ComplianceSurveyActiveKeyType, ComplianceSurveyPayloadType, ComplianceSurveySectionType } from '@coldpbc/interfaces';
import { forOwn, map, uniq } from 'lodash';
import React, { ReactNode } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';
import { ComplianceSurveyCollapse } from './complianceSurveyCollapse';

export interface ComplianceSurveyLeftNavProps {
  complianceSet: ComplianceSurveyPayloadType;
  activeKey: ComplianceSurveyActiveKeyType;
  setActiveKey: (activeKey: ComplianceSurveyActiveKeyType) => void;
}
const _ComplianceSurveyLeftNav = (props: ComplianceSurveyLeftNavProps) => {
  const { complianceSet, activeKey, setActiveKey } = props;

  const getGroupedSections = (): {
    [key: string]: {
      [key: string]: ComplianceSurveySectionType;
    };
  } => {
    const sections = complianceSet.definition.sections;
    // get all the unique section categories
    const sectionCategories = uniq(Object.keys(sections).map(key => sections[key].section_type));
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
      groupedSections[section.section_type][key] = section;
    });
    return groupedSections;
  };

  const getNavbar = (): ReactNode => {
    return (
      <div className={'text-tc-primary w-[351px] bg-transparent h-full pl-[30px] pt-[30px] pb-[30px] flex flex-col space-y-[8px] overflow-y-auto'}>
        {map(getGroupedSections(), (sections, key) => {
          return <ComplianceSurveyCollapse key={key} category={key} sections={sections} setActiveKey={setActiveKey} activeKey={activeKey} complianceSet={complianceSet} />;
        })}
      </div>
    );
  };

  return <div className={'flex flex-col bg-bgc-main border-[3px] border-bgc-accent h-full'}>{getNavbar()}</div>;
};

export const ComplianceSurveyLeftNav = withErrorBoundary(_ComplianceSurveyLeftNav, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in ComplianceSurveyLeftNav: ', error);
  },
});
