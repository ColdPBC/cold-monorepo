import {
  EditSustainabilityAttributesForEntity,
  ErrorFallback,
  ErrorPage,
  MainContent,
  ProductDetailsTab,
  ProductBOMTab,
  ProductDocumentsTab,
  Spinner,
  Tabs,
} from '@coldpbc/components';
import {useAuth0Wrapper, useColdContext, useGraphQLSWR} from '@coldpbc/hooks';
import { useParams } from 'react-router-dom';
import {FilesWithAssurances, ProductsQuery} from '@coldpbc/interfaces';
import {cloneDeep, get, isError} from 'lodash';
import { withErrorBoundary } from 'react-error-boundary';
import React from 'react';
import {parseDocumentsForProductDetails} from "@coldpbc/lib";
import { EntityLevel } from '@coldpbc/enums';

const _ProductDetail = () => {
  const { orgId } = useAuth0Wrapper();
	const { id } = useParams();
  const { logBrowser } = useColdContext();
  const [showUpdateAttributesModal, setShowUpdateAttributesModal] = React.useState<boolean>(false);
	const productQuery = useGraphQLSWR<{
		product: ProductsQuery | null;
	}>('GET_PRODUCT', {
		id: id,
	});

  const allFiles = useGraphQLSWR<{
    organizationFiles: FilesWithAssurances[];
  }>('GET_ALL_FILES', {
    filter: {
      organization: {
        id: orgId,
      },
      visible: true,
    },
  });

  if (productQuery.isLoading || allFiles.isLoading) {
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

	return (
    <MainContent title={product.name} subTitle={subTitle} breadcrumbs={[{ label: 'Products', href: '/products' }, { label: product.name }]} className={'w-[calc(100%)]'}>
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
        tabs={[
          {
            label: 'Summary',
            content: <ProductDetailsTab product={product} setShowUpdateAttributesModal={setShowUpdateAttributesModal} />,
          },
          {
            label: 'BOM',
            content: <ProductBOMTab product={product} />,
          },
          {
            label: 'Documents',
            content: <ProductDocumentsTab files={parseDocumentsForProductDetails(product, cloneDeep(files))} />,
          },
        ]}
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
