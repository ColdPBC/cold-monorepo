import React, { PropsWithChildren } from 'react';
import { BaseButton } from '../../atoms/button/button';
import { DefaultHexColors } from '../../../enums/colors';
import { ColdIcon, ColdLogos } from '../../atoms';
import { ButtonTypes, ColdLogoNames, IconNames } from '@coldpbc/enums';
import { HexColors } from '@coldpbc/themes';

export interface TakeoverProps {
  show: boolean;
  setShow: (show: boolean) => void;
  title: string;
  logo_shown: boolean;
  dismiss: {
    label?: string;
    dismissible: boolean;
  };
}

export const Takeover = (props: PropsWithChildren<TakeoverProps>) => {
  const { children, show, setShow, logo_shown, dismiss, title } = props;
  return (
    <>
      {show && (
        <div
          className={
            'fixed inset-0 h-screen w-screen rounded-2xl bg-bgc-main p-[40px]'
          }
        >
          <div className="w-full flex justify-between h-[40px]">
            {logo_shown && (
              <div className={'flex items-center justify-center'}>
                <ColdLogos
                  name={ColdLogoNames.ColdWordmark}
                  color={HexColors.tc.primary}
                />
              </div>
            )}
            {dismiss.dismissible && (
              <BaseButton
                onClick={() => {
                  setShow(false);
                }}
                label={dismiss.label}
                iconRight={IconNames.CloseModalIcon}
                variant={ButtonTypes.secondary}
              />
            )}
          </div>
          <div>{children}</div>
        </div>
      )}
    </>
  );
};
