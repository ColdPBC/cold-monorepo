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
import { useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { ActionPayload } from '@coldpbc/interfaces';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application/errors/errorFallback';
import { useOrgSWR } from '@coldpbc/hooks';

const _SideBar = (): JSX.Element => {
  const {
    data,
    error,
    isLoading,
  }: {
    data: any;
    error: any;
    isLoading: boolean;
  } = useSWR(['/components/sidebar_navigation', 'GET'], axiosFetcher);
  const ldFlags = useFlags();

  // Fetch actions if actions feature flag is present
  const { data: actionsData } = useOrgSWR<ActionPayload[], any>(
    ldFlags.showActions261 ? [`/actions`, 'GET'] : null,
    axiosFetcher,
  );

  const filterSidebar = (item: NavbarItem) => {
    if (item.key === 'actions_key') {
      const hasActions = actionsData && actionsData?.length > 0;

      return ldFlags.showActions261 && hasActions;
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

  // filter top-level nav items
  let filteredSidebarItems = data.definition.items.filter(filterSidebar) ?? [];

  // filter nested action items
  if (
    ldFlags.showActions261 &&
    filteredSidebarItems.some((item: any) => item.key === 'actions_key')
  ) {
    filteredSidebarItems = filteredSidebarItems.map((item: any) => {
      if (item.key === 'actions_key') {
        return {
          ...item,
          items: item.items.filter((actionItem: any) => {
            return (
              actionItem.key === 'overview_actions_key' ||
              actionsData?.some(
                (action) =>
                  actionItem.key === `${action.action.subcategory}_actions_key`,
              )
            );
          }),
        };
      } else {
        return item;
      }
    });
  }

  if (filteredSidebarItems) {
    // Separate the items into top and bottom nav items
    const topItems: NavbarItem[] = clone(filteredSidebarItems);

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

export const SideBar = withErrorBoundary(_SideBar, {
  FallbackComponent: (props) => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in SideBar: ', error);
  },
});
