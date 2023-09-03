import React from "react";
import { CenterColumnContent } from '../../organisms/centerColumnContent/centerColumnContent';
import { RightColumnContent } from '../../organisms/rightColumnContent/rightColumnContent';
import {useAuth0} from '@auth0/auth0-react';
import { Spinner } from '../../atoms/spinner/spinner';

export function Home() {
    const auth0 = useAuth0();
    if(auth0.isLoading) {
        return (
            <div>
                <Spinner />
            </div>
        );
    }

    if(auth0.user) {
        return (
            <>
                <CenterColumnContent title={"Welcome, "+auth0.user?.given_name}/>
                <RightColumnContent />
            </>
        );
    }
    return <></>
}
