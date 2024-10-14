import { AttributeAssuranceStatus, IconNames } from '@coldpbc/enums';
import React, { useState } from 'react';
import { ColdIcon, ErrorFallback } from '@coldpbc/components';
import { differenceInDays, format } from 'date-fns';
import { withErrorBoundary } from 'react-error-boundary';
import { Popover } from '@coldpbc/components';

const DEFAULT_ICON_URL = 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/NoImage.png';

interface SustainabilityAttributeLogoWithStatusProps {
  name: string,
  logoUrl?: string,
  assuranceStatus: AttributeAssuranceStatus,
  assuranceExpiration?: Date,
}

const _SustainabilityAttributeLogoWithStatus: React.FC<SustainabilityAttributeLogoWithStatusProps> = ({ name, logoUrl, assuranceStatus, assuranceExpiration }) => {
	// If we don't get a logo image from the backend, we'll use the default
	const [imgSrc, setImgSrc] = useState<string>(logoUrl || DEFAULT_ICON_URL);

	let iconName: IconNames;
	let iconBackgroundColor: string;
	let hoverLabelText: string;

	if (assuranceStatus === AttributeAssuranceStatus.ACTIVE) {
		iconName = IconNames.ColdCheckIcon;
		iconBackgroundColor = 'bg-green-300';
    hoverLabelText = assuranceExpiration
      ? `Active until ${format(assuranceExpiration, 'M/d/yyyy')}`
      : 'Active';
  } else if (assuranceStatus === AttributeAssuranceStatus.EXPIRING) {
		iconName = IconNames.ColdExpiringIcon;
		iconBackgroundColor = 'bg-yellow-300';
    hoverLabelText = assuranceExpiration
      ? `Expiring in ${differenceInDays(assuranceExpiration, new Date())} days`
      : 'Expiring';
	} else if (assuranceStatus === AttributeAssuranceStatus.EXPIRED) {
		iconName = IconNames.ColdCalendarDaysIcon; // TODO: Replace with new calendar icon
		iconBackgroundColor = 'bg-gray-300';
    hoverLabelText = assuranceExpiration
      ? `Expired on ${format(assuranceExpiration, 'M/d/yyyy')}`
      : 'Expired';
	} else {
		iconName = IconNames.ColdDangerIcon;
		iconBackgroundColor = 'bg-gray-300';
		hoverLabelText = 'Missing documents';
	}

  const popoverText = (
		<div className="flex flex-col">
			<span className="font-bold">{name}</span>
			<span>{hoverLabelText}</span>
		</div>
	);

	return (
		<Popover content={popoverText}>
			<div className="relative inline-block">
				<img className="w-[82px] h-[82px] object-cover rounded-lg" src={imgSrc} alt={`Logo for ${name}`} onError={() => setImgSrc(DEFAULT_ICON_URL)} />
				<div className="absolute -top-1 -right-1 w-[17px] h-[17px]">
					<div className={`absolute inset-0 ${iconBackgroundColor} rounded-full`}></div>
					<div className="absolute inset-0 flex items-center justify-center">
						<ColdIcon name={iconName} color="black" className={iconName === IconNames.ColdExpiringIcon ? 'w-[13px] h-[13px]' : 'w-full h-full'} />
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
