import { useState } from 'react';
import { ColdIcon } from '../../atoms';
import { IconNames } from '@coldpbc/enums';
import { QuestionnaireQuestionComplianceReference } from '@coldpbc/interfaces';
import { isArray } from 'lodash';

export const AiReferenceDropdown = (props: { reference: QuestionnaireQuestionComplianceReference }) => {
  const { reference } = props;

  const { file, url, text } = reference;
  const [open, setOpen] = useState<boolean>(false);
  const getReference = () => {
    const splitUrl = url?.split('/');
    const link = splitUrl?.[splitUrl.length - 1];
    if (file) {
      return file;
    }
    let navigateToUrl = url;
    // check url has http or https. if not add https
    if (splitUrl && splitUrl[0] !== 'http:' && splitUrl[0] !== 'https:') {
      navigateToUrl = `https://${url}`;
    }

    if (navigateToUrl) {
      return (
        <a href={navigateToUrl} target={'_blank'} rel={'noreferrer'} className={'text-primary underline'} onClick={e => e.stopPropagation()}>
          {link}
        </a>
      );
    }
    return 'Document Reference';
  };
  return (
    <div className={'w-full flex flex-col gap-[8px] bg-gray-50 rounded-[4px] py-[4px] pr-[4px] pl-[8px]'}>
      <div className={'flex flex-row text-body items-center cursor-pointer justify-between'} onClick={() => setOpen(!open)}>
        {getReference()}
        <div className={'p-[8px]'}>
          <ColdIcon name={open ? IconNames.ColdChevronUpIcon : IconNames.ColdChevronDownIcon} height={8} />
        </div>
      </div>
      {open && (
        <div className={'w-full flex flex-col gap-[20px] text-body italic text-start'}>
          {isArray(text) ? text.map((t, index) => <div key={index}>{t}...</div>) : <div>{text}</div>}
        </div>
      )}
    </div>
  );
};
