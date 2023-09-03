import React, {PropsWithChildren} from "react";

export interface RightColumnContentProps {
}

export function RightColumnContent(props: PropsWithChildren<RightColumnContentProps>) {

    return (
        <div className='w-[437px] sticky inline-flex flex-col pt-10 items-start gap-6 text-tc-primary'>
            {props.children}
        </div>
    );
}
