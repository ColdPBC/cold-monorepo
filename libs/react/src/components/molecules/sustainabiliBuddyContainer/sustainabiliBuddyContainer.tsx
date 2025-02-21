import { useState } from "react";
import {SustainabiliBuddyInput} from "@coldpbc/components";


export const SustainabiliBuddyContainer = () => {
  const [queue, setQueue] = useState<{
    ai: string[];
    user: string[];
  }>({
    ai: [],
    user: [],
  });

  const onEnter = (prompt: string) => {
    if (prompt) {
      setQueue(prev => {
        return {
          ai: [...prev.ai],
          user: [...prev.user, prompt],
        }
      });
    }
  }

  return (
    <div className="h-[calc(100vh-170px)] min-h-[400px] w-[506px] p-[2px] rounded-[16px] bg-gradient-to-br from-[#F7FF58] via-[#32B5FF] to-[#485CEA]">
      <div className={'p-6 h-full w-full flex flex-col rounded-[16px] bg-black justify-end'}>
        <SustainabiliBuddyInput
          onEnter={onEnter}
        />
      </div>
    </div>
  )
}
