import React, {PropsWithChildren} from 'react';
import { Card } from '../card/card';
import {useNavigate} from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
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
