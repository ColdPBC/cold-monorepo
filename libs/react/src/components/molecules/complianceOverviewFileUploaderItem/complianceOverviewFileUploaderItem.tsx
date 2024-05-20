import { useAuth0Wrapper } from '@coldpbc/hooks';
import { format } from 'date-fns';
import { ColdIcon } from '@coldpbc/components';
import { IconNames } from '@coldpbc/enums';
import React, { useEffect } from 'react';
import { forEach } from 'lodash';
import { AxiosRequestConfig, isAxiosError } from 'axios';
import { axiosFetcher } from '@coldpbc/fetchers';
import { files } from '@storybook/addon-knobs';

export interface ComplianceOverviewFileUploaderItemProps {
  file: {
    uploaded: boolean;
    new: boolean;
    contents: any;
  };
}

export const ComplianceOverviewFileUploaderItem = ({ file }: ComplianceOverviewFileUploaderItemProps) => {
  const { orgId } = useAuth0Wrapper();
  const [uploading, setUploading] = React.useState(!file.uploaded);
  const name = file.new ? file.contents.name : file.contents.original_name;
  const uploaded = file.uploaded;
  const dateString = file.new ? 'Just now' : format(new Date(file.contents.updated_at), 'MM/dd/yy');

  useEffect(() => {
    const uploadFile = async () => {
      if (!uploaded && orgId) {
        const fileToUpload = file.contents as File;
        const formData = new FormData();
        forEach(files, file => {
          formData.append('file', fileToUpload);
        });
        const config = JSON.stringify({
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 60000,
        } as AxiosRequestConfig);
        const response = await axiosFetcher([`/organizations/${orgId}/files`, 'POST', formData, config]);
        if (!isAxiosError(response)) {
          setUploading(false);
        }
      }
    };
    uploadFile();
  }, [uploaded, orgId]);

  return (
    <div className={'text-tc-primary text-eyebrow w-full bg-gray-30 rounded-[8px] p-[8px] flex flex-row gap-[8px] items-center border-[1px] border-gray-50'}>
      <div className={'w-1/2'}>{name}</div>
      <div className={'w-1/2 flex flex-row gap-[8px] items-center text-tc-disabled justify-between'}>
        {uploading ? (
          <div className={'w-full p-[2px] rounded-[8px] h-[8x] bg-bgc-accent'}>
            <div className={'h-full w-full bg-blue-300 rounded-[8px] animate-progressBar'}></div>
          </div>
        ) : (
          <>
            <div className={'w-[134px] justify-start'}>{dateString}</div>
            <div className={'h-[12px] w-[12px]'}>
              <ColdIcon name={IconNames.ColdSmallCheckBoxIcon} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
