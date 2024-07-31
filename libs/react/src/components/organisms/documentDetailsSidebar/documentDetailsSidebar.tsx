import React, { useEffect, useRef } from 'react';
import { Files, InputOption } from '@coldpbc/interfaces';
import { ColdIcon, ErrorFallback, Input, Select } from '@coldpbc/components';
import { FileTypes, IconNames, InputTypes } from '@coldpbc/enums';
import { isEqual, toArray } from 'lodash';
import capitalize from 'lodash/capitalize';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { withErrorBoundary } from 'react-error-boundary';
import { HexColors } from '@coldpbc/themes';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';

const _DocumentDetailsSidebar = (props: {
  file: Files | undefined;
  updateFile: (file: Files) => void;
  closeSidebar: () => void;
  innerRef: React.RefObject<HTMLDivElement>;
  refreshFiles: () => void;
}) => {
  const { file, closeSidebar, innerRef, refreshFiles, updateFile } = props;

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
      className={'flex flex-col h-screen absolute top-0 right-0 bottom-0 overflow-y-auto text-tc-primary bg-gray-30'}
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
            <div className={'cursor-pointer w-[24px] mt-[5px]'} onClick={() => closeSidebar()}>
              <ColdIcon name={IconNames.CloseModalIcon} width={24} height={24} />
            </div>
            <span className={'w-full text-h5 text-wrap break-all'}>{file.original_name}</span>
            <div className={'cursor-pointer w-[40px] mt-[2px]'}>
              <EllipsisVerticalIcon />
            </div>
          </div>
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
                  '& .MuiInputBase-root': {
                    borderRadius: '8px',
                  },
                  '& .MuiInputBase-root:hover': {
                    outline: 'none',
                    ring: 'none',
                    borderWidth: '0px',
                    boxShadow: 'none',
                  },
                  '& .MuiInputBase-input:hover': {
                    borderColor: 'transparent',
                  },
                  '& .MuiInput-input:focus': {
                    outline: 'none',
                    ring: 'none',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderRadius: '8px',
                    borderColor: HexColors.gray['90'],
                  },
                  '&  .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                  '& .MuiOutlinedInput-input:focus': {
                    outline: 'none',
                    boxShadow: 'none',
                  },
                  '&  .MuiOutlinedInput-root:focus-visible': {
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
                }}
                sx={{
                  '& .MuiInputBase-input': {
                    backgroundColor: 'transparent',
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    padding: '16px',
                  },
                  '& .MuiInputBase-input:hover': {
                    borderColor: 'transparent',
                  },
                  '& .MuiInput-input:focus': {
                    outline: 'none',
                  },
                  '& .MuiTextField-root': {
                    borderRadius: '8px',
                  },
                  '& .MuiTextField-root:hover': {
                    outline: 'none',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderRadius: '8px',
                    borderColor: HexColors.gray['90'],
                  },
                  '&  .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                  '& .MuiOutlinedInput-input:focus': {
                    outline: 'none',
                    boxShadow: 'none',
                  },
                }}
              />
            </div>
          </div>
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
