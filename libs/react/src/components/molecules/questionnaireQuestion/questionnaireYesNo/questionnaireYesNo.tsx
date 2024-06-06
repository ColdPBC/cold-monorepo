import React from 'react';
import { IconNames } from '@coldpbc/enums';
import { ColdIcon } from '@coldpbc/components';

export const QuestionnaireYesNo = (props: { onChange: (value: any) => void; value: any; 'data-testid'?: string }) => {
  const { onChange, value } = props;

  const onClick = (newValue: any) => {
    if (newValue === value) {
      onChange(null);
    } else {
      onChange(newValue);
    }
  };

  const getClassName = (newValue: boolean) => {
    let className =
      'p-[16px] text-body font-bold not-italic h-[72px] w-1/2 rounded-[400px] bg-gray-60 flex flex-row justify-center items-center cursor-pointer hover:bg-gray-60 relative';
    if (newValue === value) {
      className += ' bg-gray-60 border-[1px] border-white';
    } else {
      className += ' bg-transparent border-[1px] border-gray-60';
    }

    return className;
  };

  const getCheckmark = (newValue: boolean) => {
    if (newValue === value) {
      return (
        <div className={'absolute right-[16px]'}>
          <ColdIcon name={IconNames.ColdCheckIcon} width={24} height={24} color={'white'} />
        </div>
      );
    }
  };

  const options = ['Yes', 'No'];

  return (
    <div className={'w-full space-x-4 flex text-center text-tc-primary'} data-testid={props['data-testid']}>
      {options.map((option, index) => (
        <div key={index} className={getClassName(option === 'Yes')} onClick={() => onClick(option === 'Yes')}>
          {getCheckmark(option === 'Yes')}
          {option}
        </div>
      ))}
    </div>
  );
};
