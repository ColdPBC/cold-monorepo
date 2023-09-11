import {findIndex, orderBy} from 'lodash';
import React from 'react';
import { SurveySectionType, SurveySectionsProgressSectionType } from '@coldpbc/interfaces';


export interface SurveySectionsProgressBarProps {
    sections: SurveySectionType[];
    sectionLocations: SurveySectionsProgressSectionType[];
    activeKey: string;
    getActiveSectionIndex: () => number;
    isFollowUp: (key: string) => boolean;
}

export const SurveySectionsProgressBar = ({sections, sectionLocations, activeKey, getActiveSectionIndex, isFollowUp} : SurveySectionsProgressBarProps) => {

    const getProgressBarColorGradientSection = (sectionKey: string, currentSectionIndex: number) => {
        const activeSectionIndex = getActiveSectionIndex();
        const followUp = isFollowUp(activeKey);
        let className = "w-[4px] h-full";
        if(currentSectionIndex === sections.length - 1){
            className += " rounded-b";
        }
        if(!followUp){
            if(currentSectionIndex >= activeSectionIndex){
                return (
                    <div className={"w-[4px] h-full bg-bgc-accent" + className}></div>
                )
            } else {
                if(currentSectionIndex === activeSectionIndex - 1){
                    const currentSectionFollowUps = sections[currentSectionIndex].follow_up.length + 1;
                    const changePercentage = 1 / currentSectionFollowUps;
                    const changePercentageString = changePercentage * 100 + "%";
                    const oldPercentage = 1 - changePercentage;
                    const oldPercentageString = oldPercentage * 100 + "%";
                    return (
                        <div className={"w-[4px] h-full"}>
                            <div className={"w-full bg-primary-300"} style={{
                                height: `${oldPercentageString}`
                            }}>
                            </div>

                            <div className={"w-full"} style={{
                                height: `${changePercentageString}`
                            }}>
                                <div className={"w-full bg-primary-300 h-full rounded-b-sm"}>
                                </div>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div className={"w-[4px] bg-primary-300 h-full"}></div>
                    )
                }
            }
        } else {
            if(activeSectionIndex === currentSectionIndex){
                const totalCurrentSectionFollowUps = activeSectionIndex === sections.length - 1 ? sections[currentSectionIndex].follow_up.length : sections[currentSectionIndex].follow_up.length + 1;
                const activeFollowUpIndex = findIndex(sections[activeSectionIndex].follow_up, {key: activeKey});
                const changePercentage = 1 / totalCurrentSectionFollowUps;
                const changePercentageString = changePercentage * 100 + "%";
                const previousPercentage = activeFollowUpIndex / totalCurrentSectionFollowUps;
                const previousPercentageString = previousPercentage * 100 + "%";
                return (
                    <div className={"w-[4px] h-full"}>
                        <div className={"w-full bg-primary-300"} style={{
                            height: `${previousPercentageString}`
                        }}>
                        </div>
                        <div className={"w-full"} style={{
                            height: `${changePercentageString}`
                        }}>
                            <div className={"h-full bg-primary-300 rounded-b-sm"} >
                            </div>
                        </div>
                    </div>
                )
            } else if (currentSectionIndex > activeSectionIndex) {
                return (
                    <div className={"w-[4px] h-full bg-bgc-accent" + className}></div>
                )
            } else {
                return (
                    <div className={"w-[4px] h-full bg-primary-300"}></div>
                )
            }
        }
    }

    const getProgressBar = () => {
        const sectionLocationsSorted = orderBy(sectionLocations, ['sectionIndex'], ['asc'])
        const activeIndex = getActiveSectionIndex();
        let offSet = 0;
        if(activeIndex == 0){
            offSet = 24;
        } else {
            offSet = 18;
        }
        return (
            <div className={"relative w-[16px] z-10 px-[4px]"}>
                {
                    sectionLocationsSorted.map((sectionLocation, index) => {
                        let adjustedHeight = sectionLocation.height;
                        if(index !== sections.length - 1 && index === activeIndex){
                            adjustedHeight -= 6;
                        } else if(activeIndex === index + 1){
                            adjustedHeight += 6;
                        }
                        if(index === sectionLocationsSorted.length - 1 && index === activeIndex){
                            adjustedHeight -= (40 + 24);
                        }
                        offSet += adjustedHeight;

                        if (index === sectionLocationsSorted.length - 1){
                            if(activeIndex === index){
                                console.log(adjustedHeight)
                                return (
                                    <div key={"progress_bar_" + index} className={"absolute w-[8px] bg-bgc-accent px-[2px] z-10 rounded-b"} style={{
                                        top: `${offSet-adjustedHeight}px`,
                                        height: `${adjustedHeight}px`,
                                    }}>
                                        <div  className={"w-[4px]"}
                                            style={{
                                                height: `${adjustedHeight - 2}px`,
                                            }}
                                        >
                                            {
                                                getProgressBarColorGradientSection(sectionLocation.key, index)
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        } else {
                            return (
                                <div key={"progress_bar_" + index} className={"absolute w-[8px] bg-bgc-accent px-[2px] z-10"} style={{
                                    top: `${offSet-adjustedHeight}px`,
                                    height: `${adjustedHeight}px`,
                                }}>
                                    {
                                        getProgressBarColorGradientSection(sectionLocation.key, index)
                                    }
                                </div>
                            )
                        }
                    })
                }
            </div>
        )
    }

    return getProgressBar()
}
