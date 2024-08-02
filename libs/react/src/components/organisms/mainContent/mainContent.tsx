import React, { PropsWithChildren, ReactNode } from 'react';
import { Spinner } from '@coldpbc/components';
import { GlobalSizes } from '@coldpbc/enums';
import { twMerge } from 'tailwind-merge';
import { useFlags } from 'launchdarkly-react-client-sdk';

export interface MainContentProps {
  title?: string;
  headerElement?: ReactNode;
  isLoading?: boolean;
  className?: string;
}

export function MainContent(props: PropsWithChildren<MainContentProps>) {
  const ldFlags = useFlags();
  return (
    <div className={twMerge('w-[1129px] flex flex-col items-center gap-6 text-tc-primary', ldFlags.showNewNavigationCold698 ? 'py-[40px] ml-[50px]' : '', props.className)}>
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
