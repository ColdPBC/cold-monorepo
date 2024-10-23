import { BaseButton, ComplianceOverviewFileUploaderItem, Markdown } from '@coldpbc/components';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { filter, map, orderBy, set } from 'lodash';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import { ButtonTypes } from '@coldpbc/enums';
import { useColdContext } from '@coldpbc/hooks';

export const UploadComplianceDocumentsModal = ({ setButtonDisabled }: { setButtonDisabled: (loading: boolean) => void }) => {
	const { data } = useContext(ColdComplianceManagerContext);
	const { compliance, files, name } = data;
	const { logBrowser } = useColdContext();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [newFiles, setNewFiles] = useState<
		{
			uploaded: boolean;
			new: boolean;
			contents: File;
		}[]
	>([]);
	const uploadedDocuments = filter(orderBy(files?.data || [], ['original_name', 'updated_at'], ['asc', 'desc']), document => {
		return !newFiles.some(file => file.contents.name === document.original_name);
	});

	const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const newFiles = Array.from(event.target.files || []);
		logBrowser('New files uploaded', 'info', { newFiles });
		setNewFiles(prevFiles => [
			...prevFiles,
			...map(newFiles, file => {
				set(file, 'uploadTime', new Date().toISOString());
				return {
					uploaded: false,
					contents: file,
					new: true,
				};
			}),
		]);
	};

	const uploadButton = async () => {
		if (fileInputRef.current !== null) fileInputRef.current.click();
	};

	const handleDrop = (event: React.DragEvent) => {
		event.preventDefault();
		const droppedFiles = event.dataTransfer.files;
		if (droppedFiles.length > 0) {
			const newFiles = map(Array.from(droppedFiles), file => {
				set(file, 'uploadTime', new Date().toISOString());
				return {
					uploaded: false,
					contents: file,
					new: true,
				};
			});
			logBrowser('New files dropped', 'info', { newFiles });
			setNewFiles(prevFiles => [...newFiles, ...prevFiles]);
		}
	};

	const onNewFileUpload = (index: number) => {
		// set the new file to uploaded
		setNewFiles(prevFiles => {
			const newFiles = [...prevFiles];
			newFiles[index].uploaded = true;
			return newFiles;
		});
	};

	useEffect(() => {
		if (uploadedDocuments.length > 0 || newFiles.length > 0) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	}, [uploadedDocuments, newFiles]);

	return (
		<div className={'flex flex-row w-full h-full p-[24px] self-stretch items-stretch'}>
			<div className={'h-full bg-opacity-50 rounded-[16px] p-[24px] flex flex-col justify-start w-1/2 bg-gray-05'}>
				<Markdown
					markdown={
						'Upload company policies, documents, or other resources and Cold Climate will autofill the form. Cold Climate uses AI to pre-fill each question based on your information.\n' +
						'\n' +
						"You'll always be able to review and edit yourself before submitting anything.\n" +
						'\n' +
						`You can upload as many or as few documents as you want. We recommend uploading any of the following for ${compliance?.title}.\n` +
						'\n' +
						'- Other retailer sustainability compliance forms\n' +
						'- Supplier code of conduct\n' +
						'- Climate or environmental impact statements or documents\n' +
						'- Sustainability Certifications\n' +
						'- Diversity and inclusion policies'
					}
				/>
			</div>
			<div className={'w-1/2 h-full flex flex-col self-stretch items-stretch gap-[8px]'}>
				<div
					className={'h-full justify-self-stretch w-full rounded-[16px] border-dashed border-white border-[1px] p-[24px] flex flex-col gap-[32px] justify-center items-center'}
					onDrop={handleDrop}
					onDragOver={event => event.preventDefault()}>
					<div className={'text-h5'}>Drag & Drop Files Here or</div>
					<div>
						<BaseButton label={'Browse & Upload'} variant={ButtonTypes.secondary} onClick={uploadButton} />
						<input onChange={handleChange} ref={fileInputRef} type="file" aria-label={'Upload Documents'} hidden multiple />
					</div>
				</div>
				<div className={'h-auto max-h-[200px] min-h-0 w-full overflow-x-auto flex flex-col gap-[8px]'}>
					{map(orderBy(newFiles, ['contents.uploadTime', 'name'], ['desc', 'asc']), (file, index) => {
						return (
							<ComplianceOverviewFileUploaderItem
								file={file}
								onFileUpload={() => {
									onNewFileUpload(index);
								}}
							/>
						);
					})}
					{map(uploadedDocuments, file => {
						return (
							<ComplianceOverviewFileUploaderItem
								file={{
									uploaded: true,
									contents: file,
									new: false,
								}}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};
