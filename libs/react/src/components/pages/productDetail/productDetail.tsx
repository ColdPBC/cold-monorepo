import {
  EditSustainabilityAttributesForEntity,
  ErrorFallback,
  ErrorPage,
  MainContent,
  ProductDetailsTab,
  ProductBOMTab,
  ProductDocumentsTab,
  Spinner,
  Tabs, EllipsisMenu, DeleteEntityModal,
  ProductCarbonAccountingTab, MaterialWithTier2Supplier, getTier2SupplierData,
} from '@coldpbc/components';
import {useAuth0Wrapper, useColdContext, useGraphQLSWR} from '@coldpbc/hooks';
import { useParams } from 'react-router-dom';
import {FilesWithAssurances, MaterialWithSupplier, ProductsQuery} from '@coldpbc/interfaces';
import { cloneDeep, get, isError } from 'lodash';
import { withErrorBoundary } from 'react-error-boundary';
import React from 'react';
import {parseDocumentsForProductDetails} from "@coldpbc/lib";
import { EntityLevel } from '@coldpbc/enums';
import { useFlags } from "launchdarkly-react-client-sdk";

const _ProductDetail = () => {
  const ldFlags = useFlags();
  const { orgId } = useAuth0Wrapper();
	const { id } = useParams();
  const { logBrowser } = useColdContext();
  const [deleteModalOpen, setDeleteModalOpen] = React.useState<boolean>(false);
  const [showUpdateAttributesModal, setShowUpdateAttributesModal] = React.useState<boolean>(false);

	const productQuery = useGraphQLSWR<{
		product: ProductsQuery | null;
	}>('GET_PRODUCT', {
		id: id,
	});

  const allFiles = useGraphQLSWR<{
    organizationFiles: FilesWithAssurances[] | null;
  }>('GET_ALL_FILES', {
    filter: {
      organization: {
        id: orgId,
      },
      visible: true,
    },
  });

  const allSustainabilityAttributes = useGraphQLSWR('GET_ALL_SUS_ATTRIBUTES', {
    pagination: {
      orderBy: {
        name: 'ASC',
      },
    },
  });

  const materialsQuery = useGraphQLSWR<{
    materials: MaterialWithSupplier[];
  }>(orgId ? 'GET_ALL_MATERIALS_TO_ADD_ASSURANCE_TO_DOCUMENT' : null, {
    organizationId: orgId,
  });

  const allMaterials: MaterialWithTier2Supplier[] = React.useMemo(() => {
    if (!materialsQuery.isLoading && !get(materialsQuery.data, 'errors', undefined) && !productQuery.isLoading && !get(productQuery.data, 'errors', undefined)) {
      const data = get(materialsQuery.data, 'data.materials', []);
      const product = get(productQuery.data, 'data.product');

      // Get the product materials' IDs
      const productMaterialIds = product?.productMaterials?.map(pm => pm.material?.id).filter(Boolean) || [];

      // Filter materials to only include those in the product's materials
      const filteredMaterials = productMaterialIds.length > 0
        ? data.filter(material => productMaterialIds.includes(material.id))
        : data;

      return filteredMaterials.map(rawMaterial => ({
        id: rawMaterial.id,
        name: rawMaterial.name,
        ...getTier2SupplierData(rawMaterial),
      }));
    } else {
      return [];
    }
  }, [materialsQuery.isLoading, materialsQuery.data, productQuery.data, productQuery.isLoading]);

  if (productQuery.isLoading || allFiles.isLoading || allSustainabilityAttributes.isLoading || materialsQuery.isLoading) {
    return <Spinner />;
  }

	if (isError(productQuery.data) || isError(allFiles.data)) {
    const productError = get(productQuery.data, 'error', null);
    if(productError) {
      logBrowser('Error fetching products', 'error', { productError }, productError);
    }

    const filesError = get(allFiles.data, 'error', null);
    if(filesError) {
      logBrowser('Error fetching files', 'error', { filesError }, filesError);
    }

		return <ErrorPage error={'An error occurred'} showLogout={false} />;
	}

	const product = get(productQuery.data, 'data.product');
  const files: FilesWithAssurances[] = get(allFiles.data, 'data.organizationFiles', []);

	if (product === null || product === undefined) {
		return null;
	}

	const subTitle = [product.productCategory, product.productSubcategory, product.seasonCode].filter(val => !!val).join(' | ');

  const tabs: {
    label: string;
    content: React.ReactNode;
  }[] = [
    {
      label: 'Summary',
      content: <ProductDetailsTab product={product} setShowUpdateAttributesModal={setShowUpdateAttributesModal} refreshProduct={productQuery.mutate} />,
    },
    {
      label: 'BOM',
      content: <ProductBOMTab product={product} refreshProduct={productQuery.mutate} />,
    },
    ...(
      ldFlags.showNewPcfUiCold1450 ? [{
        label: 'Carbon Accounting',
        content: <ProductCarbonAccountingTab product={product} />,
      }] : []
    ),
    {
      label: 'Documents',
      content: <ProductDocumentsTab files={parseDocumentsForProductDetails(product, cloneDeep(files))} refreshFiles={allFiles.mutate} allMaterials={allMaterials} allSustainabilityAttributes={allSustainabilityAttributes} />,
    },
  ]

	return (
    <MainContent
      title={product.name}
      subTitle={subTitle} breadcrumbs={[{ label: 'Products', href: '/products' }, { label: product.name }]} className={'w-[calc(100%)]'}
      headerElement={
        <EllipsisMenu
          data-testid={'product-details-menu'}
          items={[
            {
              label: 'Delete Product',
              onClick: () => {
                setDeleteModalOpen(true);
              },
              color: 'warning',
            }
          ]}/>
      }
    >
      {product && (
        <EditSustainabilityAttributesForEntity
          key={product.id}
          isOpen={showUpdateAttributesModal}
          onClose={() => setShowUpdateAttributesModal(false)}
          entityLevel={EntityLevel.PRODUCT}
          entity={product}
        />
      )}
      <Tabs
        tabs={tabs}
      />
      <DeleteEntityModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        entityId={product.id}
        entityLevel={EntityLevel.PRODUCT}
      />
    </MainContent>
	);
};

export const ProductDetail = withErrorBoundary(_ProductDetail, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in ProductDetail: ', error);
	},
});
