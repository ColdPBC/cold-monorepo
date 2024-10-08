import React, { useState } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';
import { SustainabilityAttribute } from '../../../../../../apps/cold-graphql/src/types.generated';

interface SustainabilityAttributeCardProps {
  sustainabilityAttribute: SustainabilityAttribute;
}

const DEFAULT_ICON_URL = 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/NoImage.png';

function toSentenceCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function pluralize(word: string, count: number) {
  const sentenceCaseWord = toSentenceCase(word);
  return `${count} ${sentenceCaseWord}${count !== 1 ? 's' : ''}`;
}

const _SustainabilityAttributeCard: React.FC<SustainabilityAttributeCardProps> = ({ sustainabilityAttribute }) => {
  // If we don't get a logo image from the backend, we'll use the default
  const [imgSrc, setImgSrc] = useState<string>(sustainabilityAttribute.logoUrl || DEFAULT_ICON_URL);

  return (
    <div className="w-[582px] h-[136px] p-4 rounded-2xl border border-[#656b99] justify-start items-start gap-4 inline-flex">
      <div className="w-[104px] h-[104px] rounded-lg justify-start items-center gap-2.5 flex">
        <img className="w-[104px] h-[104px]" src={imgSrc} alt={`Logo for ${sustainabilityAttribute.name}`} onError={() => setImgSrc(DEFAULT_ICON_URL)} />
      </div>
      <div className="grow shrink basis-0 self-stretch flex-col justify-between items-start inline-flex">
        <div className="self-stretch text-white text-xl font-bold font-['Inter'] leading-[30px]">{sustainabilityAttribute.name}</div>
        <div className="self-stretch justify-start items-end gap-2 inline-flex">
          <div className="text-[#a3a6c2] text-sm font-bold font-['Inter'] leading-[21px]">{pluralize(sustainabilityAttribute.level, sustainabilityAttribute.attributeAssurances_aggregate?.count || 0)}</div>
        </div>
      </div>
    </div>
  );
};

export const SustainabilityAttributeCard = withErrorBoundary(_SustainabilityAttributeCard, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in SustainabilityAttributeCard: ', error);
  },
});
