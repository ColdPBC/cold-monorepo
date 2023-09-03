import * as React from "react";
import {ColdLogoNames} from '@coldpbc/components';
import {ColdClimateWordmark} from '@coldpbc/components';
import {ColdWordmark} from '@coldpbc/components';

export const ColdLogos = (props: { name: ColdLogoNames, color: string, stroke?: string }) => {
    switch(props.name){
        case ColdLogoNames.ColdClimateWordmark:
            return <ColdClimateWordmark {...props} />;
        default:
        case ColdLogoNames.ColdWordmark:
            return <ColdWordmark {...props} />;
    }
};
