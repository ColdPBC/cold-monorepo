import React from 'react';
import { Action, ActionPayload } from '@coldpbc/interfaces';
import {
  ActionDetailCard,
  ActionItem,
  Card,
  Spinner,
} from '@coldpbc/components';
import { ActionDetailCardVariants, ActionItemVariants } from '@coldpbc/enums';
import { useAuth0, User } from '@auth0/auth0-react';
import { axiosFetcher } from '@coldpbc/fetchers';

export type SubcategoryActionDetailsCardProps = {
  actionPayload: ActionPayload;
};
export const SubcategoryActionDetailsCard = ({
  actionPayload,
}: SubcategoryActionDetailsCardProps) => {
  const [actionData, setActionData] =
    React.useState<ActionPayload>(actionPayload);

  const areSurveysComplete = (action: Action) => {
    return action.dependent_surveys.every((survey) => survey.submitted);
  };

  const { user } = useAuth0();

  const updateActionData = async (action: ActionPayload) => {
    setActionData(action);
    await patchAction(action);
  };

  const patchAction = async (action: ActionPayload) => {
    await axiosFetcher([
      `/organizations/${user?.coldclimate_claims.org_id}/actions/${action.id}`,
      'PATCH',
      JSON.stringify(action),
    ]);
  };

  return (
    <Card
      glow
      className={'text-tc-primary gap-[8px] p-[16px] bg-bgc-elevated w-[668px]'}
    >
      <ActionItem
        actionPayload={actionData}
        variant={ActionItemVariants.SubcategoryActionDetailsCard}
        showProgress={
          actionData.action.ready_to_execute &&
          areSurveysComplete(actionData.action)
        }
      />
      <ActionDetailCard
        actionPayload={actionData}
        setActionPayLoad={(actionPayload: ActionPayload) => {
          updateActionData(actionPayload);
        }}
        variant={ActionDetailCardVariants.SubcategoryActionDetailsCard}
      />
    </Card>
  );
};
