import React, { ReactNode, useEffect } from 'react';
import { Claims, FilesWithAssurances, InputOption, ToastMessage } from '@coldpbc/interfaces';
import { BaseButton, ColdIcon, DocumentDetailsMenu, DocumentMaterialsTable, DocumentSuppliersTable, ErrorFallback, Select, Spinner } from '@coldpbc/components';
import { ButtonTypes, IconNames } from '@coldpbc/enums';
import {forEach, get, has, lowerCase, startCase} from 'lodash';
import { withErrorBoundary } from 'react-error-boundary';
import { HexColors } from '@coldpbc/themes';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useAddToastMessage, useAuth0Wrapper, useColdContext, useGraphQLMutation } from '@coldpbc/hooks';
import { useSWRConfig } from 'swr';
import { isSameDay } from 'date-fns';
import { isApolloError } from '@apollo/client';
import {
  addTZOffset,
  getEffectiveEndDate,
  getEffectiveStartDate,
  removeTZOffset
} from '@coldpbc/lib';

const _DocumentDetailsSidebar = (props: {
	file: FilesWithAssurances | undefined;
	sustainabilityAttributes: Claims[];
  fileTypes: string[];
	refreshFiles: () => void;
	closeSidebar: () => void;
	innerRef: React.RefObject<HTMLDivElement>;
	deleteFile: (id: string) => void;
	isLoading: boolean;
	downloadFile: (url: string | undefined) => void;
	signedUrl: string | undefined;
	addAssurance: (
		fileState: {
			id: string;
			type: string;
			originalName: string;
			metadata: any;
			startDate: Date | null;
			endDate: Date | null;
			sustainabilityAttribute: string;
		},
		isAdding: boolean,
	) => void;
}) => {
	const { mutate } = useSWRConfig();
	const { logBrowser } = useColdContext();
	const { file, fileTypes, sustainabilityAttributes, closeSidebar, innerRef, deleteFile, isLoading, downloadFile, signedUrl, addAssurance } = props;
	const { orgId } = useAuth0Wrapper();
	const [saveButtonLoading, setSaveButtonLoading] = React.useState(false);
	const hasAssurances = get(file, 'attributeAssurances', []).length > 0;
	const hasSustainabilityAttribute = get(file, 'attributeAssurances[0].sustainabilityAttribute.name', '').length > 0;
	const { mutateGraphQL: updateAssurance } = useGraphQLMutation('UPDATE_DOCUMENT_ASSURANCE');
	const { mutateGraphQL: updateDocument } = useGraphQLMutation('UPDATE_DOCUMENT_FIELDS');
	const { mutateGraphQL: deleteAssurance } = useGraphQLMutation('DELETE_ATTRIBUTE_ASSURANCE');
	const { mutateGraphQL: createAttributeAssurance } = useGraphQLMutation('CREATE_ATTRIBUTE_ASSURANCE_FOR_FILE');
	const { addToastMessage } = useAddToastMessage();

	const deleteAttributeAssurance = async (id: string) => {
		const response = await deleteAssurance({
			filter: {
				id,
			},
		}).catch(error => {
			return error;
		});

		if (has(response, 'errors') || isApolloError(response)) {
			logBrowser('Error deleting assurance', 'error', { response });
			addToastMessage({
				message: 'Error deleting assurance',
				type: ToastMessage.FAILURE,
			});
		} else {
			logBrowser('Assurance deleted successfully', 'info', { response });
			addToastMessage({
				message: 'Assurance deleted successfully',
				type: ToastMessage.SUCCESS,
			});
		}
		await mutate('GET_ALL_FILES');
	};

	const getInitialFileState = (
		file: FilesWithAssurances | undefined,
	):
		| {
				id: string;
				type: string;
				originalName: string;
				metadata: any;
				startDate: Date | null;
				endDate: Date | null;
				sustainabilityAttribute: string;
		  }
		| undefined => {
		if (file) {
			const fileState: {
				id: string;
				type: string;
				originalName: string;
				metadata: any;
				startDate: Date | null;
				endDate: Date | null;
				sustainabilityAttribute: string;
			} = {
				id: file.id,
				type: file.type,
				originalName: file.originalName,
				metadata: file.metadata,
				startDate: null,
				endDate: null,
				sustainabilityAttribute: 'None',
			};

			const startDate = getEffectiveStartDate(file);
			const endDate = getEffectiveEndDate(file);

			fileState['startDate'] = startDate ? addTZOffset(startDate) : null;
			fileState['endDate'] = endDate ? addTZOffset(endDate) : null;

			if (hasSustainabilityAttribute) {
				fileState['sustainabilityAttribute'] = file.attributeAssurances[0]?.sustainabilityAttribute?.name || '';
			}
			return fileState;
		} else {
			return undefined;
		}
	};

	const [fileState, setFileState] = React.useState<
		| {
				id: string;
				type: string;
				originalName: string;
				metadata: any;
				startDate: Date | null;
				endDate: Date | null;
				sustainabilityAttribute: string;
		  }
		| undefined
	>(undefined);

	useEffect(() => {
		// listen to file changes and update the file state
		setFileState(getInitialFileState(file));
	}, [file]);

	const documentTypeOptions: InputOption[] = fileTypes.map((type, index) => {
		const name = startCase(lowerCase(type.replace(/_/g, ' ')));
		return {
			id: index,
			name: name,
			value: type,
		};
	}).sort((a, b) => a.name.localeCompare(b.name));

	const getSustainabilityAttributeDropdown = (fileState: {
		id: string;
		type: string;
		metadata: any;
		originalName: string;
		startDate: Date | null;
		endDate: Date | null;
		sustainabilityAttribute: string;
	}) => {
		// add option to dropdown that says "Select sustainability attribute"
		const selectSustainabilityAttributeOption = {
			id: -1,
			name: 'None',
			value: '',
		};

		const susAttributes: InputOption[] = [selectSustainabilityAttributeOption];
		sustainabilityAttributes.forEach((attribute, index) => {
			susAttributes.push({
				id: index,
				name: attribute.name,
				value: attribute.id,
			});
		});

		return (
			<div className={'w-full flex flex-col gap-[8px]'}>
				<div className={'w-full text-tc-primary text-eyebrow'}>Sustainability Attribute</div>
				<Select
					options={susAttributes}
					name={'sustainabilityAttribute'}
					value={fileState.sustainabilityAttribute}
					onChange={(e: InputOption) => {
						if (fileState === undefined) return;
						setFileState({ ...fileState, sustainabilityAttribute: e.name });
					}}
					buttonClassName={'w-full border-[1.5px] border-gray-90 rounded-[8px]'}
				/>
			</div>
		);
	};

	const getDatePickers = (fileState: {
		id: string;
		type: string;
		metadata: any;
		originalName: string;
		startDate: Date | null;
		endDate: Date | null;
		sustainabilityAttribute: string;
	}) => {
		return (
			<>
				<div className={'w-full flex flex-col gap-[8px]'}>
					<div className={'w-full text-tc-primary text-eyebrow'}>Start Date</div>
					<DesktopDatePicker
						// @ts-ignore
						value={fileState.startDate}
						onChange={(date: Date | null) => {
              if(date) {
                setFileState({...fileState, startDate: date});
              } else {
                setFileState({...fileState, startDate: date});
              }
						}}
						slotProps={{
							field: {
								clearable: true,
								onClear: () => {
									setFileState({ ...fileState, startDate: null });
								},
							},
							popper: {
								container: innerRef.current,
							},
						}}
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
				</div>
				<div className={'w-full flex flex-col gap-[8px]'}>
					<div className={'w-full text-tc-primary text-eyebrow'}>Expiration Date</div>
					<DesktopDatePicker
						// @ts-ignore
						value={fileState.endDate}
						onChange={(date: Date | null) => {
              if(date) {
                setFileState({...fileState, endDate: date});
              } else {
                setFileState({...fileState, endDate: date});
              }
						}}
						slotProps={{
							field: {
								clearable: true,
								onClear: () => {
									setFileState({ ...fileState, endDate: null });
								},
							},
							popper: {
								container: innerRef.current,
							},
						}}
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
				</div>
			</>
		);
	};

	const getAssociatedRecordsTables = (fileState: {
		id: string;
		type: string;
		metadata: any;
		originalName: string;
		startDate: Date | null;
		endDate: Date | null;
		sustainabilityAttribute: string;
	}) => {
		// get the claim level of the sustainability attribute
		let element: ReactNode | null = null;
		if (hasSustainabilityAttribute) {
			const attribute = sustainabilityAttributes.find(attribute => attribute.name === fileState.sustainabilityAttribute);
			if (attribute === undefined) {
				return null;
			}
			const claimLevel = attribute.level;
			switch (claimLevel) {
				case 'MATERIAL':
					element = <DocumentMaterialsTable deleteAttributeAssurance={deleteAttributeAssurance} assurances={file?.attributeAssurances || []} />;
					break;
				case 'SUPPLIER':
					element = <DocumentSuppliersTable deleteAttributeAssurance={deleteAttributeAssurance} assurances={file?.attributeAssurances || []} />;
					break;
				default:
					element = <DocumentSuppliersTable deleteAttributeAssurance={deleteAttributeAssurance} assurances={[]} />;
					break;
			}
		} else {
			return null;
		}
		const addButtonDisabled = !hasAssurances || hasFileStateChanged(fileState);
		return (
			<div className={'flex-col flex gap-[16px]'}>
				<div className={'flex flex-row justify-between'}>
					<div className={'text-h5'}>Associated Records</div>
					<BaseButton
						label={'Add'}
						onClick={() => {
							addAssurance(fileState, true);
						}}
						iconLeft={IconNames.PlusIcon}
						variant={ButtonTypes.secondary}
						disabled={addButtonDisabled}
					/>
				</div>
				<div className={'w-full'}>{element}</div>
			</div>
		);
	};

	const getSaveButton = (fileState: {
		id: string;
		type: string;
		metadata: any;
		originalName: string;
		startDate: Date | null;
		endDate: Date | null;
		sustainabilityAttribute: string;
	}) => {
		const fileStateValid = isFileStateValid(fileState);
		const hasFileChanged = hasFileStateChanged(fileState);
		let disabled = !fileStateValid || saveButtonLoading || !hasFileChanged;
		if (!hasAssurances) {
			disabled = !fileStateValid;
		}

		return (
			<div className={'w-auto'}>
				<BaseButton
					label={'Save'}
					onClick={() => {
						updateFileAndAssurances(fileState);
					}}
					variant={ButtonTypes.primary}
					disabled={disabled}
					loading={saveButtonLoading}
				/>
			</div>
		);
	};

	const updateFileAndAssurances = async (fileState: {
		id: string;
		type: string;
		originalName: string;
		metadata: any;
		startDate: Date | null;
		endDate: Date | null;
		sustainabilityAttribute: string;
	}) => {
		// loop through the assurances and update each assurance
		const compareFileState = getInitialFileState(file);
		if (file !== undefined && fileState !== undefined && compareFileState !== undefined) {
			setSaveButtonLoading(true);
			const promises: Promise<any>[] = [];
			if (hasFileStateChanged(fileState)) {
				const variables: {
					[key: string]: any;
				} = {
					input: {
						id: fileState.id,
						type: fileState.type,
					},
				};
				if (file.metadata) {
					variables.input.metadata = {
						...file.metadata,
						effective_start_date: fileState.startDate ? removeTZOffset(fileState.startDate.toISOString()) : null,
						effective_end_date: fileState.endDate ? removeTZOffset(fileState.endDate.toISOString()) : null,
					};
				}
				promises.push(updateDocument(variables));
			}

			if (
				compareFileState.endDate !== null &&
				compareFileState.startDate !== null &&
				fileState.endDate !== null &&
				fileState.startDate !== null &&
				isSameDay(compareFileState.startDate, fileState.startDate) &&
				isSameDay(compareFileState.endDate, fileState.endDate) &&
				compareFileState.sustainabilityAttribute === fileState.sustainabilityAttribute &&
				compareFileState.type !== fileState.type &&
				hasAssurances
			) {
				await Promise.all(promises)
					.then(responses => {
						mutate('GET_ALL_FILES');
						logBrowser('File updated successfully', 'info', {
							responses,
						});
						addToastMessage({
							message: 'File updated successfully',
							type: ToastMessage.SUCCESS,
						});
					})
					.catch(error => {
						logBrowser('Error updating file', 'error', { error });
						addToastMessage({
							message: 'Error updating file',
							type: ToastMessage.FAILURE,
						});
					});
				setSaveButtonLoading(false);
				return;
			}

			const sustainabilityAttribute = sustainabilityAttributes.find(attribute => attribute.name === fileState?.sustainabilityAttribute);
			if (sustainabilityAttribute === undefined) {
				return;
			}

			if (hasAssurances) {
				const deleteCals = getDeleteAttributeAssuranceCalls(sustainabilityAttribute);
				promises.push(...deleteCals);
				// update each assurance
				forEach(file.attributeAssurances, assurance => {
					if (assurance.organizationFacility !== null && sustainabilityAttribute.level === 'MATERIAL') {
						return;
					} else if (assurance.material !== null && sustainabilityAttribute.level === 'SUPPLIER') {
						return;
					}
					promises.push(
						updateAssurance({
							input: {
								id: assurance.id,
								effectiveStartDate: fileState.startDate ? removeTZOffset(fileState.startDate.toISOString()) : null,
								effectiveEndDate: fileState.endDate ? removeTZOffset(fileState.endDate.toISOString()) : null,
								sustainabilityAttribute: {
									id: sustainabilityAttribute?.id,
								},
								updatedAt: new Date().toISOString(),
							},
						}),
					);
				});
			} else {
				// create a new assurance
				promises.push(
					createAttributeAssurance({
						input: {
							effectiveStartDate: fileState.startDate ? removeTZOffset(fileState.startDate.toISOString()) : null,
							effectiveEndDate: fileState.endDate ? removeTZOffset(fileState.endDate.toISOString()) : null,
							organizationFile: {
								id: fileState.id,
							},
							sustainabilityAttribute: {
								id: sustainabilityAttribute.id,
							},
							organization: {
								id: orgId,
							},
							createdAt: new Date().toISOString(),
							updatedAt: new Date().toISOString(),
						},
					}),
				);
			}

			await Promise.all(promises)
				.then(responses => {
					mutate('GET_ALL_FILES');
					logBrowser('File and assurances updated successfully', 'info', {
						responses,
					});
					addToastMessage({
						message: 'File and assurances updated successfully',
						type: ToastMessage.SUCCESS,
					});
				})
				.catch(error => {
					logBrowser('Error updating file and assurances', 'error', { error });
					addToastMessage({
						message: 'Error updating file and assurances',
						type: ToastMessage.FAILURE,
					});
				});
			setSaveButtonLoading(false);
		}
	};

	const getDeleteAttributeAssuranceCalls = (newSustainabilityAttribute: Claims): Promise<any>[] => {
		const deleteCalls: Promise<any>[] = [];
		file?.attributeAssurances.forEach(assurance => {
			if (newSustainabilityAttribute.level === 'MATERIAL') {
				if (assurance.organizationFacility !== null) {
					deleteCalls.push(
						deleteAssurance({
							filter: {
								id: assurance.id,
							},
						}),
					);
				}
			} else if (newSustainabilityAttribute.level === 'SUPPLIER') {
				if (assurance.material !== null) {
					deleteCalls.push(
						deleteAssurance({
							filter: {
								id: assurance.id,
							},
						}),
					);
				}
			}
		});
		return deleteCalls;
	};

	const hasFileStateChanged = (fileState: {
		id: string;
		type: string;
		metadata: any;
		originalName: string;
		startDate: Date | null;
		endDate: Date | null;
		sustainabilityAttribute: string;
	}) => {
		if (file === undefined) return false;
		const compareFileState = getInitialFileState(file);
		if (fileState === undefined || compareFileState === undefined) return false;
		const startDatesAreSame = isSameDay(compareFileState.startDate || 0, fileState.startDate || 0);
		const endDatesAreSame = isSameDay(compareFileState.endDate || 0, fileState.endDate || 0);
		const compareFileStateSustainabilityAttribute = compareFileState.sustainabilityAttribute === fileState.sustainabilityAttribute;
		const isFileTypeSame = compareFileState.type === fileState.type;
		return !(startDatesAreSame && endDatesAreSame && compareFileStateSustainabilityAttribute && isFileTypeSame);
	};

	const isFileStateValid = (fileState: {
		id: string;
		type: string;
		metadata: any;
		originalName: string;
		startDate: Date | null;
		endDate: Date | null;
		sustainabilityAttribute: string;
	}) => {
		return !(fileState.sustainabilityAttribute === 'None');
	};

	logBrowser('DocumentDetailsSidebar', 'info', { file, fileState, sustainabilityAttributes, isLoading, signedUrl, hasSustainabilityAttribute, hasAssurances });

	return (
		<div
			className={'flex flex-col h-screen fixed top-0 right-0 bottom-0 overflow-y-scroll text-tc-primary bg-gray-30 z-20'}
			style={{
				width: fileState ? '588px' : '0px',
				minWidth: fileState ? '588px' : '0px',
				transition: 'width 0.3s',
				boxShadow: fileState ? '0px 8px 32px 8px rgba(0, 0, 0, 0.70)' : 'none',
				padding: fileState ? '40px' : '0px',
			}}
			data-chromatic={'ignore'}
			ref={innerRef}>
			{fileState !== undefined && (
				<div className={'w-full h-full flex flex-col gap-[24px] pb-[40px]'}>
					<div className={'w-full flex flex-row mb-[16px] gap-[16px] justify-between items-start'}>
						<div className={'cursor-pointer w-[16px] mt-[4px]'} onClick={() => closeSidebar()}>
							<ColdIcon name={IconNames.CloseModalIcon} width={16} height={16} />
						</div>
						<span className={'w-full text-h5 text-wrap break-all'}>{fileState.originalName}</span>
						<DocumentDetailsMenu
							onMenuClick={item => {
								if (item === 'delete') {
									if (fileState?.id) deleteFile(fileState.id);
								} else if (item === 'download') {
									downloadFile(signedUrl);
								}
							}}
						/>
					</div>
					{isLoading ? (
						<Spinner />
					) : (
						<div className={'w-full flex flex-col gap-[20px]'}>
							{fileState.metadata?.summary && (
								<div className={'w-full p-[16px] mb-[40px] border-[1px] rounded-[8px] border-yellow-500'}>
									<div className={'w-full text-tc-primary text-body'}>{fileState.metadata.summary}</div>
								</div>
							)}
							{getSustainabilityAttributeDropdown(fileState)}
							<div className={'w-full flex flex-col gap-[8px]'}>
								<div className={'w-full text-tc-primary text-eyebrow'}>Type</div>
								<Select
									options={documentTypeOptions}
									name={'type'}
									value={startCase(lowerCase(fileState.type.replace(/_/g, ' ')))}
									onChange={(e: InputOption) => {
										setFileState({ ...fileState, type: e.value });
									}}
									buttonClassName={'w-full border-[1.5px] border-gray-90 rounded-[8px]'}
								/>
							</div>
							{getDatePickers(fileState)}
							{getSaveButton(fileState)}
							{getAssociatedRecordsTables(fileState)}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export const DocumentDetailsSidebar = withErrorBoundary(_DocumentDetailsSidebar, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in DocumentDetailsSidebar: ', error);
	},
});
