import { ButtonTypes, IconNames, MainDocumentCategory } from '@coldpbc/enums';
import { Modal as FBModal } from 'flowbite-react'
import { flowbiteThemeOverride } from '@coldpbc/themes';
import { BaseButton, Card, ColdIcon, ComplianceOverviewFileUploaderItem } from '@coldpbc/components';
import React, { useEffect, useRef } from 'react';
import {forEach, get, map, orderBy} from 'lodash';
import { AxiosError, AxiosRequestConfig, isAxiosError } from "axios";
import { axiosFetcher } from "@coldpbc/fetchers";
import { useAddToastMessage, useAuth0Wrapper, useColdContext } from "@coldpbc/hooks";
import { KeyedMutator } from "swr";
import { ApolloQueryResult } from "@apollo/client";
import { ToastMessage, UploadsQuery } from "@coldpbc/interfaces";

export interface UploadModalProps{
  types: Array<MainDocumentCategory>
  refreshData: KeyedMutator<ApolloQueryResult<{ organizationFiles: UploadsQuery[] }>>
}

const UPLOAD_MAP: {
  [key in MainDocumentCategory]: {
    title: string;
    iconName: IconNames;
    description: string;
    subDescription: string;
    aiProcessing: boolean;
    queryParams: any;
  }
} = {
  [MainDocumentCategory.Assurance]: {
    title: 'Assurance Documents',
    iconName: IconNames.ColdDocumentUploadIcon,
    description: 'Assurance documents from suppliers including certifications, tests, or declarations.',
    subDescription: 'PDF, image file, or text file',
    aiProcessing: true,
    queryParams: {
      type: 'OTHER',
    }
  },
  [MainDocumentCategory.BillOfMaterial]: {
    title: 'Bill Of Materials (BOM)',
    iconName: IconNames.ColdProductsNavIcon,
    description: 'Lists of materials per product.  May include yields, suppliers, or other material, supplier, and product data.',
    subDescription: 'CSV, XLS, or other spreadsheet',
    aiProcessing: false,
    queryParams: {
      type: 'BILL_OF_MATERIALS',
    }
  },
  [MainDocumentCategory.InternalSustainabilityPolicy]: {
    title: 'Internal Sustainability Policies & Docs',
    iconName: IconNames.ColdQuestionnaireIcon,
    description: 'Company policies, impact reports, or internal sustainability assessments.',
    subDescription: 'PDF, image file, or text file',
    aiProcessing: true,
    queryParams: {
      type: 'ASSESSMENT',
    }
  },
  [MainDocumentCategory.SustainabilityData]: {
    title: 'Sustainability Data',
    iconName: IconNames.ColdSustainabilityIcon,
    description: 'Spreadsheets tracking any sustainability data about company products, suppliers, or materials.',
    subDescription: 'CSV, XLS, or other spreadsheet',
    aiProcessing: false,
    queryParams: {
      type: 'SUSTAINABILITY_DATA',
    }
  },
}

export const UploadModal = (props: UploadModalProps) => {
  const { logBrowser } = useColdContext();
  const { addToastMessage } = useAddToastMessage();
  const { orgId } = useAuth0Wrapper();
  const { types, refreshData} = props;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<MainDocumentCategory | null>(null);
  const [filesToUpload, setFilesToUpload] = React.useState<File[]>([]);
  const [openModal, setOpenModal] = React.useState(false);

  useEffect(() => {
    setButtonDisabled(selectedOption === null || filesToUpload.length === 0);
  }, [selectedOption, filesToUpload]);

  useEffect(() => {
    setSelectedOption(null);
    setFilesToUpload([]);
  }, [openModal]);

  const uploadDocuments = async () => {
    if(selectedOption === null) return;

    setButtonLoading(true);
    setButtonDisabled(true);
    const formData = new FormData();
    forEach(filesToUpload, file => {
      formData.append('file', file);
    })
    const config = JSON.stringify({
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 60000,
      params: {
        ...UPLOAD_MAP[selectedOption].queryParams,
      }
    } as AxiosRequestConfig);

    const response = await axiosFetcher([
      `/organizations/${orgId}/files`,
      'POST',
      formData,
      config
    ]);

    if (!isAxiosError(response)) {
      // check if the response has any failed documents
      const failed = get(response, 'failed', []);
      if (failed.length > 0) {
        const failedUploadFileNames = failed.map((failed: any) => get(failed, 'file.originalname', '')).join(', ');
        await addToastMessage({
          // message: `Failed to upload ${failed.length} file`,
          message: `Failed to upload: ${failedUploadFileNames}`,
          type: ToastMessage.FAILURE,
        });
        logBrowser(`Failed to upload ${failed.length} file`, 'error', { orgId, formData: { ...formData }, response });
      } else {
        logBrowser('File Upload successful', 'info', { orgId, formData: { ...formData }, response });
        await addToastMessage({
          message: 'Upload successful',
          type: ToastMessage.SUCCESS,
        })
      }
      await refreshData()
    } else {
      // handle regular axios server response errors
      const error: AxiosError = response;
      if(error.response?.status === 409) {
        await addToastMessage({
          message: 'File already exists. Error Uploading',
          type: ToastMessage.FAILURE,
        });
        logBrowser('Duplicate file uploaded', 'error', {orgId, formData: { ...formData }, response});
      } else {
        await addToastMessage({
          type: ToastMessage.FAILURE,
          message: 'Upload failed',
        });
        logBrowser('Upload failed', 'error', {orgId, formData: { ...formData }, response
        });
      }
    }
    setButtonLoading(false);
    setButtonDisabled(false);
    setOpenModal(false);
  }

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
        ...newFiles,
      ]);
    }
  };

  return (
    <>
      <BaseButton
        label={'Upload'}
        onClick={() => setOpenModal(true)}
        variant={ButtonTypes.primary}
        iconLeft={IconNames.PlusIcon}
        className={'self-center'}
        data-testid={'upload-button'}
      />
    <FBModal
      dismissible
      show={openModal}
      onClose={() => setOpenModal(false)}
      theme={flowbiteThemeOverride.modal}
      style={{
        boxShadow: '0px 8px 32px 8px rgba(0, 0, 0, 0.70)',
      }}
      data-testid={`upload-modal`}
    >
      <Card className="p-4 w-[962px] bg-gray-30 gap-[40px]" glow={false}>
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
                    <div className="text-eyebrow text-tc-disabled">{UPLOAD_MAP[type].subDescription}</div>
                    <div
                      className={`rounded-[30px] py-[4px] px-[8px] border-[1px] text-body ${UPLOAD_MAP[type].aiProcessing ? 'border-yellow-800' : 'border-bgc-menu'}`}>
                      {
                        UPLOAD_MAP[type].aiProcessing ? (
                          <span role="img" className="text-tc-secondary">✨Cold AI-Powered Processing</span>
                        ) : (
                          <span className="text-tc-disabled">Support Team Manual Processing</span>
                        )
                      }
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className={'w-full h-auto flex flex-col self-stretch items-stretch gap-[8px]'}>
          <div
            className={'h-[180px] justify-self-stretch w-full rounded-[8px] border-dashed border-gray-90 border-[1px] p-[24px] flex flex-col gap-[32px] justify-center items-center'}
            onDrop={handleDrop}
            onDragOver={event => event.preventDefault()}>
            <div className={'text-h5'}>Drag & Drop Files Here or</div>
            <div>
              <BaseButton label={'Browse & Upload'} variant={ButtonTypes.secondary} onClick={uploadButton} />
              <input onChange={handleChange} ref={fileInputRef} type="file" aria-label={'Upload Documents'} hidden
                     multiple />
            </div>
          </div>
          <div className={'h-auto w-full flex flex-col gap-[8px]'}>
            {map(orderBy(filesToUpload, ['lastModified', 'name'], ['desc', 'asc']), (file, index) => {
              return (
                // eslint-disable-next-line react/jsx-no-undef
                <ComplianceOverviewFileUploaderItem
                  key={index}
                  file={{
                    contents: file,
                    uploaded: true,
                    new: true,
                  }}
                  onFileUpload={() => {}}
                />
              );
            })}
          </div>
        </div>
        <div className="w-full flex flex-row justify-between">
          <BaseButton
            label="Cancel"
            onClick={() => setOpenModal(false)}
            variant={ButtonTypes.secondary}
            disabled={buttonLoading}
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
  </>
  )
}
