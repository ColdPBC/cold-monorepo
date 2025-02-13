import { BaseButton, Card, ErrorFallback, ErrorPage, MuiDataGrid, Spinner } from '@coldpbc/components';
import { Modal as FBModal } from 'flowbite-react';
import { flowbiteThemeOverride } from '@coldpbc/themes';
import {
  GridCellParams,
  GridColDef,
  GridFilterModel,
  GridRowSelectionModel,
  GridToolbarContainer,
  GridToolbarQuickFilter
} from '@mui/x-data-grid-pro';
import { ButtonTypes, EntityLevel, GlobalSizes } from '@coldpbc/enums';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Checkbox } from '@mui/material';
import { withErrorBoundary } from 'react-error-boundary';
import { type SustainabilityAttributeGraphQL, ToastMessage } from '@coldpbc/interfaces';
import {get, toLower, uniq} from 'lodash';
import { useAddToastMessage, useAuth0Wrapper, useColdContext, useGraphQLMutation, useGraphQLSWR } from '@coldpbc/hooks';
import { DELETE_ATTRIBUTE_ASSURANCES_FOR_ENTITY_AND_SUSTAINABILITY_ATTRIBUTE, processSustainabilityAttributeDataFromGraphQL } from '@coldpbc/lib';
import { mutate } from 'swr';

interface EditSustainabilityAttributesForProductProps {
	isOpen: boolean;
	onClose: () => void;
	entityLevel: EntityLevel;
	entity: {
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

const _EditSustainabilityAttributesForProduct: React.FC<EditSustainabilityAttributesForProductProps> = ({ isOpen, onClose, entityLevel, entity }) => {
	const { mutateGraphQL: createAttributeAssurance } = useGraphQLMutation('CREATE_ATTRIBUTE_ASSURANCE_FOR_FILE');
	const { mutateGraphQL: deleteAttributeAssurances } = useGraphQLMutation('DELETE_ATTRIBUTE_ASSURANCES_FOR_ENTITY_AND_SUSTAINABILITY_ATTRIBUTE');
	const { orgId } = useAuth0Wrapper();
	const { logBrowser } = useColdContext();
	const { addToastMessage } = useAddToastMessage();
  const [filterModel, setFilterModel] = useState<GridFilterModel>({items: [], quickFilterValues: []});
	const [rowsSelected, setRowsSelected] = useState<GridRowSelectionModel>([]);
	const [isLoading, setIsLoading] = useState(false);

	const sustainabilityAttributesQuery = useGraphQLSWR<{
		sustainabilityAttributes: SustainabilityAttributeGraphQL[];
	}>(orgId ? 'GET_ALL_SUSTAINABILITY_ATTRIBUTES_FOR_ORG' : null, {
		organizationId: orgId,
	});

	const { sustainabilityAttributes, previouslySelectedAttributes } = useMemo(() => {
		// If we're loading, explicitly return empty arrays
		if (sustainabilityAttributesQuery.isLoading) {
			console.log('Loading state, returning empty arrays');
			return { sustainabilityAttributes: [], previouslySelectedAttributes: [] };
		}

		const sustainabilityAttributesGraphQL = get(sustainabilityAttributesQuery.data, 'data.sustainabilityAttributes', []).filter(
			attr => (!attr.organization || attr.organization.id === orgId) && attr.level === entityLevel,
		);
		const processedAttributes = processSustainabilityAttributeDataFromGraphQL(sustainabilityAttributesGraphQL);

		const selectedAttributes = processedAttributes
			.filter(attribute => attribute.attributeAssurances.some(assurance => assurance.entity.id === entity.id))
			.map(attribute => attribute.id);

		return {
			sustainabilityAttributes: processedAttributes,
			previouslySelectedAttributes: selectedAttributes,
		};
	}, [sustainabilityAttributesQuery.data, sustainabilityAttributesQuery.isLoading, orgId, entity.id]);

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
								material: entityLevel === EntityLevel.MATERIAL ? { id: entity.id } : undefined,
								organizationFacility: entityLevel === EntityLevel.SUPPLIER ? { id: entity.id } : undefined,
								product: entityLevel === EntityLevel.PRODUCT ? { id: entity.id } : undefined,
								sustainabilityAttribute: { id: attributeId },
							},
						}),
					),
					...toDelete.map(attributeId =>
						deleteAttributeAssurances({
							sustainabilityAttributeId: attributeId,
							organizationId: orgId,
							materialId: entityLevel === EntityLevel.MATERIAL ? entity.id : null,
							productId: entityLevel === EntityLevel.PRODUCT ? entity.id : null,
							supplierId: entityLevel === EntityLevel.SUPPLIER ? entity.id : null,
						}),
					),
				]);

				logBrowser(`Updated sustainability attributes for ${toLower(EntityLevel[entityLevel])} successfully`, 'info', {
					orgId,
					entityId: entity.id,
					attributesCreated: toCreate.length,
					attributesDeleted: toDelete.length,
				});

				// Add revalidation calls
				await Promise.all([
					sustainabilityAttributesQuery.mutate(), // Revalidate the modal's data
					// Also revalidate the query that shows the cards on the detail page
          mutate([`GET_${EntityLevel[entityLevel]}`, JSON.stringify({ id: entity.id })]),
				]);

				onClose();

				await addToastMessage({
					message: 'Sustainability attributes updated successfully',
					type: ToastMessage.SUCCESS,
				});
			} catch (e) {
				logBrowser(`Error updating sustainability attributes for ${toLower(EntityLevel[entityLevel])}`, 'error', {
					orgId,
					entityId: entity.id,
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
		[orgId, entity.id, createAttributeAssurance, deleteAttributeAssurances, onClose, logBrowser, addToastMessage, sustainabilityAttributesQuery],
	);

  const clickSelectAll = () => {
      const filteredIds = filterRows.map(row => row.id);
      
      setRowsSelected(prev => {
        const selectedIds = prev.filter((id) => filteredIds.includes(id as string));
        
        // if all the rows are selected or some of the rows are selected, then unselect all the rows
        if(selectedIds.length === filterRows.length || selectedIds.length > 0) {
          return prev.filter(id => !filteredIds.includes(id as string)));
        } else {
          return uniq([...prev, ...filteredIds];
        }
      });
    }
  }

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

  const filterRows = React.useMemo(() => {
    if (filterModel.quickFilterValues?.length) {
      return rows.filter(row =>
        row.name.toLowerCase().includes(
          filterModel.quickFilterValues?.join(' ').toLowerCase() || ''
        )
      );
    }
    return rows;
  },[rows, filterModel.quickFilterValues]);

  const filteredSelectedIds = rowsSelected.filter(id => filterRows.map(row => row.id).includes(id as string));

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
          checked={filteredSelectedIds.length === filterRows.length && filterRows.length > 0}
          indeterminate={filteredSelectedIds.length < filterRows.length && filteredSelectedIds.length > 0 && filterRows.length > 0}
          onClick={clickSelectAll}
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

	const title = `Edit ${toLower(EntityLevel[entityLevel])}-level attributes for ${entity.name}`;
	const buttonText = 'Update attributes';

	return (
		<FBModal dismissible show={isOpen} onClose={onClose} theme={flowbiteThemeOverride.modal}>
			<Card className="relative p-4 w-[962px] bg-gray-20">
				<div className="flex flex-col gap-[24px] w-full">
					<div className="flex flex-row text-h3">{title}</div>
					<div className="w-full h-[400px]">
						<MuiDataGrid
							rows={filterRows}
							columns={columns}
							sx={{
								'--DataGrid-overlayHeight': '300px',
							}}
							className="h-full"
							autoHeight={false}
							disableColumnMenu={true}
							rowSelection={false}
              filterModel={filterModel}
              onFilterModelChange={setFilterModel}
              showSearch
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

export const EditSustainabilityAttributesForEntity = withErrorBoundary(_EditSustainabilityAttributesForProduct, {
	FallbackComponent: props => <ErrorFallback {...props} />,
});
