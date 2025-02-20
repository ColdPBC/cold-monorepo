import {useState} from "react";
import { SustainabiliBuddyButton } from "@coldpbc/components";
import {SustainabiliBuddyContainer} from "../../molecules/sustainabiliBuddyContainer/sustainabiliBuddyContainer";


export const SustainabiliBuddy = () => {
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
