import React, {PropsWithChildren} from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RightColumnContentProps {}

export function RightColumnContent(
  props: PropsWithChildren<RightColumnContentProps>,
) {
  return (
    <div className="col-span-2 inline-flex flex-col items-start gap-6 text-tc-primary">
      <div className='sticky top-[40px] w-full'>
        {props.children}
      </div>
    </div>
  );
}
