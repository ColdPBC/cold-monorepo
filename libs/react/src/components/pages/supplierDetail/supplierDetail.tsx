import React from 'react';
import {
  DeleteEntityModal,
  EditSupplierDetails,
  EditSustainabilityAttributesForEntity, EllipsisMenu,
  ErrorFallback,
  ErrorPage,
  MainContent,
  MaterialsSuppliedTab,
  ProductsSuppliedTab,
  Spinner,
  SupplierDetailsCard,
  SupplierSustainabilityAttributesCard,
  Tabs,
} from '@coldpbc/components';
import { EntityLevel } from '@coldpbc/enums';
import { withErrorBoundary } from 'react-error-boundary';
import { useColdContext, useGraphQLSWR } from '@coldpbc/hooks';
import { useParams } from 'react-router-dom';
import { SupplierGraphQL } from '@coldpbc/interfaces';
import { get, isError } from 'lodash';

export const _SupplierDetail = () => {
	const { id: supplierId } = useParams();
	const { logBrowser } = useColdContext();
	const [showUpdateAttributesModal, setShowUpdateAttributesModal] = React.useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState<boolean>(false);
  const [editSupplier, setEditSupplier] = React.useState<boolean>(false);
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
		<>
			{supplier && (
				<EditSustainabilityAttributesForEntity
					key={supplier.id}
					isOpen={showUpdateAttributesModal}
					onClose={() => setShowUpdateAttributesModal(false)}
					entityLevel={EntityLevel.SUPPLIER}
					entity={supplier}
				/>
			)}
			<div className="w-full h-full flex gap-6 items-start mt-4 mb-20">
        {editSupplier ? (
          <EditSupplierDetails
            key={supplier.id}
            supplier={supplier}
            onClose={() => setEditSupplier(false)}
            refreshSupplier={supplierQuery.mutate}
          />
        ) : (
          <SupplierDetailsCard supplier={supplier} editSupplier={() => setEditSupplier(true)} />
        )}
				<SupplierSustainabilityAttributesCard supplier={supplier} showUpdateAttributesModal={() => setShowUpdateAttributesModal(true)} />
			</div>
		</>
	);

  const tabs = [
    { label: 'Summary', content: summaryContent },
    ...(supplier.supplierTier === 1 ? [{ label: 'Products', content: <ProductsSuppliedTab supplier={supplier} refreshData={supplierQuery.mutate} /> }] : [] ),
    { label: 'Materials', content: <MaterialsSuppliedTab supplier={supplier} refreshData={supplierQuery.mutate} /> }
  ]

	return (
		<MainContent
      title={supplier.name}
      subTitle={subtitle}
      breadcrumbs={[{ label: 'Suppliers', href: '/suppliers' }, { label: supplier.name }]}
      className={'w-[calc(100%)]'}
      headerElement={
        <EllipsisMenu
          data-testid={'supplier-details-menu'}
          items={[
            {
              label: 'Delete Supplier',
              onClick: () => {
                setDeleteModalOpen(true);
              },
              color: 'warning',
            }
          ]}/>
      }
    >
      {tabs.length > 1 ? <Tabs tabs={tabs} /> : summaryContent}
      <DeleteEntityModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        entityId={supplier.id}
        entityLevel={EntityLevel.SUPPLIER}
      />
    </MainContent>
	);
};

export const SupplierDetail = withErrorBoundary(_SupplierDetail, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in SupplierDetail: ', error);
	},
});
