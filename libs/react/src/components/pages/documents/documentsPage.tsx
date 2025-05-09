import { useAuth0Wrapper, useColdContext, useGraphQLSWR } from '@coldpbc/hooks';
import {
  DocumentsHeaderTypes,
  DocumentsTable,
  DocumentUploadButton,
  ErrorFallback,
  MainContent,
  Spinner,
  UploadModal,
  AiProcessingDocumentsBanner, DocumentDetailsSidebarContainer
} from '@coldpbc/components';
import React, { useEffect } from 'react';
import { FilesWithAssurances, MaterialWithSupplier } from '@coldpbc/interfaces';
import { AssuranceDocumentTypes, IconNames, MainDocumentCategory, ProcessingStatus} from '@coldpbc/enums';
import { withErrorBoundary } from 'react-error-boundary';
import {get} from 'lodash';
import { useFlags } from 'launchdarkly-react-client-sdk';

export interface MaterialWithTier2Supplier {
  id: string;
  name: string;
  tier2SupplierId: string;
  tier2SupplierName: string;
}

export const getTier2SupplierData = (material) => {
  const tier2Supplier = material.organizationFacility
  return { tier2SupplierId: tier2Supplier?.id || '', tier2SupplierName: tier2Supplier?.name || '' }
}

const _DocumentsPage = () => {
	const [selectedDocument, setSelectedDocument] = React.useState<string | undefined>(undefined);
	const [files, setFiles] = React.useState<FilesWithAssurances[]>([]);
	const { orgId } = useAuth0Wrapper();
	const { logBrowser } = useColdContext();
  const ldFlags = useFlags();
  const docTypeFilter = { type_in: Object.values(AssuranceDocumentTypes) };
	const allFiles = useGraphQLSWR<{
    organizationFiles: FilesWithAssurances[] | null;
  }>('GET_ALL_FILES', {
		filter: {
			organization: {
				id: orgId,
			},
      visible: true,
      ...docTypeFilter
		},
	});

	const allSustainabilityAttributes = useGraphQLSWR('GET_ALL_SUS_ATTRIBUTES', {
		pagination: {
			orderBy: {
				name: 'ASC',
			},
		},
	});

  const materialsQuery = useGraphQLSWR<{
    materials: MaterialWithSupplier[];
  }>(orgId ? 'GET_ALL_MATERIALS_TO_ADD_ASSURANCE_TO_DOCUMENT' : null, {
    organizationId: orgId,
  });

  const allMaterials: MaterialWithTier2Supplier[] = React.useMemo(() => {
    if (!materialsQuery.isLoading && !get(materialsQuery.data, 'errors', undefined)) {
      const data = get(materialsQuery.data, 'data.materials', []);
      return data.map(rawMaterial => ({
        id: rawMaterial.id,
        name: rawMaterial.name,
        ...getTier2SupplierData(rawMaterial),
      }));
    } else {
      return [];
    }
  }, [materialsQuery.isLoading, materialsQuery.data]);

	useEffect(() => {
		const files = get(allFiles.data, 'data.organizationFiles', []);
		if (files) {
			setFiles(files);
		}
	}, [allFiles.data]);

	if (allFiles.error) {
		logBrowser('Error fetching files', 'error', { ...allFiles.error }, allFiles.error);
	}

	if (allFiles.isLoading || allSustainabilityAttributes.isLoading) {
		return <Spinner />;
	}

  const getPageButtons = () => {
    return (
      <div className={'h-auto'}>
        {
          ldFlags.showNewDocumentUploadUxCold1410 ?
            (
              <UploadModal
                refreshData={allFiles.mutate}
                types={[
                  MainDocumentCategory.Assurance,
                ]}
                buttonProps={{
                  label: 'Upload Assurance Doc',
                  iconLeft: IconNames.PlusIcon,
                }}
              />
            ) : (
              <DocumentUploadButton
                buttonProps={{
                  label: 'Add New',
                  iconLeft: IconNames.PlusIcon,
                }}
                mutateFunction={allFiles.mutate}
                successfulToastMessage={{
                  message: (
                    <div className={'flex flex-col gap-[10px]'}>
                      <div className={'font-bold'}>Upload Complete</div>
                      <div className={'test-eyebrow'}>✨ Cold AI categorization has started</div>
                    </div>
                  ),
                  position: 'bottomRight',
                }}
                failureToastMessage={{
                  position: 'bottomRight',
                }}
              />
            )
        }
      </div>
    );
  };

	const selectDocument = (id: string) => {
		if (selectedDocument && selectedDocument === id) {
			setSelectedDocument(undefined);
		} else {
			setSelectedDocument(id);
		}
	};

	logBrowser('DocumentsPage rendered', 'info', { selectedDocument, files, allSustainabilityAttributes });

	return (
		<div className="relative overflow-y-auto h-full w-full">
			<MainContent title={ldFlags.showNewDocumentUploadUxCold1410 ? "Assurance Documents" : "Documents"} className={'gap-[40px] w-[calc(100%-100px)] min-w-[1129px]'} headerElement={getPageButtons()}>
				<DocumentsHeaderTypes files={files} />
        <AiProcessingDocumentsBanner count={files.filter(file => file.processingStatus === ProcessingStatus.AI_PROCESSING).length} />
				<DocumentsTable files={files} selectDocument={selectDocument} />
			</MainContent>
      <DocumentDetailsSidebarContainer
        selectedDocument={selectedDocument}
        setSelectedDocument={setSelectedDocument}
        files={files}
        refreshFiles={allFiles.mutate}
        sustainabilityAttributes={get(allSustainabilityAttributes.data, 'data.sustainabilityAttributes', [])}
        allMaterials={allMaterials}
      />
    </div>
	);
};

export const DocumentsPage = withErrorBoundary(_DocumentsPage, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in DocumentsPage: ', error);
	},
});
