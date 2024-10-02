import React, { PropsWithChildren, ReactNode } from 'react';
import { Spinner } from '@coldpbc/components';
import { GlobalSizes } from '@coldpbc/enums';
import { twMerge } from 'tailwind-merge';
import { useFlags } from 'launchdarkly-react-client-sdk';
import opacity from "hex-color-opacity";
import {HexColors} from "@coldpbc/themes";
import {useNavigate} from "react-router-dom";

export interface MainContentProps {
  title?: string;
  headerElement?: ReactNode;
  isLoading?: boolean;
  className?: string;
  breadcrumbs?: {
    label: string;
    href?: string;
  }[];
  contentClassName?: string;
}

export function MainContent(props: PropsWithChildren<MainContentProps>) {
  const ldFlags = useFlags();
  const navigate = useNavigate();
  if(props.breadcrumbs){

    const breadcrumbs =
      props.breadcrumbs.map(
        (breadcrumb, index) =>
        {
      let classname = '';
      if (breadcrumb.href) {
        classname = 'cursor-pointer hover:underline';
      }
      return (
        <div key={index} className={classname} onClick={() => {
          if(breadcrumb.href){
            navigate(breadcrumb.href);
          }
        }}>
          {breadcrumb.label}
        </div>
      )
    })
    // interleave the breadcrumbs with '>' characters
    const interleavedBreadcrumbs: JSX.Element[] = [];
    breadcrumbs.forEach((breadcrumb, index) => {
      interleavedBreadcrumbs.push(breadcrumb);
      if (index < breadcrumbs.length - 1) {
        interleavedBreadcrumbs.push(
          <span key={index} className={'w-[24px] h-[24px] flex items-center justify-center'}>{'>'}</span>
        );
      }
    });

    return (
      <div className={twMerge('w-[1129px] flex flex-col items-center gap-6 text-tc-primary', props.className)}>
        <div
          className={'w-full px-[16px] flex flex-row py-[8px] gap-[6px]'}
          style={{
            backgroundColor: opacity(HexColors.gray['30'], 0.5),
          }}>
          {
            interleavedBreadcrumbs
          }
        </div>
        <div className={twMerge('w-full flex flex-col px-[64px] gap-[40px]', props.contentClassName)}>
          <div
            className={'w-full flex flex-row justify-between items-center'}>
            {
              props.title && (
                <div data-testid={'main-content-title'} className="text-h1 self-stretch text-tc-primary">
                  {props.title}
                </div>
              )
            }
            {
              props.headerElement && props.headerElement
            }
          </div>
          {props.isLoading ? <Spinner size={GlobalSizes.xLarge}/> : props.children}
        </div>
      </div>
    );

  } else {
    return (
      <div
        className={twMerge('w-[1129px] flex flex-col items-center gap-6 text-tc-primary', ldFlags.showNewNavigationCold698 ? 'py-[40px] ml-[50px]' : '', props.className)}>
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
}
