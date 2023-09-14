import React, { PropsWithChildren } from 'react';

export interface CenterColumnContentProps {
  title?: string;
}

export function CenterColumnContent(
  props: PropsWithChildren<CenterColumnContentProps>,
) {
  return (
    <div className="col-span-3 flex flex-col items-center gap-6">
      {
        // show title if we have one
        props.title && <div className="text-h1 self-stretch text-tc-primary">{props.title}</div>
      }
      {props.children}
    </div>
  );
}
