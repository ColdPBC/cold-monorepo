import {AIPromptResponse} from "@coldpbc/interfaces";
import {
  SustainabiliBuddyAIAnswerContainer,
  SustainabiliBuddyUserAnswer,
  SustainabiliBuddyAIAnswer,
  Markdown,
} from "@coldpbc/components";
import {useEffect, useRef} from "react";


export const SustainabiliBuddyQueue = (
  props: {
    queue: {
      ai: AIPromptResponse[];
      user: string[];
    }
  }) => {
  const {queue} = props;
  const { ai, user } = queue;
  // Create a ref for the dummy div at the end of the messages
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to merge user questions and AI responses alternately
  const mergeQueue = (user, ai) => {
    const merged: {
      content: string | AIPromptResponse
    }[] = [];
    const maxLength = Math.max(user.length, ai.length);

    for (let i = 0; i < maxLength; i++) {
      if (i < user.length) {
        merged.push({ content: user[i] });
      }
      if (i < ai.length) {
        merged.push({ content: ai[i].response });
      }
    }
    return merged;
  };

  const mergedQueue = mergeQueue(user, ai);

  useEffect(() => {
    if(messagesEndRef.current)
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mergedQueue]);

  return (
    <div className={'h-full overflow-y-auto w-full flex flex-col gap-6'}>
      <SustainabiliBuddyAIAnswerContainer>
        <Markdown
          markdown={'Hello! What can I help you with today?\n\nYou can ask me anything about your sustainability compliance. I’ll answer based on what I know about your company from the files and other information you’ve shared with Cold.'}
        />
      </SustainabiliBuddyAIAnswerContainer>
      {
        mergedQueue.map((item, index) => {
          if (typeof item.content === 'string') {
            return (
              <SustainabiliBuddyUserAnswer
                key={index}
                question={item.content}
              />
            )
          } else {
            return (
              <SustainabiliBuddyAIAnswer
                key={index}
                response={item.content}
              />
            )
          }
        })
      }
      <div ref={messagesEndRef}/>
    </div>
  )
}
