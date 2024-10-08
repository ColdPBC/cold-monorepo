import React, { useState } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';

export interface SustainabilityAttribute {
  name: string;
  logoUrl?: string;
  level: 'MATERIAL' | 'ORGANIZATION' | 'PRODUCT' | 'SUPPLIER';
  attributeAssurances: { id: string }[];
  id: string;
}

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
		<div className="w-full h-auto p-4 rounded-2xl border border-[#656b99] justify-start items-start gap-4 inline-flex">
			<div className="w-24 h-24 flex-shrink-0 rounded-lg justify-start items-center gap-2.5 flex">
				<img className="w-full h-full object-cover rounded-lg" src={imgSrc} alt={`Logo for ${sustainabilityAttribute.name}`} onError={() => setImgSrc(DEFAULT_ICON_URL)} />
			</div>
			<div className="grow shrink basis-0 self-stretch flex-col justify-between items-start inline-flex">
				<div className="self-stretch text-white text-l font-bold font-['Inter']">{sustainabilityAttribute.name}</div>
				<div className="self-stretch justify-start items-end gap-2 inline-flex">
					<div
						className={`
              text-sm font-bold font-['Inter'] leading-[21px]
              ${(sustainabilityAttribute.attributeAssurances?.length || 0) > 0 ? 'text-tc-primary' : 'text-tc-disabled'}
            `}
          >
						{pluralize(sustainabilityAttribute.level, sustainabilityAttribute.attributeAssurances?.length || 0)}
					</div>
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
