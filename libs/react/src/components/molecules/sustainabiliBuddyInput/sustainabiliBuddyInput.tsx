import {ColdIcon, Input} from "@coldpbc/components";
import {IconNames, InputTypes} from "@coldpbc/enums";
import {useEffect, useRef, useState} from "react";

const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string
) => {
  useEffect(() => {
    if (textAreaRef) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textAreaRef.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);
};

export const SustainabiliBuddyInput = (props: {
  currentPrompt: string,
  setCurrentPrompt: (value: string) => void,
  onEnter: () => void,
}) => {
  const [rows, setRows] = useState(1);
  const {currentPrompt, setCurrentPrompt, onEnter} = props;
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useAutosizeTextArea(textAreaRef.current, currentPrompt);

  return (
    <div
      className={'rounded-[30px] border-[1px] border-white py-[12px] pr-[12px] pl-[16px] flex flex-row justify-between gap-[6px] h-auto'}>
      <Input
        textarea_props={{
          className: 'w-full p-0 border-0 focus:border-0 text-body text-tc-primary text-wrap h-fit',
          placeholder: 'Your question...',
          value: currentPrompt,
          onChange: (e) => {
            setCurrentPrompt(e.target.value);
          },
          name: 'currentPrompt',
          onKeyDownCapture: (e) => {
            // when its shift + enter, we want to add a new line
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onEnter();
              setRows(1);
            } else if (e.key === 'Enter' && e.shiftKey) {
              setRows(rows + 1);
            }
          },
          ref: textAreaRef,
          rows: 1
        }}
        type={InputTypes.TextArea}
        container_classname={'w-full'}
      />
      <div
        className={'flex flex-row justify-center items-center rounded-full relative cursor-pointer bg-primary w-[24px] h-[24px] shrink-0 self-center'}
        onClick={onEnter}
      >
        <ColdIcon
          name={IconNames.ColdRightArrowIcon}
          className={'w-[20px] h-[20px] transform -rotate-90'}
          fill={'transparent'}
        />
      </div>
    </div>
  )
}

