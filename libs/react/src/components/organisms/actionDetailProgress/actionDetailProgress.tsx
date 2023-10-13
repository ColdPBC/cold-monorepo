import React from 'react';
import { ActionPayload, Assignee } from '@coldpbc/interfaces';
import { ActionDetailCardVariants } from '@coldpbc/enums';
import { ActionDetailCard } from '../../molecules/actionDetailCard/actionDetailCard';

export type ActionDetailProgressProps = {
  actionPayload: ActionPayload;
  setActionPayload: (actionPayload: ActionPayload) => void;
};
export const ActionDetailProgress = ({
  actionPayload,
  setActionPayload,
}: ActionDetailProgressProps) => {
  return (
    <ActionDetailCard
      actionPayload={actionPayload}
      setActionPayLoad={setActionPayload}
      variant={ActionDetailCardVariants.ActionDetailProgress}
    />
  );
};
