import {
  Card, ColdIcon,
  DropdownInputForEntityEdit,
  ErrorFallback,
  Popover,
  Spinner,
  TextInputForEntityEdit,
} from '@coldpbc/components';
import { ButtonTypes, EntityLevel, GlobalSizes, IconNames } from '@coldpbc/enums';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { MaterialGraphQL, SuppliersWithAssurances, ToastMessage } from '@coldpbc/interfaces';
import { get } from 'lodash';
import { useAddToastMessage, useAuth0Wrapper, useColdContext, useGraphQLMutation, useGraphQLSWR, useUpdateEntityAssociations } from '@coldpbc/hooks';
import { HexColors } from '@coldpbc/themes';

interface EditMaterialDetailsProps {
	material: MaterialGraphQL;
	onClose: () => void;
	refreshMaterial: () => Promise<void>;
}

interface EditableMaterial extends MaterialGraphQL {
	organizationFacility: {
		id: string;
		name: string;
	} | null;
}

const isMaterialEdited = (originalMaterial: EditableMaterial, editedMaterial: EditableMaterial): boolean => {
	const keysToCompare = [
		'name',
		'description',
		'materialCategory',
		'materialSubcategory',
		'brandMaterialId',
		'supplierMaterialId',
		['materialClassification', 'id'],
		['organizationFacility', 'id'],
	];

	return keysToCompare.some(key => {
		if (Array.isArray(key)) {
			// Handle nested properties
			const [parent, child] = key;
			return editedMaterial[parent]?.[child] !== originalMaterial[parent]?.[child];
		}
		return editedMaterial[key] !== originalMaterial[key];
	});
};

// This conversion is due to some legacy tech debt. Although we've required it throughout the code, we have not yet formalized in our data structure that there is only 1 supplier per Material.
const convertMaterialGraphQLObjectToEditableMaterial = (material: MaterialGraphQL): EditableMaterial => ({
	...material,
	organizationFacility: material.materialSuppliers[0]?.organizationFacility,
});

const _EditMaterialDetails: React.FC<EditMaterialDetailsProps> = ({ material, onClose, refreshMaterial }) => {
	const { orgId } = useAuth0Wrapper();
	const { callMutateFunction } = useUpdateEntityAssociations();
	const { logBrowser } = useColdContext();
	const { addToastMessage } = useAddToastMessage();
	const [isLoading, setIsLoading] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const [editedMaterial, setEditedMaterial] = useState<EditableMaterial>(convertMaterialGraphQLObjectToEditableMaterial(material));

	useEffect(() => {
		if (editedMaterial) {
			setIsDisabled(!isMaterialEdited(convertMaterialGraphQLObjectToEditableMaterial(material), editedMaterial));
		}
	}, [material, editedMaterial]);

	const materialClassificationsQuery = useGraphQLSWR<{
		materialClassifications: { id: string; name: string }[];
	}>('GET_ALL_MATERIAL_CLASSIFICATIONS');
	const { mutateGraphQL: updateMaterial } = useGraphQLMutation('UPDATE_MATERIAL');

	const materialClassifications: { id: string; name: string }[] | undefined = useMemo(() => {
		return get(materialClassificationsQuery.data, 'data.materialClassifications');
	}, [materialClassificationsQuery.data]);

	const suppliersQuery = useGraphQLSWR<{
		organizationFacilities: SuppliersWithAssurances[];
	}>(orgId ? 'GET_ALL_SUPPLIERS_FOR_ORG' : null, {
		filter: {
			organization: {
				id: orgId,
			},
			supplier: true,
		},
	});

	const suppliers: { id: string; name: string }[] | undefined = useMemo(() => {
		return get(suppliersQuery.data, 'data.organizationFacilities');
	}, [suppliersQuery.data]);

	const saveMaterialChange = useCallback(
		async (editedMaterial: EditableMaterial) => {
			setIsLoading(true);

			try {
				await updateMaterial({
					input: {
						id: editedMaterial.id,
						name: editedMaterial.name,
						description: editedMaterial.description,
						materialCategory: editedMaterial.materialCategory,
						materialSubcategory: editedMaterial.materialSubcategory,
						brandMaterialId: editedMaterial.brandMaterialId,
						supplierMaterialId: editedMaterial.supplierMaterialId,
						// Only update materialClassification if there's a new value, due to a bug we can't unset it
						materialClassification: editedMaterial.materialClassification
							? {
									id: editedMaterial.materialClassification?.id,
							  }
							: undefined,
					},
				});

				// Changes to supplier happen on the Material Supplier, not the Material itself
        const newSupplierId = editedMaterial.organizationFacility?.id;
        const oldSupplierId = material.materialSuppliers[0]?.organizationFacility.id;
        if (newSupplierId !== oldSupplierId) {
          if (newSupplierId) {
            // Update or create new one
            await callMutateFunction(EntityLevel.MATERIAL, editedMaterial.id, newSupplierId, orgId, true);
          } else {
            // Delete old one
            await callMutateFunction(EntityLevel.MATERIAL, editedMaterial.id, oldSupplierId, orgId, false);
          }
        }

				logBrowser(`Updated material ${material.id} successfully`, 'info', {
					orgId,
					materialId: material.id,
				});

				// Revalidate material query
				await refreshMaterial();

				onClose();

				await addToastMessage({
					message: 'Material updated successfully',
					type: ToastMessage.SUCCESS,
				});
			} catch (e) {
				logBrowser(`Error updating material ${material.id}`, 'error', {
					orgId,
					materialId: material.id,
					error: e,
				});
				await addToastMessage({
					message: 'Error updating material',
					type: ToastMessage.FAILURE,
				});
			} finally {
				setIsLoading(false);
			}
		},
		[orgId, material, onClose, logBrowser, addToastMessage, refreshMaterial, updateMaterial, callMutateFunction],
	);

	const cancelCta = {
		text: 'Cancel',
		action: onClose,
		variant: ButtonTypes.secondary,
	};

	// Handle loading and error states
	if (materialClassificationsQuery.isLoading || suppliersQuery.isLoading) {
		return (
			<Card title={'Details'} ctas={[cancelCta]} className="w-[406px] min-w-[406px] h-fit" overflowHidden={false}>
				<Spinner size={GlobalSizes.large} />
			</Card>
		);
	}

  const error = materialClassificationsQuery.error || get(materialClassificationsQuery.data, 'errors') || suppliersQuery.error || get(suppliersQuery.data, 'errors');
  if (error) {
    logBrowser('Error fetching material classification or supplier data', 'error', {}, error);
    return (
      <Card title={'Details'} ctas={[cancelCta]} className="w-[406px] min-w-[406px] h-fit" overflowHidden={false}>
        Error loading material edit modal. Please try again later.
      </Card>
    );
  }

	if (!materialClassifications || !suppliers || !editedMaterial) return null;

	const ctas = [
		cancelCta,
		{
			text: 'Save',
			action: async () => {
				if (editedMaterial) {
					await saveMaterialChange(editedMaterial);
				}
			},
			disabled: isDisabled,
			loading: isLoading,
			variant: ButtonTypes.primary,
		},
	];

	const inputProps = {
		setEntityState: setEditedMaterial,
		entityState: editedMaterial,
	};

  const classificationLabel = (
    <div className={'flex items-center justify-start gap-1'}>
      <span>Classification</span>
      <Popover content={'This classification is used for carbon accounting and sustainability attribute reporting.'} contentClassName="w-[275px]">
        <ColdIcon name={IconNames.ColdInfoIcon} color={HexColors.tc['disabled']} />
      </Popover>
    </div>
  );

	return (
		<Card title={'Details'} ctas={ctas} className="w-[406px] min-w-[406px] h-fit" overflowHidden={false}>
			<TextInputForEntityEdit<EditableMaterial> fieldName={'name'} label={'Name'} required={true} {...inputProps} />
			<TextInputForEntityEdit<EditableMaterial> fieldName={'description'} label={'Description'} {...inputProps} />
			<DropdownInputForEntityEdit<EditableMaterial> fieldName={'organizationFacility'} label={'Tier 2 Supplier'} options={suppliers} allowNone={true} {...inputProps} />
			<DropdownInputForEntityEdit<EditableMaterial> fieldName={'materialClassification'} label={classificationLabel} options={materialClassifications} {...inputProps} />
			<TextInputForEntityEdit<EditableMaterial> fieldName={'materialCategory'} label={'Category'} {...inputProps} />
			<TextInputForEntityEdit<EditableMaterial> fieldName={'materialSubcategory'} label={'Sub-Category'} {...inputProps} />
			<TextInputForEntityEdit<EditableMaterial> fieldName={'brandMaterialId'} label={'Brand Material ID'} {...inputProps} />
			<TextInputForEntityEdit<EditableMaterial> fieldName={'supplierMaterialId'} label={'Supplier Material ID'} {...inputProps} />
		</Card>
	);
};

export const EditMaterialDetails = withErrorBoundary(_EditMaterialDetails, {
	FallbackComponent: props => <ErrorFallback {...props} />,
});
