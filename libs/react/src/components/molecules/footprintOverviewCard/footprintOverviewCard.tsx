import React, {PropsWithChildren} from 'react';
import {Card} from '@coldpbc/components';
import {useNavigate} from 'react-router-dom';

export interface FootprintOverviewCardProps {

}

export function FootprintOverviewCard(props: PropsWithChildren<FootprintOverviewCardProps>) {
    const navigate = useNavigate();
    return (
        <Card title="Company Footprint" ctas={[{text: "Learn More", action:() => {navigate('/footprint');}}]}>
            <div>Content will go here</div>
        </Card>
    );
}
