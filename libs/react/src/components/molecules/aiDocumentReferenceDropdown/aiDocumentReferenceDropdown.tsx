import { useState } from 'react';
import { ColdIcon } from '../../atoms';
import { IconNames } from '@coldpbc/enums';

export const AiDocumentReferenceDropdown = (props: {
  reference: {
    file: string;
    text: string[];
    score?: number;
  };
}) => {
  const { reference } = props;
  const { file, text, score } = reference;
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className={'w-full flex flex-col gap-[8px] bg-gray-50 rounded-[4px] py-[4px] pr-[4px] pl-[8px]'}>
      <div className={'flex flex-row text-body items-center cursor-pointer justify-between'} onClick={() => setOpen(!open)}>
        {file}
        <div className={'p-[8px]'}>
          <ColdIcon name={open ? IconNames.ColdChevronUpIcon : IconNames.ColdChevronDownIcon} height={8} />
        </div>
      </div>
      {open && (
        <div className={'w-full flex flex-col gap-[20px] text-body italic text-start'}>
          {text.map((t, index) => (
            <div key={index}>{t}...</div>
          ))}
        </div>
      )}
    </div>
  );
};
