import React, { PropsWithChildren } from 'react';
import { BaseButton } from '../../atoms/button/button';
import { ButtonTypes } from '../../../enums/buttons';
import { twMerge } from 'tailwind-merge';

export interface CardProps {
  glow?: boolean;
  title?: string;
  ctas?: Array<{
    text: string;
    action: () => void;
    variant?: ButtonTypes;
  }>;
  className?: string;
}

export function Card(props: PropsWithChildren<CardProps>) {
  const showHeader = props.title || props.ctas;
  const glow = props.glow !== undefined ? props.glow : true; // default glow to true

  return (
    <div className={twMerge("flex flex-col p-4 items-start gap-6 self-stretch bg-bgc-elevated rounded-2xl text-tc-primary relative overflow-hidden", props.className)}>
      {glow && (
        <div className="w-[400px] h-20 justify-center flex items-center absolute top-[-40px] left-1/2 -translate-x-1/2 pointer-events-none">
          <div className="w-[400px] h-20 shrink-0 rounded-[200px] opacity-50 blur-[120px] bg-gradient-to-l from-primary via-primary via-[36.46%] to-bgc-accent" />
        </div>
      )}
      {showHeader && (
        <div className="flex justify-end items-center gap-2 self-stretch">
          {
            // show title if we have one
            props.title && <div className="text-h4 flex-1">{props.title}</div>
          }
          {
            // show CTAs if we have at least one
            props.ctas?.map((cta) => {
              return (
                cta.text &&
                cta.action !== undefined && (
                  <BaseButton
                    label={cta.text}
                    onClick={cta.action}
                    variant={cta.variant || ButtonTypes.secondary}
                  />
                )
              );
            })
          }
        </div>
      )}
      {props.children}
    </div>
  );
}
