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
  }>;
  className?: string;
  'data-testid'?: string;
  onClick?: () => void;
  glowColor?: string;
  innerRef?: React.Ref<HTMLDivElement>;
  dropdownOptions?: Array<{ value: string; label: string }>;
  selectedDropdownValue?: string;
  onDropdownSelect?: (value: string) => void;
}

export function Card(props: PropsWithChildren<CardProps>) {
  const showHeader = props.title || props.ctas || props.dropdownOptions;
  const glow = props.glow !== undefined ? props.glow : true;

  return (
    <div
      className={twMerge('flex flex-col p-4 items-start gap-6 self-stretch bg-bgc-elevated rounded-2xl text-tc-primary relative overflow-hidden', props.className)}
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
        <div className="flex justify-end items-start gap-2 self-stretch min-h-[40px] h-fit">
          {props.title && <div className="text-h4 flex-1">{props.title}</div>}
          <div className="flex items-center space-x-4">
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
