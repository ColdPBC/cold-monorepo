import {IconNames} from '@coldpbc/components';

export interface NavbarItem {
    icon?: { name: IconNames };
    label: string;
    key: string;
    placement?: string;
    route?: string;
    items?: Array<NavbarItem>;
}
