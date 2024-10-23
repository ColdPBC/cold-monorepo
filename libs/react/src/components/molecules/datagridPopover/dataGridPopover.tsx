import React, { PropsWithChildren, ReactNode, useCallback, useEffect, useRef } from 'react';

export interface DataGridPopoverProps {
	content: ReactNode;
	shown: boolean;
	setShown: (value: boolean) => void;
}

export const DataGridPopover = (props: PropsWithChildren<DataGridPopoverProps>) => {
	const { content, children, shown, setShown } = props;
	const ref = useRef(null);

	const handleClickOutside = useCallback(
		(event: any) => {
			//todo: fix this issue
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			const matched = ref?.current?.isSameNode(event.target);
			if (matched) {
				setShown(false);
			}
		},
		[ref],
	);

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	}, [handleClickOutside]);

	return (
		<div className={'relative'}>
			{children}
			{shown && <div className="fixed inset-0" ref={ref}></div>}
			{shown && <div className="absolute top-full right-0 w-52">{content}</div>}
		</div>
	);
};
