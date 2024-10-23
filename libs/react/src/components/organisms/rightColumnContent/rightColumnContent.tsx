import React, { PropsWithChildren } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RightColumnContentProps {}

export function RightColumnContent(props: PropsWithChildren<RightColumnContentProps>) {
	return (
		<div className="w-[405px] inline-flex flex-col items-start text-tc-primary">
			<div className="sticky top-[40px] w-full grid gap-6">{props.children}</div>
		</div>
	);
}
