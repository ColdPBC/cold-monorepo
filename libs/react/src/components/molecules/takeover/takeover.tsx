import React, {PropsWithChildren, useState} from 'react';
import {BaseButton} from '@coldpbc/components';
import {CloseModalIcon} from '@coldpbc/components';
import {ColorNames} from '@coldpbc/components';

export interface TakeoverProps {
    show: boolean;
    setShow: (show: boolean) => void;
}
export const Takeover = (props: PropsWithChildren<TakeoverProps>) => {
    const {children, show, setShow} = props;
    return (
        <>
            {
                show && (
                    <div className={"fixed inset-0 h-screen w-screen rounded bg-cold-fadeAwayGray"}>
                        <div className="w-full flex justify-end">
                            <BaseButton onClick={() => {setShow(false)}} icon={<CloseModalIcon/>} color={ColorNames.starkWhite} />
                        </div>
                        <div>
                            {
                                children
                            }
                        </div>
                    </div>

                )
            }
        </>
    )
}
