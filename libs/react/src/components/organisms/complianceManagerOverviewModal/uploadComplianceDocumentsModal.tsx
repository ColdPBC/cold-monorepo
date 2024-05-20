import { BaseButton, ComplianceOverviewFileUploaderItem, Markdown } from '@coldpbc/components';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { map } from 'lodash';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import { ButtonTypes } from '@coldpbc/enums';

export const UploadComplianceDocumentsModal = ({ setButtonDisabled }: { setButtonDisabled: (loading: boolean) => void }) => {
  const { data } = useContext(ColdComplianceManagerContext);
  const { mqttComplianceSet } = data;
  const uploadedDocuments = data?.files?.data || [];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState(uploadedDocuments);
  const [newFiles, setNewFiles] = useState<
    {
      uploaded: boolean;
      contents: File;
    }[]
  >([]);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  const uploadButton = async () => {
    if (fileInputRef.current !== null) fileInputRef.current.click();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles = map(Array.from(droppedFiles), file => {
        return {
          uploaded: false,
          contents: file,
        };
      });
      setNewFiles(prevFiles => [...newFiles, ...prevFiles]);
    }
  };

  useEffect(() => {
    if (files.length > 0 || newFiles.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [files, newFiles]);

  return (
    <div className={'flex flex-row w-full h-full p-[24px] self-stretch items-stretch'}>
      <div className={'h-full bg-opacity-50 rounded-[16px] p-[24px] flex flex-col justify-start w-1/2 bg-gray-05'}>
        <Markdown
          markdown={
            'Upload company policies, documents, or other resources and Cold Climate will autofill the form. Cold Climate uses AI to pre-fill each question based on your information.\n' +
            '\n' +
            "You'll always be able to review and edit yourself before submitting anything.\n" +
            '\n' +
            `You can upload as many or as few documents as you want. We recommend uploading any of the following for ${mqttComplianceSet?.compliance_definition.title}.\n` +
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
          {map(newFiles, (file, index) => {
            return (
              <ComplianceOverviewFileUploaderItem
                file={{
                  ...file,
                  new: true,
                }}
              />
            );
          })}
          {map(files, file => {
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
