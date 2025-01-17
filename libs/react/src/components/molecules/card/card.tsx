import React, { PropsWithChildren } from 'react';
import { BaseButton, Dropdown } from '@coldpbc/components';
import { ButtonTypes } from '@coldpbc/enums';
import { twMerge } from 'tailwind-merge';
import { snakeCase } from 'lodash';

export interface CardProps {
  glow?: boolean;
  title?: string;
  ctas?: Array<{
    text?: string;
    action?: () => void;
    variant?: ButtonTypes;
    child?: React.ReactNode;
    disabled?: boolean;
    loading?: boolean;
  }>;
  className?: string;
  'data-testid'?: string;
  onClick?: () => void;
  glowColor?: string;
  innerRef?: React.Ref<HTMLDivElement>;
  dropdownOptions?: Array<{ value: string; label: string }>;
  selectedDropdownValue?: string;
  onDropdownSelect?: (value: string) => void;
  overflowHidden?: boolean;
}

export function Card(props: PropsWithChildren<CardProps>) {
	const showHeader = props.title || props.ctas || props.dropdownOptions;
	const glow = props.glow !== undefined ? props.glow : true;
  const overflowHidden = props.overflowHidden !== undefined ? props.overflowHidden : true;

  return (
    <div
      className={twMerge(`flex flex-col p-4 items-start gap-6 self-stretch bg-bgc-elevated rounded-2xl text-tc-primary relative ${overflowHidden && 'overflow-hidden'}`, props.className)}
      data-testid={props['data-testid']}
      onClick={props.onClick}
      ref={props.innerRef}>
      {glow && (
        <div className="w-[400px] h-20 justify-center flex items-center absolute top-[-40px] left-1/2 -translate-x-1/2 pointer-events-none">
          <div
            className="w-[400px] h-20 shrink-0 rounded-[200px]"
            style={{
              filter: 'blur(120px)',
              opacity: 0.5,
              background: `linear-gradient(to left, ${props.glowColor || '#485CEA'} 0%, ${props.glowColor || '#485CEA'} 36.46%, #282C3E 100%)`,
            }}
          />
        </div>
      )}
      {showHeader && (
        <div className="flex justify-between items-start gap-2 self-stretch relative">
          <div className="flex items-center text-h4 h-fit flex-1 min-h-[40px]">{props.title}</div>
          <div className="flex items-center space-x-4 min-h-[40px]">
            {props.dropdownOptions && props.onDropdownSelect && (
              <Dropdown
                options={props.dropdownOptions}
                selected={props.selectedDropdownValue}
                onSelect={props.onDropdownSelect}
                containerClassName="min-w-[160px]"
              />
            )}
            {props.ctas?.map((cta, index) => {
              if (cta.child) {
                return <div key={`card_child_${index}`}>{cta.child}</div>;
              } else {
                return (
                  cta.text &&
                  cta.action !== undefined && (
                    <BaseButton
                      key={'button_' + snakeCase(cta.text) + `_${index}`}
                      label={cta.text}
                      onClick={cta.action}
                      variant={cta.variant || ButtonTypes.secondary}
                      disabled={cta.disabled}
                      loading={cta.loading}
                    />
                  )
                );
              }
            })}
          </div>
        </div>
      )}
      {props.children}
    </div>
  );
}
