import { useParams } from 'react-router-dom';
import {
  AppContent,
  CenterColumnContent,
  RightColumnContent,
} from '../../organisms';
import useSWR from 'swr';
import { axiosFetcher } from '@coldpbc/fetchers';
import { SubcategoryJourneyPreview } from '../../molecules';
import { SubcategoryFootprintCard } from '../../molecules/subcategoryFootprintCard';

export const SubcategoryActionsList = () => {
  const { name } = useParams();
  const { data } = useSWR<any>(['/categories', 'GET'], axiosFetcher);

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

  return (
    <AppContent title={subcategoryName}>
      <CenterColumnContent></CenterColumnContent>
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
