import {UPLOAD_MAP, UploadModalFileListItem} from "@coldpbc/components";
import {forEach, get, map, orderBy} from "lodash";
import React, {useEffect, useState} from "react";
import {MainDocumentCategory} from "@coldpbc/enums";
import {AxiosError, AxiosRequestConfig, isAxiosError} from "axios";
import {axiosFetcher} from "@coldpbc/fetchers";
import {useAuth0Wrapper, useColdContext} from "@coldpbc/hooks";

interface UploadModalUploadingScreenProps {
  files: File[];
  onFileUpload: () => void;
  setButtonLoading: React.Dispatch<React.SetStateAction<boolean>>;
  selectedOption: MainDocumentCategory | null;
  setButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UploadingScreen = (props: UploadModalUploadingScreenProps) => {
  const { logBrowser } = useColdContext();
  const { orgId } = useAuth0Wrapper();
  const {files, onFileUpload, setButtonLoading, selectedOption, setButtonDisabled} = props;
  const [uploading, setUploading] = useState(false)

  const [response, setResponse] = useState<{
    failed: any[];
  } | null>(null);

  const getResponseForFile = (file: File): {
    message: string;
    success: boolean;
  } | null => {
    if(response === null) return null;
    const failed = get(response, 'failed', []);
    const failedFile = failed.find((failed: any) => get(failed, 'file.originalname', '') === file.name);
    if(failedFile) {
      const failedMessage = get(failedFile, 'error.message', 'Failed to upload');
      return {
        message: failedMessage,
        success: false,
      }
    } else {
      return {
        message: 'Uploaded',
        success: true,
      }
    }
  }

  useEffect(() => {
    const uploadDocuments = async () => {
      if(selectedOption === null) return;

      setButtonLoading(true);
      setUploading(true);
      setButtonDisabled(true);
      const formData = new FormData();
      forEach(files, file => {
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
          logBrowser(`Failed to upload ${failed.length} file`, 'error', { orgId, formData: { ...formData }, response });
        } else {
          logBrowser('File Upload successful', 'info', { orgId, formData: { ...formData }, response });
        }
        setResponse(response);
        await onFileUpload()
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
      setUploading(false);
      setButtonLoading(false);
      setButtonDisabled(false);
    }
    uploadDocuments();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-[24px] w-full">
        <div className="flex flex-row text-h3">Upload Progress</div>
      </div>
      <div className={'w-full h-auto flex flex-col self-stretch items-stretch gap-[8px]'}>
        <div className={'h-auto w-full flex flex-col gap-[8px]'}>
          {map(orderBy(files, ['lastModified', 'name'], ['desc', 'asc']), (file, index) => {
            return (
              <UploadModalFileListItem
                key={index}
                file={file}
                apiResponse={getResponseForFile(file)}
                uploading={uploading}
              />
            );
          })}
        </div>
      </div>
    </>
  )
}

