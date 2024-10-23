import * as React from 'react';
import { ColdLogoNames } from '../../../enums/logoNames';
import { ColdClimateWordmark } from './coldClimateWordmark';
import { ColdWordmark } from './coldWordmark';
import { ColdSymbol } from './coldSymbol';

export interface ColdLogosProps extends React.SVGProps<SVGSVGElement> {
	name: ColdLogoNames;
	color: string;
	stroke?: string;
}

export const ColdLogos = (props: ColdLogosProps) => {
	switch (props.name) {
		case ColdLogoNames.ColdClimateWordmark:
			return <ColdClimateWordmark {...props} />;
		case ColdLogoNames.ColdSymbol:
			return <ColdSymbol {...props} />;
		default:
		case ColdLogoNames.ColdWordmark:
			return <ColdWordmark {...props} />;
	}
};
