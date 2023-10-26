import { useParams, useSearchParams } from 'react-router-dom';
import {
  AppContent,
  CenterColumnContent,
  RightColumnContent,
  SubcategoryActionDetailsCard,
  SubcategoryFootprintCard,
} from '@coldpbc/components';
import useSWR, { mutate } from 'swr';
import { axiosFetcher } from '@coldpbc/fetchers';
import { Card, SubcategoryJourneyPreview } from '../../molecules';
import { useAuth0, User } from '@auth0/auth0-react';
import { ActionPayload } from '@coldpbc/interfaces';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application/errors/errorFallback';
import { useEffect } from 'react';

const _SubcategoryActionsList = () => {
  const { user } = useAuth0();

  const [searchParams, setSearchParams] = useSearchParams();

  const { name } = useParams();

  const { data } = useSWR<any>(['/categories', 'GET'], axiosFetcher);

  const {
    data: actions,
    error: actionsError,
    isLoading: actionsIsLoading,
    mutate,
  } = useSWR<ActionPayload[], any, any>(
    user?.coldclimate_claims.org_id
      ? [`/organizations/${user.coldclimate_claims.org_id}/actions`, 'GET']
      : null,
    axiosFetcher,
  );

  actions?.sort((a, b) => {
    return a.id.localeCompare(b.id);
  });

  useEffect(() => {
    const reloadActions = async () => {
      await mutate();
    };
    reloadActions();
  }, [searchParams]);

  if (!name) return null;

  const category = Object.keys(data?.definition?.categories ?? {}).find(
    (category: any) =>
      data?.definition?.categories[category].subcategories[name],
  );

  if (!category) return null;

  const subcategoryData =
    data?.definition?.categories[category]?.subcategories[name];

  if (!subcategoryData) {
    return null;
  }

  const subcategoryName = subcategoryData.subcategory_name;

  if (actionsIsLoading) {
    return <div>Spinner</div>;
  }

  if (actionsError) {
    console.log(actionsError);
    return <div></div>;
  }

  return (
    <AppContent title={subcategoryName}>
      <CenterColumnContent>
        {subcategoryData?.subcategory_description && (
          <Card glow>
            <div className={'text-body text-tc-primary'}>
              {subcategoryData?.subcategory_description}
            </div>
          </Card>
        )}
        {actions
          ?.filter((actionPayload) => actionPayload.action.subcategory === name)
          .map((actionPayload) => {
            return (
              <div key={actionPayload.id}>
                <SubcategoryActionDetailsCard actionPayload={actionPayload} />
              </div>
            );
          })}
      </CenterColumnContent>
      <RightColumnContent>
        <SubcategoryJourneyPreview
          category_key={category}
          subcategory_key={name}
          cardTitle={`${subcategoryName} Score`}
          to="/journey"
          containerClassName="border-0 w-full rounded-2xl"
          glow
        />
        {category === 'company_decarbonization' && (
          <SubcategoryFootprintCard period={2022} subcategory_key={name} />
        )}
      </RightColumnContent>
    </AppContent>
  );
};

export const SubcategoryActionsList = withErrorBoundary(
  _SubcategoryActionsList,
  {
    FallbackComponent: (props) => <ErrorFallback {...props} />,
    onError: (error, info) => {
      console.error('Error occurred in SubcategoryActionsList: ', error);
    },
  },
);
