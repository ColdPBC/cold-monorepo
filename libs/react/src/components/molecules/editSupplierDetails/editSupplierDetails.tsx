import { Card, DropdownInputForEntityEdit, ErrorFallback, TextInputForEntityEdit } from '@coldpbc/components';
import { ButtonTypes, EntityLevel } from '@coldpbc/enums';
import React, { useCallback, useEffect, useState } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { SupplierGraphQL, ToastMessage } from '@coldpbc/interfaces';
import { useAddToastMessage, useAuth0Wrapper, useColdContext, useEntityData, useGraphQLMutation } from '@coldpbc/hooks';
import { ApolloQueryResult } from '@apollo/client';
import { KeyedMutator } from 'swr';

interface EditSupplierDetailsProps {
	supplier: SupplierGraphQL;
	onClose: () => void;
	refreshSupplier: KeyedMutator<ApolloQueryResult<{ organizationFacility: SupplierGraphQL | null }>>;
}

const isSupplierEdited = (originalSupplier: SupplierGraphQL, editedSupplier: SupplierGraphQL): boolean => {
	const keysToCompare = ['name', 'addressLine1', 'addressLine2', 'city', 'stateProvince', 'postalCode', 'country', 'supplierTier', 'brandFacilityId', 'category', 'subcategory'];

	return keysToCompare.some(key => {
		return originalSupplier[key] !== editedSupplier[key];
	});
};

const _EditSupplierDetails: React.FC<EditSupplierDetailsProps> = ({ supplier, onClose, refreshSupplier }) => {
	const { orgId } = useAuth0Wrapper();
	const { logBrowser } = useColdContext();
	const { addToastMessage } = useAddToastMessage();
	const [isLoading, setIsLoading] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const [tierSelectorIsDisabled, setTierSelectorIsDisabled] = useState(false);
	const [editedSupplier, setEditedSupplier] = useState<SupplierGraphQL>(supplier);
	const [errors, setErrors] = useState<Partial<Record<keyof SupplierGraphQL, string>>>({});
	const existingSuppliers = useEntityData(EntityLevel.SUPPLIER, orgId);
	const preexistingSupplierNames = existingSuppliers.filter(s => s.name !== supplier.name).map(s => s.name);
	const { mutateGraphQL: updateSupplier } = useGraphQLMutation('UPDATE_SUPPLIER');

	useEffect(() => {
		const hasErrors = Object.values(errors).some(error => error !== null && error !== undefined);
		const isEdited = isSupplierEdited(supplier, editedSupplier);

		setIsDisabled(hasErrors || !isEdited);
	}, [errors, supplier, editedSupplier]);

	useEffect(() => {
    if (supplier.supplierTier === 1 && supplier.products.length > 0) {
      setTierSelectorIsDisabled(true);
    } else {
      setTierSelectorIsDisabled(false);
    }
  }, [supplier.supplierTier, supplier.products]);

	const saveSupplierChange = useCallback(
		async (editedSupplier: SupplierGraphQL) => {
			setIsLoading(true);

			if (!editedSupplier.supplierTier) {
				throw new Error('Cannot save supplier without a supplier tier');
			}

			try {
				await updateSupplier({
					input: {
						id: supplier.id,
						name: editedSupplier.name,
						supplierTier: editedSupplier.supplierTier,
						addressLine1: editedSupplier.addressLine1,
						addressLine2: editedSupplier.addressLine2,
						city: editedSupplier.city,
						stateProvince: editedSupplier.stateProvince,
						postalCode: editedSupplier.postalCode,
						country: editedSupplier.country,
						category: editedSupplier.category,
						subcategory: editedSupplier.subcategory,
						brandFacilityId: editedSupplier.brandFacilityId,
					},
				});

				logBrowser(`Updated supplier ${supplier.id} successfully`, 'info', {
					orgId,
					supplierId: supplier.id,
				});

				// Revalidate material query
				await refreshSupplier();

				onClose();

				await addToastMessage({
					message: 'Supplier updated successfully',
					type: ToastMessage.SUCCESS,
				});
			} catch (e) {
				logBrowser(`Error updating supplier ${supplier.id}`, 'error', {
					orgId,
					supplierId: supplier.id,
					error: e,
				});
				await addToastMessage({
					message: 'Error updating supplier',
					type: ToastMessage.FAILURE,
				});
			} finally {
				setIsLoading(false);
			}
		},
		[orgId, supplier, onClose, logBrowser, addToastMessage, refreshSupplier, updateSupplier],
	);

	const ctas = [
		{
			text: 'Cancel',
			action: onClose,
			variant: ButtonTypes.secondary,
		},
		{
			text: 'Save',
			action: async () => {
				if (editedSupplier) {
					await saveSupplierChange(editedSupplier);
				}
			},
			disabled: isDisabled,
			loading: isLoading,
			variant: ButtonTypes.primary,
		},
	];

	const inputProps = (fieldName: keyof SupplierGraphQL) => ({
		fieldName: fieldName,
		setEntityState: setEditedSupplier,
		entityState: editedSupplier,
		originalEntity: supplier,
		error: errors[fieldName],
		setError: (error?: string) => {
			setErrors({ ...errors, [fieldName]: error });
		},
	});

	return (
		<Card title={'Details'} ctas={ctas} className="w-[406px] min-w-[406px] h-fit" overflowHidden={false}>
			<TextInputForEntityEdit<SupplierGraphQL> {...inputProps('name')} label={'Name'} required={true} preexistingValues={preexistingSupplierNames} />
			<DropdownInputForEntityEdit<SupplierGraphQL>
				{...inputProps('supplierTier')}
				label={'Supplier Tier'}
				required={true}
				options={[{ value: 1 }, { value: 2 }]}
				fieldType={'value'}
				disabled={tierSelectorIsDisabled}
				disabledMessage={'Cannot change tier of supplier once products have been added'}
			/>
			<TextInputForEntityEdit<SupplierGraphQL> {...inputProps('addressLine1')} label={'Address Line 1'} />
			<TextInputForEntityEdit<SupplierGraphQL> {...inputProps('addressLine2')} label={'Address Line 2'} />
			<TextInputForEntityEdit<SupplierGraphQL> {...inputProps('city')} label={'City'} />
			<TextInputForEntityEdit<SupplierGraphQL> {...inputProps('stateProvince')} label={'State'} />
			<TextInputForEntityEdit<SupplierGraphQL> {...inputProps('postalCode')} label={'Postal Code'} />
			<TextInputForEntityEdit<SupplierGraphQL> {...inputProps('country')} label={'Country'} />
			<TextInputForEntityEdit<SupplierGraphQL> {...inputProps('brandFacilityId')} label={'Brand Facility ID'} />
			<TextInputForEntityEdit<SupplierGraphQL> {...inputProps('category')} label={'Category'} />
			<TextInputForEntityEdit<SupplierGraphQL> {...inputProps('subcategory')} label={'Sub-Category'} />
		</Card>
	);
};

export const EditSupplierDetails = withErrorBoundary(_EditSupplierDetails, {
	FallbackComponent: props => <ErrorFallback {...props} />,
});
