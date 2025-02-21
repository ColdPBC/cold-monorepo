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
    <div className="h-[calc(100vh-170px)] md:h-[75vh] lg:h-[66.67vh] min-h-[400px] w-screen md:w-[66.67vw] lg:w-[50vw] p-0.5 rounded-[16px] bg-gradient-to-br from-yellow-300 via-blue-400 to-blue-600">
      <div className={'p-6 h-full w-full flex flex-col rounded-[16px] bg-black justify-end'}>
        <SustainabiliBuddyInput
          onEnter={onEnter}
        />
      </div>
    </div>
  )
}
