import { Card, Spinner } from '@coldpbc/components';
import React from 'react';
import { HexColors } from '@coldpbc/themes';
import { pluralize } from '@coldpbc/lib';
import {GlobalSizes} from "@coldpbc/enums";

interface AIProcessingDocumentsBannerProps {
  count: number;
}

export const AiProcessingDocumentsBanner: React.FC<AIProcessingDocumentsBannerProps> = ({ count }) => {
  if (count === 0) return null;

  return (
    <Card className={'w-full flex flex-row items-start justify-center border-[2px] gap-6 border-bgc-accent bg-gray-10 text-tc-primary'} glowColor={HexColors.yellow.DEFAULT}>
      <div className={'w-full flex flex-col justify-start'}>
        <span className={'text-h4'}><span role={'img'} aria-label={'Sparkles emoji'}>✨</span> Cold AI processing in progress for {pluralize('document', count)}</span>
        <span className={'text-body'}>Categorization and field population will happen automatically. Remember, you can always edit or remove an AI-generated field once it has been set.</span>
      </div>
      <div
        className={'self-center'}
      >
        <Spinner
          size={GlobalSizes.xLarge}
        />
      </div>
    </Card>
  )
};
