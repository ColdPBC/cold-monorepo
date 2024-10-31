import { BaseButton, Card, ErrorFallback, ErrorPage, MuiDataGrid, Spinner } from '@coldpbc/components';
import { Modal as FBModal } from 'flowbite-react';
import { flowbiteThemeOverride } from '@coldpbc/themes';
import { GridCellParams, GridColDef, GridRowSelectionModel, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { ButtonTypes, EntityLevel, GlobalSizes } from '@coldpbc/enums';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Checkbox } from '@mui/material';
import { withErrorBoundary } from 'react-error-boundary';
import { type SustainabilityAttributeGraphQL, ToastMessage } from '@coldpbc/interfaces';
import { get, toLower } from 'lodash';
import { useAddToastMessage, useAuth0Wrapper, useColdContext, useGraphQLMutation, useGraphQLSWR } from '@coldpbc/hooks';
import { processSustainabilityAttributeDataFromGraphQL } from '@coldpbc/lib';
import { mutate } from 'swr';

interface EditSustainabilityAttributesForProductProps {
	isOpen: boolean;
	onClose: () => void;
	product: {
		id: string;
		name: string;
	};
}

const getAttributeChanges = (previouslySelected: string[], newlySelected: string[]) => {
	const previousSet = new Set(previouslySelected);
	const newSet = new Set(newlySelected);

	return {
		toCreate: newlySelected.filter(id => !previousSet.has(id)),
		toDelete: previouslySelected.filter(id => !newSet.has(id)),
	};
};

const haveSameItems = (arr1: string[], arr2: string[]) => {
	if (arr1.length !== arr2.length) return false;
	const set1 = new Set(arr1);
	return arr2.every(item => set1.has(item));
};

const _EditSustainabilityAttributesForProduct: React.FC<EditSustainabilityAttributesForProductProps> = ({ isOpen, onClose, product }) => {
	const { mutateGraphQL: createAttributeAssurance } = useGraphQLMutation('CREATE_ATTRIBUTE_ASSURANCE_FOR_FILE');
	const { mutateGraphQL: deleteAttributeAssurances } = useGraphQLMutation('DELETE_ATTRIBUTE_ASSURANCES_FOR_PRODUCT_AND_SUSTAINABILITY_ATTRIBUTE');
	const { orgId } = useAuth0Wrapper();
	const { logBrowser } = useColdContext();
	const { addToastMessage } = useAddToastMessage();

	const [rowsSelected, setRowsSelected] = useState<GridRowSelectionModel>([]);
	const [isLoading, setIsLoading] = useState(false);

	const sustainabilityAttributesQuery = useGraphQLSWR<{
		sustainabilityAttributes: SustainabilityAttributeGraphQL[];
	}>(orgId ? 'GET_ALL_SUSTAINABILITY_ATTRIBUTES_FOR_PRODUCTS' : null, {
		organizationId: orgId,
	});

	const { sustainabilityAttributes, previouslySelectedAttributes } = useMemo(() => {
		// If we're loading, explicitly return empty arrays
		if (sustainabilityAttributesQuery.isLoading) {
			console.log('Loading state, returning empty arrays');
			return { sustainabilityAttributes: [], previouslySelectedAttributes: [] };
		}

		const sustainabilityAttributesGraphQL = get(sustainabilityAttributesQuery.data, 'data.sustainabilityAttributes', []).filter(
			attr => !attr.organization || attr.organization.id === orgId,
		);
		const processedAttributes = processSustainabilityAttributeDataFromGraphQL(sustainabilityAttributesGraphQL);

		const selectedAttributes = processedAttributes
			.filter(attribute => attribute.attributeAssurances.some(assurance => assurance.entity.id === product.id))
			.map(attribute => attribute.id);

		return {
			sustainabilityAttributes: processedAttributes,
			previouslySelectedAttributes: selectedAttributes,
		};
	}, [sustainabilityAttributesQuery.data, sustainabilityAttributesQuery.isLoading, orgId, product.id]);

	useEffect(() => {
		if (isOpen) {
			setRowsSelected(previouslySelectedAttributes);
		} else {
			setRowsSelected([]);
		}
	}, [isOpen]);

	const saveAttributeChanges = useCallback(
		async (previouslySelected: string[], newlySelected: string[]) => {
			setIsLoading(true);
			const { toCreate, toDelete } = getAttributeChanges(previouslySelected, newlySelected);

			try {
				await Promise.all([
					...toCreate.map(attributeId =>
						createAttributeAssurance({
							input: {
								organization: { id: orgId },
								product: { id: product.id },
								sustainabilityAttribute: { id: attributeId },
							},
						}),
					),
					...toDelete.map(attributeId =>
						deleteAttributeAssurances({
							productId: product.id,
							sustainabilityAttributeId: attributeId,
							organizationId: orgId,
						}),
					),
				]);

				logBrowser('Updated sustainability attributes for product successfully', 'info', {
					orgId,
					productId: product.id,
					attributesCreated: toCreate.length,
					attributesDeleted: toDelete.length,
				});

				// Add revalidation calls
				await Promise.all([
					sustainabilityAttributesQuery.mutate(), // Revalidate the modal's data
					// Also revalidate the product query that shows the cards
					mutate('GET_PRODUCT'),
				]);

				onClose();

				await addToastMessage({
					message: 'Sustainability attributes updated successfully',
					type: ToastMessage.SUCCESS,
				});
			} catch (e) {
				logBrowser('Error updating sustainability attributes for product', 'error', {
					orgId,
					productId: product.id,
					error: e,
				});
				await addToastMessage({
					message: 'Error updating sustainability attributes',
					type: ToastMessage.FAILURE,
				});
			} finally {
				setIsLoading(false);
			}
		},
		[orgId, product.id, createAttributeAssurance, deleteAttributeAssurances, onClose, logBrowser, addToastMessage, sustainabilityAttributesQuery],
	);

	const error = sustainabilityAttributesQuery.error || get(sustainabilityAttributesQuery.data, 'errors');
	if (error) {
		logBrowser('Error fetching sustainability attribute data', 'error', {}, error);
		return (
			<FBModal dismissible show={isOpen} onClose={onClose} theme={flowbiteThemeOverride.modal}>
				<Card className="relative p-4 w-[962px] bg-gray-20">
					<ErrorPage error="Unable to load sustainability attributes. Please try again later." showLogout={false} />
				</Card>
			</FBModal>
		);
	}

	const rows = [...sustainabilityAttributes].sort((a, b) => {
		const aIsSelected = previouslySelectedAttributes.includes(a.id);
		const bIsSelected = previouslySelectedAttributes.includes(b.id);
		if (aIsSelected === bIsSelected) {
			return a.name.localeCompare(b.name);
		}
		return aIsSelected ? -1 : 1;
	});

	const columns: GridColDef[] = [
		{
			field: 'checkbox',
			editable: false,
			sortable: false,
			hideSortIcons: true,
			width: 100,
			headerClassName: 'bg-gray-30',
			cellClassName: 'bg-gray-10',
			renderCell: (params: GridCellParams) => (
				<Checkbox
					checked={rowsSelected.includes(params.row.id) || false}
					onClick={() =>
						setRowsSelected(prev => {
							if (prev.includes(params.row.id)) {
								return prev.filter(id => id !== params.row.id);
							} else {
								return [...prev, params.row.id];
							}
						})
					}
				/>
			),
			renderHeader: params => (
				<Checkbox
					checked={rowsSelected.length === rows.length && rowsSelected.length > 0}
					indeterminate={rowsSelected.length > 0 && rowsSelected.length < rows.length}
					onClick={() => {
						if (rowsSelected.length === rows.length || rowsSelected.length > 0) {
							setRowsSelected([]);
						} else {
							setRowsSelected(rows.map(r => r.id));
						}
					}}
				/>
			),
		},
		{
			field: 'name',
			headerName: 'Name',
			minWidth: 130,
			flex: 1,
			headerClassName: 'bg-gray-30',
			cellClassName: 'bg-gray-10',
		},
	];

	const getToolbar = () => (
		<GridToolbarContainer>
			<GridToolbarQuickFilter />
		</GridToolbarContainer>
	);

	// Handle loading and error states
	if (sustainabilityAttributesQuery.isLoading) {
		return (
			<FBModal dismissible show={isOpen} onClose={onClose} theme={flowbiteThemeOverride.modal}>
				<Card className="relative p-4 w-[962px] bg-gray-20 flex items-center justify-center">
					<Spinner size={GlobalSizes.large} />
				</Card>
			</FBModal>
		);
	}

	if (error) {
		logBrowser('Error fetching sustainability attribute data', 'error', {}, error);
		return (
			<FBModal dismissible show={isOpen} onClose={onClose} theme={flowbiteThemeOverride.modal}>
				<Card className="relative p-4 w-[962px] bg-gray-20">
					<ErrorPage error="Unable to load sustainability attributes. Please try again later." showLogout={false} />
				</Card>
			</FBModal>
		);
	}

	const title = `Edit ${toLower(EntityLevel.PRODUCT)}-level attributes for ${product.name}`;
	const buttonText = 'Update attributes';

	return (
		<FBModal dismissible show={isOpen} onClose={onClose} theme={flowbiteThemeOverride.modal}>
			<Card className="relative p-4 w-[962px] bg-gray-20">
				<div className="flex flex-col gap-[24px] w-full">
					<div className="flex flex-row text-h3">{title}</div>
					<div className="w-full h-[400px]">
						<MuiDataGrid
							rows={rows}
							columns={columns}
							sx={{
								'--DataGrid-overlayHeight': '300px',
							}}
							className="h-full"
							autoHeight={false}
							slots={{
								toolbar: getToolbar,
							}}
							disableColumnMenu={true}
							rowSelection={false}
						/>
					</div>
				</div>
				<div className="w-full flex flex-row justify-between">
					<BaseButton label="Cancel" onClick={onClose} variant={ButtonTypes.secondary} disabled={isLoading} />
					<div className="flex flex-row gap-[16px] items-center">
						<div className="text-body font-bold text-tc-secondary">
							{rowsSelected.length}/{rows.length} Selected
						</div>
						<BaseButton
							label={buttonText}
							loading={isLoading}
							onClick={() => saveAttributeChanges(previouslySelectedAttributes, rowsSelected as string[])}
							disabled={haveSameItems(previouslySelectedAttributes, rowsSelected as string[]) || isLoading}
						/>
					</div>
				</div>
			</Card>
		</FBModal>
	);
};

export const EditSustainabilityAttributesForProduct = withErrorBoundary(_EditSustainabilityAttributesForProduct, {
	FallbackComponent: props => <ErrorFallback {...props} />,
});
