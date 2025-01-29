import React, { PropsWithChildren, ReactNode } from 'react';
import { Breadcrumbs, Spinner } from '@coldpbc/components';
import { GlobalSizes } from '@coldpbc/enums';
import { twMerge } from 'tailwind-merge';

export interface MainContentProps {
	title?: string;
	subTitle?: string | ReactNode;
	imageUrl?: string;
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

	const getTitle = () => {
		return (
			<div className={'flex gap-4'}>
				{props.imageUrl && <img className="w-[82px] h-[82px] object-cover rounded-lg" src={props.imageUrl} alt={`Logo for ${props.title}`} onError={() => null} />}
				<div className={`flex flex-col ${!props.imageUrl && 'gap-[4px]'}`}>
					{props.title && (
						<div data-testid={'main-content-title'} className="text-h1 self-stretch text-tc-primary">
							{props.title}
						</div>
					)}
					{props.subTitle && (
						<div data-testid={'main-content-subtitle'} className="text-body self-stretch text-tc-primary">
							{props.subTitle}
						</div>
					)}
				</div>
			</div>
		);
	};

	if (props.breadcrumbs) {
		return (
			<div className={twMerge('w-full flex flex-col items-center gap-6 text-tc-primary', props.className)}>
				<Breadcrumbs items={props.breadcrumbs} />
				<div className={twMerge('w-full flex flex-col px-[50px] gap-[40px]', props.contentClassName)}>
          {
            props.title && (
              <div className={'w-full flex flex-row justify-between items-center'}>
                {getTitle()}
                {props.headerElement && props.headerElement}
              </div>
            )
          }
          {props.isLoading ? <Spinner size={GlobalSizes.xLarge} /> : props.children}
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={twMerge('w-[calc(100%-100px)] min-w-[1129px] flex flex-col items-center gap-6 text-tc-primary py-[40px] ml-[50px]', props.className)}
      >
        {
          props.title && (
            <div className={'w-full flex flex-row justify-between'}>
              {getTitle()}
              {
                // show header element next to title if we have one
                props.headerElement && props.headerElement
              }
            </div>
          )
        }
        {props.isLoading ? <Spinner size={GlobalSizes.xLarge} /> : props.children}
      </div>
    );
  }
}
