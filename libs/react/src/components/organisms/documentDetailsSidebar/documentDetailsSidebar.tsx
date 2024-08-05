import React, { useEffect, useRef } from 'react';
import { Files, InputOption } from '@coldpbc/interfaces';
import { ColdIcon, ErrorFallback, Select, DocumentDetailsMenu, Spinner } from '@coldpbc/components';
import { FileTypes, IconNames } from '@coldpbc/enums';
import { toArray } from 'lodash';
import capitalize from 'lodash/capitalize';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { withErrorBoundary } from 'react-error-boundary';
import { HexColors } from '@coldpbc/themes';

const _DocumentDetailsSidebar = (props: {
  file: Files | undefined;
  updateFile: (file: Files) => void;
  closeSidebar: () => void;
  innerRef: React.RefObject<HTMLDivElement>;
  deleteFile: (file: Files) => void;
  isLoading: boolean;
  downloadFile: (url: string | undefined) => void;
  signedUrl: string | undefined;
}) => {
  const { file, closeSidebar, innerRef, updateFile, deleteFile, isLoading, downloadFile, signedUrl } = props;

  const documentTypeOptions: InputOption[] = toArray(FileTypes).map((type, index) => {
    const name = capitalize(type.replace(/_/g, ' '));
    return {
      id: index,
      name: name,
      value: type,
    };
  });

  return (
    <div
      className={'flex flex-col h-screen fixed top-0 right-0 bottom-0 overflow-y-scroll text-tc-primary bg-gray-30'}
      style={{
        width: file ? '588px' : '0px',
        minWidth: file ? '588px' : '0px',
        transition: 'width 0.3s',
        boxShadow: file ? '0px 8px 32px 8px rgba(0, 0, 0, 0.70)' : 'none',
        padding: file ? '40px' : '0px',
      }}
      data-chromatic={'ignore'}
      ref={innerRef}>
      {file !== undefined && (
        <div className={'w-full h-full flex flex-col gap-[24px]'}>
          <div className={'w-full flex flex-row mb-[16px] gap-[16px] justify-between items-start'}>
            <div className={'cursor-pointer w-[16px] mt-[4px]'} onClick={() => closeSidebar()}>
              <ColdIcon name={IconNames.CloseModalIcon} width={16} height={16} />
            </div>
            <span className={'w-full text-h5 text-wrap break-all'}>{file.original_name}</span>
            <DocumentDetailsMenu
              onMenuClick={item => {
                if (item === 'delete') {
                  deleteFile(file);
                } else if (item === 'download') {
                  downloadFile(signedUrl);
                }
              }}
            />
          </div>
          {isLoading ? (
            <Spinner />
          ) : (
            <div className={'w-full flex flex-col gap-[20px]'}>
              <div className={'w-full flex flex-col gap-[8px]'}>
                <div className={'w-full text-tc-primary text-eyebrow'}>Category</div>
                <Select
                  options={documentTypeOptions}
                  name={'type'}
                  value={capitalize(file.type.replace(/_/g, ' '))}
                  onChange={(e: InputOption) => {
                    if (file) {
                      updateFile({ ...file, type: FileTypes[e.value] });
                    }
                  }}
                  buttonClassName={'w-full border-[1.5px] border-gray-90 rounded-[8px]'}
                />
              </div>
              <div className={'w-full flex flex-col gap-[8px]'}>
                <div className={'w-full text-tc-primary text-eyebrow'}>Valid From</div>
                <DesktopDatePicker
                  // @ts-ignore
                  value={file.effective_start_date ? new Date(file.effective_start_date) : null}
                  onChange={(date: Date | null) => {
                    if (file) {
                      updateFile({ ...file, effective_start_date: date ? date.toISOString() : null });
                    }
                  }}
                  slotProps={{
                    field: {
                      clearable: true,
                      onClear: () => {
                        if (file) {
                          updateFile({ ...file, effective_end_date: null });
                        }
                      },
                    },
                    popper: {
                      container: innerRef.current,
                    },
                  }}
                  sx={{
                    '& .MuiInputBase-input': {
                      backgroundColor: 'transparent',
                      fontFamily: 'Inter',
                      fontSize: '14px',
                      padding: '16px',
                      borderBottomLeftRadius: '8px',
                      borderTopLeftRadius: '8px',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderRadius: '8px',
                      borderColor: HexColors.gray['90'],
                      borderWidth: '1.5px',
                    },
                    '&  .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '&:hover fieldset': {
                        borderColor: HexColors.gray['90'],
                        borderWidth: '1.5px',
                      },
                      '&:focus-within fieldset': {
                        borderColor: HexColors.gray['90'],
                        borderWidth: '1.5px',
                      },
                    },
                    '& .MuiOutlinedInput-input:focus': {
                      outline: 'none',
                      boxShadow: 'none',
                    },
                  }}
                />
              </div>
              <div className={'w-full flex flex-col gap-[8px]'}>
                <div className={'w-full text-tc-primary text-eyebrow'}>Expiration Date</div>
                <DesktopDatePicker
                  // @ts-ignore
                  value={file.effective_end_date ? new Date(file.effective_end_date) : null}
                  onChange={(date: Date | null) => {
                    if (file) {
                      updateFile({ ...file, effective_end_date: date ? date.toISOString() : null });
                    }
                  }}
                  slotProps={{
                    field: {
                      clearable: true,
                      onClear: () => {
                        if (file) {
                          updateFile({ ...file, effective_end_date: null });
                        }
                      },
                    },
                    popper: {
                      container: innerRef.current,
                    },
                  }}
                  sx={{
                    '& .MuiInputBase-input': {
                      backgroundColor: 'transparent',
                      fontFamily: 'Inter',
                      fontSize: '14px',
                      padding: '16px',
                      borderBottomLeftRadius: '8px',
                      borderTopLeftRadius: '8px',
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderRadius: '8px',
                      borderColor: HexColors.gray['90'],
                      borderWidth: '1.5px',
                    },
                    '&  .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '&:hover fieldset': {
                        borderColor: HexColors.gray['90'],
                        borderWidth: '1.5px',
                      },
                      '&:focus-within fieldset': {
                        borderColor: HexColors.gray['90'],
                        borderWidth: '1.5px',
                      },
                    },
                    '& .MuiOutlinedInput-input:focus': {
                      outline: 'none',
                      boxShadow: 'none',
                    },
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const DocumentDetailsSidebar = withErrorBoundary(_DocumentDetailsSidebar, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in DocumentDetailsSidebar: ', error);
  },
});
