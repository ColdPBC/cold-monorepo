import { useAuth0 } from "@auth0/auth0-react";
import { GlobalSizes } from "@coldpbc/enums";
import { axiosFetcher } from "@coldpbc/fetchers";
import { flowbiteThemeOverride } from "@coldpbc/themes";
import { Dropdown, DropdownProps } from "flowbite-react";
import useSWR from "swr";
import { twMerge } from "tailwind-merge";
import { Avatar } from "../../atoms";

interface Props extends Omit<DropdownProps, 'onSelect' | 'label'> {
    onSelect: (userId: string) => void;
    label?: string | JSX.Element;
}

export const UserSelectDropdown = ({
    onSelect,
    className,
    ...rest
}: Props) => {
    const { user: dataGridUser } = useAuth0();

    const getOrgURL = () => {
      if (dataGridUser?.coldclimate_claims.org_id) {
        return [
          '/organizations/' + dataGridUser.coldclimate_claims.org_id + '/members',
          'GET',
        ];
      } else {
        return null;
      }
    };
  
    const {
      data,
      error,
      isLoading,
    }: { data: any; error: any; isLoading: boolean } = useSWR(
      getOrgURL(),
      axiosFetcher,
      {
        revalidateOnFocus: false,
      },
    );

    return (
        <Dropdown
            inline={true}
            arrowIcon={false}
            theme={flowbiteThemeOverride.dropdown}
            label={rest.label ?? ''}
            className={twMerge('h-[225px] overflow-y-scroll w-[93%]', className)}
            {...rest}
        >
            {data?.members.filter((member: any) => !member.invitee).map((member: any) => (
                <>
                    <Dropdown.Item
                        onClick={() => onSelect(member.user_id)}
                        theme={flowbiteThemeOverride.dropdown.floating.item}
                    >
                        <span className="mr-4">
                            <Avatar size={GlobalSizes.xSmall} user={member} />
                        </span>
                        <span className="text-white font-bold text-sm leading-normal">
                            {member.name}
                        </span>
                    </Dropdown.Item>
                    <div className="bg-bgc-accent h-[1px] w-full" />
                </>
            ))}
        </Dropdown>
    );
}