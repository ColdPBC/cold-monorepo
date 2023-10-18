import { Card, Takeover, UserSelectDropdown } from '../../molecules';
import useSWR, { useSWRConfig } from 'swr';
import { useAuth0, User } from '@auth0/auth0-react';
import { axiosFetcher } from '@coldpbc/fetchers';
import { ActionPayload, Assignee } from '@coldpbc/interfaces';
import { ArrowRightIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { CompletedBanner } from './completedBanner';
import { Avatar, BaseButton } from '../../atoms';
import { ButtonTypes, GlobalSizes } from '@coldpbc/enums';
import { CheckIcon } from '@heroicons/react/20/solid';
import { Datepicker } from 'flowbite-react';
import { Dropdown } from 'flowbite-react';
import { flowbiteThemeOverride } from '@coldpbc/themes';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ActionDetailProgress } from '../../organisms';

interface Props {
  id: string;
}

export const ActionDetail = ({ id }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth0();
  const [show, setShow] = useState(true);

  const getOrgURL = () => {
    if (user?.coldclimate_claims.org_id) {
      return [
        '/organizations/' + user.coldclimate_claims.org_id + '/members',
        'GET',
      ];
    } else {
      return null;
    }
  };

  const { data: userData }: { data: any; error: any; isLoading: boolean } =
    useSWR(getOrgURL(), axiosFetcher, {
      revalidateOnFocus: false,
    });

  const { data, error, isLoading, mutate } = useSWR<ActionPayload, any, any>(
    [`/organizations/${user?.coldclimate_claims.org_id}/actions/${id}`, 'GET'],
    axiosFetcher,
  );

  const isActionComplete = data?.action.steps.every((step) => step.complete);

  const handleUpdateAction = async (
    updatedAction: Partial<ActionPayload['action']>,
  ) => {
    if (!data) return;

    const newAction: Pick<ActionPayload, 'action'> = {
      action: {
        ...data.action,
        ...updatedAction,
      },
    };

    await axiosFetcher([
      `/organizations/${user?.coldclimate_claims.org_id}/actions/${data.id}`,
      'PATCH',
      JSON.stringify(newAction),
    ]);

    await mutate(
      {
        ...data,
        ...newAction,
      },
      { revalidate: false },
    );
  };

  const handleClose = () => {
    const param = searchParams.get('actionId');
    if (param) {
      searchParams.delete('actionId');
      setSearchParams(searchParams);
    }
  };

  const handleAssigneeSelect = (userId: string) => {
    const assignee: User | null =
      userData?.members.find((user: User) => user.user_id === userId) ?? null;

    if (!assignee) return;

    handleUpdateAction({
      assignee: {
        name: assignee.name,
        family_name: assignee.family_name,
        given_name: assignee.given_name,
        picture: assignee.picture,
      },
    });
  };

  const selectedAssignee: User | null =
    userData?.members.find(
      (user: User) =>
        user.name &&
        user.name === data?.action.assignee?.name &&
        user.given_name === data?.action.assignee?.given_name &&
        user.family_name === data?.action.assignee?.family_name &&
        user.picture === data?.action.assignee?.picture,
    ) ?? null;

  if (error && !isLoading) {
    return null;
  }

  return (
    <Takeover
      show={show}
      setShow={setShow}
      isLoading={isLoading}
      header={{
        title: {
          text: 'Renewable Energy Procurement',
        },
        dismiss: {
          dismissible: true,
          label: 'Close Action',
          onClick: handleClose,
        },
      }}
      className={'z-10'}
    >
      <div className="flex gap-6 my-6">
        <div className="grid gap-6 w-[899px] flex flex-col">
          {isActionComplete && <CompletedBanner />}
          <Card title="About this action" glow className="gap-0">
            <div className="flex h-full">
              <div>
                <h4 className="font-bold text-sm leading-normal mt-4 mb-2">
                  Objective
                </h4>
                <p className="m-0 font-medium text-sm leading-normal mb-4">
                  {data?.action.overview}
                </p>
                <p className="m-0 font-medium text-sm leading-normal">
                  {data?.action.objective_description}
                </p>
                <h4 className="font-bold text-sm leading-normal mt-4 mb-2">
                  How we're going to do it
                </h4>
                <ol className="list-decimal list-outside pl-6">
                  {data?.action.steps.map((step) => (
                    <li>
                      <p className="m-0 font-medium text-sm leading-normal">
                        {step.overview}
                      </p>
                    </li>
                  ))}
                </ol>
                {data?.action.areas_of_impact && (
                  <div className="flex items-center mt-10 text-xs font-medium leading-none">
                    <span className="">Areas of impact:</span>
                    {data?.action.areas_of_impact.map((area) => (
                      <div className="ml-2 rounded-2xl bg-primary-300 py-2 px-4">
                        {area}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div
                className="min-w-[310px] max-w-[310px] h-full bg-cover bg-center bg-no-repeat rounded-lg ml-8"
                style={{
                  backgroundImage: `url('${data?.action.image_url}')`,
                }}
              />
            </div>
          </Card>
          {data && (
            <ActionDetailProgress
              actionPayload={data}
              setActionPayload={(actionPayload) => {
                handleUpdateAction(actionPayload.action);
              }}
            />
          )}
        </div>
        <div className="w-[437px]">
          <div className="sticky top-[40px] w-full grid gap-6">
            <Card glow className="gap-0 p-0 overflow-visible">
              <span className="p-4 w-full">
                {selectedAssignee && (
                  <div className="font-medium text-xs leading-none mb-2">
                    Steward
                  </div>
                )}
                <UserSelectDropdown
                  onSelect={handleAssigneeSelect}
                  renderTrigger={() => (
                    <span>
                      <BaseButton
                        variant={ButtonTypes.secondary}
                        onClick={() => {}}
                        className="w-full p-4 border border-bgc-accent bg-bgc-elevated"
                      >
                        <span className="flex items-center justify-between">
                          {selectedAssignee ? (
                            <div className="flex items-center">
                              <span className="mr-4">
                                <Avatar
                                  size={GlobalSizes.xSmall}
                                  user={selectedAssignee}
                                />
                              </span>
                              <span className="text-white font-bold text-sm leading-normal">
                                {selectedAssignee.name}
                              </span>
                            </div>
                          ) : (
                            'Add Steward'
                          )}
                          <ChevronDownIcon className="w-[18px] ml-2" />
                        </span>
                      </BaseButton>
                    </span>
                  )}
                />
              </span>
              <div className="h-[1px] w-full bg-bgc-accent" />
              {data?.action.due_date && (
                <span className="font-medium leading-normal text-sm m-4 mb-0">
                  Target Date:{' '}
                  {DateTime.fromISO(data?.action.due_date).toFormat(
                    'MMMM d, y',
                  )}
                </span>
              )}
              <Dropdown
                inline
                label=""
                renderTrigger={() => (
                  <span className="p-4 w-full">
                    <BaseButton
                      label={
                        data?.action.due_date
                          ? 'Edit Target Date'
                          : 'Add Target Date'
                      }
                      variant={ButtonTypes.secondary}
                      className="w-full"
                      onClick={() => {}}
                    />
                  </span>
                )}
                arrowIcon={false}
                theme={flowbiteThemeOverride.dropdown}
              >
                <Datepicker
                  inline
                  minDate={new Date()}
                  theme={flowbiteThemeOverride.datepicker}
                  showClearButton={false}
                  onSelectedDateChanged={(date) => {
                    console.log({ onInput: date.toISOString() });
                    handleUpdateAction({
                      due_date: date.toISOString(),
                    });
                  }}
                  value={data?.action.due_date}
                />
              </Dropdown>
            </Card>
            {data?.action.resources && (
              <Card title="Resources" glow className="gap-4">
                {data?.action.resources.map((resource) => (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={resource.url}
                    className="w-full h-[70px] px-4 flex justify-between items-center bg-bgc-accent rounded-lg text-md font-bold leading-normal cursor-pointer"
                  >
                    {resource.title} <ArrowRightIcon className="h-[20px]" />
                  </a>
                ))}
              </Card>
            )}
          </div>
        </div>
      </div>
    </Takeover>
  );
};
