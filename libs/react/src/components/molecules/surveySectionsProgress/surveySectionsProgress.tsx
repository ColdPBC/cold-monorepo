import React, { useEffect, useRef } from 'react';
import { SurveyActiveKeyType, SurveySectionsProgressSectionType, SurveySectionType } from '@coldpbc/interfaces';
import { SurveySections } from './surveySections';
import { SurveySectionsProgressBar } from './surveySectionsProgressBar';
import { getSectionIndex } from '@coldpbc/lib';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';

export interface SurveySectionsProgressProps {
	sections: {
		[key: string]: SurveySectionType;
	};
	activeKey: SurveyActiveKeyType;
}

const _SurveySectionsProgress = ({ sections, activeKey }: SurveySectionsProgressProps) => {
	const [scrollable, setScrollable] = React.useState<boolean>(false);
	const [sectionHeights, setSectionHeights] = React.useState<(HTMLDivElement | null)[]>(
		new Array(Object.keys(sections).length).fill(null).map(() => {
			return null;
		}) as (HTMLDivElement | null)[],
	);
	const [sectionLocations, setSectionLocations] = React.useState<SurveySectionsProgressSectionType[]>([]);

	const containerRef = useRef<HTMLDivElement | null>(null);

	const getActiveSectionIndex = () => {
		return getSectionIndex(sections, activeKey);
	};

	const getBackgroundImages = () => {
		const activeSectionIndex = getActiveSectionIndex();
		// get the active section key
		const activeSectionKey = Object.keys(sections)[activeSectionIndex];
		const backgroundImageStyle = `url('${sections[Object.keys(sections)[activeSectionIndex]].image_url}') lightgray 50% / cover no-repeat`;
		const className = 'flex-auto self-stretch rounded-2xl';
		return (
			<SwitchTransition mode={'out-in'}>
				<CSSTransition key={activeSectionKey} timeout={300}>
					<div
						key={backgroundImageStyle}
						className={className}
						style={{
							background: `${backgroundImageStyle}`,
						}}></div>
				</CSSTransition>
			</SwitchTransition>
		);
	};

	const isScrollable = () => {
		const containerHeight = containerRef?.current?.getBoundingClientRect().height;
		if (!containerHeight) return false;

		let totalHeight = 0;
		sectionHeights.map((sectionHeight, index) => {
			totalHeight += sectionHeight?.clientHeight || 0;
		});
		return totalHeight > containerHeight - 128;
	};

	const scrollToActiveSection = (element: HTMLDivElement | null) => {
		const activeSectionIndex = getActiveSectionIndex();
		if (true && element) {
			let heightToSection = 0;
			for (let i = 0; i < activeSectionIndex; i++) {
				heightToSection += sectionHeights[i]?.clientHeight || 0;
			}

			element.scrollTo({
				top: heightToSection,
			});
		}
	};

	useEffect(() => {
		const newSectionLocations: SurveySectionsProgressSectionType[] = [];
		sectionHeights.map((sectionHeight, index) => {
			return newSectionLocations.push({
				key: Object.keys(sections)[index],
				sectionIndex: index,
				height: sectionHeight?.clientHeight || 0,
			});
		});
		setSectionLocations(newSectionLocations);
	}, [activeKey, sectionHeights, sections]);

	useEffect(() => {
		setScrollable(isScrollable());
	}, [scrollable, activeKey]);

	return (
		<div
			className={'w-[668px] h-full rounded-2xl relative overflow-hidden'}
			ref={containerRef}
			style={{
				maxHeight: 'calc(100vh - 122px)', // full-height minus other els
			}}>
			<div className={'absolute w-[668px] h-full rounded-2xl flex flex-col justify-center items-center'}>{getBackgroundImages()}</div>
			<div
				className={'absolute w-[668px] h-full rounded-2xl'}
				style={{
					boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
					background:
						'linear-gradient(0deg, rgba(8, 9, 18, 0.50) 0%, rgba(8, 9, 18, 0.50) 100%), radial-gradient(100.00% 184.29% at 0% 50%, #080912 0%, rgba(8, 9, 18, 0.25) 100%)',
				}}></div>
			<div
				className={'h-full w-full overflow-y-scroll'}
				ref={elem => {
					scrollToActiveSection(elem);
				}}>
				<div className="w-[540px]] pl-[64px] pr-[48px] pt-[164px] flex">
					<SurveySectionsProgressBar sections={sections} activeKey={activeKey} sectionLocations={sectionLocations} getActiveSectionIndex={getActiveSectionIndex} />
					<div className={'z-10 pl-6'}>
						{Object.keys(sections).map((sectionKey, index) => {
							return (
								<div key={'section_component_' + index} ref={elem => (sectionHeights[index] = elem)}>
									<SurveySections sections={sections} section={sections[sectionKey]} sectionIndex={index} activeKey={activeKey} getActiveSectionIndex={getActiveSectionIndex} />
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export const SurveySectionsProgress = withErrorBoundary(_SurveySectionsProgress, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in SurveySectionsProgress: ', error);
	},
});
