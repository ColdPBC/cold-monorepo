import React, { useEffect } from 'react';
import { Action, ActionPayload, Assignee, Step } from '@coldpbc/interfaces';
import {
  ActionDetailCard,
  ActionItem,
  BaseButton,
  Card,
  ColdIcon,
  ColdLogos,
  Spinner,
  StepDetails,
} from '@coldpbc/components';
import { useNavigate } from 'react-router-dom';
import { ActionDetailCardVariants, ActionItemVariants } from '@coldpbc/enums';
import { useAuth0, User } from '@auth0/auth0-react';
import useSWR from 'swr';
import { axiosFetcher } from '@coldpbc/fetchers';

export type SubcategoryActionDetailsCardProps = {
  actionId: string;
  actionPayload: ActionPayload;
};
export const SubcategoryActionDetailsCard = ({
  actionId,
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

  if (!actionData) {
    return (
      <div>
        <Spinner />
      </div>
    );
  } else {
    return (
      <Card
        glow
        className={
          'text-tc-primary gap-[8px] p-[16px] bg-bgc-elevated w-[668px]'
        }
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
  }
};
