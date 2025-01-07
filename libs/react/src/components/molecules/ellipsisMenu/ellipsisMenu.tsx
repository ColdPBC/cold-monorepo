import { Popover } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import { useRef } from 'react';

export const EllipsisMenu = (props: {
  items: Array<{
    label: string;
    onClick: () => void;
    color?: 'warning' | 'info';
  }>
  'data-testid'?: string;
}) => {
  const { items } = props;
  const ref = useRef<HTMLButtonElement>(null);
  const getColor = (color = 'info') => {
    return color === 'warning' ? 'text-red-300' : 'text-tc-primary';
  }

  return (
		<Popover className="relative" data-testid={props['data-testid']}>
			<Popover.Button className="w-[30px] h-fit bg-transparent cursor-pointer relative" ref={ref}>
				<EllipsisVerticalIcon />
			</Popover.Button>
			<Popover.Panel className="divide-y divide-bgc-accent rounded-[8px] bg-bgc-elevated w-[158px] h-fit text-tc-primary text-body absolute top-[24px] right-0 z-50 overflow-hidden border-[1px] border-gray-40">
				{items.map((item, index) => (
					<div
						key={index}
						className={'cursor-pointer w-full p-[16px] hover:bg-gray-40 ' + getColor(item.color)}
						onClick={() => {
							item.onClick();
							ref.current?.click();
						}}
						data-testid={`${props['data-testid']}-${item.label}`}>
						{item.label}
					</div>
				))}
			</Popover.Panel>
		</Popover>
	);
};
