import { Card, DropdownInputForEntityEdit, ErrorFallback, Spinner, TextInputForEntityEdit } from '@coldpbc/components';
import { ButtonTypes, EntityLevel, GlobalSizes } from '@coldpbc/enums';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { ProductsQuery, SuppliersWithAssurances, ToastMessage } from '@coldpbc/interfaces';
import { useAddToastMessage, useAuth0Wrapper, useColdContext, useEntityData, useGraphQLMutation, useGraphQLSWR } from '@coldpbc/hooks';
import { ApolloQueryResult } from '@apollo/client';
import { KeyedMutator } from 'swr';
import { get } from 'lodash';

interface EditProductDetailsProps {
	product: ProductsQuery;
	onClose: () => void;
	refreshProduct: KeyedMutator<ApolloQueryResult<{ product: ProductsQuery | null }>>;
}

const isProductEdited = (originalProduct: ProductsQuery, editedProduct: ProductsQuery): boolean => {
	const keysToCompare = [
		'name',
		['organizationFacility', 'id'],
		'description',
		'seasonCode',
		'upcCode',
		'productCategory',
		'productSubcategory',
		'brandProductId',
		'supplierProductId',
	];

	return keysToCompare.some(key => {
		if (Array.isArray(key)) {
			// Handle nested properties
			const [parent, child] = key;
			return originalProduct[parent]?.[child] !== editedProduct[parent]?.[child];
		}
		return originalProduct[key] !== editedProduct[key];
	});
};

const _EditProductDetails: React.FC<EditProductDetailsProps> = ({ product, onClose, refreshProduct }) => {
	const { orgId } = useAuth0Wrapper();
	const { logBrowser } = useColdContext();
	const { addToastMessage } = useAddToastMessage();
	const [isLoading, setIsLoading] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const [editedProduct, setEditedProduct] = useState<ProductsQuery>(product);
	const [errors, setErrors] = useState<Partial<Record<keyof ProductsQuery, string>>>({});
	const existingProducts = useEntityData(EntityLevel.SUPPLIER, orgId);
	const preexistingProductNames = existingProducts.filter(s => s.name !== product.name).map(s => s.name);
	const { mutateGraphQL: updateProduct } = useGraphQLMutation('UPDATE_PRODUCT');

	useEffect(() => {
		const hasErrors = Object.values(errors).some(error => error !== null && error !== undefined);
		const isEdited = isProductEdited(product, editedProduct);

		setIsDisabled(hasErrors || !isEdited);
	}, [errors, product, editedProduct]);

	const suppliersQuery = useGraphQLSWR<{
		organizationFacilities: SuppliersWithAssurances[];
	}>(orgId ? 'GET_ALL_SUPPLIERS_FOR_ORG' : null, {
		filter: {
			organization: {
				id: orgId,
			},
			supplier: true,
			supplierTier: 1,
		},
	});

	const suppliers: { id: string; name: string }[] | undefined = useMemo(() => {
		return get(suppliersQuery.data, 'data.organizationFacilities');
	}, [suppliersQuery.data]);

	const saveProductChange = useCallback(
		async (editedProduct: ProductsQuery) => {
			setIsLoading(true);

			try {
				await updateProduct({
					input: {
						id: product.id,
						name: editedProduct.name,
						organizationFacility: editedProduct.organizationFacility
							? {
									id: editedProduct.organizationFacility.id,
							  }
							: undefined,
						description: editedProduct.description,
						seasonCode: editedProduct.seasonCode,
						upcCode: editedProduct.upcCode,
						productCategory: editedProduct.productCategory,
						productSubcategory: editedProduct.productSubcategory,
						brandProductId: editedProduct.brandProductId,
						supplierProductId: editedProduct.supplierProductId,
					},
				});

				logBrowser(`Updated product ${product.id} successfully`, 'info', {
					orgId,
					productId: product.id,
				});

				// Revalidate product query
				await refreshProduct();

				onClose();

				await addToastMessage({
					message: 'Product updated successfully',
					type: ToastMessage.SUCCESS,
				});
			} catch (e) {
				logBrowser(`Error updating product ${product.id}`, 'error', {
					orgId,
					productId: product.id,
					error: e,
				});
				await addToastMessage({
					message: 'Error updating product',
					type: ToastMessage.FAILURE,
				});
			} finally {
				setIsLoading(false);
			}
		},
		[orgId, product, onClose, logBrowser, addToastMessage, refreshProduct, updateProduct],
	);

	const cancelCta = {
		text: 'Cancel',
		action: onClose,
		variant: ButtonTypes.secondary,
	};

	// Handle loading and error states
	if (suppliersQuery.isLoading) {
		return (
			<Card title={'Details'} ctas={[cancelCta]} className="w-[406px] min-w-[406px] h-fit" overflowHidden={false}>
				<Spinner size={GlobalSizes.large} />
			</Card>
		);
	}

	const error = suppliersQuery.error || get(suppliersQuery.data, 'errors');
	if (error) {
		logBrowser('Error fetching supplier data', 'error', {}, error);
		return (
			<Card title={'Details'} ctas={[cancelCta]} className="w-[406px] min-w-[406px] h-fit" overflowHidden={false}>
				Error loading product edit modal. Please try again later.
			</Card>
		);
	}

	if (!suppliers) return null;

	const ctas = [
		cancelCta,
		{
			text: 'Save',
			action: async () => {
				if (editedProduct) {
					await saveProductChange(editedProduct);
				}
			},
			disabled: isDisabled,
			loading: isLoading,
			variant: ButtonTypes.primary,
		},
	];

	const inputProps = (fieldName: keyof ProductsQuery) => ({
		fieldName: fieldName,
		setEntityState: setEditedProduct,
		entityState: editedProduct,
		originalEntity: product,
		error: errors[fieldName],
		setError: (error?: string) => {
			setErrors({ ...errors, [fieldName]: error });
		},
	});

	return (
		<Card title={'Details'} ctas={ctas} className="w-[406px] min-w-[406px] h-fit" overflowHidden={false}>
			<TextInputForEntityEdit<ProductsQuery> {...inputProps('name')} label={'Name'} required={true} preexistingValues={preexistingProductNames} />
			<TextInputForEntityEdit<ProductsQuery> {...inputProps('description')} label={'Description'} />
			<DropdownInputForEntityEdit<ProductsQuery> {...inputProps('organizationFacility')} label={'Tier 1 Supplier'} fieldType={'object'} options={suppliers} allowNone={false} />
			<TextInputForEntityEdit<ProductsQuery> {...inputProps('seasonCode')} label={'Season'} />
			<TextInputForEntityEdit<ProductsQuery> {...inputProps('upcCode')} label={'UPC'} />
			<TextInputForEntityEdit<ProductsQuery> {...inputProps('productCategory')} label={'Category'} />
			<TextInputForEntityEdit<ProductsQuery> {...inputProps('productSubcategory')} label={'Sub-Category'} />
			<TextInputForEntityEdit<ProductsQuery> {...inputProps('brandProductId')} label={'Brand Product ID'} />
			<TextInputForEntityEdit<ProductsQuery> {...inputProps('supplierProductId')} label={'Supplier Product ID'} />
		</Card>
	);
};

export const EditProductDetails = withErrorBoundary(_EditProductDetails, {
	FallbackComponent: props => <ErrorFallback {...props} />,
});
