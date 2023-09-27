import React, { useEffect, useState } from 'react';
import { ColdWordmark } from '../../atoms/logos/coldWordmark';
import { Sidebar as FBSidebar } from 'flowbite-react';
import useSWR from 'swr';
import { axiosFetcher } from '../../../fetchers/axiosFetcher';
import { SideBarItem } from './sideBar/sideBarItem';
import { flowbiteThemeOverride } from '../../../themes/flowbiteThemeOverride';
import { SideBarCollapse } from './sideBar/sideBarCollapse';
import { NavbarItem } from '../../../interfaces/sideBar';
import { Spinner } from '../../atoms/spinner/spinner';
import { HexColors } from '../../../themes/cold_theme';
import { clone, remove } from 'lodash';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { matchPath, useLocation } from 'react-router-dom';

export const SideBar = (): JSX.Element => {
  type SWRResponse = { definition: { items: Array<NavbarItem> } };
  const {
    data,
    error,
    isLoading,
  }: {
    data: any;
    error: any;
    isLoading: boolean;
  } = useSWR(['/form-definitions/sidebar_navigation', 'GET'], axiosFetcher);
  const ldFlags = useFlags();

  const filterSidebar = (item: NavbarItem) => {
    if (item.key === 'actions_key') {
      return ldFlags.showActions261;
    } else {
      return true;
    }
  };

  const location = useLocation();
  const [activeChild, setActiveChild] = useState('');

  useEffect(() => {
    if (data) {
      data.definition.items.forEach((item: NavbarItem) => {
        if (location.pathname === item.route && activeChild !== item.key) {
          setActiveChild(item.key);
        }
        if (item.items) {
          item.items.forEach((subItem: NavbarItem) => {
            if (
              location.pathname === subItem.route &&
              activeChild !== subItem.key
            ) {
              setActiveChild(subItem.key);
            }
          });
        }
      });
    }
  }, [location.pathname, data]);

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );

  if (error) console.error(error);

  if (data?.definition?.items) {
    data.definition.items = data.definition.items.filter(filterSidebar);
    // Separate the items into top and bottom nav items
    const topItems: NavbarItem[] = clone(data.definition.items);

    const bottomItems = remove(topItems, (item: NavbarItem) => {
      return item.placement && item.placement === 'bottom';
    });

    return (
      <FBSidebar theme={flowbiteThemeOverride.sidebar}>
        <div className="flex px-4 self-stretch items-center">
          <div className="h-6 w-[76px]">
            <ColdWordmark color={HexColors.white} />
          </div>
        </div>
        <FBSidebar.Items className="gap-2 mb-auto">
          <FBSidebar.ItemGroup className="mt-0 overflow-visible flex-grow">
            {topItems.map((item: NavbarItem, index: number) => {
              if (item.items) {
                return (
                  <SideBarCollapse
                    setActiveChild={setActiveChild}
                    activeChild={activeChild}
                    item={item}
                    key={item.key}
                  />
                );
              } else {
                return (
                  <SideBarItem
                    setActiveChild={setActiveChild}
                    activeChild={activeChild}
                    item={item}
                    key={item.key}
                  />
                );
              }
            })}
          </FBSidebar.ItemGroup>
        </FBSidebar.Items>
        <FBSidebar.Items className="gap-2">
          <FBSidebar.ItemGroup className="mt-0 border-t-0 overflow-visible">
            {bottomItems.map((item: NavbarItem, index: number) => {
              if (item.items) {
                return (
                  <SideBarCollapse
                    setActiveChild={setActiveChild}
                    activeChild={activeChild}
                    item={item}
                    key={item.key}
                  />
                );
              } else {
                return (
                  <SideBarItem
                    setActiveChild={setActiveChild}
                    activeChild={activeChild}
                    item={item}
                    key={item.key}
                  />
                );
              }
            })}
          </FBSidebar.ItemGroup>
        </FBSidebar.Items>
      </FBSidebar>
    );
  } else {
    return <div></div>;
  }
};
