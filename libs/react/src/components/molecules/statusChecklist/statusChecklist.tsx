import {map} from "lodash";
import {IconNames} from "@coldpbc/enums";
import React from "react";
import {ColdIcon, ProgressCircle} from "@coldpbc/components";
import {HexColors} from "@coldpbc/themes";
import {ComplianceProgressStatusColor} from "@coldpbc/lib";
import { twMerge } from "tailwind-merge";

export interface StatusChecklistItem {
  label: string;
  showProgressBarGradient: boolean;
  completed: boolean;
  progress?: number;
}

export const StatusChecklist = (
  props: {
    checklist: StatusChecklistItem[];
    className?: string;
    'data-testid'?: string;
  }
) => {
  const { checklist, className } = props;

  const showProgressBarGradient = (item: StatusChecklistItem) => {
    return item.showProgressBarGradient
  };

  const getStatusIcon = (listItem: StatusChecklistItem) => {
    if (
      listItem.progress
    ) {
      let percentage = listItem.progress;

      return (
        <div className={'absolute top-[3px] left-0 w-[12px] h-[12px]'}>
          <ProgressCircle color={HexColors.lightblue['200']} radius={6} percentage={percentage} backgroundColor={HexColors.gray['70']} />
        </div>
      );
    } else {
      if (listItem.completed) {
        return (
          <div className={'absolute top-[3px] left-0 w-[12px] h-[12px]'}>
            <ColdIcon name={IconNames.ColdCheckIcon} color={ComplianceProgressStatusColor.user_answered} width={12} height={12} inverted={true} />
          </div>
        );
      } else {
        return <div className={'absolute top-[3px] left-0 w-[12px] h-[12px] bg-gray-70 rounded-full'}></div>;
      }
    }
  };

  const getComplianceStatusProgressBar = (listItem: StatusChecklistItem, index: number) => {
    // dont show if the checklist is empty, if the checklist has only one item, or if the item is the last one
    if ( checklist.length === 0 || index === checklist.length - 1 || checklist.length === 1 ) {
      return null;
    }

    if (showProgressBarGradient(listItem)) {
      return (
        <div
          data-testid={'checklist-progress-bar-gradient-' + index}
          className={`absolute h-[calc(100%+22px)] w-[1px] left-[6px] top-[6px]`}
          style={{
            // have gradient color from 0% to amount of percentage to 100%
            backgroundImage: `linear-gradient(to bottom, ${ComplianceProgressStatusColor.user_answered} 0%, ${HexColors.bgc.menu} 100%)`,
          }}></div>
      );
    }

    const progressBarColor = listItem.completed ? 'bg-green-200' : 'bg-bgc-menu';

    return <div data-testid={'checklist-progress-bar-' + index} className={`absolute h-[calc(100%+22px)] w-[1px] left-[6px] top-[6px] ${progressBarColor}`}></div>;
  };

  const getComplianceSetStatusElement = (listItem: StatusChecklistItem, index: number) => {
    let text = listItem.label;

    return (
      <div className={'w-full flex flex-row pl-[28px] relative'} key={index}>
        {getComplianceStatusProgressBar(listItem, index)}
        {getStatusIcon(listItem)}
        <div className={'text-tc-primary text-body w-full'}>{text}</div>
      </div>
    );
  };

  return (
    <div className={twMerge('w-full h-auto p-[24px] flex flex-col gap-[22px] bg-bgc-elevated rounded-[16px]', className)} data-testid={props['data-testid'] || 'checklist'}>
      {map(checklist, (listItem, index) => {
        return getComplianceSetStatusElement(listItem, index);
      })}
    </div>
  );
}
