import { HexColors } from '@coldpbc/themes';
import { ColdIcon, SupplierDetailDocumentsTable } from '@coldpbc/components';
import { IconNames } from '@coldpbc/enums';
import React, { ReactNode } from 'react';

export const MaterialDetailSidebar = (props: {
  selectedClaim: {
    name: string;
    label: string;
    level: string;
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
  closeSidebar: () => void;
}) => {
  const { selectedClaim, closeSidebar } = props;

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
      className={'flex flex-col h-screen fixed top-0 right-0 bottom-0 overflow-y-auto text-tc-primary'}
      style={{
        width: selectedClaim ? '588px' : '0px',
        minWidth: selectedClaim ? '588px' : '0px',
        transition: 'width 0.3s',
        backgroundColor: HexColors.gray['30'],
        boxShadow: selectedClaim ? '0px 8px 32px 8px rgba(0, 0, 0, 0.70)' : 'none',
        padding: selectedClaim ? '40px' : '0px',
      }}
      data-chromatic={'ignore'}>
      {selectedClaim !== null && (
        <div className={'w-full h-full flex flex-col gap-[16px]'}>
          <div className={'w-full flex flex-row justify-between mb-[16px]'}>
            <div className={'text-h3'}>{selectedClaim.label}</div>
            <div className={'flex flex-row items-center justify-center cursor-pointer'} onClick={() => closeSidebar()}>
              <ColdIcon name={IconNames.CloseModalIcon} width={24} height={24} />
            </div>
          </div>
          <div className={'w-full flex flex-row justify-between mb-[16px] pb-[16px] border-b-[1px] border-gray-90'}>
            <div className={'text-h4'}>Documents</div>
          </div>
          <div className={'w-full flex flex-col gap-[40px]'}>
            {selectedClaim.activeDocuments.length > 0 && (
              <div className={'w-full flex flex-col py-[16px] gap-[16px]'}>
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
