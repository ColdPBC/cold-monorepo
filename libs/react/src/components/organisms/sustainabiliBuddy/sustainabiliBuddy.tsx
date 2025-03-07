import React, {useState} from "react";
import {ErrorFallback, SustainabiliBuddyButton, SustainabiliBuddyContainer} from "@coldpbc/components";
import {withErrorBoundary} from "react-error-boundary";


const _SustainabiliBuddy = () => {
  const [showPromptContainer, setShowPromptContainer] = useState(false);

  return (
    <div className={'fixed right-5 bottom-5 flex flex-col items-end gap-[14px]'}>
      {
        showPromptContainer && (
          <SustainabiliBuddyContainer />
        )
      }
      <SustainabiliBuddyButton
        showPromptContainer={showPromptContainer}
        setShowPromptContainer={setShowPromptContainer}
      />
    </div>
  )

}

export const SustainabiliBuddy = withErrorBoundary(_SustainabiliBuddy, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in SustainabiliBuddy: ', error);
  },
});
