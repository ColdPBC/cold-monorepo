import React, { PropsWithChildren } from 'react';
import { Spinner } from '@coldpbc/components';
import { GlobalSizes } from '@coldpbc/enums';

export interface MainContentProps {
  title?: string;
  isLoading?: boolean;
}

export function MainContent(props: PropsWithChildren<MainContentProps>) {
  return (
    <div className="w-[1129px] flex flex-col items-center gap-6">
      {
        // show title if we have one
        props.title && (
          <div data-testid={'main-content-title'} className="text-h1 self-stretch text-tc-primary">
            {props.title}
          </div>
        )
      }
      {props.isLoading ? <Spinner size={GlobalSizes.xLarge} /> : props.children}
    </div>
  );
}
