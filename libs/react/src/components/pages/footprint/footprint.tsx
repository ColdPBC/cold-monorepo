import React from 'react';
import { CenterColumnContent } from '../../organisms/centerColumnContent/centerColumnContent';
import { RightColumnContent } from '../../organisms/rightColumnContent/rightColumnContent';
import { useAuth0 } from '@auth0/auth0-react';
import { Spinner } from '../../atoms/spinner/spinner';
import { axiosFetcher } from '@coldpbc/fetchers';
import useSWR from 'swr';
import { some } from 'lodash';
import { FootprintOverviewCard } from '../../molecules';
import { FootprintDetailCard } from '../../molecules/footprintDetailCard';
import { getSchemeForColor, HexColors } from '@coldpbc/themes';
import { AppContent } from '../../organisms/appContent';
import { DismissableInfoCard } from '../../molecules/dismissableInfoCard';
import { EmissionsDonutChartVariants } from '../../atoms/emissionsDonutChart/emissionsDonutChart';

const PERIOD = 2022;

export function Footprint() {
  // Get footprint data from SWR
  const { data, error, isLoading } = useSWR<any>(
    ['/categories/company_decarbonization', 'GET'],
    axiosFetcher,
  );

  const isEmptyFootprintData = !isLoading && !some(data.subcategories, (
    (subcategory: any) => some(subcategory.activities, (
        (activity: any) => activity.footprint?.[PERIOD] && activity.footprint?.[PERIOD].value !== null))));

  console.log({isEmptyFootprintData, data})

  const auth0 = useAuth0();
  if (auth0.isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (auth0.user) {
    return (
      <AppContent title='Footprint'>
        <CenterColumnContent>
          {!isEmptyFootprintData ?
            <>
              <FootprintDetailCard
                colors={getSchemeForColor(HexColors.lightblue)}
                period={PERIOD}
                subcategory_key='facilities'
              />
              <FootprintDetailCard
                colors={getSchemeForColor(HexColors.teal)}
                period={PERIOD}
                subcategory_key='product'
              />
              <FootprintDetailCard
                colors={getSchemeForColor(HexColors.green)}
                period={PERIOD}
                subcategory_key='operations'
              />
              <FootprintDetailCard
                colors={getSchemeForColor(HexColors.purple)}
                period={PERIOD}
                subcategory_key='travel'
              />
            </>
            :
            <>
              <DismissableInfoCard 
                text='Your footprint is a snapshot of the greenhouse gases your company emitted over a specific timeframe. It is measured in tons of carbon dioxide equivalent, expressed as tCO2e.'
                onDismiss={() => {}}
                dismissKey='footprint-page'
              />
              <FootprintOverviewCard chartVariant={EmissionsDonutChartVariants.horizontal} headerless />
            </>
          } 
        </CenterColumnContent>
        <RightColumnContent>
          <FootprintOverviewCard chartVariant={EmissionsDonutChartVariants.vertical} />
        </RightColumnContent>
      </AppContent>
    );
  }

  return null;
}
