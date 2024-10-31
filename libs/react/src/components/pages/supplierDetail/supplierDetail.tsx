import React from 'react';
import {
  ErrorFallback,
  ErrorPage,
  MainContent, MaterialsSuppliedTab, ProductBOMTab, ProductDetailsTab, ProductDocumentsTab,
  Spinner,
  SupplierDetailsCard,
  SupplierSustainabilityAttributesCard, Tabs,
} from '@coldpbc/components';
import { withErrorBoundary } from 'react-error-boundary';
import { useColdContext, useGraphQLSWR } from '@coldpbc/hooks';
import { useParams } from 'react-router-dom';
import { SupplierGraphQL } from '@coldpbc/interfaces';
import { get, isError } from 'lodash';
import { parseDocumentsForProductDetails } from '@coldpbc/lib';

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

  const tierLabel = supplier.supplierTier ? `Tier ${supplier.supplierTier}` : null;
  const subtitle = [tierLabel, supplier.category, supplier.subcategory, supplier.country].filter(val => !!val).join(' | ');

  const summaryContent = (
		<div className="w-full h-full flex gap-6 items-start mt-4 mb-20">
			<SupplierDetailsCard supplier={supplier} />
			<SupplierSustainabilityAttributesCard supplier={supplier} />
		</div>
	);

	return (
		<MainContent
			title={supplier.name}
			subTitle={subtitle}
			breadcrumbs={[{ label: 'Suppliers', href: '/suppliers' }, { label: supplier.name }]}
			className={'w-[calc(100%)]'}>
      {/* If the supplier has materials, add a tab structure to include the Materials data grid */}
      {supplier.materialSuppliers.length > 0 ? (
        <Tabs
          tabs={[
            {
              label: 'Summary',
              content: summaryContent,
            },
            {
              label: 'Materials',
              content: <MaterialsSuppliedTab supplier={supplier} />,
            },
          ]}
        />
      ): (
        summaryContent
      )}
    </MainContent>
	);
};

export const SupplierDetail = withErrorBoundary(_SupplierDetail, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in SupplierDetail: ', error);
	},
});
