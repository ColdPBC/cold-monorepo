import React, {PropsWithChildren} from 'react';
import { Card } from '../card/card';
import {useNavigate} from 'react-router-dom';
import {FootprintOverviewChart, FootprintOverviewVariants} from "../footprintOverviewChart/footprintOverviewChart";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FootprintOverviewCardProps {

}

export function FootprintOverviewCard(props: PropsWithChildren<FootprintOverviewCardProps>) {
    const navigate = useNavigate();
    return (
        <Card title="Company Footprint" ctas={[{text: "Learn More", action:() => {navigate('/footprint');}}]}>
          <FootprintOverviewChart variant={FootprintOverviewVariants.horizontal} period={2022} />
        </Card>
    );
}
