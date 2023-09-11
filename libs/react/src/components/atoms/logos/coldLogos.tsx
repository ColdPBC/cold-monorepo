import * as React from 'react';
import { ColdLogoNames } from '../../../enums/logoNames';
import { ColdClimateWordmark } from './coldClimateWordmark';
import { ColdWordmark } from './coldWordmark';

export const ColdLogos = (props: {
  name: ColdLogoNames;
  color: string;
  stroke?: string;
}) => {
  switch (props.name) {
    case ColdLogoNames.ColdClimateWordmark:
      return <ColdClimateWordmark {...props} />;
    default:
    case ColdLogoNames.ColdWordmark:
      return <ColdWordmark {...props} />;
  }
};
