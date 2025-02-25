import { useState } from "react";
import {SustainabiliBuddyInput, SustainabiliBuddyQueue} from "@coldpbc/components";
import {QueueItem} from "@coldpbc/interfaces";


export const SustainabiliBuddyContainer = () => {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [aiLoading, setAILoading] = useState<boolean>(false);

  const onEnter = (prompt: string) => {
    if (prompt) {
      setQueue(prev => {
        return [
          ...prev,
          {
            type: 'User',
            content: prompt,
          },
          {
            type: 'AI',
            content: prompt,
          }
        ]
      });
    }
  }

  return (
    <div className="h-[calc(100vh-170px)] md:h-[75vh] lg:h-[66.67vh] min-h-[400px] w-screen md:w-[66.67vw] lg:w-[50vw] p-0.5 rounded-[16px] bg-gradient-to-br from-yellow-250 via-lightblue-400 to-primary-300">
      <div className={'p-6 h-full w-full flex flex-col rounded-[16px] bg-black justify-end'}>
        <SustainabiliBuddyQueue
          queue={queue}
          aiLoading={aiLoading}
          setAILoading={setAILoading}
        />
        <SustainabiliBuddyInput
          onEnter={onEnter}
          aiLoading={aiLoading}
        />
      </div>
    </div>
  )
}
