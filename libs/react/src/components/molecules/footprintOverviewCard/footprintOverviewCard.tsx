import React, {PropsWithChildren, useState} from 'react';
import { Card, CardProps } from '../card/card';
import {useNavigate} from 'react-router-dom';
import {FootprintOverviewChart, FootprintOverviewVariants} from "../footprintOverviewChart/footprintOverviewChart";
import useSWR from 'swr';
import clsx from 'clsx';
import {axiosFetcher} from '../../../fetchers/axiosFetcher';
import { BaseButton } from '../../atoms';

export interface FootprintOverviewCardProps {
    headerless?: boolean;
    chartVariant?: FootprintOverviewVariants;
}

const PERIOD = 2022;

export function FootprintOverviewCard(props: PropsWithChildren<FootprintOverviewCardProps>) {
    const navigate = useNavigate();
    const [isEmptyData, setIsEmptyData] = useState(false);
    let cardProps: CardProps = {};

    // Get footprint data from SWR
    const {data, error, isLoading} = useSWR<any>(
        ["/categories/company_decarbonization", "GET"],
    axiosFetcher);

    if (!props.headerless) {
        cardProps = {
            title: `${PERIOD} Company Footprint`,
            ctas: [{text: "Learn More", action:() => navigate('/footprint')}]
        }
    }

    const isSurveyComplete = false;

    return (
        <Card {...cardProps}>
            <div className={clsx('flex flex-col items-start justify-center w-full', {'-mt-8': props.chartVariant === FootprintOverviewVariants.vertical})}>
                <FootprintOverviewChart variant={props.chartVariant ?? FootprintOverviewVariants.horizontal} period={PERIOD} setIsEmptyData={setIsEmptyData} />
                {isEmptyData &&
                    <div className='m-auto -mt-6 table w-1'>
                        <h4 className='text-h4 text-center whitespace-nowrap'>{isSurveyComplete ? 'We are reviewing your data' : 'We need more data to show your footprint'}</h4>
                        <p className='text-center mt-4'>{isSurveyComplete ? 'We\'ll be in touch as soon as your initial footprint results are available.' : 'Please fill out the Footprint Overview survey using the link below to calculate your initial footprint.'}</p>
                        {!isSurveyComplete &&
                            <div className='mt-4 mb-8 flex justify-center'>
                                <BaseButton
                                    onClick={() => {}}
                                    label={"Initial Footprint Survey"}
                                />
                            </div>

                        }
                    </div>
                }
            </div>
        </Card>
    );
}
