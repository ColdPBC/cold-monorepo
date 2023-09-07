import React, {PropsWithChildren} from 'react';
import { Card } from '../card/card';
import {useNavigate} from 'react-router-dom';
import { JourneySpiderChart } from '../journeySpiderChart/journeySpiderChart';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface JourneyOverviewCardProps {

}

export function JourneyOverviewCard(props: PropsWithChildren<JourneyOverviewCardProps>) {
    const navigate = useNavigate();
    return (
        <Card title="Climate Journey" ctas={[{text: "Learn More", action:() => {navigate('/journey');}}]}>
            <div className="flex items-center justify-center self-stretch">
                <JourneySpiderChart />
            </div>
        </Card>
    );
}
