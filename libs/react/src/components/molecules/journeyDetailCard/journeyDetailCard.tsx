import {PropsWithChildren} from 'react';
import {Card} from '../card/card';
import {useNavigate} from 'react-router-dom';
import { JourneyDetailChart } from '../journeyDetailChart';
import { axiosFetcher } from '@coldpbc/fetchers';
import useSWR from 'swr';

export interface JourneyDetailCardProps {
  colors: string[];
  subcategory_key: string;
  period: number;
}

export function JourneyDetailCard(
  props: PropsWithChildren<JourneyDetailCardProps>,
) {
  const navigate = useNavigate();

  // Get footprint data from SWR
  const { data } = useSWR<any>(
    ['/categories/company_decarbonization', 'GET'],
    axiosFetcher,
  );

    if (!data?.subcategories[props.subcategory_key]) {
      return null;
    }

  const subcategoryName = data?.subcategories[props.subcategory_key].subcategory_name;

  return (
    <Card
      title={subcategoryName}
      ctas={[
        {
          text: `View ${subcategoryName} Actions`,
          action: () => {
            navigate(`/actions/${props.subcategory_key}`);
          },
        },
      ]}
    >
      <div className="flex items-center justify-center self-stretch flex-col">
        <JourneyDetailChart {...props} />
      </div>
    </Card>
  );
}
