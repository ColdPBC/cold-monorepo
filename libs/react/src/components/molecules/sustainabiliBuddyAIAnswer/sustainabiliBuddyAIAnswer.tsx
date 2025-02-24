import {SustainabiliBuddyAIAnswerContainer} from "@coldpbc/components";
import React from "react";
import {AIPromptResponse} from "@coldpbc/interfaces";
import {LightBulbIcon} from "@heroicons/react/20/solid";


export const SustainabiliBuddyAIAnswer = (
  props : {
    response: AIPromptResponse;
  }) => {
  const {response} = props;
  const {answer, justification, references} = response;

  return (
    <SustainabiliBuddyAIAnswerContainer>
      <div className={'w-full flex flex-col gap-4'}>
        <div>
          {answer}
        </div>
        <div className={'flex flex-row gap-1 items-center'}>
          <LightBulbIcon className={'w-[15px] h-[15px] self-center shrink-0'} color={'white'}/>
          <div className={'w-full text-eyebrow'}>
            About this response
          </div>
        </div>
        <div>
          {justification}
        </div>
        <div>
          {references.map(({text, file}, index) => (
            <div key={index}>
              {file}
            </div>
          ))}
        </div>
      </div>
    </SustainabiliBuddyAIAnswerContainer>
  )

}
