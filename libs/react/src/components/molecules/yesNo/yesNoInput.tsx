import React from 'react';

export const YesNoInput = (props: { onChange: (value: any) => void; value: any; 'data-testid'?: string }) => {
  const { onChange, value } = props;

  const onClick = (newValue: any) => {
    if (newValue === value) {
      onChange(null);
    } else {
      onChange(newValue);
    }
  };

  const getClassName = (newValue: any) => {
    let className = 'text-sm not-italic font-semibold h-[72px] w-full rounded-lg bg-bgc-accent grid grid-cols-1 place-content-center cursor-pointer';
    if (newValue === value) {
      className += ' bg-primary-300 hover:bg-primary-200';
    } else {
      className += ' bg-bgc-accent hover:bg-gray-50';
    }

    return className;
  };

  return (
    <div className={'w-full space-x-4 flex text-center text-tc-primary'} data-testid={props['data-testid']}>
      <div className={getClassName(true)} onClick={() => onClick(true)}>
        Yes
      </div>
      <div className={getClassName(false)} onClick={() => onClick(false)}>
        No
      </div>
    </div>
  );
};
