import {UPLOAD_MAP, UploadModalFileListItem} from "@coldpbc/components";
import {forEach, get, map} from "lodash";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {MainDocumentCategory} from "@coldpbc/enums";
import {AxiosError, AxiosRequestConfig, isAxiosError} from "axios";
import {axiosFetcher} from "@coldpbc/fetchers";
import {useAuth0Wrapper, useColdContext} from "@coldpbc/hooks";
import {FilesWithAssurances, UploadsQuery} from "@coldpbc/interfaces";
import {ApolloQueryResult} from "@apollo/client";
import {KeyedMutator} from "swr";

interface UploadModalUploadingScreenProps {
  files: File[];
  onFileUpload: KeyedMutator<ApolloQueryResult<{ organizationFiles: UploadsQuery[] }>> |
    KeyedMutator<ApolloQueryResult<{ organizationFiles: FilesWithAssurances[] | null }>>;
  setButtonLoading: React.Dispatch<React.SetStateAction<boolean>>;
  selectedOption: MainDocumentCategory | null;
  setButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

interface UseFileUploadProps {
  files: File[];
  selectedOption: MainDocumentCategory | null;
  onFileUpload: KeyedMutator<ApolloQueryResult<{ organizationFiles: UploadsQuery[] }>> |
    KeyedMutator<ApolloQueryResult<{ organizationFiles: FilesWithAssurances[] | null }>>;
  setButtonLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useFileUpload = ({
                                files,
                                selectedOption,
                                onFileUpload,
                                setButtonLoading,
                                setButtonDisabled,
                              }: UseFileUploadProps) => {
  const { logBrowser } = useColdContext();
  const { orgId } = useAuth0Wrapper();
  const [uploading, setUploading] = useState(false);
  const [response, setResponse] = useState<{ failed: any[] } | null>(null);

  const hasUploaded = useRef(false); // Prevent double execution

  const uploadDocuments = useCallback(async () => {
    if (!selectedOption || uploading || hasUploaded.current) return;
    hasUploaded.current = true; // Set flag to prevent re-execution

    setButtonLoading(true);
    setUploading(true);
    setButtonDisabled(true);

    const formData = new FormData();
    forEach(files, (file) => formData.append("file", file));

    const config: AxiosRequestConfig = {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 60000,
      params: { ...UPLOAD_MAP[selectedOption].queryParams },
    };

    try {
      const response = await axiosFetcher([
        `/organizations/${orgId}/files`,
        "POST",
        formData,
        JSON.stringify(config),
      ]);

      if (!isAxiosError(response)) {
        // check if the response has any failed documents
        const failed = get(response, 'failed', []);
        if (failed.length > 0) {
          logBrowser(`Failed to upload ${failed.length} file`, 'error', { orgId, formData: { ...formData }, response });
        } else {
          logBrowser('File Upload successful', 'info', { orgId, formData: { ...formData }, response });
        }
        setResponse(response);
      } else {
        // handle regular axios server response errors
        const error: AxiosError = response;
        const failed = files.map(file => ({
          file: {
            originalname: file.name,
          },
          error: {
            message: 'Failed to upload',
          }
        }));
        setResponse({
          failed: failed,
        });

        if(error.response?.status === 409) {
          logBrowser('Duplicate file uploaded', 'error', {orgId, formData: { ...formData }, response});
        } else {
          logBrowser('Upload failed', 'error', {orgId, formData: { ...formData }, response
          });
        }
      }
      await onFileUpload();
    } catch (error) {
      if (isAxiosError(error)) {
        setResponse({
          failed: files.map((file) => ({
            file: { originalname: file.name },
            error: { message: "Failed to upload" },
          })),
        });

        if (error.response?.status === 409) {
          logBrowser("Duplicate file uploaded", "error", { orgId, error });
        } else {
          logBrowser("Upload failed", "error", { orgId, error });
        }
      }
    }

    setUploading(false);
    setButtonLoading(false);
    setButtonDisabled(false);
  }, [files, selectedOption, uploading, orgId, onFileUpload, setButtonLoading, setButtonDisabled]);

  return { uploadDocuments, uploading, response };
};

export const UploadingScreen = (props: UploadModalUploadingScreenProps) => {
  const {files, onFileUpload, setButtonLoading, selectedOption, setButtonDisabled} = props;

  const { uploadDocuments, uploading, response } = useFileUpload({
    files,
    selectedOption,
    onFileUpload,
    setButtonLoading,
    setButtonDisabled,
  });

  useEffect(() => {
    uploadDocuments();
  }, []); // Empty dependency array ensures it only runs once on mount

  const getResponseForFile = (index: number) => {
    if (!response) return null;
    const failedFile = get(response, `failed[${index}]`, null);
    return failedFile
      ? { message: get(failedFile, "error.message", "Failed to upload"), success: false }
      : { message: "Uploaded", success: true };
  };

  return (
    <>
      <div className="flex flex-col gap-[24px] w-full">
        <div className="flex flex-row text-h3">Upload Progress</div>
      </div>
      <div className={'w-full h-auto flex flex-col self-stretch items-stretch gap-[8px]'}>
        <div className={'h-auto w-full flex flex-col gap-[8px]'}>
          {map(files, (file, index) => {
            return (
              <UploadModalFileListItem
                key={index}
                file={file}
                apiResponse={getResponseForFile(index)}
                uploading={uploading}
              />
            );
          })}
        </div>
      </div>
    </>
  )
}

