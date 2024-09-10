import React, { ReactNode, useEffect } from 'react';
import { Claims, FilesWithAssurances, InputOption } from '@coldpbc/interfaces';
import { BaseButton, ColdIcon, DocumentDetailsMenu, DocumentMaterialsTable, DocumentSuppliersTable, ErrorFallback, Select, Spinner } from '@coldpbc/components';
import { ButtonTypes, FileTypes, IconNames } from '@coldpbc/enums';
import { get, toArray } from 'lodash';
import capitalize from 'lodash/capitalize';
import { withErrorBoundary } from 'react-error-boundary';
import { HexColors } from '@coldpbc/themes';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useColdContext } from '@coldpbc/hooks';

const _DocumentDetailsSidebar = (props: {
	file: FilesWithAssurances | undefined;
	sustainabilityAttributes: Claims[];
	refreshFiles: () => void;
	closeSidebar: () => void;
	innerRef: React.RefObject<HTMLDivElement>;
	deleteFile: (id: string) => void;
	isLoading: boolean;
	downloadFile: (url: string | undefined) => void;
	signedUrl: string | undefined;
}) => {
	const { logBrowser } = useColdContext();
	const { file, sustainabilityAttributes, closeSidebar, innerRef, refreshFiles, deleteFile, isLoading, downloadFile, signedUrl } = props;
	const hasAssurances = get(file, 'attributeAssurances', []).length > 0;
	const hasSustainabilityAttribute = get(file, 'attributeAssurances[0].sustainabilityAttribute.name', '').length > 0;

	const updateFile = async (fileState: FilesWithAssurances | undefined) => {
		// todo: add mutation to update file/assurances
		if (fileState) {
			refreshFiles();
		}
	};

	const getInitialFileState = ():
		| Partial<{
				id: string;
				type: string;
				metadata: any;
				originalName: string;
				startDate: Date | null;
				endDate: Date | null;
				sustainabilityAttribute: string | undefined;
		  }>
		| undefined => {
		if (file) {
			const fileState: {
				id: string;
				type: string;
				originalName: string;
				metadata: any;
				startDate: Date | null;
				endDate: Date | null;
				sustainabilityAttribute: string | undefined;
			} = {
				id: file.id,
				type: file.type,
				originalName: file.originalName,
				metadata: file.metadata,
				startDate: null,
				endDate: null,
				sustainabilityAttribute: '',
			};

			if (hasAssurances) {
				fileState['startDate'] = new Date(file.attributeAssurances[0].effectiveStartDate);
				fileState['endDate'] = new Date(file.attributeAssurances[0].effectiveEndDate);
			}
			if (hasSustainabilityAttribute) {
				fileState['sustainabilityAttribute'] = file.attributeAssurances[0]?.sustainabilityAttribute?.name;
			}

			return fileState;
		} else {
			return undefined;
		}
	};

	const [fileState, setFileState] = React.useState<
		| Partial<{
				id: string;
				type: string;
				metadata: any;
				originalName: string;
				startDate: Date | null;
				endDate: Date | null;
				sustainabilityAttribute: string | undefined;
		  }>
		| undefined
	>(getInitialFileState());

	useEffect(() => {
		setFileState(getInitialFileState());
	}, [file]);

	const documentTypeOptions: InputOption[] = toArray(FileTypes).map((type, index) => {
		const name = capitalize(type.replace(/_/g, ' '));
		return {
			id: index,
			name: name,
			value: type,
		};
	});

	const getSustainabilityAttributeDropdown = () => {
		return (
			<div className={'w-full flex flex-col gap-[8px]'}>
				<div className={'w-full text-tc-primary text-eyebrow'}>Sustainability Attribute</div>
				<Select
					options={sustainabilityAttributes.map((attribute, index) => {
						return {
							id: index,
							name: attribute.name,
							value: attribute.id,
						};
					})}
					name={'sustainabilityAttribute'}
					value={fileState?.sustainabilityAttribute}
					onChange={(e: InputOption) => {
						if (file) {
							setFileState({ ...fileState, sustainabilityAttribute: e.name });
						}
					}}
					buttonClassName={'w-full border-[1.5px] border-gray-90 rounded-[8px]'}
				/>
			</div>
		);
	};

	const getDatePickers = () => {
		return (
			<>
				<div className={'w-full flex flex-col gap-[8px]'}>
					<div className={'w-full text-tc-primary text-eyebrow'}>Start Date</div>
					<DesktopDatePicker
						// @ts-ignore
						value={fileState.startDate ? new Date(fileState.startDate) : null}
						onChange={(date: Date | null) => {
							setFileState({ ...fileState, startDate: date });
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
						value={fileState?.endDate ? new Date(fileState.endDate) : null}
						onChange={(date: Date | null) => {
							setFileState({ ...fileState, endDate: date });
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

	const getAssociatedRecordsTables = () => {
		// get the claim level of the sustainability attribute
		let element: ReactNode | null = null;
		if (hasSustainabilityAttribute) {
			const attribute = sustainabilityAttributes.find(attribute => attribute.name === fileState?.sustainabilityAttribute);
			if (attribute === undefined) {
				return null;
			}
			const claimLevel = attribute.level;
			if (claimLevel === 'MATERIAL') {
				element = <DocumentMaterialsTable assurances={file?.attributeAssurances || []} />;
			} else if (claimLevel === 'SUPPLIER') {
				element = <DocumentSuppliersTable assurances={file?.attributeAssurances || []} />;
			} else {
				element = <DocumentSuppliersTable assurances={[]} />;
			}
		} else {
			element = <DocumentSuppliersTable assurances={[]} />;
		}
		return (
			<div className={'flex-col flex gap-[16px]'}>
				<div className={'flex flex-row justify-between'}>
					<div className={'text-h5'}>Associated Records</div>
					<BaseButton
						label={'Add'}
						onClick={() => {
							//todo: add mutation to add assurances
						}}
						iconLeft={IconNames.PlusIcon}
						variant={ButtonTypes.secondary}
					/>
				</div>
				<div className={'w-full'}>{element}</div>
			</div>
		);
	};

	console.log({ file, fileState, sustainabilityAttributes, isLoading, signedUrl, hasSustainabilityAttribute, hasAssurances });

	return (
		<div
			className={'flex flex-col h-screen fixed top-0 right-0 bottom-0 overflow-y-scroll text-tc-primary bg-gray-30'}
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
							{getSustainabilityAttributeDropdown()}
							<div className={'w-full flex flex-col gap-[8px]'}>
								<div className={'w-full text-tc-primary text-eyebrow'}>Type</div>
								<Select
									options={documentTypeOptions}
									name={'type'}
									value={capitalize(fileState.type?.replace(/_/g, ' '))}
									onChange={(e: InputOption) => {
										if (file) {
											setFileState({ ...fileState, type: FileTypes[e.value] });
										}
									}}
									buttonClassName={'w-full border-[1.5px] border-gray-90 rounded-[8px]'}
								/>
							</div>
							{getDatePickers()}
							{getAssociatedRecordsTables()}
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
