import React, { PropsWithChildren } from 'react';

export interface AppContentProps {
  title?: string;
}

export function AppContent(
  props: PropsWithChildren<AppContentProps>,
) {
  return (
    <div className='w-full'>
      {
        // show title if we have one
        props.title && <div className="text-h1 self-stretch text-tc-primary mb-4">{props.title}</div>
      }
      <div className="flex gap-6 flex-1">
        {props.children}
      </div>
    </div>
  );
}
