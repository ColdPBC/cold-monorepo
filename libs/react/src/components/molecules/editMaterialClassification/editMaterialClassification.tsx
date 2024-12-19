import { BaseButton, Card, ColdIcon, Dropdown, ErrorFallback, ErrorPage, Spinner } from '@coldpbc/components';
import { Modal as FBModal } from 'flowbite-react';
import { flowbiteThemeOverride, HexColors } from '@coldpbc/themes';
import { ButtonTypes, EntityLevel, GlobalSizes, IconNames } from '@coldpbc/enums';
import React, { useCallback, useMemo, useState } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { MaterialGraphQL, ToastMessage } from '@coldpbc/interfaces';
import { get, toLower } from 'lodash';
import { useAddToastMessage, useAuth0Wrapper, useColdContext, useGraphQLMutation, useGraphQLSWR } from '@coldpbc/hooks';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface EditMaterialClassificationProps {
	material: MaterialGraphQL;
	isOpen: boolean;
	onClose: () => void;
	refreshMaterial: () => void;
}

const _EditMaterialClassification: React.FC<EditMaterialClassificationProps> = ({ material, isOpen, onClose, refreshMaterial }) => {
	const { orgId } = useAuth0Wrapper();
	const { logBrowser } = useColdContext();
	const { addToastMessage } = useAddToastMessage();
	const [isLoading, setIsLoading] = useState(false);
	const [selectedClassification, setSelectedClassification] = useState<{ label: string; value: string } | undefined>(
		material.materialClassification
			? {
					label: material.materialClassification.name,
					value: material.materialClassification.id,
			  }
			: undefined,
	);

	const materialClassificationsQuery = useGraphQLSWR<{
		materialClassifications: { id: string; name: string }[];
	}>('GET_ALL_MATERIAL_CLASSIFICATIONS');
	const { mutateGraphQL: updateMaterialClassification } = useGraphQLMutation('UPDATE_MATERIAL_CLASSIFICATION');

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

	const saveClassificationChange = useCallback(
		async (newClassificationId: string) => {
			setIsLoading(true);

			try {
				await updateMaterialClassification({
					input: {
						id: material.id,
						materialClassification: newClassificationId
							? {
									id: newClassificationId,
							  }
							: null,
					},
				});

				logBrowser(`Updated material classification for material ${material.id} successfully`, 'info', {
					orgId,
					materialId: material.id,
					materialClassificationId: newClassificationId,
				});

				// Revalidate material query
				refreshMaterial();

				onClose();

				await addToastMessage({
					message: 'Sustainability attributes updated successfully',
					type: ToastMessage.SUCCESS,
				});
			} catch (e) {
				logBrowser(`Error updating material classification for material ${material.id}`, 'error', {
					orgId,
					materialId: material.id,
					materialClassificationId: newClassificationId,
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
		[orgId, material, onClose, logBrowser, addToastMessage, refreshMaterial, updateMaterialClassification],
	);

	// Handle loading and error states
	if (materialClassificationsQuery.isLoading) {
		return (
			<FBModal dismissible show={isOpen} onClose={onClose} theme={flowbiteThemeOverride.modal}>
				<Card className="relative p-4 w-[962px] bg-gray-20 flex items-center justify-center">
					<Spinner size={GlobalSizes.large} />
				</Card>
			</FBModal>
		);
	}

	const error = materialClassificationsQuery.error || get(materialClassificationsQuery.data, 'errors');
	if (error) {
		logBrowser('Error fetching material classification data', 'error', {}, error);
		return (
			<FBModal dismissible show={isOpen} onClose={onClose} theme={flowbiteThemeOverride.modal}>
				<Card className="relative p-4 w-[962px] bg-gray-20">
					<ErrorPage error="Unable to load sustainability attributes. Please try again later." showLogout={false} />
				</Card>
			</FBModal>
		);
	}

	if (!options) return null;

	return (
		<FBModal dismissible show={isOpen} onClose={onClose} theme={flowbiteThemeOverride.modal}>
			<Card title={'Edit Material Classification'} className="relative p-4 w-[500px] bg-gray-20" overflowHidden={false}>
				<div className={'flex flex-col w-full h-full justify-between gap-4'}>
					<span className={'text-body'}>This classification is used for carbon accounting and sustainability attribute reporting.</span>
					<Autocomplete
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
						value={selectedClassification}
						onChange={(_event, newValue) => {
							if (newValue) {
								setSelectedClassification(newValue);
							}
						}}
						popupIcon={<ColdIcon name={IconNames.ColdChevronDownIcon} className="h-[10px] w-[10px]" />}
						autoHighlight
						getOptionLabel={option => option.label}
						isOptionEqualToValue={(option, value) => option.value === value.value}
						renderOption={(props, option) => {
							const { key, ...optionProps } = props;
							return (
								<Box key={key} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 }, borderRadius: '8px' }} {...optionProps}>
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
					<div className="w-full flex justify-between">
						<BaseButton
							label="Cancel"
							onClick={() => {
								setSelectedClassification(undefined);
								onClose();
							}}
							variant={ButtonTypes.secondary}
						/>
						<BaseButton
							label={'Edit'}
							loading={isLoading}
							onClick={() => {
								if (selectedClassification) {
									saveClassificationChange(selectedClassification.value);
								}
							}}
							disabled={!selectedClassification || selectedClassification.value === material.materialClassification?.id}
						/>
					</div>
				</div>
			</Card>
		</FBModal>
	);
};

export const EditMaterialClassification = withErrorBoundary(_EditMaterialClassification, {
	FallbackComponent: props => <ErrorFallback {...props} />,
});
