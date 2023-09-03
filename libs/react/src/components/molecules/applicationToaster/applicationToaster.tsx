/* eslint-disable @nx/enforce-module-boundaries */
import React, { useEffect }from "react";
import useSWR, {mutate, useSWRConfig} from "swr";
import {Toaster} from '@coldpbc/components';

export const ApplicationToaster = () => {
    const { data, error, isLoading } = useSWR('messages', {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    useEffect(() => {
        if(data){
            // clear timeout if it exists
            const timeout = setTimeout(() => {
                mutate('messages', undefined);
            }, data.timeout ? data.timeout : 3000)

            return () => {
                return clearTimeout(timeout);
            }
        }
    }, [data])

    if(error){
        return (
            <></>
        )
    }

    if(isLoading){
        return (
            <></>
        )
    }

    if(data){
        return (
            <Toaster message={data.message} type={data.type}/>
        )
    } else {
        return (
            <></>
        )
    }
}
