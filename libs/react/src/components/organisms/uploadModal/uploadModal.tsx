import { ButtonTypes, IconNames, MainDocumentCategory } from '@coldpbc/enums';
import { Modal as FBModal } from 'flowbite-react'
import { flowbiteThemeOverride } from '@coldpbc/themes';
import {
  BaseButton,
  Card,
  SelectingFilesScreen, UploadingScreen
} from '@coldpbc/components';
import React, { useEffect } from 'react';
import { KeyedMutator } from "swr";
import { ApolloQueryResult } from "@apollo/client";
import {FilesWithAssurances, IButtonProps, UploadsQuery} from "@coldpbc/interfaces";

export interface UploadModalProps{
  types: Array<MainDocumentCategory>
  refreshData: KeyedMutator<ApolloQueryResult<{ organizationFiles: UploadsQuery[] }>> | KeyedMutator<ApolloQueryResult<{ organizationFiles: FilesWithAssurances[] | null }>>
  buttonProps?: IButtonProps;
}

export const UPLOAD_MAP: {
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
  const { types, refreshData, buttonProps} = props;
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [buttonLoading, setButtonLoading] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<MainDocumentCategory | null>(null);
  const [filesToUpload, setFilesToUpload] = React.useState<File[]>([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [screen, setScreen] = React.useState<
    'selectFiles' | 'uploading'
  >('selectFiles');

  useEffect(() => {
    setScreen('selectFiles');
    setSelectedOption(null);
    setFilesToUpload([]);
  }, [openModal]);

  const getButtons = () => {
    const secondaryButtonProps = {
      label: screen === 'selectFiles' ? 'Cancel' : 'Back',
      onClick: screen === 'selectFiles' ? () => setOpenModal(false): () => {setScreen('selectFiles'); setFilesToUpload([]);},
      disabled: buttonLoading,
      variant: ButtonTypes.secondary,
    }

    const primaryButtonProps = {
      label: screen === 'selectFiles' ? selectedOption && UPLOAD_MAP[selectedOption].aiProcessing ? "Confirm & Start AI Processing" : "Confirm" : 'Close',
      onClick: screen === 'selectFiles' ? () => setScreen('uploading'): () => setOpenModal(false),
      loading: buttonLoading,
      disabled: buttonDisabled,
    }

    return (
      <div className="w-full flex flex-row justify-between">
        <BaseButton
          {...secondaryButtonProps}
        />
        <BaseButton
          {...primaryButtonProps}
        />
      </div>
    )
  }

  return (
    <>
      <BaseButton
        label={'Upload'}
        onClick={() => setOpenModal(true)}
        variant={ButtonTypes.primary}
        iconLeft={IconNames.PlusIcon}
        className={'self-center'}
        data-testid={'upload-button'}
        {...buttonProps}
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
        {
          screen === 'selectFiles' && (
            <SelectingFilesScreen
              types={types}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              filesToUpload={filesToUpload}
              setFilesToUpload={setFilesToUpload}
              setButtonDisabled={setButtonDisabled}
            />
          )
        }
        {
          screen === 'uploading' && (
            <UploadingScreen
              files={filesToUpload}
              onFileUpload={refreshData}
              setButtonLoading={setButtonLoading}
              selectedOption={selectedOption}
              setButtonDisabled={setButtonDisabled}
            />
          )
        }
        {
          getButtons()
        }
      </Card>
    </FBModal>
    </>
  )
}
