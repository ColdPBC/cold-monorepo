import { User } from "@auth0/auth0-react";
import { ButtonTypes } from "@coldpbc/enums";
import { axiosFetcher } from "@coldpbc/fetchers";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router"
import { BaseButton, Input } from "../../atoms";
import { Card } from "../card"
import { Modal } from "../modal";

interface Props {
    user: User;
}

export const UserSettings = ({
    user,
}: Props) => {
    const {
        picture,
        given_name,
        family_name,
        email
    } = user;

    const navigate = useNavigate();
    const [showFirstNameModal, setShowFirstNameModal] = useState(false);
    const [showLastNameModal, setShowLastNameModal] = useState(false);
    const [firstName, setFirstName] = useState<string | undefined>(
        given_name,
    );
      const [lastName, setLastName] = useState<string | undefined>(
        family_name,
    );
    
    // reset firstname on edit modal close
    useEffect(() => {
        if (!showFirstNameModal) {
            setFirstName(given_name);
        }
    }, [showFirstNameModal]);

    // reset lastname on edit modal close
    useEffect(() => {
        if (!showLastNameModal) {
            setLastName(family_name);
        }
    }, [showLastNameModal]);
    
    // TODO: put inside a custom hook
    const postUserData = (userData: User) => {
        axiosFetcher([
            `/users/${email}`,
            'PATCH',
            JSON.stringify(userData),
        ]);
    };

    const handleLogout = () => navigate('/logout');

    return (
        <Card
            glow
            title="Your Account"
            ctas={[
                {
                    text: 'Log Out',
                    action: handleLogout
                }
            ]}
        >
            <Modal
                setShowModal={setShowFirstNameModal}
                show={showFirstNameModal}
                header={{
                    title: 'Set First Name',
                }}
                body={(
                    <Input
                        input_props={{
                            value: firstName,
                            onChange: (e) => setFirstName(e.target.value),
                            onValueChange: (name) => setFirstName(name),
                            name: 'firstName',
                            className:
                                'text-sm not-italic text-tc-primary font-medium bg-transparent w-full rounded-lg p-[16px] border border-bgc-accent focus:border focus:border-bgc-accent focus:ring-0 w-full',
                        }}
                        input_label_props={{
                            className: 'text-sm not-italic text-tc-primary font-medium',
                        }}
                        input_label={'First Name'}
                    />
                )}
                footer={{
                    resolveButton: {
                        label: 'Save',
                        onClick: () => {
                            postUserData({
                                given_name: firstName
                            });
                            setShowFirstNameModal(false);
                        }
                    },
                    rejectButton: {
                        label: 'Cancel',
                        variant: ButtonTypes.secondary,
                        onClick: () => setShowFirstNameModal(false)
                    }
                }}
            />
            <Modal
                setShowModal={setShowLastNameModal}
                show={showLastNameModal}
                header={{
                    title: 'Set Last Name',
                }}
                body={(
                    <Input
                        input_props={{
                            value: lastName,
                            onChange: (e) => setLastName(e.target.value),
                            onValueChange: (name) => setLastName(name),
                            name: 'lastName',
                            className:
                                'text-sm not-italic text-tc-primary font-medium bg-transparent w-full rounded-lg p-[16px] border border-bgc-accent focus:border focus:border-bgc-accent focus:ring-0 w-full',
                        }}
                        input_label_props={{
                            className: 'text-sm not-italic text-tc-primary font-medium',
                        }}
                        input_label={'Last Name'}
                    />
                )}
                footer={{
                    resolveButton: {
                        label: 'Save',
                        onClick: () => {
                            postUserData({
                                family_name: lastName
                            });
                            setShowLastNameModal(false);
                        }
                    },
                    rejectButton: {
                        label: 'Cancel',
                        variant: ButtonTypes.secondary,
                        onClick: () => setShowLastNameModal(false)
                    }
                }}
            />
            <div className="flex w-full">
                <div className="flex justify-center items-center w-[400px] mr-10">
                    {picture ? 
                        <img className="w-[120px] h-auto rounded-2xl" src={picture} alt='profile' /> 
                        :
                        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 16C0 7.16344 7.16345 0 16 0H104C112.837 0 120 7.16345 120 16V104C120 112.837 112.837 120 104 120H16C7.16344 120 0 112.837 0 104V16Z" fill="#282C3E"/>
                            <path d="M42 78C42 66.75 48.75 60 59.9999 60C71.2498 60 78 66.75 78 78" stroke="white" stroke-width="4.5" stroke-linecap="round"/>
                            <circle cx="60" cy="42" r="9" fill="white"/>
                        </svg>
                    }
                </div>
                <div className="flex-1">
                    <div className="flex flex-1 flex-col mb-11">
                        <label
                            htmlFor='first-name'
                            className="text-bgc-accent mb-1 text-sm text-gray-110"
                        >
                                First Name
                            </label>
                       <div className="flex">
                            <input
                                name='first-name'
                                className="border-bgc-accent border rounded-lg p-4 bg-bgc-elevated leading-normal text-sm text-gray-110 flex-1"
                                disabled
                                value={given_name}
                            />
                            <div className="h-[60px] ml-2 flex items-center">
                                <BaseButton label="Edit" onClick={() => setShowFirstNameModal(true)} variant={ButtonTypes.secondary} />
                            </div>
                       </div>
                    </div>
                    <div className="flex flex-col mb-5">
                        <label
                            htmlFor='last-name'
                            className="text-bgc-accent mb-1 text-sm text-gray-110"
                        >
                            Last Name
                        </label>
                       <div className="flex">
                            <input
                                name='last-name'
                                className="border-bgc-accent border rounded-lg p-4 bg-bgc-elevated leading-normal text-sm text-gray-110 flex-1"
                                disabled
                                value={family_name}
                            />
                            <div className="h-[60px] ml-2 flex items-center">
                                <BaseButton label="Edit" onClick={() => setShowLastNameModal(true)} variant={ButtonTypes.secondary} />
                            </div>
                       </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}