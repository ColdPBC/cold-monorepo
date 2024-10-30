import React from 'react';
import { ErrorFallback, ErrorPage, MainContent, Spinner, SupplierDetailsCard } from '@coldpbc/components';
import { withErrorBoundary } from 'react-error-boundary';
import { useColdContext, useGraphQLSWR } from '@coldpbc/hooks';
import { useParams } from 'react-router-dom';
import { SupplierGraphQL } from '@coldpbc/interfaces';
import { get, isError } from 'lodash';

export const _SupplierDetail = () => {
	const { id: supplierId } = useParams();
	const { logBrowser } = useColdContext();
	const supplierQuery = useGraphQLSWR<{
		organizationFacility: SupplierGraphQL | null;
	}>('GET_SUPPLIER', {
		id: supplierId,
	});

	if (supplierQuery.isLoading) {
		return <Spinner />;
	}

	if (isError(supplierQuery.data)) {
		const supplierError = get(supplierQuery.data, 'error', null);
		if (supplierError) {
			logBrowser('Error fetching supplier', 'error', { supplierError }, supplierError);
		}

		return <ErrorPage error={'An error occurred'} showLogout={false} />;
	}

	const supplier = get(supplierQuery.data, 'data.organizationFacility');

	if (supplier === null || supplier === undefined) {
		return null;
	}

	return (
    <MainContent
      title={supplier.name}
      subTitle={`Tier ${supplier.supplierTier}`}
      breadcrumbs={[{ label: 'Suppliers', href: '/suppliers' }, { label: supplier.name }]}
      className={'w-[calc(100%)]'}
    >
      <div className="w-full h-full flex gap-6 items-start mt-4 mb-20">
        <SupplierDetailsCard supplier={supplier} />
      </div>
    </MainContent>
);
};

export const SupplierDetail = withErrorBoundary(_SupplierDetail, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in SupplierDetail: ', error);
	},
});
