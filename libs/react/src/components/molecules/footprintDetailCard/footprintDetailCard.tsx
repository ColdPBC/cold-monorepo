import { PropsWithChildren, useState } from 'react';
import { Card } from '../card/card';
import { useNavigate } from 'react-router-dom';
import { FootprintDetailChart } from '../footprintDetailChart';
import { axiosFetcher } from '@coldpbc/fetchers';
import useSWR from 'swr';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';
import { useOrgSWR } from '../../../hooks/useOrgSWR';

export interface FootprintDetailCardProps {
  colors: string[];
  subcategory_key: string;
  period: number;
  className?: string;
}

function _FootprintDetailCard(
  props: PropsWithChildren<FootprintDetailCardProps>,
) {
  const ldFlags = useFlags();
  const navigate = useNavigate();
  const [isEmpty, setIsEmpty] = useState(false);

  // Get footprint data from SWR
  const { data } = useOrgSWR<any>(
    ['/categories/company_decarbonization', 'GET'],
    axiosFetcher,
  );

  if (isEmpty) {
    return null;
  }

  const subcategoryName =
    data?.subcategories[props.subcategory_key]?.subcategory_name;

  const { className, ...rest } = props;

  const getCtas = (subcategoryName: string) => {
    const ctas = [];
    if (ldFlags.showActions261) {
      ctas.push({
        text: `View ${subcategoryName} Actions`,
        action: () => {
          navigate(`/actions/${props.subcategory_key}`);
        },
      });
    }
    return ctas;
  };

  return (
    <Card
      title={subcategoryName}
      ctas={getCtas(subcategoryName)}
      className={className}
    >
      <div className="flex items-center justify-center self-stretch flex-col">
        <FootprintDetailChart {...rest} setIsEmpty={setIsEmpty} />
      </div>
    </Card>
  );
}

export const FootprintDetailCard = withErrorBoundary(_FootprintDetailCard, {
  FallbackComponent: (props) => <ErrorFallback />,
  onError: (error, info) => {
    console.error('Error occurred in FootprintDetailCard: ', error);
  },
});
