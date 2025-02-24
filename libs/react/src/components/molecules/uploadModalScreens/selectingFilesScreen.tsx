import {twMerge} from "tailwind-merge";
import {BaseButton, ColdIcon, UPLOAD_MAP} from "@coldpbc/components";
import {ButtonTypes, IconNames, MainDocumentCategory} from "@coldpbc/enums";
import {map, orderBy} from "lodash";
import React, {useEffect, useRef} from "react";

interface SelectingFilesScreenProps {
  types: MainDocumentCategory[]
  filesToUpload: File[]
  setFilesToUpload: React.Dispatch<React.SetStateAction<File[]>>;
  setButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  selectedOption: MainDocumentCategory | null;
  setSelectedOption: React.Dispatch<React.SetStateAction<MainDocumentCategory | null>>;
}

export const SelectingFilesScreen = (props: SelectingFilesScreenProps) => {
  const {
    types,
    filesToUpload,
    setFilesToUpload,
    setButtonDisabled,
    selectedOption,
    setSelectedOption
  } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  useEffect(() => {
    setButtonDisabled(selectedOption === null || filesToUpload.length === 0);
  }, [selectedOption, filesToUpload]);

  const addNewFiles = (files: File[]) => {
    // order the files by last modified date
    setFilesToUpload(prevFiles => orderBy([
      ...prevFiles,
      ...files,
    ], ['lastModified', 'name'], ['desc', 'asc']))
  }

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    addNewFiles(newFiles);
  };

  const uploadButton = async () => {
    if (fileInputRef.current !== null) fileInputRef.current.click();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles);
      addNewFiles(newFiles);
    }
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // Check if the dragged items are files
    if (event.dataTransfer.items && event.dataTransfer.items[0].kind === 'file') {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // When leaving the element, reset the dragging state
    setIsDragging(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // Explicitly show the drop effect
    event.dataTransfer.dropEffect = 'copy';
  };

  const removeFile = (index: number) => {
    setFilesToUpload(prevFiles => prevFiles.filter((_, i) => i !== index));
  }

  return (
    <>
      <div className="flex flex-col gap-[24px] w-full">
        <div className="flex flex-row text-h3">What are you uploading?</div>
        <div className={twMerge('w-full grid gap-4', types.length === 1 ? 'grid-cols-1' : 'grid-cols-2')}>
          {types.map((type) => {
            const isActive = selectedOption === type;
            const borderColorClassName = isActive ? 'border-white' : 'border-gray-90';
            const backgroundColorClassName = isActive ? 'bg-gray-40' : 'bg-transparent';
            const className = `flex flex-col gap-[8px] border-[1px] rounded-[8px] w-full px-[24px] pt-[16px] pb-[24px] cursor-pointer text-tc-primary
              ${backgroundColorClassName} ${borderColorClassName} hover:bg-gray-40 hover:border-white`;

            return (
              <div
                key={type}
                className={className}
                onClick={() => {
                  if (selectedOption === type) {
                    setSelectedOption(null);
                  } else {
                    setSelectedOption(type);
                  }
                }}
              >
                <div className="flex flex-row items-start pb-2 gap-[10px] w-full border-b-[1px] border-gray-90">
                  <div
                    className="relative w-6 h-6 rounded-full border-[1.5px] border-white flex items-center justify-center">
                    <div className={`w-4 h-4 rounded-full ${isActive && 'bg-primary-300'}`}></div>
                  </div>
                  <div className="text-h5 self-stretch">
                    {UPLOAD_MAP[type].title}
                  </div>
                  <ColdIcon name={UPLOAD_MAP[type].iconName} className="w-6 h-6"/>
                </div>
                <div className={'flex flex-col gap-4 w-full'}>
                  <div className="text-body">{UPLOAD_MAP[type].description}</div>
                  <div className="text-eyebrow text-tc-disabled">{UPLOAD_MAP[type].subDescription}</div>
                  <div
                    className={`self-start rounded-[30px] py-[4px] px-[8px] border-[1px] text-body ${UPLOAD_MAP[type].aiProcessing ? 'border-yellow-800' : 'border-bgc-menu'}`}>
                    {
                      UPLOAD_MAP[type].aiProcessing ? (
                        <span role="img" className="text-tc-secondary">✨Cold AI-Powered Processing</span>
                      ) : (
                        <span className="text-tc-disabled">Support Team Manual Processing</span>
                      )
                    }
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className={'w-full h-auto flex flex-col self-stretch items-stretch gap-[8px]'}>
        <div
          className={
            twMerge(
              'h-[180px] justify-self-stretch w-full rounded-[8px] border-dashed border-[1px] p-[24px] flex flex-col gap-[32px] justify-center items-center',
              isDragging ? 'bg-gray-50 border-white' : 'border-gray-90'
            )
          }
          onDrop={handleDrop}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
        >
          <div className={'text-h5'}>Drag & Drop Files Here or</div>
          <div>
            <BaseButton label={'Browse & Upload'} variant={ButtonTypes.secondary} onClick={uploadButton}/>
            <input onChange={handleChange} ref={fileInputRef} type="file" aria-label={'Upload Documents'} hidden
                   multiple/>
          </div>
        </div>
        <div className={'h-auto w-full flex flex-col gap-[8px]'}>
          {map(filesToUpload, (file, index) => {
            return (
              <div
                className={'text-tc-primary text-eyebrow w-full bg-gray-30 rounded-[8px] p-[8px] flex flex-row justify-between gap-[8px] items-center border-[1px] border-gray-50 cursor-pointer hover:bg-gray-90'}
                key={index}
                onClick={() => removeFile(index)}
              >
                <div className={'w-full'}>{file.name}</div>
                <div
                  className={'h-[12px] w-[12px]'}
                >
                  <ColdIcon
                    name={IconNames.CloseModalIcon}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  )
}
