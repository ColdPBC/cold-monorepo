import { useContext, useEffect } from 'react';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import { orderBy } from 'lodash';

export const StartAIComplianceModal = () => {
  const { data } = useContext(ColdComplianceManagerContext);
  const { files } = data;

  const fileData = orderBy(files?.data || [], ['original_name'], ['asc']);

  useEffect(() => {
    files?.mutate();
  }, []);

  return (
    <div className={'h-full w-full p-[24px]'}>
      <div className={'h-full w-full p-[40px] flex flex-col gap-[24px] rounded-[16px] bg-opacity-50 bg-gray-05'}>
        <div className={'text-h4 w-full'}>
          Cold Climate will pre-fill as much of the form as possible based on the documents below. You'll always be able to review and edit yourself before submitting anything.
        </div>
        <div className={'text-body w-full'}>You can always add more documents later if you realized you missed something.</div>
        <div className={'w-full flex flex-col gap-[8px] overflow-y-auto'}>
          {fileData.map((file, index) => (
            <div key={index} className={'w-full flex flex-row justify-start p-[8px] border-[1px] border-gray-50 rounded-[8px] bg-gray-30'}>
              <div className={'text-eyebrow'}>{file.original_name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
