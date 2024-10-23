import React from 'react';
import { SurveyActiveKeyType, SurveySectionType } from '@coldpbc/interfaces';
import Lottie from 'lottie-react';
import { ColdIcon } from '../../../atoms';
import { IconNames } from '@coldpbc/enums';
import { getCheckboxAnimation } from '@coldpbc/animations';
import { isPreviousKeyAhead } from '@coldpbc/lib';
import { isEmpty } from 'lodash';

interface SurveySectionsProps {
	sections: {
		[key: string]: SurveySectionType;
	};
	section: SurveySectionType;
	sectionIndex: number;
	activeKey: SurveyActiveKeyType;
	getActiveSectionIndex: () => number;
}

export const SurveySections = ({ sections, section, sectionIndex, activeKey, getActiveSectionIndex }: SurveySectionsProps) => {
	const getSurveySectionDescriptionAndTitle = (section: SurveySectionType, index: number) => {
		const activeIndex = getActiveSectionIndex();
		const followUp = activeKey.isFollowUp;

		if ((index === activeIndex && !followUp) || index === activeIndex - 1) {
			return (
				<div className={'pb-[40px] relative'}>
					{getSectionPoint(section, index)}
					{getSectionTitle(section, index)}
					{getSurveySectionDescription(section, index)}
				</div>
			);
		} else if (index < activeIndex - 1 || index > activeIndex) {
			return (
				<div className={'pb-[40px] relative'}>
					{getSectionPoint(section, index)}
					{getSectionTitle(section, index)}
				</div>
			);
		} else if (index === activeIndex && followUp) {
			return (
				<div className={'pb-[40px] relative'}>
					{getSectionPoint(section, index)}
					{getSectionTitle(section, index)}
					{getSurveySectionDescription(section, index)}
				</div>
			);
		} else {
			return null;
		}
	};

	const getSectionPoint = (section: SurveySectionType, currentIndex: number) => {
		const className = 'absolute';
		const activeIndex = getActiveSectionIndex();
		const activeSection = sections[Object.keys(sections)[activeIndex]];
		const followUp = activeKey.isFollowUp;
		if (currentIndex > activeIndex) {
			return (
				<div className={className + ' top-[10px] -left-[40px]'} data-testid={'survey-sections-progress-point-incomplete'}>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
						<circle cx="8" cy="8" r="8" fill="#282C3E" />
					</svg>
				</div>
			);
		} else if (currentIndex === activeIndex) {
			if (followUp && currentIndex === Object.keys(sections).length - 1) {
				return (
					<div className={className + ' top-[16px] -left-[40px]'} data-testid={'survey-sections-progress-point-incomplete'}>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
							<circle cx="8" cy="8" r="8" fill="#282C3E" />
						</svg>
					</div>
				);
			} else {
				return (
					<div className={className + ' top-[16px] -left-[40px]'} data-testid={'survey-sections-progress-point-incomplete'}>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
							<circle cx="8" cy="8" r="8" fill="#282C3E" />
						</svg>
					</div>
				);
			}
		} else if (currentIndex === activeIndex - 1) {
			// if not follow up
			// or is follow up and is the first follow up
			if (!followUp) {
				if (activeKey.value !== activeKey.previousValue && !isPreviousKeyAhead(activeKey, sections)) {
					return (
						<div className={className + ' w-[32px] h-[32px] -left-[48px] top-[2px]'} data-testid={'survey-sections-progress-point-complete'}>
							<Lottie loop={false} animationData={getCheckboxAnimation()} />
						</div>
					);
				} else {
					return (
						<div className={className + ' w-[32px] h-[32px] -left-[48px] top-[2px]'} data-testid={'survey-sections-progress-point-complete'}>
							<ColdIcon className={' '} name={IconNames.ColdSmallCheckBoxIcon} />
						</div>
					);
				}
			} else {
				const followUpIndex = Object.keys(activeSection.follow_up).findIndex(followUpKey => followUpKey === activeKey.value);
				if (followUpIndex === 0 && activeSection.component === null && isEmpty(activeSection.prompt)) {
					return (
						<div className={className + ' w-[32px] h-[32px] -left-[48px] top-[2px]'} data-testid={'survey-sections-progress-point-complete'}>
							<Lottie loop={false} animationData={getCheckboxAnimation()} />
						</div>
					);
				} else {
					return (
						<div className={className + ' w-[32px] h-[32px] -left-[48px] top-[2px]'} data-testid={'survey-sections-progress-point-complete'}>
							<ColdIcon className={' '} name={IconNames.ColdSmallCheckBoxIcon} />
						</div>
					);
				}
			}
		} else {
			return (
				<div className={className + ' w-[32px] h-[32px] -left-[48px] top-[2px]'} data-testid={'survey-sections-progress-point-complete'}>
					<ColdIcon className={' '} name={IconNames.ColdSmallCheckBoxIcon} />
				</div>
			);
		}
	};

	const getSectionTitle = (section: SurveySectionType, index: number) => {
		const activeIndex = getActiveSectionIndex();
		if (index === activeIndex) {
			return <div className={'text-left text-h2 text-tc-primary'}>{section.title}</div>;
		} else {
			return <div className={'text-left text-h3 text-tc-primary'}>{section.title}</div>;
		}
	};

	const getSurveySectionDescription = (section: SurveySectionType, index: number) => {
		const activeIndex = getActiveSectionIndex();
		if (index != activeIndex) {
			return <></>;
		} else {
			return <div className={'text-tc-primary text-sm not-italic font-medium pt-[8px]'}>{section.category_description}</div>;
		}
	};

	return <>{getSurveySectionDescriptionAndTitle(section, sectionIndex)}</>;
};
