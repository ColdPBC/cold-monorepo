import { useState } from "react";
import {ColdIcon, Input, SustainabiliBuddyInput} from "@coldpbc/components";
import { IconNames } from "@coldpbc/enums";


export const SustainabiliBuddyContainer = () => {
  const [queue, setQueue] = useState<string[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState<string>('');

  const onEnter = () => {
    if (currentPrompt) {
      setQueue([...queue, currentPrompt]);
      setCurrentPrompt('');
    }
  }

  console.log(queue);

  return (
    <div className="h-[calc(100vh-170px)] min-h-[400px] w-[506px] p-[2px] rounded-[16px] bg-gradient-to-br from-[#F7FF58] via-[#32B5FF] to-[#485CEA]">
      <div className={'p-6 h-full w-full flex flex-col rounded-[16px] bg-black justify-end'}>
        <SustainabiliBuddyInput
          currentPrompt={currentPrompt}
          setCurrentPrompt={setCurrentPrompt}
          onEnter={onEnter}
          />
      </div>
    </div>
  )
}
