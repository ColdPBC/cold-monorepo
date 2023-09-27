import React, { PropsWithChildren } from 'react';
import { BaseButton } from '../../atoms';
import { ColdLogos } from '../../atoms';
import {
  ButtonTypes,
  ColdLogoNames,
  GlobalSizes,
  IconNames,
} from '@coldpbc/enums';
import { HexColors } from '@coldpbc/themes';

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
}

export const Takeover = (props: PropsWithChildren<TakeoverProps>) => {
  const { children, show, setShow, header } = props;

  const getHeaderComponent = () => {
    if (header) {
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
      return '';
    }
  };

  if (show) {
    return (
      <div
        className={
          'fixed inset-0 h-screen w-screen rounded-2xl bg-bgc-main p-[40px] z-10'
        }
      >
        {getHeaderComponent()}
        <div>{children}</div>
      </div>
    );
  } else {
    return '';
  }
};
