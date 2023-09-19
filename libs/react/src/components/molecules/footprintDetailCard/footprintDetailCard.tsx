import {PropsWithChildren} from 'react';
import {Card} from '../card/card';
import {useNavigate} from 'react-router-dom';
import { FootprintDetailChart } from '../footprintDetailChart';
import { axiosFetcher } from '@coldpbc/fetchers';
import useSWR from 'swr';

export interface FootprintDetailCardProps {
  colors: string[];
  subcategory_key: string;
  period: number;
  className?: string;
}

export function FootprintDetailCard(
  props: PropsWithChildren<FootprintDetailCardProps>,
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

  const { className, ...rest } = props;

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
      className={className}
    >
      <div className="flex items-center justify-center self-stretch flex-col">
        <FootprintDetailChart {...rest} />
      </div>
    </Card>
  );
}
