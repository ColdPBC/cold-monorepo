import React from 'react';
import { ErrorFallback, ErrorPage, MainContent, MuiDataGrid, Spinner } from '@coldpbc/components';
import { EntityLevel } from '@coldpbc/enums';
import { withErrorBoundary } from 'react-error-boundary';
import { useAuth0Wrapper, useColdContext, useEntityData, useGraphQLSWR } from '@coldpbc/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { BaseEntity, SustainabilityAttributeGraphQL } from '@coldpbc/interfaces';
import { get, isError, toLower, uniq } from 'lodash';
import { processSustainabilityAttributeDataFromGraphQL, toSentenceCase } from '@coldpbc/lib';
import { GridColDef } from '@mui/x-data-grid';

const COLOR_FOR_ENTITY_LEVEL = {
	[EntityLevel.MATERIAL]: 'bg-purple-300',
	[EntityLevel.PRODUCT]: 'bg-lightblue-300',
	[EntityLevel.SUPPLIER]: 'bg-teal-300',
};

export const _SustainabilityAttributeDetail = () => {
	const { id: sustainabilityAttributeId } = useParams();
	const { orgId } = useAuth0Wrapper();
	const { logBrowser } = useColdContext();
	const navigate = useNavigate();

	const sustainabilityAttributeQuery = useGraphQLSWR<{
		sustainabilityAttribute: SustainabilityAttributeGraphQL | null;
	}>('GET_SUSTAINABILITY_ATTRIBUTE', {
		id: sustainabilityAttributeId,
		organizationId: orgId,
	});

	// Get the level from the query result, if available
	const sustainabilityAttribute = React.useMemo(() => {
		if (!sustainabilityAttributeQuery.data?.data?.sustainabilityAttribute) return undefined;
		return processSustainabilityAttributeDataFromGraphQL([sustainabilityAttributeQuery.data.data.sustainabilityAttribute])[0];
	}, [sustainabilityAttributeQuery.data]);

  // The entity query isn't valid for Organization-level attributes (for which this page will return null)
	const validLevel = sustainabilityAttribute?.level === EntityLevel.ORGANIZATION ? undefined : sustainabilityAttribute?.level;
	const entities = useEntityData(validLevel, orgId, sustainabilityAttribute?.attributeAssurances || []);

	// Handle loading state
	if (sustainabilityAttributeQuery.isLoading) {
		return <Spinner />;
	}

	// Handle error state
	if (isError(sustainabilityAttributeQuery.data)) {
		const error = get(sustainabilityAttributeQuery.data, 'error', null);
		if (error) {
			logBrowser('Error fetching sustainability attribute', 'error', { error }, error);
		}
		return <ErrorPage error={'An error occurred'} showLogout={false} />;
	}

	if (!sustainabilityAttribute || !validLevel) {
		return null;
	}

	const levelLabel = `${toSentenceCase(EntityLevel[sustainabilityAttribute.level])}-Level`;
	const subtitle = [levelLabel].filter(val => !!val).join(' | ');

	const uniqCategories = uniq(entities.map(entity => entity.category))
		.filter(Boolean)
		.sort((a, b) => a.localeCompare(b));

	const uniqSubCategories = uniq(entities.map(entity => entity.subcategory))
		.filter(Boolean)
		.sort((a, b) => a.localeCompare(b));

	const columns: GridColDef[] = [
		{
			field: 'name',
			headerName: `${toSentenceCase(EntityLevel[sustainabilityAttribute.level])} Name`,
			headerClassName: 'bg-gray-30 h-[37px] text-body',
			flex: 1,
			minWidth: 230,
		},
		{
			field: 'hasAttribute',
			headerName: 'Has Attribute?',
			headerClassName: 'bg-gray-30 h-[37px] text-body',
			flex: 1,
			minWidth: 230,
			renderCell: params => {
				const iconColor = params.value ? COLOR_FOR_ENTITY_LEVEL[validLevel] : 'bg-bgc-menu';
				return (
					<div className={'flex justify-start items-center gap-2'}>
						<div className={`w-[13px] h-[13px] ${iconColor} rounded-full`} />
						<span>{params.value ? 'True' : 'False'}</span>
					</div>
				);
			},
		},
		{
			field: 'category',
			headerName: 'Category',
			headerClassName: 'bg-gray-30 h-[37px] text-body',
			flex: 1,
			minWidth: 230,
			type: 'singleSelect',
			valueOptions: uniqCategories,
		},
		{
			field: 'subcategory',
			headerName: 'Sub Category',
			headerClassName: 'bg-gray-30 h-[37px] text-body',
			flex: 1,
			minWidth: 230,
			type: 'singleSelect',
			valueOptions: uniqSubCategories,
		},
	];

	const onRowClick = (entity: BaseEntity) => {
		// Navigate to a destination like /materials/1 or /suppliers/2
		const navigationUrl = `/${toLower(EntityLevel[sustainabilityAttribute.level])}s/${entity.id}`;
		return navigate(navigationUrl);
	};

	return (
		<MainContent
			title={sustainabilityAttribute.name}
			subTitle={subtitle}
      imageUrl={sustainabilityAttribute.logoUrl}
			breadcrumbs={[{ label: 'Sustainability', href: '/sustainability' }, { label: sustainabilityAttribute.name }]}
			className="w-[calc(100%)]">
			<div className={'w-full'}>
				<MuiDataGrid
					rows={entities}
					onRowClick={params => onRowClick(params.row)}
					columns={columns}
					columnHeaderHeight={55}
					rowHeight={48}
					showManageColumns
					showExport
					showSearch
					initialState={{
						sorting: {
							sortModel: [
								{ field: 'hasAttribute', sort: 'desc' },
								{ field: 'name', sort: 'asc' },
							],
						},
					}}
				/>
			</div>
		</MainContent>
	);
};

export const SustainabilityAttributeDetail = withErrorBoundary(_SustainabilityAttributeDetail, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in SustainabilityAttributeDetail: ', error);
	},
});
