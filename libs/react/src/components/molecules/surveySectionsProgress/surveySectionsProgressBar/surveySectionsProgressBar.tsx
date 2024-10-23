import { findIndex, orderBy } from 'lodash';
import React from 'react';
import { SurveyActiveKeyType, SurveySectionsProgressSectionType, SurveySectionType } from '@coldpbc/interfaces';

export interface SurveySectionsProgressBarProps {
	sections: {
		[key: string]: SurveySectionType;
	};
	sectionLocations: SurveySectionsProgressSectionType[];
	activeKey: SurveyActiveKeyType;
	getActiveSectionIndex: () => number;
}

export const SurveySectionsProgressBar = ({ sections, sectionLocations, activeKey, getActiveSectionIndex }: SurveySectionsProgressBarProps) => {
	const getProgressBarColorGradientSection = (sectionKey: string, currentSectionIndex: number) => {
		const activeSectionIndex = getActiveSectionIndex();
		let className = 'w-[4px] h-full';
		if (currentSectionIndex === Object.keys(sections).length - 1) {
			className += ' rounded-b';
		}
		if (!activeKey.isFollowUp) {
			if (currentSectionIndex >= activeSectionIndex) {
				return <div className={'w-[4px] h-full bg-bgc-accent' + className}></div>;
			} else {
				return <div className={'w-[4px] bg-primary-300 h-full'}></div>;
			}
		} else {
			if (activeSectionIndex === currentSectionIndex) {
				const totalCurrentSectionFollowUps =
					activeSectionIndex === Object.keys(sections).length - 1 ? Object.keys(sections[sectionKey].follow_up).length : Object.keys(sections[sectionKey].follow_up).length + 1;
				const activeFollowUpIndex = findIndex(Object.keys(sections[sectionKey].follow_up), followUpKey => {
					return followUpKey === activeKey.value;
				});
				const previousPercentage = activeFollowUpIndex / totalCurrentSectionFollowUps;
				const percentageString = (previousPercentage + 1 / totalCurrentSectionFollowUps) * 100 + '%';
				return (
					<div className={'w-[4px] h-full'}>
						<div
							className={'w-full bg-primary-300 ' + className}
							style={{
								height: `${percentageString}`,
							}}></div>
					</div>
				);
			} else if (currentSectionIndex > activeSectionIndex) {
				return <div className={'w-[4px] h-full bg-bgc-accent' + className}></div>;
			} else {
				return <div className={'w-[4px] h-full bg-primary-300'}></div>;
			}
		}
	};

	const getProgressBar = () => {
		const sectionLocationsSorted = orderBy(sectionLocations, ['sectionIndex'], ['asc']);
		const activeIndex = getActiveSectionIndex();
		let offSet = 0;
		if (activeIndex === 0) {
			offSet = 24;
		} else {
			offSet = 18;
		}
		return (
			<div className={'relative w-[16px] z-10 px-[4px]'}>
				{sectionLocationsSorted.map((sectionLocation, index) => {
					let adjustedHeight = sectionLocation.height;
					if (index !== Object.keys(sections).length - 1 && index === activeIndex) {
						adjustedHeight -= 6;
					} else if (activeIndex === index + 1) {
						adjustedHeight += 6;
					}
					if (index === sectionLocationsSorted.length - 1 && index === activeIndex) {
						adjustedHeight -= 40 + 24;
					}
					offSet += adjustedHeight;

					if (index === sectionLocationsSorted.length - 1 && activeIndex === index) {
						return (
							<div
								key={'progress_bar_' + index}
								className={'absolute w-[8px] bg-bgc-accent px-[2px] z-10 rounded-b'}
								style={{
									top: `${offSet - adjustedHeight}px`,
									height: `${adjustedHeight}px`,
								}}>
								<div
									className={'w-[4px]'}
									style={{
										height: `${adjustedHeight - 2}px`,
									}}>
									{getProgressBarColorGradientSection(sectionLocation.key, index)}
								</div>
							</div>
						);
					} else {
						return (
							<div
								key={'progress_bar_' + index}
								className={'absolute w-[8px] bg-bgc-accent px-[2px] z-10'}
								style={{
									top: `${offSet - adjustedHeight}px`,
									height: `${adjustedHeight}px`,
								}}>
								{getProgressBarColorGradientSection(sectionLocation.key, index)}
							</div>
						);
					}
				})}
			</div>
		);
	};

	return getProgressBar();
};
