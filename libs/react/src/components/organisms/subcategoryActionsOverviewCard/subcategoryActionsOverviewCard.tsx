import { ActionPayload } from '@coldpbc/interfaces';
import { ActionItem, Card } from '@coldpbc/components';
import { ActionItemVariants } from '@coldpbc/enums';
import { useAuth0 } from '@auth0/auth0-react';
import { axiosFetcher } from '@coldpbc/fetchers';
import useSWR from 'swr';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application/errors/errorFallback';

export interface SubcategoryActionsOverviewCardProps {
  subcategory_key: string;
  category_key: string;
}

const _SubcategoryActionsOverviewCard = ({
  subcategory_key,
  category_key,
}: SubcategoryActionsOverviewCardProps) => {
  const { user } = useAuth0();

  const { data } = useSWR<ActionPayload[], any, any>(
    [`/organizations/${user?.coldclimate_claims.org_id}/actions`, 'GET'],
    axiosFetcher,
  );

  const { data: categoryData } = useSWR<any>(
    ['/categories', 'GET'],
    axiosFetcher,
  );

  const subcategoryName =
    categoryData?.definition.categories[category_key].subcategories[
      subcategory_key
    ]?.subcategory_name;

  const actions =
    data?.filter(
      (actionPayload) => actionPayload.action.subcategory === subcategory_key,
    ) ?? [];

  if (!actions.length) {
    return null;
  }

  return (
    <Card className={'w-[666px]'} glow={true}>
      <div className={'text-tc-primary space-y-[16px]'}>
        <div className={'text-h3'}>{subcategoryName}</div>
        {actions.map((action) => {
          return (
            <div key={action.id}>
              <ActionItem
                actionPayload={action}
                variant={ActionItemVariants.wide}
              />
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export const SubcategoryActionsOverviewCard = withErrorBoundary(
  _SubcategoryActionsOverviewCard,
  {
    FallbackComponent: ErrorFallback,
    onError: (error, info) => {
      console.error(
        'Error occurred in SubcategoryActionsOverviewCard: ',
        error,
      );
    },
  },
);
