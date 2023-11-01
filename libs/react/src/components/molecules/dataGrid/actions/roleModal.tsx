import { useEffect, useState } from 'react';
import { IModalProps, Input, Modal, Spinner } from '@coldpbc/components';
import { Role } from 'auth0';
import capitalize from 'lodash/capitalize';
import { ColorNames, ErrorType, GlobalSizes, InputTypes } from '@coldpbc/enums';
import { TableActionType } from '@coldpbc/interfaces';
import useSWR from 'swr';
import { axiosFetcher } from '@coldpbc/fetchers';
import { useColdContext } from '@coldpbc/hooks';
import includes from 'lodash/includes';
import { isEqual } from 'lodash';
import { getFormattedUserName } from '@coldpbc/lib';

export type RoleModalProps = {
  show: boolean;
  setShowModal: () => void;
  action: TableActionType & {
    modalProps: {
      header: IModalProps['header'];
      body: IModalProps['body'];
      footer: IModalProps['footer'];
    };
  };
};

export const RoleModal = (props: RoleModalProps) => {
  const { logError } = useColdContext();
  const [role, setRole] = useState<string | undefined>();
  const { modalProps, actionObject } = props.action;

  const { data, isLoading, error } = useSWR(['/roles', 'GET'], axiosFetcher);

  const filterRoles = (role: any) => {
    const filteredRoles = ['cold:', 'default:'];

    let match = false;
    filteredRoles.map((roleFilter) => {
      if (match) return;
      match = includes(role.name, roleFilter);
    });

    filteredRoles.map((roleFilter) => {
      if (match) return;
      match = isEqual(role.name, actionObject.role);
    });

    if (match) return;
    return role;
  };

  useEffect(() => {
    if (data) {
      const filteredRoles = (data as Role[]).filter(filterRoles);
      setRole(filteredRoles[0].name);
    }
  }, [data]);

  if (error) {
    logError(error, ErrorType.SWRError);
    return null;
  }

  if (isLoading) {
    return (
      <div className="w-full h-full grid content-center">
        <Spinner size={GlobalSizes.medium} color={ColorNames.primary} />
      </div>
    );
  }

  if (data) {
    const filteredRoles = (data as Role[]).filter(filterRoles);
    return (
      <Modal
        show={props.show}
        setShowModal={props.setShowModal}
        {...modalProps}
        body={
          <div className="text-sm font-medium flex space-x-2 items-center w-full justify-between">
            <div>
              Update role for{' '}
              <span className="font-bold">
                {getFormattedUserName(actionObject)}
              </span>
            </div>
            <div className={'w-40'}>
              <Input
                input_props={{
                  name: 'role',
                  value: role || filteredRoles[0].name,
                  onValueChange: (value) => {
                    setRole(value);
                  },
                  options: filteredRoles.map((role: Role, index) => {
                    return {
                      id: index,
                      name: capitalize(role.name?.replace('company:', '')),
                    };
                  }),
                }}
                idx={1}
                type={InputTypes.Select}
              />
            </div>
          </div>
        }
        footer={{
          ...modalProps?.footer,
          resolveButton: {
            ...modalProps?.footer?.resolveButton,
            onClick: () => {
              // set the action api request call url to change roleName to role
              props.action.apiRequests[0].url =
                props.action.apiRequests[0].url.replace(
                  ':roleName',
                  role || '',
                );
              if (modalProps?.footer?.resolveButton?.onClick) {
                modalProps?.footer?.resolveButton?.onClick();
              }
            },
          },
        }}
      />
    );
  }
};
