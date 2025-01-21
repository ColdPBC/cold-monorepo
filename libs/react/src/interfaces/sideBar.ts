import { IconNames } from '../enums/iconNames';

export interface NavbarItem {
  icon?: { name: IconNames };
  label: string;
  key: string;
  placement?: string;
  route?: string;
  items?: Array<NavbarItemWithRoute>;
  roles?: string[];
}

export interface NavbarItemWithRoute extends NavbarItem {
  route: string;
}
