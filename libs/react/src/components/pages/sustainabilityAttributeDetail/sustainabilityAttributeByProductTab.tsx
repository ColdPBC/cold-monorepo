import React from 'react';
import { AverageCoverageDonut, BubbleList, Card, ColdIcon, CoverageSpreadBar, ErrorFallback, ErrorPage, MuiDataGrid, Popover, Spinner } from '@coldpbc/components';
import { EntityLevel, IconNames } from '@coldpbc/enums';
import { withErrorBoundary } from 'react-error-boundary';
import { useAuth0Wrapper, useColdContext, useGraphQLSWR } from '@coldpbc/hooks';
import { useNavigate } from 'react-router-dom';
import { ProductForMaterialLevelSustainabilityReport, ProductForMaterialLevelSustainabilityReportGraphQL, SustainabilityAttribute } from '@coldpbc/interfaces';
import { get, groupBy, isError } from 'lodash';
import { GridColDef } from '@mui/x-data-grid';
import { HexColors } from '@coldpbc/themes';

const ACCENT_COLOR = HexColors.lightblue['300'];

interface SustainabilityAttributeByProductTabProps {
	sustainabilityAttribute: SustainabilityAttribute;
}

const _SustainabilityAttributeByProductTab: React.FC<SustainabilityAttributeByProductTabProps> = ({ sustainabilityAttribute }) => {
	const { orgId } = useAuth0Wrapper();
	const { logBrowser } = useColdContext();
	const navigate = useNavigate();
  const [selectedView, setSelectedView] = React.useState('category');

	// The page is only valid for Material-level attributes (otherwise, this page will return null)
	const validLevel = sustainabilityAttribute.level === EntityLevel.MATERIAL;

	const productQuery = useGraphQLSWR<{
		products: ProductForMaterialLevelSustainabilityReportGraphQL[] | null;
	}>('GET_ALL_PRODUCTS_FOR_MATERIAL_LEVEL_SUSTAINABILITY_REPORT', {
		organizationId: orgId,
	});

	// Get the level from the query result, if available
	const products: ProductForMaterialLevelSustainabilityReport[] | undefined = React.useMemo(() => {
		if (!productQuery.data?.data?.products || !validLevel) {
			return undefined;
		}

		const uniqueMaterialIds = new Set(sustainabilityAttribute.attributeAssurances.map(assurance => assurance.entity.id));

		return productQuery.data.data.products.map(productGraphQL => {
			let materialCount = 0;
			let totalWeight = 0;
			let weightWithAttribute = 0;
			let hasMaterialWithMissingWeight = false;
			const materialNamesWithAttribute: string[] = [];

			productGraphQL.productMaterials.forEach(productMaterial => {
				if (productMaterial.weight === null) {
					// If any material is missing weight, we'll hide the % calculation
					hasMaterialWithMissingWeight = true;
				} else {
					totalWeight += productMaterial.weight;
				}

				if (uniqueMaterialIds.has(productMaterial.material.id)) {
					materialCount += 1;
					weightWithAttribute += productMaterial.weight || 0;
					materialNamesWithAttribute.push(productMaterial.material.name);
				}
			});

			const materialPercentByWeight = !hasMaterialWithMissingWeight && totalWeight > 0 ? (weightWithAttribute / totalWeight) * 100 : null;

			return {
				id: productGraphQL.id,
				name: productGraphQL.name,
				description: productGraphQL.description,
				seasonCode: productGraphQL.seasonCode,
				productCategory: productGraphQL.productCategory,
				productSubcategory: productGraphQL.productSubcategory,
				totalWeight,
				materialCount,
				materialPercentByWeight,
				materialList: materialNamesWithAttribute,
				tier1SupplierName: productGraphQL.organizationFacility?.name || '',
			};
		});
	}, [productQuery.data, sustainabilityAttribute]);

	// Donut chart setup
	const donutData = React.useMemo(() => {
		// Only consider products that have a non-null average.
		const productsWithMaterialWeight = products?.filter(product => product.materialPercentByWeight !== null) || [];
		const rawAverage =
			productsWithMaterialWeight.length > 0
				? productsWithMaterialWeight.reduce((sumHasAttribute, product) => sumHasAttribute + product.materialPercentByWeight!, 0) / productsWithMaterialWeight.length
				: 0;

		return {
			percentMaterialHasAttribute: Math.round(rawAverage),
		};
	}, [products]);

	// Coverage chart setup
	const barData = React.useMemo(() => {
		const groupByKey = selectedView === 'category' ? 'productCategory' : 'productSubcategory';
		const categoryGroups = groupBy(products, groupByKey);
		const rawData = Object.entries(categoryGroups).map(([category, items]) => {
			const hasAttributeAggregatePercent = items.filter(item => item.materialPercentByWeight != null).reduce((total, item) => total + item.materialPercentByWeight!, 0);
			const totalCount = items.length;

			return {
				category: category || 'No Category',
				hasAttributeAggregatePercent,
				totalCount,
				percentage: hasAttributeAggregatePercent / totalCount,
			};
		});

		// Sort data by percentage in descending order
		const sortedData = [...rawData].sort((a, b) => b.percentage - a.percentage);

		// We only want to display up to 7 categories
		if (sortedData.length <= 7) {
			return sortedData;
		} else {
			const otherWithAttribute = sortedData.slice(6).reduce((count, item) => count + item.hasAttributeAggregatePercent, 0);
			const otherTotal = sortedData.slice(6).reduce((count, item) => count + item.totalCount, 0);
			return [
				...sortedData.slice(0, 6),
				{
					category: 'Other',
					hasAttributeAggregatePercent: otherWithAttribute,
					totalCount: otherTotal,
					percentage: otherWithAttribute / otherTotal,
				},
			];
		}
	}, [products, selectedView]);

	// Handle loading state
	if (productQuery.isLoading) {
		return <Spinner />;
	}

	// Handle error state
	if (isError(productQuery.data)) {
		const error = get(productQuery.data, 'error', null);
		if (error) {
			logBrowser('Error fetching product data', 'error', { error }, error);
		}
		return <ErrorPage error={'An error occurred'} showLogout={false} />;
	}

	if (!validLevel || !products) {
		return null;
	}

	// Empty state when no weights are available for any product
	const hasAnyProductWithWeights = products.reduce((total, product) => total + product.totalWeight, 0) > 0;

	// Data Grid setup
	const columns: GridColDef[] = [
		{
			field: 'name',
			headerName: 'Product Name',
			headerClassName: 'bg-gray-30 h-[37px] text-body',
			flex: 1,
			minWidth: 230,
		},
		{
			field: 'materialCount',
			headerName: 'Count',
			headerClassName: 'bg-gray-30 h-[37px] text-body',
			flex: 1,
			minWidth: 50,
		},
		{
			field: 'materialPercentByWeight',
			headerName: 'Percent by Weight',
			headerClassName: 'bg-gray-30 h-[37px] text-body',
			flex: 1,
			minWidth: 50,
			renderCell: params => {
				if (params.value != null) {
					return `${params.value.toFixed(0)}%`;
				} else {
					return (
						<div className={'h-full flex gap-1 items-center justify-start'}>
							<Popover contentClassName="max-w-[260px]" content={'Product BOM has missing weights.'}>
								<ColdIcon className="text-tc-disabled" name={IconNames.ColdUnknownIcon} />
							</Popover>
							<span className="text-tc-disabled text-body">Unknown</span>
						</div>
					);
				}
			},
		},
		{
			field: 'materialList',
			headerName: 'List',
			headerClassName: 'bg-gray-30 h-[37px] text-body',
			flex: 1,
			minWidth: 400,
			renderCell: params => {
				return <BubbleList values={params.value} />;
			},
		},
		{
			field: 'tier1SupplierName',
			headerName: 'Tier 1 Supplier',
			headerClassName: 'bg-gray-30 h-[37px] text-body',
			flex: 1,
			minWidth: 230,
		},
	];

	const onRowClick = (product: ProductForMaterialLevelSustainabilityReport) => {
		const navigationUrl = `/products/${product.id}`;
		return navigate(navigationUrl);
	};

	return (
		<div className={'w-full flex flex-col items-center gap-10'}>
			{hasAnyProductWithWeights ? (
				<div className={'w-full flex justify-items-start gap-4'}>
					<Card title={'Percent by Weight, Averaged Across All Products'} className={'w-full min-w-[600px] h-full'}>
						<AverageCoverageDonut {...donutData} accentColor={ACCENT_COLOR} />
					</Card>
					<Card
						title={'Average Coverage By Weight Per Category'}
						className={'w-full h-full min-w-[352px]'}
						dropdownOptions={[
							{ value: 'category', label: 'By category' },
							{ value: 'subcategory', label: 'By subcategory' },
						]}
						selectedDropdownValue={(selectedView)}
						onDropdownSelect={setSelectedView}>
						<CoverageSpreadBar data={barData} accentColor={ACCENT_COLOR} />
					</Card>
				</div>
			) : (
				<Card className={'w-full text-tc-primary border-[2px] border-bgc-accent bg-gray-10'} glowColor={ACCENT_COLOR}>
					<div className={'w-full flex flex-col justify-start'}>
						<div className={'w-full text-h4'}>Reporting unavailable</div>
						<div className={'w-full text-body'}>
							{products.length === 0
								? 'Add products with BOMs to see this attribute reported by product and material weights. Contact Cold to get started.'
								: 'Add weights to your BOMs to see reporting on this attribute by product. Contact Cold to get started.'}
						</div>
					</div>
				</Card>
			)}
			<div className={'w-full'}>
				<MuiDataGrid
					rows={products}
					onRowClick={params => onRowClick(params.row)}
					columns={columns}
					columnHeaderHeight={55}
					columnGroupHeaderHeight={40}
					columnGroupingModel={[
						{
							groupId: 'materials',
							headerName: 'Materials with Attribute',
							headerClassName: 'bg-gray-50 text-eyebrow rounded-t-lg',
							headerAlign: 'center',
							children: [{ field: 'materialCount' }, { field: 'materialPercentByWeight' }, { field: 'materialList' }],
						},
					]}
					rowHeight={48}
					showManageColumns
					showExport
					showSearch
					initialState={{
						sorting: {
							sortModel: [{ field: 'materialPercentByWeight', sort: 'desc' }],
						},
					}}
          searchKey={`${sustainabilityAttribute.id}sustainabilityAttributeByProductsSearchValue`}
				/>
			</div>
		</div>
	);
};

export const SustainabilityAttributeByProductTab = withErrorBoundary(_SustainabilityAttributeByProductTab, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in SustainabilityAttributeByProductTab: ', error);
	},
});
