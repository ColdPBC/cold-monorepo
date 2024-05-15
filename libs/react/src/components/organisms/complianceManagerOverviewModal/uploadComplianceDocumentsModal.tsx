import { BaseButton, ColdIcon, Markdown } from '@coldpbc/components';
import React, { useRef, useState } from 'react';
import { ButtonTypes, IconNames } from '@coldpbc/enums';
import { map } from 'lodash';

export const UploadComplianceDocumentsModal = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {};

  const uploadButton = async () => {
    if (fileInputRef.current !== null) fileInputRef.current.click();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles);
      setNewFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  return (
    <div className={'flex flex-row w-full h-full p-[24px]'}>
      <div className={'h-full bg-opacity-50 rounded-[16px] p-[24px] flex flex-col justify-start w-1/2'}>
        <Markdown
          markdown={
            'Upload company policies, documents, or other resources and Cold Climate will autofill the form. Cold Climate uses AI to pre-fill each question based on your information.\n' +
            '\n' +
            "You'll always be able to review and edit yourself before submitting anything.\n" +
            '\n' +
            'You can upload as many or as few documents as you want. We recommend uploading any of the following for [Compliance set name].\n' +
            '\n' +
            '- Other retailer sustainability compliance forms\n' +
            '- Supplier code of conduct\n' +
            '- Climate or environmental impact statements or documents\n' +
            '- Sustainability Certifications\n' +
            '- Diversity and inclusion policies'
          }
        />
      </div>
      <div className={'w-1/2 h-full flex flex-col'}>
        <div
          className={'min-h-[200px] w-full rounded-[16px] border-dashed border-white border-[1px] p-[24px] cursor-pointer flex flex-col gap-[32px] justify-center items-center'}
          onDrop={handleDrop}
          onDragOver={event => event.preventDefault()}>
          <div className={'text-h5'}>Drag & Drop Files Here or</div>
          <div>
            <BaseButton label={'Browse & Upload'} variant={ButtonTypes.secondary} onClick={uploadButton} />
            <input onChange={handleChange} ref={fileInputRef} type="file" aria-label={'Upload Documents'} hidden multiple />
          </div>
        </div>
        <div className={'h-full w-full overflow-x-auto'}>
          {newFiles.length > 0 &&
            map(files, file => {
              return (
                <div className={'text-tc-primary w-full bg-gray-30 rounded-[8px] p-[8px] flex flex-row gap-[8px] items-center border-[1px] border-gray-50 gap-[8px]'}>
                  <div className={'w-1/2'}>{file.name}</div>
                  <div className={'w-1/2 flex flex-row gap-[8px] text-tc-disabled'}>
                    <div className={'w-[134px] justify-start'}>Uploaded {file.lastModified}</div>
                    <ColdIcon name={IconNames.ColdSmallCheckBoxIcon} />
                  </div>
                </div>
              );
            })}
          {files.length > 0 &&
            map(files, file => {
              return (
                <div className={'text-tc-primary w-full bg-gray-30 rounded-[8px] p-[8px] flex flex-row gap-[8px] items-center border-[1px] border-gray-50 gap-[8px]'}>
                  <div className={'w-1/2'}>{file.name}</div>
                  <div className={'w-1/2 flex flex-row gap-[8px] text-tc-disabled'}>
                    <div className={'w-[134px] justify-start'}>Uploaded {file.lastModified}</div>
                    <ColdIcon name={IconNames.ColdSmallCheckBoxIcon} />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
