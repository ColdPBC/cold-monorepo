import { useAuth0, User } from '@auth0/auth0-react';
import { ButtonTypes } from '@coldpbc/enums';
import { axiosFetcher } from '@coldpbc/fetchers';
import { useContext, useEffect, useState } from 'react';
import { BaseButton, Input } from '../../atoms';
import { Card } from '../card';
import { Modal } from '../modal';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';
import { useColdContext } from '@coldpbc/hooks';
import ColdMQTTContext from '../../../context/coldMQTTContext';

const _UserSettings = () => {
  const { logBrowser } = useColdContext();
  const { logout: auth0Logout, user } = useAuth0();
  const { client } = useContext(ColdMQTTContext);

  const [updatedUser, setUpdatedUser] = useState(user ?? null);

  useEffect(() => {
    if (user) {
      setUpdatedUser(user);
    }
  }, [user]);

  const { picture, given_name, family_name, email } = updatedUser ?? {};

  const [showFirstNameModal, setShowFirstNameModal] = useState(false);
  const [showLastNameModal, setShowLastNameModal] = useState(false);

  // TODO: put inside a custom hook
  const postUserData = (userData: User) => {
    axiosFetcher([`/members/${email}`, 'PATCH', JSON.stringify(userData)]);
  };

  const handleLogout = () => {
    logBrowser('User logging out', 'info', {
      email,
      user,
      updatedUser,
    });
    localStorage.clear();
    sessionStorage.clear();
    client?.current.end();
    auth0Logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <Card
      glow
      title="Your Account"
      ctas={[
        {
          text: 'Log Out',
          action: handleLogout,
        },
      ]}
      data-testid={'user-settings-card'}>
      <Modal
        setShowModal={setShowFirstNameModal}
        show={showFirstNameModal}
        header={{
          title: 'Set First Name',
        }}
        body={
          <Input
            input_props={{
              value: updatedUser?.given_name,
              onValueChange: () => {},
              onChange: e => setUpdatedUser({ ...updatedUser, given_name: e.target.value }),
              name: 'firstName',
              id: 'firstName',
              className:
                'text-sm not-italic text-tc-primary font-medium bg-transparent w-full rounded-lg p-[16px] border border-bgc-accent focus:border focus:border-bgc-accent focus:ring-0 w-full',
              'aria-label': 'firstName',
            }}
            input_label_props={{
              className: 'text-sm not-italic text-tc-primary font-medium',
            }}
            input_label={'First Name'}
          />
        }
        footer={{
          resolveButton: {
            label: 'Save',
            onClick: () => {
              postUserData({
                given_name: updatedUser?.given_name,
              });
              setShowFirstNameModal(false);
            },
          },
          rejectButton: {
            label: 'Cancel',
            variant: ButtonTypes.secondary,
            onClick: () => {
              setShowFirstNameModal(false);
              setUpdatedUser(user ?? null);
            },
          },
        }}
      />
      <Modal
        setShowModal={setShowLastNameModal}
        show={showLastNameModal}
        header={{
          title: 'Set Last Name',
        }}
        body={
          <Input
            input_props={{
              value: updatedUser?.family_name,
              onValueChange: () => {},
              onChange: e => setUpdatedUser({ ...updatedUser, family_name: e.target.value }),
              name: 'lastName',
              id: 'lastName',
              className:
                'text-sm not-italic text-tc-primary font-medium bg-transparent w-full rounded-lg p-[16px] border border-bgc-accent focus:border focus:border-bgc-accent focus:ring-0 w-full',
              'aria-label': 'lastName',
            }}
            input_label_props={{
              className: 'text-sm not-italic text-tc-primary font-medium',
            }}
            input_label={'Last Name'}
          />
        }
        footer={{
          resolveButton: {
            label: 'Save',
            onClick: () => {
              postUserData({
                family_name: updatedUser?.family_name,
              });
              setShowLastNameModal(false);
            },
          },
          rejectButton: {
            label: 'Cancel',
            variant: ButtonTypes.secondary,
            onClick: () => {
              setShowFirstNameModal(false);
              setUpdatedUser(user ?? null);
            },
          },
        }}
      />
      <div className="flex w-full flow-row justify-between">
        <div className="flex justify-center items-center w-[400px] mr-10">
          {picture ? (
            <img className="w-[120px] h-auto rounded-2xl" src={picture} alt="profile" />
          ) : (
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 16C0 7.16344 7.16345 0 16 0H104C112.837 0 120 7.16345 120 16V104C120 112.837 112.837 120 104 120H16C7.16344 120 0 112.837 0 104V16Z" fill="#282C3E" />
              <path d="M42 78C42 66.75 48.75 60 59.9999 60C71.2498 60 78 66.75 78 78" stroke="white" strokeWidth="4.5" strokeLinecap="round" />
              <circle cx="60" cy="42" r="9" fill="white" />
            </svg>
          )}
        </div>
        <div className="flex-1 max-w-[800px]">
          <div className="flex flex-1 flex-col mb-11">
            <label htmlFor="first-name" className="mb-1 text-sm text-gray-110">
              First Name
            </label>
            <div className="flex">
              <input
                name="first-name"
                className="border-bgc-accent border rounded-lg p-4 bg-bgc-elevated leading-normal text-sm text-gray-110 flex-1"
                disabled
                value={given_name}
                aria-label="first-name"
              />
              <div className="h-[60px] ml-2 flex items-center" data-testid="edit-first-name-button">
                <BaseButton label="Edit" onClick={() => setShowFirstNameModal(true)} variant={ButtonTypes.secondary} />
              </div>
            </div>
          </div>
          <div className="flex flex-col mb-5">
            <label htmlFor="last-name" className="mb-1 text-sm text-gray-110">
              Last Name
            </label>
            <div className="flex">
              <input
                name="last-name"
                className="border-bgc-accent border rounded-lg p-4 bg-bgc-elevated leading-normal text-sm text-gray-110 flex-1"
                disabled
                value={family_name}
                aria-label="last-name"
              />
              <div className="h-[60px] ml-2 flex items-center" data-testid="edit-last-name-button">
                <BaseButton label="Edit" onClick={() => setShowLastNameModal(true)} variant={ButtonTypes.secondary} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export const UserSettings = withErrorBoundary(_UserSettings, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in UserSettings: ', error);
  },
});
