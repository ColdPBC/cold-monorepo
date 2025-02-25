import {Spinner, SustainabiliBuddyAIAnswerContainer} from "@coldpbc/components";
import React, {useEffect} from "react";
import {AIPromptResponse} from "@coldpbc/interfaces";
import {LightBulbIcon} from "@heroicons/react/20/solid";
import {openAiServiceFetcher} from "@coldpbc/fetchers";
import {useAuth0Wrapper, useColdContext} from "@coldpbc/hooks";
import {isAxiosError} from "axios";

interface AIState {
  isLoading: boolean;
  response: AIPromptResponse | null;
}

export const SustainabiliBuddyAIAnswer = (
  props : {
    question: string;
    setAILoading: (loading: boolean) => void;
  }) => {
  const {orgId} = useAuth0Wrapper();
  const {logBrowser} = useColdContext()
  const {question, setAILoading} = props;
  const [aiState, setAIState] = React.useState<AIState>({
    isLoading: true,
    response: null,
  });

  const DEFAULT_RESPONSE_ANSWER = 'Sorry, I’m unable to answer this question. Try uploading more documentation about your sustainability efforts.'

  useEffect(() => {
    const getAIResponse = async () => {
      setAILoading(true);
      // get the ai reference
      const response = await openAiServiceFetcher([`/organization/${orgId}/prompt`, 'PUT', {
        prompt: question,
      }]);

      // handle failure
      if(isAxiosError(response)) {
        setAIState({
          response: {
            answer: DEFAULT_RESPONSE_ANSWER,
            references: [],
          },
          isLoading: false,
        });
        logBrowser(
          `AI response failed for ${orgId}`,
          'error',
          {
            response,
          },
          response.message,
        )
      } else {
        setAIState({
          response: response,
          isLoading: false,
        });
      }
      setAILoading(false);
    }

    getAIResponse();
  }, []);

  return (
    <SustainabiliBuddyAIAnswerContainer>
      {
        (!aiState.response) ? (
          <Spinner />
        ) : (
          <div className={'w-full flex flex-col gap-4'}>
            <div>
              {aiState.response.answer || DEFAULT_RESPONSE_ANSWER}
            </div>
            <div className={'flex flex-row gap-1 items-center'}>
              <LightBulbIcon className={'w-[15px] h-[15px] self-center shrink-0'} color={'white'}/>
              <div className={'w-full text-eyebrow'}>
                About this response
              </div>
            </div>
            <div>
              {aiState.response.justification}
            </div>
            <div className={'flex flex-col gap-2 w-full'}>
              {
                aiState.response.references.map(({text, file}, index) => (
                  <div key={index}
                       className={'p-2 bg-gray-30 border-[1px] border-gray-50 rounded-[8px] cursor-pointer hover:underline hover:bg-gray-40'}>
                    {file}
                  </div>
                ))
              }
            </div>
          </div>
        )
      }
    </SustainabiliBuddyAIAnswerContainer>
  )

}
