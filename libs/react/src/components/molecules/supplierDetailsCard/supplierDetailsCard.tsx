import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';
import { SupplierGraphQL } from '@coldpbc/interfaces';
import { Card, DetailsItem } from '@coldpbc/components';

interface SupplierDetailsCardProps {
	supplier: SupplierGraphQL;
}

// Unfortunately all these values are nullable or can be empty
// This function is going to do the best it can but could return
// awkward values like "55401, USA" (postalCode, country)
const formatAddress = (
	addressLine1: string | null,
	addressLine2: string | null,
	city: string | null,
	stateProvince: string | null,
  postalCode: string | null,
	country: string | null,
) => {
	// connect these elements, if available, by ', '
	const addressCore = [addressLine1, addressLine2, city, stateProvince].filter(val => !!val).join(', ');

	// add postal code, if available without comma
	const addressWithZip = [addressCore, postalCode].filter(val => !!val).join(' ');

	// add the country, if available with a comma again
	return [addressWithZip, country].filter(val => !!val).join(', ');
};

const _SupplierDetailsCard: React.FC<SupplierDetailsCardProps> = ({ supplier }) => {
	const address = formatAddress(supplier.addressLine1, supplier.addressLine2, supplier.city, supplier.stateProvince, supplier.postalCode, supplier.country);

	return (
		<Card title={'Details'} className={'w-[406px] min-w-[406px] h-fit'} data-testid={'supplier-details-card'}>
			<DetailsItem category={'Name'} value={supplier.name} />
			<DetailsItem category={'Country'} value={supplier.country} />
			<DetailsItem category={'Address'} value={address} />
      <DetailsItem category={'Supplier Tier'} value={`Tier ${supplier.supplierTier}`} />
      <DetailsItem category={'Category'} value={supplier.category} />
      <DetailsItem category={'Sub-Category'} value={supplier.subcategory} />
      <DetailsItem category={'Brand’s Supplier ID'} value={supplier.brandFacilityId} />
		</Card>
	);
};

export const SupplierDetailsCard = withErrorBoundary(_SupplierDetailsCard, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in SupplierDetailsCard: ', error);
	},
});
