import { AttributeAssuranceStatus, IconNames } from '@coldpbc/enums';
import React, { useState } from 'react';
import { ColdIcon, ErrorFallback } from '@coldpbc/components';
import { differenceInDays, format } from 'date-fns';
import { withErrorBoundary } from 'react-error-boundary';
import { Popover } from '@coldpbc/components';
import { SustainabilityAttributeWithStatus } from '@coldpbc/interfaces';

const DEFAULT_ICON_URL = 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/NoImage.png';

interface SustainabilityAttributeLogoWithStatusProps {
  sustainabilityAttribute: SustainabilityAttributeWithStatus;
}

const _SustainabilityAttributeLogoWithStatus: React.FC<SustainabilityAttributeLogoWithStatusProps> = ({ sustainabilityAttribute }) => {
	// If we don't get a logo image from the backend, we'll use the default
	const [imgSrc, setImgSrc] = useState<string>(sustainabilityAttribute.logoUrl || DEFAULT_ICON_URL);

	let iconName: IconNames;
	let iconBackgroundColor: string;
	let hoverLabelText: string;

  switch (sustainabilityAttribute.assuranceStatus) {
		case AttributeAssuranceStatus.ACTIVE:
			iconName = IconNames.ColdCheckIcon;
			iconBackgroundColor = 'bg-green-300';
			hoverLabelText = sustainabilityAttribute.expirationDate ? `Active until ${format(sustainabilityAttribute.expirationDate, 'M/d/yyyy')}` : 'Active';
      break;
		case AttributeAssuranceStatus.EXPIRING:
			iconName = IconNames.ColdExpiringIcon;
			iconBackgroundColor = 'bg-yellow-300';
			hoverLabelText = sustainabilityAttribute.expirationDate ? `Expiring in ${differenceInDays(sustainabilityAttribute.expirationDate, new Date())} days` : 'Expiring';
      break;
		case AttributeAssuranceStatus.EXPIRED:
			iconName = IconNames.ColdCalendarCloseIcon;
			iconBackgroundColor = 'bg-gray-300';
			hoverLabelText = sustainabilityAttribute.expirationDate ? `Expired on ${format(sustainabilityAttribute.expirationDate, 'M/d/yyyy')}` : 'Expired';
      break;
		case AttributeAssuranceStatus.MISSING_DATE:
      iconName = IconNames.ColdUnknownIcon;
      iconBackgroundColor = 'bg-gray-300';
      hoverLabelText = 'Missing expiration date';
      break;
		case AttributeAssuranceStatus.NOT_DOCUMENTED:
			iconName = IconNames.ColdDangerIcon;
			iconBackgroundColor = 'bg-gray-300';
			hoverLabelText = 'Missing documents';
      break;
    default:
      throw new Error('Unknown AttributeAssuranceStatus');
	}

  const popoverText = (
		<div className="flex flex-col">
			<span className="font-bold">{sustainabilityAttribute.name}</span>
			<span>{hoverLabelText}</span>
		</div>
	);

	return (
		<Popover content={popoverText}>
			<div className="w-[40px] h-[40px] relative inline-block">
				<img className="w-[40px] h-[40px] object-cover rounded-lg" src={imgSrc} alt={`Logo for ${sustainabilityAttribute.name}`} onError={() => setImgSrc(DEFAULT_ICON_URL)} />
				<div className="absolute -top-1 -right-1 w-[17px] h-[17px]">
					<div className={`absolute inset-0 ${iconBackgroundColor} rounded-full`}></div>
					<div className="absolute inset-0 flex items-center justify-center">
						<ColdIcon name={iconName} color="black" className={iconName === IconNames.ColdExpiringIcon ? 'w-[12px] h-[12x]' : 'w-full h-full'} />
					</div>
				</div>
			</div>
		</Popover>
	);
};

export const SustainabilityAttributeLogoWithStatus = withErrorBoundary(_SustainabilityAttributeLogoWithStatus, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, _info) => {
		console.error('Error occurred in SustainabilityAttributeLogoWithStatus: ', error);
	},
});
