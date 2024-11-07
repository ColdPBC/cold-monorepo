import React, { ReactNode, useEffect } from 'react';
import { Claims, FilesWithAssurances, InputOption, ToastMessage } from '@coldpbc/interfaces';
import {
  BaseButton,
  ColdIcon,
  DetailsItem,
  DocumentDetailsMenu,
  DocumentMaterialsTable,
  DocumentSuppliersTable,
  ErrorFallback,
  Input,
  Select,
  Spinner,
  SustainabilityAttributeSelect,
} from '@coldpbc/components';
import { ButtonTypes, IconNames } from '@coldpbc/enums';
import {forEach, get, has, lowerCase, startCase} from 'lodash';
import { withErrorBoundary } from 'react-error-boundary';
import { HexColors } from '@coldpbc/themes';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useAddToastMessage, useAuth0Wrapper, useColdContext, useGraphQLMutation } from '@coldpbc/hooks';
import { useSWRConfig } from 'swr';
import { format, isSameDay, parseISO } from 'date-fns';
import { isApolloError } from '@apollo/client';
import {
  addTZOffset,
  getEffectiveEndDate,
  getEffectiveStartDate,
  removeTZOffset
} from '@coldpbc/lib';

export interface DocumentDetailsSidebarFileState {
  id: string;
  type: string;
  originalName: string;
  createdAt: string;
  metadata: any;
  startDate: Date | null;
  endDate: Date | null;
  sustainabilityAttributeId: string | null;
  certificate_number: string | null;
}

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
		fileState: DocumentDetailsSidebarFileState,
		isAdding: boolean,
	) => void;
}) => {
	const { mutate } = useSWRConfig();
	const { logBrowser } = useColdContext();
	const { file, fileTypes, sustainabilityAttributes, closeSidebar, innerRef, deleteFile, isLoading, downloadFile, signedUrl, addAssurance } = props;
	const { orgId } = useAuth0Wrapper();
	const [saveButtonLoading, setSaveButtonLoading] = React.useState(false);
	const hasAssurances = get(file, 'attributeAssurances', []).length > 0;
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
		| DocumentDetailsSidebarFileState
		| undefined => {
		if (file) {
			const fileState: DocumentDetailsSidebarFileState = {
				id: file.id,
				type: file.type,
				originalName: file.originalName,
        createdAt: file.createdAt,
				metadata: file.metadata,
				startDate: null,
				endDate: null,
				sustainabilityAttributeId: file.attributeAssurances[0]?.sustainabilityAttribute?.id,
        certificate_number: null
			};

			const startDate = getEffectiveStartDate(file);
			const endDate = getEffectiveEndDate(file);

			fileState['startDate'] = startDate ? addTZOffset(startDate) : null;
			fileState['endDate'] = endDate ? addTZOffset(endDate) : null;

      if(file.type === 'CERTIFICATE' || file.type === 'SCOPE_CERTIFICATE') {
        fileState['certificate_number'] = get(file.metadata, 'certificate_number', null);
      }

			return fileState;
		} else {
			return undefined;
		}
	};

	const [fileState, setFileState] = React.useState<
		| DocumentDetailsSidebarFileState
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

	const getSustainabilityAttributeDropdown = (fileState: DocumentDetailsSidebarFileState) => {
		return (
			<div className={'w-full flex flex-col gap-[8px]'}>
				<div className={'w-full text-tc-primary text-eyebrow'}>Sustainability Attribute</div>
				<SustainabilityAttributeSelect
          sustainabilityAttributes={sustainabilityAttributes}
					selectedValueId={fileState.sustainabilityAttributeId}
					setSelectedValueId={(value: string | null) => {
						if (fileState === undefined) return;
						setFileState({ ...fileState, sustainabilityAttributeId: value });
					}}
				/>
			</div>
		);
	};

  const getCertificateNumberInput = (fileState: DocumentDetailsSidebarFileState) => {
    if(fileState.type !== 'CERTIFICATE' && fileState.type !== 'SCOPE_CERTIFICATE') {
      return null;
    }
    return (
      <div className={'w-full flex flex-col gap-[8px]'}>
        <div className={'w-full text-tc-primary text-eyebrow'}>Certificate ID</div>
        <Input
          input_props={{
            className: 'w-full border-[1.5px] border-gray-90 rounded-[8px] p-4 text-body focus:border-gray-90 focus:border-[1.5px]',
            name: 'certificate_number',
            type: 'text',
            value: fileState.certificate_number || '',
            placeholder: 'Enter certificate ID',
            onValueChange: (value: any) => {
              if(value === '') {
                setFileState({ ...fileState, certificate_number: null });
              } else {
                setFileState({ ...fileState, certificate_number: value });
              }
            },
            onChange: (e: any) => {
              if(e.target.value === '') {
                setFileState({ ...fileState, certificate_number: null });
              } else {
                setFileState({...fileState, certificate_number: e.target.value});
              }
            }
          }}
        />
      </div>
    );
  }

	const getDatePickers = (fileState: DocumentDetailsSidebarFileState) => {
		return (
			<div className={'w-full flex gap-4'}>
				<div className={'w-full flex flex-col gap-[8px]'} data-chromatic={'ignore'}>
					<div className={'w-full text-tc-primary text-eyebrow'}>Valid From</div>
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
				<div className={'w-full flex flex-col gap-[8px]'} data-chromatic={'ignore'}>
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
			</div>
		);
	};

	const getAssociatedRecordsTables = (fileState: DocumentDetailsSidebarFileState) => {
		// get the claim level of the sustainability attribute
		let element: ReactNode | null = null;
    const attribute = sustainabilityAttributes.find(attribute => attribute.id === fileState.sustainabilityAttributeId);
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

	const getSaveButton = (fileState: DocumentDetailsSidebarFileState) => {
		const hasFileChanged = hasFileStateChanged(fileState);
		const disabled = saveButtonLoading || !hasFileChanged;

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

	const updateFileAndAssurances = async (fileState: DocumentDetailsSidebarFileState) => {
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
        // update the file metadata
        variables.input.metadata = {
          ...(file.metadata || {}),
          effective_start_date: fileState.startDate ? removeTZOffset(fileState.startDate.toISOString()) : null,
          effective_end_date: fileState.endDate ? removeTZOffset(fileState.endDate.toISOString()) : null,
        };
        if(fileState.type === 'CERTIFICATE' || fileState.type === 'SCOPE_CERTIFICATE') {
          variables.input.metadata.certificate_number = fileState.certificate_number;
        }
				promises.push(updateDocument(variables));
			}

			if (ifOnlyTypeOrCertIdChanged(fileState, compareFileState)) {
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

			const sustainabilityAttribute = sustainabilityAttributes.find(attribute => attribute.id === fileState.sustainabilityAttributeId);

      // update assurances if sustainability attribute is not undefined
			if (sustainabilityAttribute !== undefined) {
        if (hasAssurances) {
          // delete existing assurances
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
                    id: fileState.sustainabilityAttributeId,
                  },
                  updatedAt: new Date().toISOString(),
                },
              }),
            );
          });
        } else {
          // create new assurance
          promises.push(
            createAttributeAssurance({
              input: {
                effectiveStartDate: fileState.startDate ? removeTZOffset(fileState.startDate.toISOString()) : null,
                effectiveEndDate: fileState.endDate ? removeTZOffset(fileState.endDate.toISOString()) : null,
                organizationFile: {
                  id: fileState.id,
                },
                sustainabilityAttribute: {
                  id: fileState.sustainabilityAttributeId
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
      } else {
        // if the sustainability attribute is not defined, delete all assurances
        if(!fileState.sustainabilityAttributeId) {
          const deleteCals = deleteAllAssurances();
          promises.push(...deleteCals);
        }
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

  const deleteAllAssurances = (): Promise<any>[] => {
    const deleteCalls: Promise<any>[] = [];
    file?.attributeAssurances.forEach(assurance => {
      deleteCalls.push(
        deleteAssurance({
          filter: {
            id: assurance.id,
          },
        }),
      );
    })
    return deleteCalls;
  }

	const hasFileStateChanged = (fileState: DocumentDetailsSidebarFileState) => {
		if (file === undefined) return false;
		const compareFileState = getInitialFileState(file);
		if (fileState === undefined || compareFileState === undefined) return false;
		const startDatesAreSame = isSameDay(compareFileState.startDate || 0, fileState.startDate || 0);
		const endDatesAreSame = isSameDay(compareFileState.endDate || 0, fileState.endDate || 0);
		const compareFileStateSustainabilityAttribute = compareFileState.sustainabilityAttributeId === fileState.sustainabilityAttributeId;
		const isFileTypeSame = compareFileState.type === fileState.type;
    let certificateNumberSame = true;
    if(fileState.type === 'CERTIFICATE' || fileState.type === 'SCOPE_CERTIFICATE') {
      certificateNumberSame = compareFileState.certificate_number === fileState.certificate_number;
    }
		return !(startDatesAreSame && endDatesAreSame && compareFileStateSustainabilityAttribute && isFileTypeSame && certificateNumberSame);
	};

  const ifOnlyTypeOrCertIdChanged = (
    fileState: DocumentDetailsSidebarFileState,
    compareFileState: DocumentDetailsSidebarFileState
  ) => {
    return (
      compareFileState.endDate !== null &&
      compareFileState.startDate !== null &&
      fileState.endDate !== null &&
      fileState.startDate !== null &&
      isSameDay(compareFileState.startDate, fileState.startDate) &&
      isSameDay(compareFileState.endDate, fileState.endDate) &&
      compareFileState.sustainabilityAttributeId === fileState.sustainabilityAttributeId &&
      (compareFileState.type !== fileState.type || compareFileState.certificate_number !== fileState.certificate_number) &&
      hasAssurances
    )

  }

	logBrowser('DocumentDetailsSidebar', 'info', { file, fileState, sustainabilityAttributes, isLoading, signedUrl, hasAssurances });

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
              <DetailsItem category={'Uploaded'} value={format(parseISO(fileState.createdAt), 'M/d/yyyy h:mm a')} />
              {fileState.metadata?.summary && (
								<DetailsItem category={'Cold AI Summary'} value={fileState.metadata.summary} />
							)}
							{getSustainabilityAttributeDropdown(fileState)}
							<div className={'w-full flex flex-col gap-[8px]'}>
								<div className={'w-full text-tc-primary text-eyebrow'}>Document Category</div>
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
              {getCertificateNumberInput(fileState)}
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
