import React, { PropsWithChildren, useState } from 'react';
import { Card, CardProps } from '../card/card';
import { useNavigate } from 'react-router-dom';
import {
  FootprintOverviewChart,
  FootprintOverviewVariants,
} from '../footprintOverviewChart/footprintOverviewChart';
import useSWR from 'swr';
import clsx from 'clsx';
import { axiosFetcher } from '../../../fetchers/axiosFetcher';
import { BaseButton } from '../../atoms';
import { some } from 'lodash';

export interface FootprintOverviewCardProps {
  headerless?: boolean;
  chartVariant?: FootprintOverviewVariants;
}

const PERIOD = 2022;

export function FootprintOverviewCard(
  props: PropsWithChildren<FootprintOverviewCardProps>,
) {
  const navigate = useNavigate();

  // Get footprint data from SWR
  const { data, isLoading } = useSWR<any>(
    ['/categories/company_decarbonization', 'GET'],
    axiosFetcher,
  );

  // TODO: find out if we can include this property in the SWR response, in a transform or something
  // To do this, wrap all useSWR in custom wrappers like, useGetFootprint()
  const isEmptyFootprintData = !isLoading && !some(data.subcategories, (
    (subcategory: any) => some(subcategory.activities, (
        (activity: any) => activity.footprint[PERIOD]))));

  let cardProps: CardProps = {};
  if (!props.headerless) {
    cardProps = {
      title: (props.chartVariant === FootprintOverviewVariants.vertical && isEmptyFootprintData) ? 'Footprint Breakdown' : `${PERIOD} Company Footprint`,
      ctas: props.chartVariant === FootprintOverviewVariants.horizontal ? 
        [{ text: 'Learn More', action: () => navigate('/footprint') }]
        : [],
    };
  }

  const isSurveyComplete = false;

  if (isLoading) return null;

  return (
    <Card {...cardProps}>
      <div
        className={'flex flex-col items-start justify-center w-full'}
      >
        <FootprintOverviewChart
          variant={props.chartVariant ?? FootprintOverviewVariants.horizontal}
          period={PERIOD}
        />
        {(isEmptyFootprintData && props.chartVariant === FootprintOverviewVariants.horizontal) && (
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
              <div className="my-4 flex justify-center">
                <BaseButton
                  onClick={() => {}}
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
