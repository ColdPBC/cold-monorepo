import React from 'react';
import { ActionType } from '@coldpbc/interfaces';
import { ActionItem, Card } from '@coldpbc/components';
import { ActionItemVariants } from '@coldpbc/enums';

export interface SubcategoryActionsOverviewCardProps {
  category: string;
  actions: ActionType[];
}

export const SubcategoryActionsOverviewCard = ({
  category,
  actions,
}: SubcategoryActionsOverviewCardProps) => {
  return (
    <Card className={'w-[666px]'} glow={true}>
      <div className={'text-tc-primary space-y-[16px]'}>
        <div className={'text-h3'}>{category}</div>
        {actions.map((action) => {
          return (
            <div key={action.id}>
              <ActionItem action={action} variant={ActionItemVariants.wide} />
            </div>
          );
        })}
      </div>
    </Card>
  );
};
