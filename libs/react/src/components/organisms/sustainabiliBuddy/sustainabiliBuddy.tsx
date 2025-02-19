import {useState} from "react";
import { SustainabiliBuddyButton } from "@coldpbc/components";


export const SustainabiliBuddy = () => {
  const [showPromptContainer, setShowPromptContainer] = useState(false);

  return (
    <div className={'fixed right-5 bottom-5'}>
      <SustainabiliBuddyButton
        showPromptContainer={showPromptContainer}
        setShowPromptContainer={setShowPromptContainer}
      />
    </div>
  )

}
