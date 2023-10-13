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
};
export const SubcategoryActionDetailsCard = ({
  actionId,
}: SubcategoryActionDetailsCardProps) => {
  const [actionData, setActionData] = React.useState<ActionPayload>();

  const areSurveysComplete = (action: Action) => {
    return action.dependent_surveys.every((survey) => survey.submitted);
  };

  const { user } = useAuth0();

  const { data, error, isLoading } = useSWR<ActionPayload, any, any>(
    user && user.coldclimate_claims.org_id
      ? [
          `/organizations/${user.coldclimate_claims.org_id}/actions/${actionId}`,
          'GET',
        ]
      : null,
    axiosFetcher,
  );

  const members = useSWR<User[], any, any>(['/members', 'GET'], axiosFetcher);

  useEffect(() => {
    if (data) {
      setActionData(data);
    }
  }, [data]);

  if (isLoading || members.isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (error || members.error) {
    console.error(error);
    return <div></div>;
  }

  if (!actionData || !members.data) {
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
          setActionPayLoad={setActionData}
          variant={ActionDetailCardVariants.SubcategoryActionDetailsCard}
        />
      </Card>
    );
  }
};
