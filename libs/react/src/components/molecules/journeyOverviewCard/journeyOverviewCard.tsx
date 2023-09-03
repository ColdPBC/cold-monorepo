import React, {PropsWithChildren} from 'react';
import {Card} from '@coldpbc/components';
import {useNavigate} from 'react-router-dom';
import {JourneySpiderChart} from '@coldpbc/components';

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
