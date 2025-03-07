import {ErrorFallback, SustainabiliBuddyAIAnswerContainer} from "@coldpbc/components";
import React, {useEffect, useRef, useState} from "react";
import {AIPromptResponse} from "@coldpbc/interfaces";
import {LightBulbIcon} from "@heroicons/react/20/solid";
import {openAiServiceFetcher} from "@coldpbc/fetchers";
import {useAuth0Wrapper, useColdContext} from "@coldpbc/hooks";
import {isAxiosError} from "axios";
import {withErrorBoundary} from "react-error-boundary";


const DEFAULT_RESPONSE_ANSWER = 'Sorry, I’m unable to answer this question. Try uploading more documentation about your sustainability efforts.'

const useAIResponse = (question: string, setAILoading: (loading: boolean) => void) => {
  const { orgId } = useAuth0Wrapper();
  const { logBrowser } = useColdContext();
  const [aiResponse, setAIResponse] = useState<AIPromptResponse | null>(null);
  const hasFetched = useRef(false); // Prevents double-mounting requests

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const getAIResponse = async () => {
      setAILoading(true);
      try {
        const response = await openAiServiceFetcher([
          `/organization/${orgId}/prompt`,
          "PUT",
          { prompt: question },
        ]);

        if (isAxiosError(response)) {
          logBrowser(`AI response failed for ${orgId}`, "error", { response }, response.message);
          setAIResponse({ answer: DEFAULT_RESPONSE_ANSWER, references: [] });
        } else {
          setAIResponse({
            answer: DEFAULT_RESPONSE_ANSWER,
            ...response,
            references: response.references
              ? response.references.reduce((acc: AIPromptResponse["references"], ref) => {
                const existingRef = acc.find((r) => r.file === ref.file);
                if (existingRef) {
                  existingRef.text += `\n${ref.text}`;
                } else {
                  acc.push(ref);
                }
                return acc;
              }, [])
              : [],
          });
        }
      } finally {
        setAILoading(false);
      }
    };

    getAIResponse();
  }, [question, orgId, setAILoading, logBrowser]);

  return aiResponse;
};

const _SustainabiliBuddyAIAnswer = (
  props : {
    question: string;
    setAILoading: (loading: boolean) => void;
  }) => {
  const {question, setAILoading} = props;

  const aiResponse = useAIResponse(question, setAILoading);

  return (
    <SustainabiliBuddyAIAnswerContainer>
      {
        (!aiResponse) ? (
          <div className="flex space-x-2 p-4 bg-transparent">
            <div
              className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-300 via-blue-400 to-indigo-500 bg-[length:200%] animate-bounce-gradient"></div>
            <div
              className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-300 via-blue-400 to-indigo-500 bg-[length:200%] animate-bounce-gradient animation-delay-200"></div>
            <div
              className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-300 via-blue-400 to-indigo-500 bg-[length:200%] animate-bounce-gradient animation-delay-400"></div>
          </div>
        ) : (
          <div className={'w-full flex flex-col gap-4'}>
            <div>
              {aiResponse.answer}
            </div>
            {
              (aiResponse.justification || (aiResponse.references && aiResponse.references.length > 0)) && (
                <div className={'flex flex-row gap-1 items-center'}>
                  <LightBulbIcon className={'w-[15px] h-[15px] self-center shrink-0'} color={'white'}/>
                  <div className={'w-full text-eyebrow'}>
                    About this response
                  </div>
                </div>
              )
            }
            {
              aiResponse.justification && (
                <div>
                  {aiResponse.justification}
                </div>
              )
            }
            {
              (
                aiResponse.references && aiResponse.references.length > 0) && (
                  <div className={'flex flex-col gap-2 w-full'}>
                  {
                    aiResponse.references.map(({text, file}, index) => (
                      <div key={index}
                           className={'p-2 bg-gray-30 border-[1px] border-gray-50 rounded-[8px] cursor-pointer hover:underline hover:bg-gray-40'}>
                        {file}
                      </div>
                    ))
                  }
                </div>
              )
            }
          </div>
        )
      }
    </SustainabiliBuddyAIAnswerContainer>
  )
}

export const SustainabiliBuddyAIAnswer = withErrorBoundary(_SustainabiliBuddyAIAnswer, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in SustainabiliBuddyAIAnswer: ', error);
  },
});
