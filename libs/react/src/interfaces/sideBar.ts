import { IconNames } from '@coldpbc/enums';

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

export interface ComponentDefinitionGraphQL {
  id: string;
  name: string;
  definition: any;
}

export interface SidebarGraphQL extends ComponentDefinitionGraphQL {
  definition: {
    items: NavbarItem[];
  };
}
