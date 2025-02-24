import React from 'react';
import {ColdIcon, ErrorFallback} from '@coldpbc/components';
import {IconNames} from '@coldpbc/enums';
import {withErrorBoundary} from 'react-error-boundary';
import {IconProps} from "@coldpbc/interfaces";
import {HexColors} from "@coldpbc/themes";

export interface UploadModalFileListItemProps {
  file: File
  apiResponse: {
    message: string;
    success: boolean;
  } | null;
  uploading: boolean;
}

const _UploadModalFileListItem = ({ file, apiResponse, uploading }: UploadModalFileListItemProps) => {
  const name = file.name;

  const getResponse = (response: {
    message: string;
    success: boolean;
  } | null): {
    icon: IconProps | null;
    message: string | null;
  } => {
    let icon = null;
    let message = null;

    if(response === null) {
      return {
        icon,
        message
      }
    } else {
      return {
        icon: {
          name: response.success ? IconNames.ColdSmallCheckBoxIcon : IconNames.ColdDangerIcon,
          color: response.success ? HexColors.primary.DEFAULT : HexColors.red["100"],
        },
        message: response.message
      }
    }
  }

  const iconAndMessage = getResponse(apiResponse);

  return (
    <div
      className={'text-tc-primary text-eyebrow w-full bg-gray-30 rounded-[8px] p-[8px] flex flex-row gap-[8px] items-center border-[1px] border-gray-50'}>
      <div className={'w-1/2'}>{name}</div>
      <div className={'w-1/2 flex flex-row gap-[8px] items-center text-tc-disabled justify-between'}>
        {
          uploading ? (
            <div className={'w-full'}>
              Uploading...
            </div>
          ) : (
            <>
              {
                iconAndMessage.message && (
                  <div className={'w-full'}>
                    {iconAndMessage.message}
                  </div>
                )
              }
              {
                iconAndMessage.icon && (
                  <div className={'w-[25px] h-[25px] self-center'}>
                    <ColdIcon {...iconAndMessage.icon} />
                  </div>
                )
              }
            </>
          )
        }
      </div>
    </div>
  );
};

export const UploadModalFileListItem = withErrorBoundary(_UploadModalFileListItem, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in UploadModalFileListItem: ', error);
  },
});
