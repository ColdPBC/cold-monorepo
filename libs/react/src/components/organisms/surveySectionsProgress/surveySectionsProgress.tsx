import React, {Ref, useEffect} from 'react';
import { SurveySectionType, SurveySectionsProgressSectionType } from '../../../interfaces/survey/survey';
import {findIndex} from 'lodash';
import { SurveySections } from './surveySections/surveySections';
import { SurveySectionsProgressBar } from './surveySectionsProgressBar/surveySectionsProgressBar';

export interface SurveySectionsProgressProps {
    sections: SurveySectionType[];
    activeKey: string;
    setActiveKey: (key: string) => void;
}

export const SurveySectionsProgress = ({sections, activeKey, setActiveKey}: SurveySectionsProgressProps) => {
    const [scrollable, setScrollable] = React.useState<boolean>(false);
    const [sectionHeights, setSectionHeights] = React.useState(Array(sections.length).fill(null));
    const [sectionLocations, setSectionLocations] = React.useState<SurveySectionsProgressSectionType[]>([]);

    const isFollowUp = (key: string) => {
        const followUp = sections.filter((section) => {
            return section.follow_up.filter((followUp) => {
                return followUp.key === key
            }).length > 0
        })

        return followUp.length > 0;
    }

    const getActiveSectionIndex = () => {
        if(isFollowUp(activeKey)){
            let activeIndex = 0;
            sections.forEach((section, index) => {
                section.follow_up.forEach((followUp) => {
                    if(followUp.key === activeKey){
                        activeIndex = index;
                    }
                })
            })
            return activeIndex;
        } else {
            return findIndex( sections, {category_key: activeKey} );
        }
    }

    const getBackgroundImages = () => {
        const activeIndex = getActiveSectionIndex();
        const backgroundImageStyle = `url(${sections[activeIndex].image_url};) lightgray 50% / cover no-repeat`
        const className = "flex-auto self-stretch rounded-2xl";
        if(activeIndex === 0){
            return <div className={className} style={{
                background: `${backgroundImageStyle}`,
            }}></div>
        } else {
            if(isFollowUp(activeKey)){
                return <div className={className} style={{
                    background: `${backgroundImageStyle}`,
                }}></div>
            } else {
                return (
                    <div className={className} style={{
                        background: `${backgroundImageStyle}`,
                    }}></div>
                )
            }
        }
    }

    const isScrollable = () => {
        let totalHeight = 0;
        sectionHeights.map((sectionHeight, index) => {
            totalHeight += sectionHeight.clientHeight;
        })
        return totalHeight > 920 - 128;
    }

    const setSectionToActive = (sectionIndex: number) => {
        setActiveKey(sections[sectionIndex].category_key);
    }

    const scrollToActiveSection = (element: HTMLDivElement | null) => {
        const activeSectionIndex = getActiveSectionIndex();
        if(scrollable && element){
            let heightToSection = 0;
            for(let i = 0; i < activeSectionIndex; i++){
                heightToSection += sectionHeights[i].clientHeight;
            }
            element.scrollTop = heightToSection;
        }
    }

    useEffect(() => {
        const newSectionLocations: SurveySectionsProgressSectionType[] = [];
        sectionHeights.map((sectionHeight, index) => {
            newSectionLocations.push({
                key: sections[index].category_key,
                sectionIndex: index,
                height: sectionHeight.clientHeight
            })
        })
        setSectionLocations(newSectionLocations);
    }, [activeKey])

    useEffect(() => {
        setScrollable(isScrollable());
    }, [scrollable, activeKey])

    return (
        <div className={"w-[668px] h-[920px] rounded-2xl relative"}>
            <div className={"absolute w-[668px] h-[920px] rounded-2xl flex flex-col justify-center items-center"}>
                {
                    getBackgroundImages()
                }
            </div>
            <div className={"absolute w-[668px] h-[920px] rounded-2xl"} style={{
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                background: "linear-gradient(0deg, rgba(8, 9, 18, 0.50) 0%, rgba(8, 9, 18, 0.50) 100%), radial-gradient(100.00% 184.29% at 0% 50%, #080912 0%, rgba(8, 9, 18, 0.25) 100%)"
            }}>
            </div>
            {
                scrollable ?
                    <div className={"h-full overflow-y-hidden"}
                         ref={(elem) => {
                             scrollToActiveSection(elem);
                         }}>
                        <div className="w-[540px]] pl-[64px] pr-[48px] pt-[164px] flex">
                            <SurveySectionsProgressBar
                                sections={sections}
                                activeKey={activeKey}
                                sectionLocations={sectionLocations}
                                getActiveSectionIndex={getActiveSectionIndex}
                                isFollowUp={isFollowUp}
                            />
                            <div className={"z-10 pl-6"}>
                                {
                                    sections.map((section, index) => {
                                        return (
                                            <div
                                                key={"section_component_" + index}
                                                ref={(elem) => sectionHeights[index] = elem}
                                                onClick={() => setSectionToActive(index)}
                                            >
                                                <SurveySections
                                                    sections={sections}
                                                    section={section}
                                                    sectionIndex={index}
                                                    activeKey={activeKey}
                                                    getActiveSectionIndex={getActiveSectionIndex}
                                                    isFollowUp={isFollowUp}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    :
                    <div className={"h-full p-[64px] grid grid-cols-1 content-center"}>
                        <div className="w-full flex pr-[100px] pt-[24px] pb-[23px]">
                            <SurveySectionsProgressBar
                                sections={sections}
                                activeKey={activeKey}
                                sectionLocations={sectionLocations}
                                getActiveSectionIndex={getActiveSectionIndex}
                                isFollowUp={isFollowUp}
                            />
                            <div className={"z-10 pl-6"}>
                                {
                                    sections.map((section, index) => {
                                        return (
                                            <div
                                                key={"section_component_" + index}
                                                ref={(elem) => sectionHeights[index] = elem}
                                                onClick={() => setSectionToActive(index)}
                                                className={"w-[400px]"}
                                            >
                                                <SurveySections
                                                    sections={sections}
                                                    section={section}
                                                    sectionIndex={index}
                                                    activeKey={activeKey}
                                                    getActiveSectionIndex={getActiveSectionIndex}
                                                    isFollowUp={isFollowUp}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

