import {QueueItem} from "@coldpbc/interfaces";
import {
  SustainabiliBuddyAIAnswerContainer,
  SustainabiliBuddyUserQuestion,
  SustainabiliBuddyAIAnswer,
  Markdown,
} from "@coldpbc/components";
import {useEffect, useRef} from "react";


export const SustainabiliBuddyQueue = (
  props: {
    queue: QueueItem[];
    setAILoading: (loading: boolean) => void;
  }) => {
  const {queue, setAILoading} = props;
  // Create a ref for the dummy div at the end of the messages
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(messagesEndRef.current)
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [queue]);

  return (
    <div className={'h-full overflow-y-auto w-full flex flex-col gap-6'}>
      <SustainabiliBuddyAIAnswerContainer>
        <Markdown
          markdown={'Hello! What can I help you with today?\n\nYou can ask me anything about your sustainability compliance. I’ll answer based on what I know about your company from the files and other information you’ve shared with Cold.'}
        />
      </SustainabiliBuddyAIAnswerContainer>
      {
        queue.map((item, index) => {
          if (item.type === 'User') {
            return (
              <SustainabiliBuddyUserQuestion
                key={index}
                question={item.content}
              />
            )
          } else {
            return (
              <SustainabiliBuddyAIAnswer
                key={index}
                question={item.content}
                setAILoading={setAILoading}
              />
            )
          }
        })
      }
      <div ref={messagesEndRef}/>
    </div>
  )
}
