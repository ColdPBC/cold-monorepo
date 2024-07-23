import { HexColors } from '@coldpbc/themes';
import { BaseButton, ColdIcon } from '@coldpbc/components';
import { ButtonTypes, IconNames } from '@coldpbc/enums';
import React, { ReactNode } from 'react';
import { SupplierDetailDocumentsTable } from './supplierDetailDocumentsTable/supplierDetailDocumentsTable';

export const SupplierDetailSidebar = (props: {
  selectedClaim: {
    name: string;
    label: string;
    activeDocuments: {
      name: string;
      expirationDate: string | null;
      status: string;
      type: string;
    }[];
    expiredDocuments: {
      name: string;
      expirationDate: string | null;
      status: string;
      type: string;
    }[];
  } | null;
  setSelectedClaim: (claim: string | null) => void;
}) => {
  const { selectedClaim, setSelectedClaim } = props;

  const getDocumentTable = (
    documents: {
      name: string;
      expirationDate: string | null;
      status: string;
      type: string;
    }[],
  ): ReactNode => {
    return <SupplierDetailDocumentsTable documents={documents} />;
  };

  return (
    <div
      className={'flex flex-col h-screen absolute top-0 right-0 bottom-0 overflow-y-auto'}
      style={{
        width: selectedClaim ? '588px' : '0px',
        minWidth: selectedClaim ? '588px' : '0px',
        transition: 'width 0.3s',
        backgroundColor: HexColors.gray['30'],
        // shadow to the left
        boxShadow: selectedClaim ? '0px 8px 32px 8px rgba(0, 0, 0, 0.70)' : 'none',
        padding: selectedClaim ? '40px' : '0px',
      }}
      data-chromatic={'ignore'}>
      {selectedClaim !== null && (
        <div className={'w-full h-full flex flex-col gap-[16px]'}>
          <div className={'w-full flex flex-row justify-between mb-[16px]'}>
            <div className={'text-h3'}>{selectedClaim.label}</div>
            <div className={'flex flex-row items-center justify-center cursor-pointer'} onClick={() => setSelectedClaim(null)}>
              <ColdIcon name={IconNames.CloseModalIcon} />
            </div>
          </div>
          <div className={'w-full flex flex-row justify-between mb-[16px] pb-[16px] border-b-[1px] border-gray-90'}>
            <div className={'text-h4'}>Documents</div>
            <BaseButton className={'h-auto'} label={'Add'} variant={ButtonTypes.primary} />
          </div>
          <div className={'w-full flex flex-col gap-[40px]'}>
            {selectedClaim.activeDocuments.length > 0 && (
              <div className={'w-full flex flex-col gap-[16px]'}>
                <div className={'w-full text-h5'}>Active Documents</div>
                {getDocumentTable(selectedClaim.activeDocuments)}
              </div>
            )}
            {selectedClaim.expiredDocuments.length > 0 && (
              <div className={'w-full flex flex-col py-[16px] gap-[16px]'}>
                <div className={'w-full text-h5'}>Expired Documents</div>
                {getDocumentTable(selectedClaim.expiredDocuments)}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
