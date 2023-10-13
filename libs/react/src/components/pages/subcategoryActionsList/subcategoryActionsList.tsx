import { useParams } from 'react-router-dom';
import {
  AppContent,
  CenterColumnContent,
  RightColumnContent,
  SubcategoryActionDetailsCard,
} from '../../organisms';
import useSWR from 'swr';
import { axiosFetcher } from '@coldpbc/fetchers';
import { Card, SubcategoryJourneyPreview } from '../../molecules';
import { SubcategoryFootprintCard } from '../../molecules/subcategoryFootprintCard';
import { useAuth0, User } from '@auth0/auth0-react';
import { ActionPayload } from '@coldpbc/interfaces';
import { lowerCase } from 'lodash';

export const SubcategoryActionsList = () => {
  const { user } = useAuth0();

  const { name } = useParams();

  const { data } = useSWR<any>(['/categories', 'GET'], axiosFetcher);

  const {
    data: actions,
    error: actionsError,
    isLoading: actionsIsLoading,
  } = useSWR<ActionPayload[], any, any>(
    user?.coldclimate_claims.org_id
      ? [`/organizations/${user.coldclimate_claims.org_id}/actions`, 'GET']
      : null,
    axiosFetcher,
  );

  const {
    data: members,
    error: membersError,
    isLoading: membersIsLoading,
  } = useSWR<User[], any, any>(
    user?.coldclimate_claims.org_id
      ? [`/organizations/${user.coldclimate_claims.org_id}/members`, 'GET']
      : null,
    axiosFetcher,
  );

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

  if (actionsIsLoading || membersIsLoading) {
    return <div>Spinner</div>;
  }

  if (actionsError || membersError) {
    console.log(actionsError, membersError);
    return <div></div>;
  }

  return (
    <AppContent title={subcategoryName}>
      <CenterColumnContent>
        <Card glow>
          <div className={'text-body text-tc-primary'}>
            Your {lowerCase(subcategoryName)} footprint is made up of lorem
            ipsum dolor sit amet, consec tetur adipiscing elit usmod tempor
            incididunt ut labore et dol.
          </div>
        </Card>
        {actions
          ?.filter((actionPayload) => actionPayload.action.subcategory === name)
          .map((actionPayload) => {
            return (
              <div key={actionPayload.id}>
                <SubcategoryActionDetailsCard
                  assignees={members}
                  actionId={actionPayload.id}
                  actionPayload={actionPayload}
                />
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
