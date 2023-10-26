import React, { PropsWithChildren, useState } from 'react';
import { Card, CardProps } from '../card/card';
import { useNavigate } from 'react-router-dom';
import { FootprintOverviewChart } from '../footprintOverviewChart/footprintOverviewChart';
import useSWR from 'swr';
import clsx from 'clsx';
import { axiosFetcher } from '../../../fetchers/axiosFetcher';
import { BaseButton } from '../../atoms';
import { some } from 'lodash';
import { SurveyPayloadType } from '@coldpbc/interfaces';
import { EmissionsDonutChartVariants } from '../../atoms/emissionsDonutChart/emissionsDonutChart';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application/errors/errorFallback';

export interface FootprintOverviewCardProps {
  headerless?: boolean;
  chartVariant?: EmissionsDonutChartVariants;
}

const PERIOD = 2022;

function _FootprintOverviewCard(
  props: PropsWithChildren<FootprintOverviewCardProps>,
) {
  const navigate = useNavigate();

  // Get footprint data from SWR
  const { data, isLoading } = useSWR<any>(
    ['/categories/company_decarbonization', 'GET'],
    axiosFetcher,
  );

  const surveyResponse = useSWR<SurveyPayloadType, any, any>(
    [`/surveys/footprint_overview`, 'GET'],
    axiosFetcher,
  );

  // TODO: find out if we can include this property in the SWR response, in a transform or something
  // To do this, wrap all useSWR in custom wrappers like, useGetFootprint()
  const isEmptyFootprintData =
    !isLoading &&
    !some(data.subcategories, (subcategory: any) =>
      some(
        subcategory.activities,
        (activity: any) =>
          activity.footprint && activity.footprint?.[PERIOD]?.value !== null,
      ),
    );

  let cardProps: CardProps = {};
  if (!props.headerless) {
    cardProps = {
      title:
        props.chartVariant === EmissionsDonutChartVariants.vertical &&
        isEmptyFootprintData
          ? 'Footprint Breakdown'
          : `${PERIOD} Company Footprint`,
      ctas:
        props.chartVariant === EmissionsDonutChartVariants.horizontal
          ? [{ text: 'Learn More', action: () => navigate('/footprint') }]
          : [],
    };
  }

  const isSurveyComplete = !!surveyResponse.data?.definition?.submitted;

  if (isLoading) return null;

  return (
    <Card {...cardProps}>
      <div className={'flex flex-col items-start justify-center w-full'}>
        <FootprintOverviewChart
          variant={props.chartVariant ?? EmissionsDonutChartVariants.horizontal}
          period={PERIOD}
        />
        {isEmptyFootprintData &&
          props.chartVariant === EmissionsDonutChartVariants.horizontal && (
            <div className="m-auto table w-1">
              <h4 className="text-h4 text-center whitespace-nowrap m-4">
                {isSurveyComplete
                  ? 'We are reviewing your data'
                  : 'We need more data to show your footprint'}
              </h4>
              <p className="text-center text-sm leading-normal">
                {isSurveyComplete
                  ? "We'll be in touch as soon as your initial footprint results are available."
                  : 'Please fill out the Footprint Overview survey using the link below to calculate your initial footprint.'}
              </p>
              {!isSurveyComplete && (
                <div className="mt-4 flex justify-center">
                  <BaseButton
                    onClick={() => {
                      navigate('?surveyName=footprint_overview');
                    }}
                    label={'Initial Footprint Survey'}
                  />
                </div>
              )}
            </div>
          )}
      </div>
    </Card>
  );
}

export const FootprintOverviewCard = withErrorBoundary(_FootprintOverviewCard, {
  FallbackComponent: (props) => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in FootprintOverviewCard: ', error);
  },
});
