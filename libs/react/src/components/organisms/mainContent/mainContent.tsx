import React, { PropsWithChildren } from 'react';

export interface MainContentProps {
  title?: string;
}

export function MainContent(
  props: PropsWithChildren<MainContentProps>,
) {
  return (
    <div className="w-[1129px] flex flex-col items-center gap-6">
      {
        // show title if we have one
        props.title && <div className="text-h1 self-stretch text-tc-primary">{props.title}</div>
      }
      {props.children}
    </div>
  );
}
