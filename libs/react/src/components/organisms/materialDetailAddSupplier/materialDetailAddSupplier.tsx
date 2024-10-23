import { InputOption, MaterialsWithCertifications, SuppliersWithCertifications, ToastMessage } from '@coldpbc/interfaces';
import { ButtonTypes } from '@coldpbc/enums';
import React, { useEffect, useState } from 'react';
import { axiosFetcher } from '@coldpbc/fetchers';
import { isAxiosError } from 'axios';
import { useAddToastMessage, useAuth0Wrapper, useOrgSWR } from '@coldpbc/hooks';
import { ErrorFallback, Modal, Select, Spinner } from '@coldpbc/components';
import { get } from 'lodash';
import { withErrorBoundary } from 'react-error-boundary';

const _MaterialDetailAddSupplier = (props: {
	showAddSupplierModal: boolean;
	setShowAddSupplierModal: (show: boolean) => void;
	material: MaterialsWithCertifications;
	refreshMaterials: () => void;
}) => {
	const { getOrgSpecificUrl } = useAuth0Wrapper();
	const { showAddSupplierModal, setShowAddSupplierModal, material, refreshMaterials } = props;
	const { addToastMessage } = useAddToastMessage();
	const [supplierSelected, setSupplierSelected] = useState<string | undefined>(undefined);
	const [suppliers, setSuppliers] = useState<SuppliersWithCertifications[]>([]);
	const [addSupplierLoading, setAddSupplierLoading] = useState<boolean>(false);
	const suppliersSWR = useOrgSWR<SuppliersWithCertifications[], any>([`/suppliers`, 'GET'], axiosFetcher);
	const [supplierOptions, setSupplierOptions] = useState<InputOption[]>([]);

	const addSupplier = async () => {
		setAddSupplierLoading(true);
		const supplier = suppliers.find(supplier => supplier.id === supplierSelected);
		if (supplier) {
			const response = await axiosFetcher([getOrgSpecificUrl(`/materials/${material.id}/supplier/${supplier.id}`), 'POST']);
			if (isAxiosError(response)) {
				addToastMessage({ message: 'Failed to add supplier', type: ToastMessage.FAILURE });
			} else {
				refreshMaterials();
				setShowAddSupplierModal(false);
				addToastMessage({ message: 'Supplier added successfully', type: ToastMessage.SUCCESS });
			}
		}
		setAddSupplierLoading(false);
	};

	useEffect(() => {
		if (suppliersSWR.data) {
			if (isAxiosError(suppliersSWR.data)) {
				// handle no suppliers 404, set state to empty array
				if (isAxiosError(suppliersSWR.data) && suppliersSWR.data?.response?.status === 404) {
					setSuppliers([]);
					setSupplierOptions([]);
					setSupplierSelected(undefined);
				}
			} else {
				// filter out the suppliers that are already associated with the material
				const suppliers = suppliersSWR.data.filter(supplier => {
					return !material.material_suppliers.some(materialSupplier => materialSupplier.supplier.id === supplier.id);
				});
				setSuppliers(suppliers);
				setSupplierOptions(
					suppliers.map((supplier, index) => {
						return {
							id: index,
							name: supplier.name,
							value: supplier.id,
						};
					}),
				);
				setSupplierSelected(get(suppliers, '[0].id', undefined));
			}
		}
	}, [suppliersSWR.data, material]);

	return (
		<Modal
			show={showAddSupplierModal}
			setShowModal={setShowAddSupplierModal}
			header={{
				title: `Add supplier to ${material.name}`,
				cardProps: {
					glow: false,
				},
			}}
			body={
				<div className={'w-full flex flex-col gap-[8px] my-4'}>
					{supplierOptions.length > 0 && supplierSelected ? (
						<>
							<div className={'w-full text-tc-primary'}>Category</div>
							{suppliersSWR.isLoading ? (
								<Spinner />
							) : (
								<Select
									options={supplierOptions}
									name={'supplier'}
									value={supplierSelected}
									onChange={(e: InputOption) => {
										setSupplierSelected(e.value);
									}}
									buttonClassName={'w-full border-[1.5px] border-gray-90 rounded-[8px]'}
								/>
							)}
						</>
					) : (
						<div className={'w-full text-tc-primary'}>No suppliers available to add</div>
					)}
				</div>
			}
			footer={{
				rejectButton: {
					label: 'Cancel',
					onClick: () => setShowAddSupplierModal(false),
					variant: ButtonTypes.secondary,
				},
				resolveButton: {
					label: 'Add Supplier',
					onClick: addSupplier,
					loading: addSupplierLoading,
					variant: ButtonTypes.primary,
				},
			}}
		/>
	);
};

export const MaterialDetailAddSupplier = withErrorBoundary(_MaterialDetailAddSupplier, {
	FallbackComponent: props => <ErrorFallback {...props} />,
});
