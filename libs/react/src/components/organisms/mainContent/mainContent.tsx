import React, { PropsWithChildren, ReactNode } from 'react';
import { Spinner } from '@coldpbc/components';
import { GlobalSizes } from '@coldpbc/enums';

export interface MainContentProps {
  title?: string;
  headerElement?: ReactNode;
  isLoading?: boolean;
}

export function MainContent(props: PropsWithChildren<MainContentProps>) {
  return (
    <div className="w-[1129px] flex flex-col items-center gap-6">
      <div className={'w-full flex flex-row justify-between'}>
        {
          // show title if we have one
          props.title && (
            <div data-testid={'main-content-title'} className="text-h1 self-stretch text-tc-primary">
              {props.title}
            </div>
          )
        }
        {
          // show header element next to title if we have one
          props.headerElement && props.headerElement
        }
      </div>
      {props.isLoading ? <Spinner size={GlobalSizes.xLarge} /> : props.children}
    </div>
  );
}
