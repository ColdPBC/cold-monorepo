import React, {PropsWithChildren, useState} from 'react';
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
  const [isEmptyData, setIsEmptyData] = useState(false);

  // Get footprint data from SWR
  const { data, error, isLoading } = useSWR<any>(
    ['/categories/company_decarbonization', 'GET'],
    axiosFetcher,
  );

  return (
    <Card
      title={data?.subcategories[props.subcategory_key].subcategory_name}
      ctas={[
        {
          text: 'Learn More',
          action: () => {
            navigate('/journey');
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
