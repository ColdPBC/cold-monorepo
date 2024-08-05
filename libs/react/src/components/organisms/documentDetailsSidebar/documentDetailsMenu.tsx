import { Popover } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';

export const DocumentDetailsMenu = (props: { onMenuClick: (item: 'delete' | 'download') => void }) => {
  const { onMenuClick } = props;
  return (
    <Popover className="relative">
      <Popover.Button className="w-[30px] h-fit bg-transparent cursor-pointer relative">
        <EllipsisVerticalIcon />
      </Popover.Button>
      <Popover.Panel className="divide-y divide-bgc-accent rounded-[8px] bg-bgc-elevated w-[158px] h-fit text-tc-primary text-body absolute top-[24px] right-0 z-50 overflow-hidden">
        <div
          className={'cursor-pointer w-full p-[16px] hover:bg-gray-40'}
          onClick={() => {
            onMenuClick('delete');
          }}>
          Delete
        </div>
      </Popover.Panel>
    </Popover>
  );
};
