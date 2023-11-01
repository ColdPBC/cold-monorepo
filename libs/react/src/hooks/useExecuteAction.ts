import { axiosFetcher } from '../fetchers/axiosFetcher';
import { TableActionType } from '../interfaces/tableAction';
import { User } from '@auth0/auth0-react';
import { AxiosResponse, isAxiosError } from 'axios';
import { cloneDeep, isEmpty } from 'lodash';

export function useExecuteAction() {
  const executeAction = async (action: TableActionType) => {
    const responses = await Promise.all(
      action.apiRequests.map(({ url, method, data = {} }) =>
        axiosFetcher([url, method, JSON.stringify(data)]),
      ),
    );
    const errorResponse = responses.find((response) => isAxiosError(response));
    if (errorResponse) {
      throw errorResponse;
    }
    switch (action.name) {
      case 'cancel invite':
        await action.mutate(
          (data: any) => {
            const invitee: User = action.actionObject;
            // remove the invitee from the members list in data
            data.members = data.members.filter(
              (member: User) => member.id !== invitee.id,
            );
            return {
              ...data,
              members: cloneDeep(data.members),
            };
          },
          { revalidate: false },
        );
        break;
      case 'resend invite':
        await action.mutate((data: any) => {
          data.members = data.members.filter(
            (member: User) => member.id !== action.actionObject.id,
          );
          const newInvitation = responses.find(
            (response: any) => !isEmpty(response),
          );
          data.members.push(newInvitation);
          return {
            ...data,
            members: cloneDeep(data.members),
          };
        });
        break;
      case 'remove user':
        await action.mutate(
          (data: any) => {
            const members = data.members.filter(
              (member: User) => member.user_id !== action.actionObject.user_id,
            );
            return {
              ...data,
              members: cloneDeep(members),
            };
          },
          {
            revalidate: false,
          },
        );
        break;
      case 'update role':
        await action.mutate(responses[0], {
          revalidate: false,
        });
      default:
        break;
    }
    return responses;
  };

  return { executeAction };
}
