import React, { PropsWithChildren } from 'react';
import { BaseButton, Spinner } from '../../atoms';
import { ColdLogos } from '../../atoms';
import {
  ButtonTypes,
  ColdLogoNames,
  GlobalSizes,
  IconNames,
} from '@coldpbc/enums';
import { HexColors } from '@coldpbc/themes';
import { twMerge } from 'tailwind-merge';

export interface TakeoverProps {
  show: boolean;
  setShow: (show: boolean) => void;
  header?: {
    title?: {
      text?: string;
    };
    dismiss: {
      label?: string;
      dismissible: boolean;
      onClick?: () => void;
    };
  };
  isLoading?: boolean;
  className?: string;
}

export const Takeover = (props: PropsWithChildren<TakeoverProps>) => {
  const { children, show, setShow, header, isLoading, className } = props;

  const getHeaderComponent = () => {
    if (header && !isLoading) {
      return (
        <div
          className={
            'w-full flex h-[40px]' +
            (header.title ? ' justify-between' : ' justify-end')
          }
        >
          {header.title ? (
            header.title.text ? (
              <div className={'text-h3 text-tc-primary'}>
                {header.title.text}
              </div>
            ) : (
              <div className={'flex items-center'}>
                <ColdLogos
                  name={ColdLogoNames.ColdWordmark}
                  color={HexColors.white}
                  className={'w-[76px] h-[24px]'}
                />
              </div>
            )
          ) : (
            ''
          )}
          {header.dismiss.dismissible && (
            <BaseButton
              onClick={() => {
                if (header.dismiss.onClick) {
                  header.dismiss.onClick();
                } else {
                  setShow(false);
                }
              }}
              label={header.dismiss.label}
              iconRight={IconNames.CloseModalIcon}
              variant={ButtonTypes.secondary}
            />
          )}
        </div>
      );
    } else {
      return null;
    }
  };

  if (show) {
    return (
      <div
        className={twMerge(
          'fixed inset-0 h-screen w-screen bg-bgc-main px-[40px] pt-[40px] z-10 flex flex-col overflow-scroll',
          className,
        )}
      >
        {getHeaderComponent()}
        <div className="flex-1 flex flex-col">
          {isLoading ? (
            <div className="h-full w-full flex items-center justify-center">
              <Spinner size={GlobalSizes.xLarge} />
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
};
