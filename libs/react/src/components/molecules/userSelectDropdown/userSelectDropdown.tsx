import { useAuth0, User } from '@auth0/auth0-react';
import { GlobalSizes } from '@coldpbc/enums';
import { axiosFetcher } from '@coldpbc/fetchers';
import { flowbiteThemeOverride } from '@coldpbc/themes';
import { Dropdown, DropdownProps } from 'flowbite-react';
import useSWR from 'swr';
import { twMerge } from 'tailwind-merge';
import { Avatar } from '../../atoms';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application/errors/errorFallback';
import { useAuth0Wrapper, useOrgSWR } from '@coldpbc/hooks';

interface Props extends Omit<DropdownProps, 'onSelect' | 'label'> {
  onSelect: (user: User) => void;
  label?: string | JSX.Element;
}

const _UserSelectDropdown = ({ onSelect, className, ...rest }: Props) => {
  const {
    data,
    error,
    isLoading,
  }: { data: any; error: any; isLoading: boolean } = useOrgSWR(
    ['/members', 'GET'],
    axiosFetcher,
    {
      revalidateOnFocus: false,
    },
  );

  const getUserName = (user: User) => {
    if (user.given_name && user.family_name) {
      return `${user.given_name} ${user.family_name}`;
    } else {
      return user.name;
    }
  };

  return (
    <Dropdown
      inline={true}
      arrowIcon={false}
      theme={flowbiteThemeOverride.dropdown}
      label={rest.label ?? ''}
      className={twMerge('h-[225px] overflow-y-scroll w-[93%]', className)}
      {...rest}
    >
      {data?.members
        .filter((member: User) => !member.invitee)
        .map((member: User) => (
          <>
            <Dropdown.Item
              onClick={() => onSelect(member)}
              theme={flowbiteThemeOverride.dropdown.floating.item}
              value={member.user_id}
            >
              <span className="mr-4">
                <Avatar size={GlobalSizes.xSmall} user={member} />
              </span>
              <span className="text-white font-bold text-sm leading-normal">
                {getUserName(member)}
              </span>
            </Dropdown.Item>
            <div className="bg-bgc-accent h-[1px] w-full" />
          </>
        ))}
    </Dropdown>
  );
};

export const UserSelectDropdown = withErrorBoundary(_UserSelectDropdown, {
  FallbackComponent: (props) => <ErrorFallback />,
  onError: (error, info) => {
    console.error('Error occurred in UserSelectDropdown: ', error);
  },
});
