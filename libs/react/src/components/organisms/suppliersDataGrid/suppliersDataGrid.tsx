import {
	GridColDef,
	GridColumnHeaderParams,
	GridRenderCellParams,
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarExport,
	GridToolbarQuickFilter,
	GridTreeNodeWithRender,
	GridValidRowModel,
} from '@mui/x-data-grid';
import { IconNames } from '@coldpbc/enums';
import { ColdIcon, DataGridCellHoverPopover, MuiDataGrid, Spinner, SustainabilityAttributeColumnList } from '@coldpbc/components';
import React, { useEffect, useState } from 'react';
import { SuppliersWithAssurances, SustainabilityAttributeAssurance } from '@coldpbc/interfaces';
import { useAuth0Wrapper, useGraphQLSWR } from '@coldpbc/hooks';
import { useNavigate } from 'react-router-dom';
import { get, has, isEqual, uniqWith } from 'lodash';
import { listFilterOperators, listSortComparator, mapAttributeAssurancesToSustainabilityAttributes } from '@coldpbc/lib';
import { useFlags } from 'launchdarkly-react-client-sdk';

export const SuppliersDataGrid = (props: { tier: number }) => {
	const ldFlags = useFlags();
	const { tier } = props;
	const navigate = useNavigate();
	const [suppliers, setSuppliers] = useState<SuppliersWithAssurances[]>([]);
	const { orgId } = useAuth0Wrapper();
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

	useEffect(() => {
		if (suppliersQuery.data) {
			if (has(suppliersQuery.data, 'errors')) {
				setSuppliers([]);
			} else {
				const suppliers = get(suppliersQuery.data, 'data.organizationFacilities', []).filter((supplier: SuppliersWithAssurances) => supplier.supplierTier === tier);
				setSuppliers(suppliers);
			}
		}
	}, [suppliersQuery.data, tier]);

	if (suppliersQuery.isLoading) {
		return <Spinner />;
	}

	const renderHeader = (params: GridColumnHeaderParams<any, any, any>) => {
		// check if the header is materials or products
		// then return the appropriate icon with the header title: Materials or Products
		return (
			<div className={'h-full w-full flex flex-row items-center gap-[10px]'}>
				<ColdIcon name={tier === 1 ? IconNames.ColdProductsNavIcon : IconNames.ColdMaterialsNavIcon} />
				<div className={'text-tc-primary text-body font-bold'}>{tier === 1 ? 'Products' : 'Materials'}</div>
			</div>
		);
	};

	const uniqSusAttributes = uniqWith(
		suppliers
			.map(supplier =>
				supplier.attributeAssurances.map(assurance => {
					return assurance.sustainabilityAttribute.name;
				}),
			)
			.flat(),
		isEqual,
	);

	const columns: GridColDef[] = [
		{
			field: 'name',
			headerName: 'Name',
			headerClassName: 'bg-gray-30 h-[37px] text-body',
			flex: 1,
			minWidth: 230,
			cellClassName: 'text-body text-tc-primary font-bold truncate',
		},
		{
			field: 'country',
			headerName: 'Country',
			headerClassName: 'bg-gray-30 h-[37px] text-body',
			flex: 1,
			minWidth: 180,
		},
		{
			// sustainability attributes
			field: 'sustainabilityAttributes',
			headerName: 'Sustainability Attributes',
			headerClassName: 'bg-gray-30 h-[37px] text-body',
			valueOptions: uniqSusAttributes,
			renderCell: params => {
				return <SustainabilityAttributeColumnList sustainabilityAttributes={params.value} />;
			},
			type: 'singleSelect',
			sortComparator: listSortComparator,
			filterOperators: listFilterOperators,
			minWidth: 350,
			flex: 1,
		},
	];

	if (tier === 1) {
		const uniqProducts = uniqWith(suppliers.map(supplier => supplier.products.map(product => product.name)).flat(), isEqual);
		// add a products column
		columns.push({
			field: 'products',
			headerName: 'Products',
			headerClassName: 'bg-gray-30 h-[37px] text-body',
			renderCell: params => {
				return <DataGridCellHoverPopover params={params} />;
			},
			renderHeader: renderHeader,
			type: 'singleSelect',
			sortComparator: listSortComparator,
			filterOperators: listFilterOperators,
			valueOptions: uniqProducts,
			minWidth: 350,
			flex: 1,
		});
	} else {
		const uniqMaterials = uniqWith(suppliers.map(supplier => supplier.materialSuppliers.map(materialSupplier => materialSupplier.material.name)).flat(), isEqual);
		columns.push({
			field: 'materials',
			headerName: 'Materials',
			headerClassName: 'bg-gray-30 h-[37px] text-body',
			renderCell: params => {
				return <DataGridCellHoverPopover params={params} />;
			},
			renderHeader: renderHeader,
			type: 'singleSelect',
			sortComparator: listSortComparator,
			filterOperators: listFilterOperators,
			valueOptions: uniqMaterials,
			minWidth: 350,
			flex: 1,
		});
	}

	const newRows: GridValidRowModel[] = [];

	suppliers.forEach((supplier, index) => {
		const extraAttributes: SustainabilityAttributeAssurance[] = [];

		if (ldFlags.showEntitySustainabilityAttributesForRelatedEntitiesCold1128) {
			extraAttributes.push(...supplier.products.map(product => product.attributeAssurances).flat());
			extraAttributes.push(...supplier.materialSuppliers.map(materialSupplier => materialSupplier.material.attributeAssurances).flat());
		}

		const allAttributeAssurances = [...supplier.attributeAssurances, ...extraAttributes];

		const sustainabilityAttributes = mapAttributeAssurancesToSustainabilityAttributes(allAttributeAssurances);

		const row = {
			id: supplier.id,
			name: supplier.name,
			country: supplier.country ?? '',
			sustainabilityAttributes: sustainabilityAttributes,
		};

		if (tier === 1) {
			row['products'] = supplier.products.map(product => product.name);
		} else {
			row['materials'] = supplier.materialSuppliers.map(materialSupplier => materialSupplier.material.name);
		}
		newRows.push(row);
	});

	const rows: GridValidRowModel[] = newRows;

	const getToolbar = () => {
		return (
			<GridToolbarContainer>
				<GridToolbarColumnsButton
					slotProps={{
						tooltip: {
							sx: {
								'& .MuiInput-input': {
									backgroundColor: 'transparent',
									fontFamily: 'Inter',
									fontSize: '14px',
									padding: '4px 0px 5px',
									height: '32px',
								},
								'& .MuiDataGrid-filterFormColumnInput': {
									backgroundColor: 'transparent',
								},
							},
						},
					}}
				/>
				<GridToolbarExport />
				<GridToolbarQuickFilter />
			</GridToolbarContainer>
		);
	};

	return (
		<div className={'w-full'}>
			<MuiDataGrid
				rows={rows}
				columns={columns}
				onRowClick={params => {
					// navigate(`/suppliers/${params.row.id}`);
					// todo: add back in when the supplier detail page is ready
				}}
				slots={{ toolbar: getToolbar }}
				columnHeaderHeight={55}
				rowHeight={114}
			/>
		</div>
	);
};
