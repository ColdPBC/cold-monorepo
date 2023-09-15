import React from 'react';
import { CenterColumnContent } from '../../organisms/centerColumnContent/centerColumnContent';
import { RightColumnContent } from '../../organisms/rightColumnContent/rightColumnContent';
import { useAuth0 } from '@auth0/auth0-react';
import { Spinner } from '../../atoms/spinner/spinner';
import { axiosFetcher } from '@coldpbc/fetchers';
import useSWR from 'swr';
import { some } from 'lodash';
import { Card, FootprintOverviewCard, FootprintOverviewChart, FootprintOverviewVariants } from '../../molecules';
import { FootprintDetailCard } from '../../molecules/footprintDetailCard';
import { getSchemeForColor, HexColors } from '@coldpbc/themes';
import { Link } from 'react-router-dom';
import { AppContent } from '../../organisms/appContent';

const PERIOD = 2022;

export function Footprint() {
  // Get footprint data from SWR
  const { data, error, isLoading } = useSWR<any>(
    ['/categories/company_decarbonization', 'GET'],
    axiosFetcher,
  );

  const isEmptyFootprintData = !isLoading && !some(data.subcategories, (
    (subcategory: any) => some(subcategory.activities, (
        (activity: any) => activity.footprint[PERIOD]))));

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
              <Card className='gap-0'>
                <p className='text-sm leading-normal'>
                  Your footprint is a snapshot of the greenhouse gases your company emitted over a specific timeframe. It is measured in tons of carbon dioxide equivalent, expressed as tCO2e.
                </p>
                <Link to={'#'} className='underline m-0'>Don't show again.</Link>
              </Card>
              <FootprintOverviewCard chartVariant={FootprintOverviewVariants.horizontal}/>
            </>
          } 
        </CenterColumnContent>
        <RightColumnContent>
          <FootprintOverviewCard chartVariant={FootprintOverviewVariants.vertical} />
        </RightColumnContent>
      </AppContent>
    );
  }

  return null;
}
