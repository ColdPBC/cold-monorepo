import React, { useState } from 'react';
import {
	BaseButton,
  BulkEditSustainabilityAttributeModal,
	Card,
	CoverageSpreadBar,
	ErrorFallback,
	ErrorPage,
	MainContent,
	MuiDataGrid,
	Spinner,
	SustainabilityAttributeByProductTab,
	Tabs,
	TotalCoverageDonut,
} from '@coldpbc/components';
import { ButtonTypes, EntityLevel } from '@coldpbc/enums';
import { withErrorBoundary } from 'react-error-boundary';
import { useAuth0Wrapper, useColdContext, useEntityData, useGraphQLSWR } from '@coldpbc/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { BaseEntity, SustainabilityAttributeGraphQL } from '@coldpbc/interfaces';
import { get, groupBy, isError, toLower, uniq } from 'lodash';
import { processSustainabilityAttributeDataFromGraphQL, toSentenceCase } from '@coldpbc/lib';
import { GridCellParams, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { HexColors } from '@coldpbc/themes';
import { Checkbox } from '@mui/material';
import capitalize from 'lodash/capitalize';
import { useFlags } from 'launchdarkly-react-client-sdk';

const COLOR_FOR_ENTITY_LEVEL = {
	[EntityLevel.MATERIAL]: HexColors.purple['300'],
	[EntityLevel.PRODUCT]: HexColors.lightblue['300'],
	[EntityLevel.SUPPLIER]: HexColors.teal['300'],
};

// This is a temporary solution until the backend can provide a list of classifications
const filterableSustainabilityAttributes = {
  // RDS Staging
  '9e5f2088-03f0-4274-b142-80a210a82942': {
    type: 'RDS',
    environment: 'staging',
    classifications: [
      { id: '96', name: 'Duck Down insulation' },
      { id: '95', name: 'Goose Down Insulation' }
    ]
  },
  // RDS Production
  'cca7e119-727b-4784-92f9-252d1f2e687c': {
    type: 'RDS',
    environment: 'production',
    classifications: [
      { id: '96', name: 'Duck Down insulation' },
      { id: '95', name: 'Goose Down Insulation' }
    ]
  },
  // RWS Staging
  '389640c2-9c29-4946-8f12-f09978f2dc14': {
    type: 'RWS',
    environment: 'staging',
    classifications: [
      { id: '7', name: 'Sheep Wool insulation' },
      { id: '6', name: 'Wool fabric' }
    ]
  },
  // RWS Production
  '36d106e9-46ad-4f1b-8b19-b3115a0881c7': {
    type: 'RWS',
    environment: 'production',
    classifications: [
      { id: '7', name: 'Sheep Wool insulation' },
      { id: '6', name: 'Wool fabric' }
    ]
  }
};

export const _SustainabilityAttributeDetail = () => {
	const { id: sustainabilityAttributeId } = useParams();
	const ldFlags = useFlags();
  const { orgId } = useAuth0Wrapper();
	const { logBrowser } = useColdContext();
	const navigate = useNavigate();
	const [selectedView, setSelectedView] = React.useState('category');
  const [showBulkEditModal, setShowBulkEditModal] = React.useState(false);
  const [rowsSelected, setRowsSelected] = useState<GridRowSelectionModel>([]);
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
	const unfilteredEntities = useEntityData(validLevel, orgId, sustainabilityAttribute?.attributeAssurances || []);

  // Filter entities for the relevant material classification.
  // Right now this is only defined for RWS and RDS in Staging and Prod (per configuration above).
  const filterMaterials = ldFlags.cold1292MaterialReportsFilteredForRelevantMaterialClass && validLevel === EntityLevel.MATERIAL && sustainabilityAttributeId && sustainabilityAttributeId in filterableSustainabilityAttributes;
  const relevantMaterialClassifications = sustainabilityAttributeId ? filterableSustainabilityAttributes[sustainabilityAttributeId]?.classifications ?? [] : [];
  const relevantMaterialClassificationIds = relevantMaterialClassifications.map(classification => classification.id);
  const entities = relevantMaterialClassifications.length === 0 ? unfilteredEntities : unfilteredEntities.filter(entity => {
    const materialClassificationId = get(entity, 'classificationId', '');
    return relevantMaterialClassificationIds.includes(materialClassificationId);
  })

  logBrowser('Sustainability Attribute Detail', 'info', { orgId, sustainabilityAttributeId, entities, sustainabilityAttribute });
	// Donut chart setup
	const donutData = React.useMemo(() => {
		return {
			totalEntities: entities.length,
			entitiesWithAttribute: entities.filter(e => e.hasAttribute).length,
		};
	}, [entities]);

	// Coverage chart setup
	const barData = React.useMemo(() => {
    const categoryGroups = groupBy(entities, selectedView);
		const rawData = Object.entries(categoryGroups).map(([category, items]) => {
			const hasAttributeCount = items.filter(item => item.hasAttribute).length;
			const totalCount = items.length;

			return {
				category: category || (validLevel === EntityLevel.SUPPLIER ? 'No Country' : 'No Category'),
				hasAttributeCount,
				totalCount,
				percentage: (hasAttributeCount / totalCount) * 100,
			};
		});

		// Sort data by percentage in descending order
		const sortedData = [...rawData].sort((a, b) => b.percentage - a.percentage);

		// We only want to display up to 7 categories
		if (sortedData.length <= 7) {
			return sortedData;
		} else {
			const otherWithAttribute = sortedData.slice(6).reduce((count, item) => count + item.hasAttributeCount, 0);
			const otherTotal = sortedData.slice(6).reduce((count, item) => count + item.totalCount, 0);
			return [...sortedData.slice(0, 6), { category: 'Other', hasAttributeCount: otherWithAttribute, totalCount: otherTotal, percentage: (otherWithAttribute / otherTotal) * 100 }];
		}
	}, [entities, selectedView]);

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

	const accentColor = COLOR_FOR_ENTITY_LEVEL[validLevel];

	// Header setup
	const levelLabel = `${toSentenceCase(EntityLevel[sustainabilityAttribute.level])}-Level`;
  const appliesTo = relevantMaterialClassificationIds.length > 0 ? `Applies to: ${relevantMaterialClassifications.map(classification => classification.name).join(', ')}` : '';
	const subtitle = [levelLabel, appliesTo].filter(val => !!val).join(' | ');

	// Data Grid setup
	const uniqCategories = uniq(entities.map(entity => entity.category))
		.filter(Boolean)
		.sort((a, b) => a.localeCompare(b));

	const uniqSubCategories = uniq(entities.map(entity => entity.subcategory))
		.filter(Boolean)
		.sort((a, b) => a.localeCompare(b));

  const categoryFields: GridColDef[] = validLevel === EntityLevel.SUPPLIER ? [
    {
      field: 'category',
      headerName: 'Country',
      headerClassName: 'bg-gray-30 h-[37px] text-body',
      flex: 1,
      minWidth: 230,
      type: 'singleSelect',
      valueOptions: uniqCategories,
    },
  ] : [
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
  ]

	const columns: GridColDef[] = [
    {
      field: 'checkbox',
      editable: false,
      sortable: false,
      hideSortIcons: true,
      width: 100,
      headerClassName: 'bg-gray-30',
      renderCell: (params: GridCellParams) => (
        <Checkbox
          checked={rowsSelected.includes(params.row.id) || false}
          onClick={() => setRowsSelected((prev) => {
            if (prev.includes(params.row.id)) {
              return prev.filter((id) => id !== params.row.id);
            } else {
              return [...prev, params.row.id];
            }
          })}
        />
      ),
      renderHeader: (params) => (
        <Checkbox
          checked={rowsSelected.length === entities.length && rowsSelected.length > 0}
          indeterminate={rowsSelected.length > 0 && rowsSelected.length < entities.length}
          onClick={(e) => {
            if(rowsSelected.length === entities.length) {
              setRowsSelected([]);
            } else if(rowsSelected.length > 0) {
              setRowsSelected([]);
            } else {
              setRowsSelected(entities.map(r => r.id));
            }
          }}
        />
      ),
    },
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
				const iconColor = params.value ? accentColor : HexColors.bgc.menu;
				return (
					<div className={'flex justify-start items-center gap-2'}>
						<div className={`w-[13px] h-[13px] rounded-full`} style={{ backgroundColor: iconColor }} />
						<span>{params.value ? 'True' : 'False'}</span>
					</div>
				);
			},
		},
    ...categoryFields
	];

	const onRowClick = (entity: BaseEntity) => {
		// Navigate to a destination like /materials/1 or /suppliers/2
		const navigationUrl = `/${toLower(EntityLevel[sustainabilityAttribute.level])}s/${entity.id}`;
		return navigate(navigationUrl);
	};

  const getSelectedEntities = (rows: GridRowSelectionModel): BaseEntity[] => {
    return rows.map((id) => {
      const entity = entities.find((e) => e.id === id);
      if (!entity) return null;
      return entity;
    }).filter(Boolean) as BaseEntity[];
  }

  const dropdownOptions =
    validLevel === EntityLevel.SUPPLIER
      ? {}
      : {
        dropdownOptions: [
          { value: 'category', label: 'By Category' },
          { value: 'subcategory', label: 'By Sub Category' },
        ],
        selectedDropdownValue: selectedView,
        onDropdownSelect: setSelectedView,
      };

  const defaultTab = (
		<div className={'w-full flex flex-col items-center gap-10'}>
			<div className={'w-full flex justify-items-start gap-4'}>
				<Card title={'Total Coverage'} className={'w-full min-w-[600px] h-full'}>
					<TotalCoverageDonut {...donutData} accentColor={accentColor} entityLevel={sustainabilityAttribute.level} />
				</Card>
				<Card title={'Coverage Spread'} className={'w-full h-full min-w-[352px]'} {...dropdownOptions}>
					<CoverageSpreadBar data={barData} accentColor={accentColor} />
				</Card>
			</div>
			<div className={'flex flex-col w-full gap-4'}>
				<div className={'w-full flex items-center justify-between h-[40px]'}>
					<span className={'text-h3'}>{capitalize(EntityLevel[sustainabilityAttribute.level])}s</span>
					<BaseButton onClick={() => setShowBulkEditModal(true)} label={'Bulk Edit Attribute'} disabled={rowsSelected.length === 0} variant={ButtonTypes.secondary} />
				</div>
				<MuiDataGrid
					rows={entities}
					onCellClick={(params: GridCellParams) => {
						if (params.field === 'checkbox') return;
						onRowClick(params.row);
					}}
					columns={columns}
					columnHeaderHeight={55}
					rowHeight={48}
					showManageColumns
					showExport
					showSearch
					initialState={{
						sorting: {
							sortModel: [{ field: 'hasAttribute', sort: 'desc' }],
						},
					}}
					disableRowSelectionOnClick={true}
				/>
			</div>
			<BulkEditSustainabilityAttributeModal
				show={showBulkEditModal}
				setShow={setShowBulkEditModal}
				entities={getSelectedEntities(rowsSelected)}
				level={validLevel}
				refreshMaterials={() => {
					sustainabilityAttributeQuery.mutate();
          setRowsSelected([]);
				}}
				sustainabilityAttribute={sustainabilityAttribute}
			/>
		</div>
	);

	return (
		<MainContent
			title={sustainabilityAttribute.name}
			subTitle={subtitle}
			imageUrl={sustainabilityAttribute.logoUrl}
			breadcrumbs={[{ label: 'Sustainability', href: '/sustainability' }, { label: sustainabilityAttribute.name }]}
			className="w-[calc(100%)]">
			{/* If the sustainability attribute is material-level, add a tab structure to include the By Product view */}
      {/* However, we suppress it when filtering materials, e.g. for RDS and RWS */}
			{sustainabilityAttribute.level === EntityLevel.MATERIAL && !filterMaterials ? (
				<Tabs
					tabs={[
						{
							label: 'By Product',
							content: <SustainabilityAttributeByProductTab sustainabilityAttribute={sustainabilityAttribute} />,
						},
						{
							label: 'By Material',
							content: defaultTab,
						},
					]}
				/>
			) : (
				defaultTab
			)}
		</MainContent>
	);
};

export const SustainabilityAttributeDetail = withErrorBoundary(_SustainabilityAttributeDetail, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in SustainabilityAttributeDetail: ', error);
	},
});
