import React, {PropsWithChildren} from "react";

export interface CenterColumnContentProps {
    title?:string,
}

export function CenterColumnContent(props: PropsWithChildren<CenterColumnContentProps>) {

    return (
        <div className='w-[668px] flex flex-col items-center gap-6 text-tc-primary'>
            {
                // show title if we have one
                props.title && <div className='text-h1 self-stretch'>{props.title}</div>
            }
            {props.children}
        </div>
    );
}
