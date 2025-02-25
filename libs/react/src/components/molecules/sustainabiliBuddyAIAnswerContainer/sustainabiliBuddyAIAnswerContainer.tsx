import {ColdIcon} from "@coldpbc/components";
import {IconNames} from "@coldpbc/enums";
import React, {PropsWithChildren} from "react";

export const SustainabiliBuddyAIAnswerContainer = (
  props: PropsWithChildren
) => {
  const {children} = props;

  return (
    <div className={'w-full flex flex-row justify-start pr-[80px]'}>
      <div className={'rounded-2xl bg-gray-20 flex flex-col text-tc-primary text-body gap-[10px] p-4'}>
        <div className={'flex flex-row gap-2 justify-start items-center'}>
          <div className={'bg-gray-50 p-1 rounded-full w-8 h-8 flex flex-row justify-center items-center'}>
            <ColdIcon name={IconNames.ColdScoreIcon} height={24}/>
          </div>
          <div className={'text-tc-primary text-body font-bold'}>
            Cold AI Companion
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
