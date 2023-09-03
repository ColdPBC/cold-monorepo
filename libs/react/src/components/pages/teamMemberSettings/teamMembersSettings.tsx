import { BaseButton } from '@coldpbc/components';
import { ColorNames } from '@coldpbc/components';
import React, { useState } from "react";
import { TeamMembersDataGrid } from '@coldpbc/components';
import useSWR from "swr";
import { InvitationModal } from '@coldpbc/components';
import { Spinner } from '@coldpbc/components';
import { axiosFetcher } from '@coldpbc/components';
import { useAuth0 } from '@auth0/auth0-react';
import {useFlags} from 'launchdarkly-react-client-sdk';
import {Organization} from 'auth0';
import {Header} from '@coldpbc/components';

export const TeamMembersSettings = (props: { user?: any }) => {
    const auth0 = useAuth0();

    const flags = useFlags();

    const {showTeamMemberTable} = flags;

    const [showModal, setShowModal] = useState( false );

    const organization = useSWR(
        ["/organizations/" + auth0.user?.coldclimate_claims.org_id, "GET"],
        axiosFetcher
    );

    const {data: Organization} = organization;

    const organizationData = organization.data as Organization;

    if(auth0.isLoading && organization.isLoading) {
        return (
            <div>
                <Spinner />
            </div>
        );
    }

    if(auth0.error && organization.error) {
        return <div></div>;
    }

    if(auth0.user && organization.data){
        return (
            <div>
                <Header/>
                <div className="p-10 h-full w-full">
                    <div className="flex justify-between pb-6">
                        <div className="text-2xl font-light">Team Members</div>
                        <BaseButton
                            onClick={() => {
                                setShowModal( true );
                            }}
                            color={ColorNames.primary}
                            label={"Invite Member"}
                        />
                    </div>
                    <div>
                        {
                            showTeamMemberTable &&
                            <TeamMembersDataGrid/>
                        }
                    </div>
                    {showModal && (
                        <InvitationModal
                            setShown={setShowModal}
                            shown={showModal}
                            companyName={organizationData.name}
                            user={auth0.user}
                        />
                    )}
                </div>
            </div>
        );
    } else {
        return <div></div>;
    }
};
