import { ButtonTypes, IconNames, MainDocumentCategory } from '@coldpbc/enums';
import {Modal as FBModal} from 'flowbite-react'
import { flowbiteThemeOverride } from '@coldpbc/themes';
import { BaseButton, Card, ColdIcon, MuiDataGrid } from '@coldpbc/components';
import React, { useEffect, useRef, useState } from 'react';
import { filter, map, orderBy, set } from 'lodash';

export interface UploadModalProps{
  openModal: boolean;
  closeModal: () => void;
  types: Array<MainDocumentCategory>
}

const UPLOAD_MAP: {
  [key in MainDocumentCategory]: {
    title: string;
    iconName: IconNames;
    description: string;
    subDescription: string;
    aiProcessing: boolean;
    queryParams: {
      searchable: boolean;
    }
  }
} = {
  [MainDocumentCategory.Assurance]: {
    title: 'Assurance Documents',
    iconName: IconNames.ColdReportIcon,
    description: 'Assurance documents from suppliers including certifications, tests, or declarations.',
    subDescription: 'PDF, image file, or text file',
    aiProcessing: true,
    queryParams: {
      searchable: true,
    }
  },
  [MainDocumentCategory.BillOfMaterial]: {
    title: 'Bill Of Materials (BOM)',
    iconName: IconNames.ColdProductsNavIcon,
    description: 'Lists of materials per product.  May include yields, suppliers, or other material, supplier, and product data.',
    subDescription: 'CSV, XLS, or other spreadsheet',
    aiProcessing: false,
    queryParams: {
      searchable: false,
    }
  },
  [MainDocumentCategory.InternalSustainabilityPolicy]: {
    title: 'Internal Sustainability Policies & Docs',
    iconName: IconNames.ColdReportIcon,
    description: 'Company policies, impact reports, or internal sustainability assessments.',
    subDescription: 'PDF, image file, or text file',
    aiProcessing: true,
    queryParams: {
      searchable: true,
    }
  },
  [MainDocumentCategory.SustainabilityData]: {
    title: 'Assurance Documents',
    iconName: IconNames.ColdSustainabilityIcon,
    description: 'Company policies, impact reports, or internal sustainability assessments.',
    subDescription: 'CSV, XLS, or other spreadsheet',
    aiProcessing: false,
    queryParams: {
      searchable: false,
    }
  },
}

export const UploadModal = (props: UploadModalProps) => {
  const {openModal, closeModal, types} = props;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<MainDocumentCategory | null>(null);
  const [filesToUpload, setFilesToUpload] = React.useState<File[]>([]);

  useEffect(() => {
    setButtonDisabled(selectedOption === null || filesToUpload.length === 0);
  }, [selectedOption, filesToUpload]);

  const uploadDocuments = async () => {

  }

  const uploadedDocuments = filter(orderBy(files?.data || [], ['original_name', 'updated_at'], ['asc', 'desc']), document => {
    return !newFiles.some(file => file.contents.name === document.original_name);
  });

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    setFilesToUpload(prevFiles => [
      ...prevFiles,
      ...newFiles,
    ]);
  };

  const uploadButton = async () => {
    if (fileInputRef.current !== null) fileInputRef.current.click();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles);
      setFilesToUpload(prevFiles => [
        ...prevFiles,
      ]);
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

  return (
    <FBModal
      dismissible
      show={openModal}
      onClose={closeModal}
      theme={flowbiteThemeOverride.modal}
      style={{
        boxShadow: '0px 8px 32px 8px rgba(0, 0, 0, 0.70)',
      }}
      data-testid={`upload-modal`}
    >
      <Card className="relative p-4 w-[962px] bg-gray-30 gap-[40px]" glow={false}>
        <div className="flex flex-col gap-[24px] w-full">
          <div className="flex flex-row text-h3">What are you uploading?</div>
          <div className="w-full grid grid-cols-2 gap-4">
            {types.map((type) => {
              const isActive = selectedOption === type;
              const borderColorClassName = isActive ? 'border-white' : 'border-gray-90';
              const backgroundColorClassName = isActive ? 'bg-gray-40' : 'bg-transparent';
              const className = `flex flex-col gap-[8px] border-[1px] rounded-[8px] w-full px-[24px] pt-[16px] pb-[24px] cursor-pointer text-tc-primary
              ${backgroundColorClassName} ${borderColorClassName} hover:bg-gray-40 hover:border-white`;

              return (
                <div
                  key={type}
                  className={className}
                  onClick={() => {
                    if (selectedOption === type) {
                      setSelectedOption(null);
                    } else {
                      setSelectedOption(type);
                    }
                  }}
                >
                  <div className="flex flex-row items-start pb-2 gap-[10px] w-full border-b-[1px] border-gray-90">
                    <div
                      className="relative w-6 h-6 rounded-full border-[1.5px] border-white flex items-center justify-center">
                      <div className={`w-4 h-4 rounded-full ${isActive && 'bg-primary-300'}`}></div>
                    </div>
                    <div className="text-h5 self-stretch">
                      {UPLOAD_MAP[type].title}
                    </div>
                    <ColdIcon name={UPLOAD_MAP[type].iconName} className="w-6 h-6" />
                  </div>
                  <div className={'flex flex-col gap-4 w-full'}>
                    <div className="text-body">{UPLOAD_MAP[type].description}</div>
                    <div className="text-b4 text-tc-disabled">{UPLOAD_MAP[type].subDescription}</div>
                  </div>
                  <div
                    className={`rounded-[30px] py-[4px] px-[8px] border-[1px] ${UPLOAD_MAP[type].aiProcessing ? 'border-bgc-menu' : 'border-yellow-800'}`}>
                    {
                      UPLOAD_MAP[type].aiProcessing ? (
                        <span role="img" className="text-b4 text-tc-success">✨Cold AI-Powered Processing</span>
                      ) : (
                        <span className="text-b4 text-tc-disabled">No AI processing</span>
                      )
                    }
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className={'w-full h-[200px] flex flex-col self-stretch items-stretch gap-[8px]'}>
          <div
            className={'h-full justify-self-stretch w-full rounded-[16px] border-dashed border-white border-[1px] p-[24px] flex flex-col gap-[32px] justify-center items-center'}
            onDrop={handleDrop}
            onDragOver={event => event.preventDefault()}>
            <div className={'text-h5'}>Drag & Drop Files Here or</div>
            <div>
              <BaseButton label={'Browse & Upload'} variant={ButtonTypes.secondary} onClick={uploadButton} />
              <input onChange={handleChange} ref={fileInputRef} type="file" aria-label={'Upload Documents'} hidden
                     multiple />
            </div>
          </div>
          <div className={'h-auto max-h-[100px] min-h-0 w-full overflow-x-auto flex flex-col gap-[8px]'}>
            {map(orderBy(filesToUpload, ['lastModified', 'name'], ['desc', 'asc']), (file, index) => {
              return (
                // eslint-disable-next-line react/jsx-no-undef
                <ComplianceOverviewFileUploaderItem
                  file={file}
                  onFileUpload={() => {
                    onNewFileUpload(index);
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className="w-full flex flex-row justify-between">
          <BaseButton
            label="Cancel"
            onClick={closeModal}
            variant={ButtonTypes.secondary}
          />
          <BaseButton
            label={"Confirm"}
            loading={buttonLoading}
            onClick={uploadDocuments}
            disabled={buttonDisabled}
          />
        </div>
      </Card>
    </FBModal>
  )
}
