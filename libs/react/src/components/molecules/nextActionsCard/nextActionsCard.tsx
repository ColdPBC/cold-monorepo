import { useAuth0 } from '@auth0/auth0-react';
import { ActionItemVariants } from '@coldpbc/enums';
import { axiosFetcher } from '@coldpbc/fetchers';
import { ActionPayload } from '@coldpbc/interfaces';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { ActionItem } from '../actionItem';
import { Card } from '../card';
import { DateTime } from 'luxon';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';
import { useOrgSWR } from '@coldpbc/hooks';

const _NextActionsCard = () => {
  const navigate = useNavigate();

  const { user } = useAuth0();

  const { data } = useOrgSWR<ActionPayload[], any>(
    [`/actions`, 'GET'],
    axiosFetcher,
  );

  return (
    <Card
      glow
      title="Your Next Actions"
      ctas={[{ text: 'Learn More', action: () => navigate('/actions') }]}
    >
      {data
        ?.filter((actionPayload) =>
          actionPayload.action.steps.some((step) => !step.complete),
        )
        .slice(0, 3)
        .sort((a, b) => {
          // sort by target date first
          let targetDateDiff: number | null = null;
          if (a.action.due_date && b.action.due_date) {
            targetDateDiff = DateTime.fromISO(a.action.due_date)
              .diff(DateTime.fromISO(b.action.due_date))
              .toMillis();
          }
          // check if both have a target date and that diff is greater than 0
          if (targetDateDiff) {
            return targetDateDiff;
          }
          // sort by updated_date, which one was more recently updated
          else {
            return DateTime.fromISO(b.updated_at)
              .diff(DateTime.fromISO(a.updated_at))
              .toMillis();
          }
        })
        .map((action) => (
          <ActionItem
            actionPayload={action}
            variant={ActionItemVariants.narrow}
          />
        ))}
    </Card>
  );
};

export const NextActionsCard = withErrorBoundary(_NextActionsCard, {
  FallbackComponent: (props) => <ErrorFallback />,
  onError: (error, info) => {
    console.error('Error occurred in NextActionsCard: ', error);
  },
});
