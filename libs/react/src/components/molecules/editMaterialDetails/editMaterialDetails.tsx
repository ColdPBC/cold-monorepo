import { Card, ColdIcon, ErrorFallback, ErrorPage, Popover, Spinner } from '@coldpbc/components';
import { HexColors } from '@coldpbc/themes';
import { ButtonTypes, GlobalSizes, IconNames } from '@coldpbc/enums';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { MaterialGraphQL, ToastMessage } from '@coldpbc/interfaces';
import { get } from 'lodash';
import { useAddToastMessage, useAuth0Wrapper, useColdContext, useGraphQLMutation, useGraphQLSWR } from '@coldpbc/hooks';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface EditMaterialDetailsProps {
	material: MaterialGraphQL;
	onClose: () => void;
	refreshMaterial: () => void;
}

const _EditMaterialDetails: React.FC<EditMaterialDetailsProps> = ({ material, onClose, refreshMaterial }) => {
	const { orgId } = useAuth0Wrapper();
	const { logBrowser } = useColdContext();
	const { addToastMessage } = useAddToastMessage();
	const [isLoading, setIsLoading] = useState(false);
  const [editedMaterial, setEditedMaterial] = useState<MaterialGraphQL | undefined>(material);

  useEffect(() => {
    setEditedMaterial(material);
  }, [material])

	const materialClassificationsQuery = useGraphQLSWR<{
		materialClassifications: { id: string; name: string }[];
	}>('GET_ALL_MATERIAL_CLASSIFICATIONS');
	const { mutateGraphQL: updateMaterial } = useGraphQLMutation('UPDATE_MATERIAL');

	const options = useMemo(() => {
		const materialClassifications: { id: string; name: string }[] | undefined = get(materialClassificationsQuery.data, 'data.materialClassifications');

		if (!materialClassifications) return null;

		const classificationOptions = materialClassifications
			.sort((a, b) => a.name.localeCompare(b.name))
			.map(classification => ({
				value: classification.id,
				label: classification.name,
			}));

		return [{ value: '', label: 'None' }, ...classificationOptions];
	}, [materialClassificationsQuery.data]);

	const saveMaterialChange = useCallback(
		async (editedMaterial: MaterialGraphQL) => {
			setIsLoading(true);

			try {
				await updateMaterial({
					input: {
            id: editedMaterial.id,
            // Only update materialClassification if there's a new value, due to a bug we can't unset it
            materialClassification: editedMaterial.materialClassification ? {
              id: editedMaterial.materialClassification?.id,
            } : undefined,
          },
				});

				logBrowser(`Updated material ${material.id} successfully`, 'info', {
					orgId,
					materialId: material.id,
				});

				// Revalidate material query
				refreshMaterial();

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
		[orgId, material, onClose, logBrowser, addToastMessage, refreshMaterial, updateMaterial],
	);

  const cancelCta = {
    text: 'Cancel',
    action: () => {
      setEditedMaterial(undefined);
      onClose();
    },
    variant: ButtonTypes.secondary,
  }

	// Handle loading and error states
	if (materialClassificationsQuery.isLoading) {
		return (
      <Card title={'Details'} ctas={[cancelCta]} className='w-[406px] min-w-[406px] h-fit' overflowHidden={false}>
				<Spinner size={GlobalSizes.large} />
			</Card>
		);
	}

	const error = materialClassificationsQuery.error || get(materialClassificationsQuery.data, 'errors');
	if (error) {
		logBrowser('Error fetching material classification data', 'error', {}, error);
		return (
      <Card title={'Details'} ctas={[cancelCta]} className='w-[406px] min-w-[406px] h-fit' overflowHidden={false}>
				<ErrorPage error="Unable to load material edit modal. Please try again later." showLogout={false} />
			</Card>
		);
	}

	if (!options) return null;

	const ctas = [
    cancelCta,
		{
			text: 'Save',
			action: async () => {
				if (editedMaterial) {
					await saveMaterialChange(editedMaterial);
				}
			},
			disabled: !editedMaterial || editedMaterial.materialClassification?.id === material.materialClassification?.id,
			loading: isLoading,
      variant: ButtonTypes.primary,
		},
	];

	return (
		<Card title={'Details'} ctas={ctas} className='w-[406px] min-w-[406px] h-fit' overflowHidden={false}>
      <div className={'flex flex-col w-full h-full justify-between gap-4'}>
        <div className="w-full h-fit flex flex-col gap-2 items-start">
          <div className="text-eyebrow text-tc-disabled">
            <div className={'flex items-center justify-start gap-1'}>
              <span>Classification</span>
              <Popover
                content={'This classification is used for carbon accounting and sustainability attribute reporting.'}
                contentClassName="w-[275px]">
                <ColdIcon name={IconNames.ColdInfoIcon} color={HexColors.tc['disabled']} />
              </Popover>
            </div>
          </div>
          <Autocomplete
            fullWidth
            disableClearable
            id={'material-classification-select'}
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: 'transparent',
              },
              '& .MuiAutocomplete-popupIndicator': {
                padding: '8px',
              },
            }}
            options={options}
            value={editedMaterial?.materialClassification ? { value: editedMaterial.materialClassification.id, label: editedMaterial.materialClassification.name } : undefined}
            onChange={(_event, newValue) => {
              if (editedMaterial && newValue) {
                setEditedMaterial({...editedMaterial, materialClassification: { id: newValue.value, name: newValue.label }});
              }
            }}
            popupIcon={<ColdIcon name={IconNames.ColdChevronDownIcon} className="h-[10px] w-[10px]" />}
            autoHighlight
            getOptionLabel={option => option.label}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              return (
                <Box key={key} component="li"
                     sx={{ '& > img': { mr: 2, flexShrink: 0 }, borderRadius: '8px' }} {...optionProps}>
                  <span className="text-body text-tc-primary">{option.label}</span>
                </Box>
              );
            }}
            renderInput={params => (
              <TextField
                {...params}
                sx={{
                  '& .MuiInputBase-input': {
                    backgroundColor: 'transparent',
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    padding: '16px',
                    borderBottomLeftRadius: '8px',
                    borderTopLeftRadius: '8px',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderRadius: '8px',
                    borderColor: HexColors.gray['90'],
                    borderWidth: '1.5px',
                  },
                  '&  .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '&:hover fieldset': {
                      borderColor: HexColors.gray['90'],
                      borderWidth: '1.5px',
                    },
                    '&:focus-within fieldset': {
                      borderColor: HexColors.gray['90'],
                      borderWidth: '1.5px',
                    },
                  },
                  '& .MuiOutlinedInput-input:focus': {
                    outline: 'none',
                    boxShadow: 'none',
                  },
                }}
              />
            )}
          />
        </div>
      </div>
    </Card>
);
};

export const EditMaterialDetails = withErrorBoundary(_EditMaterialDetails, {
	FallbackComponent: props => <ErrorFallback {...props} />,
});
