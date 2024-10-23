import { ComplianceSurveyActiveKeyType, ComplianceSurveyPayloadType, ComplianceSurveySavedQuestionType, ComplianceSurveySectionType } from '@coldpbc/interfaces';
import { forOwn, map, uniq } from 'lodash';
import React, { ReactNode } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { ColdIcon, ComplianceSurveyCollapse, ErrorFallback } from '@coldpbc/components';
import { IconNames } from '@coldpbc/enums';

export interface ComplianceSurveyLeftNavProps {
	surveyData: ComplianceSurveyPayloadType;
	savedQuestions: Array<ComplianceSurveySavedQuestionType>;
	activeKey: ComplianceSurveyActiveKeyType;
	setActiveKey: (activeKey: ComplianceSurveyActiveKeyType) => void;
}

const _ComplianceSurveyLeftNav = (props: ComplianceSurveyLeftNavProps) => {
	const { surveyData, activeKey, setActiveKey, savedQuestions } = props;

	const getGroupedSections = (): {
		[key: string]: {
			[key: string]: ComplianceSurveySectionType;
		};
	} => {
		const sections = surveyData.definition.sections;
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

	const openSavedQuestions = () => {
		if (savedQuestions.length > 0) {
			setActiveKey({
				value: savedQuestions[0].followUpKey,
				section: 'savedQuestions',
				category: surveyData.definition.title,
				isFollowUp: true,
				previousValue: '',
			});
		}
	};

	const getNavbar = (): ReactNode => {
		return (
			<div className={'text-tc-primary w-[351px] bg-transparent h-full pl-[30px] pt-[30px] pb-[30px] flex flex-col space-y-[8px] overflow-y-auto'}>
				{map(getGroupedSections(), (sections, key) => {
					return <ComplianceSurveyCollapse key={key} category={key} sections={sections} setActiveKey={setActiveKey} activeKey={activeKey} complianceSet={surveyData} />;
				})}
				{savedQuestions.length > 0 && (
					<div className={'flex flex-col bg-transparent w-full pt-4'}>
						<div
							className={`text-h3 text-tc-primary cursor-pointer flex flex-row space-x-3 items-center pl-1 ${activeKey.section === 'savedQuestions' ? 'bg-bgc-accent' : ''}`}
							onClick={openSavedQuestions}>
							<ColdIcon name={IconNames.ColdBookmarkIcon} filled={true} />
							<div className={`text-left whitespace-normal`}>Saved Questions</div>
						</div>
					</div>
				)}
			</div>
		);
	};

	return <div className={'flex flex-col bg-bgc-main border-[3px] border-bgc-accent h-full rounded-l-lg'}>{getNavbar()}</div>;
};

export const ComplianceSurveyLeftNav = withErrorBoundary(_ComplianceSurveyLeftNav, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in ComplianceSurveyLeftNav: ', error);
	},
});
