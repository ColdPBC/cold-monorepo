import { withErrorBoundary } from 'react-error-boundary';
import { Card, DocumentDetailsSidebarContainer, DocumentsTable, ErrorFallback } from '@coldpbc/components';
import React, {useState} from 'react';
import { FilesWithAssurances } from '@coldpbc/interfaces';
import {KeyedMutator} from "swr";
import {ApolloQueryResult} from "@apollo/client";
import {get} from "lodash";

export const _ProductDocumentsTab = (props: {
  files: FilesWithAssurances[]
  refreshFiles: KeyedMutator<ApolloQueryResult<{ organizationFiles: FilesWithAssurances[] | null }>>;
  allMaterials: { id: string; name: string; tier2SupplierId: string; tier2SupplierName: string }[];
  allSustainabilityAttributes: any;
}) => {
  const { files, refreshFiles, allSustainabilityAttributes, allMaterials} = props;
  const [selectedDocument, setSelectedDocument] = useState<string | undefined>(undefined);

  const selectDocument = (id: string) => {
    if (selectedDocument && selectedDocument === id) {
      setSelectedDocument(undefined);
    } else {
      setSelectedDocument(id);
    }
  };

  return (
    <>
      <Card title={'Documents'} className={'w-full'} data-testid={'product-documents-tab-card'}>
        <DocumentsTable
          files={files}
          selectDocument={selectDocument}
          saveColumnKey={'productDocumentsDataGridColumns'}
        />
      </Card>
      <DocumentDetailsSidebarContainer
        selectedDocument={selectedDocument}
        setSelectedDocument={setSelectedDocument}
        files={files}
        refreshFiles={refreshFiles}
        sustainabilityAttributes={get(allSustainabilityAttributes.data, 'data.claims', [])}
        allMaterials={allMaterials}
      />
    </>
  );
};

export const ProductDocumentsTab = withErrorBoundary(_ProductDocumentsTab, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in ProductDocumentsTab: ', error);
  },
});
