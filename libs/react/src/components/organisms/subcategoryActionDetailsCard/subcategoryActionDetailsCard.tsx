import React, { useEffect } from 'react';
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
import { mutate } from 'swr';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';

export type SubcategoryActionDetailsCardProps = {
  actionPayload: ActionPayload;
};

const _SubcategoryActionDetailsCard = ({
  actionPayload,
}: SubcategoryActionDetailsCardProps) => {
  const areSurveysComplete = (action: Action) => {
    return action.dependent_surveys.every((survey) => survey.submitted);
  };

  const { user } = useAuth0();

  const updateActionData = async (action: ActionPayload) => {
    await patchAction(action);
  };

  const patchAction = async (action: ActionPayload) => {
    await axiosFetcher([
      `/organizations/${user?.coldclimate_claims.org_id}/actions/${action.id}`,
      'PATCH',
      JSON.stringify({
        action: action.action,
      }),
    ]);
    await mutate([
      `/organizations/${user?.coldclimate_claims.org_id}/actions`,
      'GET',
    ]);
  };

  return (
    <Card
      glow
      className={'text-tc-primary gap-[8px] p-[16px] bg-bgc-elevated w-[668px]'}
    >
      <ActionItem
        actionPayload={actionPayload}
        variant={ActionItemVariants.SubcategoryActionDetailsCard}
        showProgress={
          actionPayload.action.ready_to_execute &&
          areSurveysComplete(actionPayload.action)
        }
      />
      <ActionDetailCard
        actionPayload={actionPayload}
        setActionPayLoad={(actionPayload: ActionPayload) => {
          updateActionData(actionPayload);
        }}
        variant={ActionDetailCardVariants.SubcategoryActionDetailsCard}
      />
    </Card>
  );
};

export const SubcategoryActionDetailsCard = withErrorBoundary(
  _SubcategoryActionDetailsCard,
  {
    FallbackComponent: (props) => <ErrorFallback {...props} />,
    onError: (error, info) => {
      console.error('Error occurred in SubcategoryActionDetailsCard: ', error);
    },
  },
);
