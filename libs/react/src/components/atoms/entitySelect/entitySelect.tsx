import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ColdIcon, ErrorFallback } from '@coldpbc/components';
import { EntityLevel, IconNames } from '@coldpbc/enums';
import { HexColors } from '@coldpbc/themes';
import { useAuth0Wrapper, useGraphQLSWR } from '@coldpbc/hooks';
import { get, toLower } from 'lodash';
import { withErrorBoundary } from 'react-error-boundary';

// Types
interface BaseEntity {
	id: string;
	name: string;
}

interface ProductQuery extends BaseEntity {
	productCategory: string | null;
	productSubcategory: string | null;
	seasonCode: string | null;
}

interface SupplierQuery extends BaseEntity {
	category: string | null;
	subcategory: string | null;
	country: string | null;
}

type NoneOption = {
	id: string;
	name: 'None';
	subtitle?: never;
};

interface EntitySelectProps {
	entityLevel: EntityLevel;
	selectedValueId: string | null;
	setSelectedValueId: (value: string | null) => void;
}

// Hook for aligning Product and Supplier entity data fetching and transformation
function useEntityData(entityLevel: EntityLevel, orgId: string | undefined) {
	const queryMap = {
		[EntityLevel.PRODUCT]: {
			queryKey: 'GET_ALL_PRODUCTS_TO_ADD_ASSURANCE_TO_DOCUMENT',
			dataPath: 'data.products',
			subtitleFields: ['productCategory', 'productSubcategory', 'seasonCode'],
		},
		[EntityLevel.SUPPLIER]: {
			queryKey: 'GET_ALL_SUPPLIERS_TO_ADD_ASSURANCE_TO_DOCUMENT',
			dataPath: 'data.organizationFacilities',
			subtitleFields: ['category', 'subcategory', 'country'],
		},
	};

	const queryConfig = queryMap[entityLevel];
	const query = useGraphQLSWR<{
		products?: ProductQuery[];
		organizationFacilities?: SupplierQuery[];
	}>(orgId ? queryConfig.queryKey : null, {
		organizationId: orgId,
	});

	return React.useMemo(() => {
		const rawData = get(query.data, queryConfig.dataPath, []);
		return rawData
			.sort((a: BaseEntity, b: BaseEntity) => a.name.localeCompare(b.name))
			.map((entity: ProductQuery | SupplierQuery) => ({
				id: entity.id,
				name: entity.name,
				subtitle: queryConfig.subtitleFields
					.map(field => (entity as any)[field])
					.filter(Boolean)
					.join(' | '),
			}));
	}, [query.data, queryConfig.dataPath, queryConfig.subtitleFields]);
}

const _EntitySelect: React.FC<EntitySelectProps> = ({ entityLevel, selectedValueId, setSelectedValueId }) => {
	const { orgId } = useAuth0Wrapper();
	const noneOption: NoneOption = React.useMemo(() => ({ id: '', name: 'None' }), []);

	const entities = useEntityData(entityLevel, orgId);

	const options = React.useMemo(() => [noneOption, ...entities], [noneOption, entities]);

	const selectedOption = React.useMemo(() => options.find(option => option.id === selectedValueId) || noneOption, [options, selectedValueId, noneOption]);

	return (
		<Autocomplete
			id={`${toLower(EntityLevel[entityLevel])}-select`}
			sx={{
				'& .MuiInputBase-root': {
					backgroundColor: 'transparent',
				},
				'& .MuiAutocomplete-popupIndicator': {
					padding: '8px',
				},
			}}
			options={options}
			value={selectedOption}
			onChange={(event, newValue) => {
				setSelectedValueId(newValue ? newValue.id : null);
			}}
			popupIcon={<ColdIcon name={IconNames.ColdChevronDownIcon} className="h-[10px] w-[10px]" />}
			autoHighlight
			getOptionLabel={option => option.name}
			isOptionEqualToValue={(option, value) => option.id === value.id}
			renderOption={(props, option) => {
				const { key, ...optionProps } = props;
				return (
					<Box key={key} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 }, borderRadius: '8px' }} {...optionProps}>
						<div key={option.id} className="flex flex-col gap-1">
							<span className="text-body text-tc-primary">{option.name}</span>
							{option.subtitle && <span className="text-eyebrow text-tc-primary">{option.subtitle}</span>}
						</div>
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
	);
};

export const EntitySelect = withErrorBoundary(_EntitySelect, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, _info) => {
    console.error('Error occurred in EntitySelect: ', error);
  },
});
