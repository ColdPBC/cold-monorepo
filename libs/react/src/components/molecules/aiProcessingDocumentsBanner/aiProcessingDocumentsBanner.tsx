import { Card } from '@coldpbc/components';
import React from 'react';
import { HexColors } from '@coldpbc/themes';
import { pluralize } from '@coldpbc/lib';

interface AIProcessingDocumentsBannerProps {
  count: number;
}

export const AiProcessingDocumentsBanner: React.FC<AIProcessingDocumentsBannerProps> = ({ count }) => {
  if (count === 0) return null;

  return (
    <Card className={'w-full flex items-start border-[2px] border-bgc-accent bg-gray-10 text-tc-primary'} glowColor={HexColors.yellow.DEFAULT}>
      <div className={'w-full flex flex-col justify-start'}>
        <span className={'text-h4'}><span role={'img'} aria-label={'Sparkles emoji'}>✨</span> Cold AI processing in progress for {pluralize('document', count)}</span>
        <span className={'text-body'}>Categorization and fi eld population will happen automatically. Remember, you can always edit or remove an AI-generated field once it has been set.</span>
      </div>
    </Card>
  )
};
