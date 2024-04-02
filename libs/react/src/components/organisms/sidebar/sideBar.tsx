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
import { ActionPayload } from '@coldpbc/interfaces';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application/errors/errorFallback';
import { useAuth0Wrapper, useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { ErrorType } from '@coldpbc/enums';
import { OrganizationSelector } from './sideBar/organizationSelector';

const _SideBar = (): JSX.Element => {
  const ldFlags = useFlags();

  let {
    data,
    error,
    isLoading,
  }: {
    data: any;
    error: any;
    isLoading: boolean;
  } = useSWR(ldFlags.showReiComplianceMvpSidebarCold506 ? ['/components/sidebar_navigation', 'GET'] : null, axiosFetcher);

  // Fetch actions if actions feature flag is present
  const { data: actionsData, error: actionsError } = useOrgSWR<ActionPayload[], any>(ldFlags.showActions261 ? [`/actions`, 'GET'] : null, axiosFetcher);

  const auth0 = useAuth0Wrapper();
  const { logBrowser } = useColdContext();

  const filterSidebar = (item: NavbarItem) => {
    if (item.key === 'actions_key') {
      const hasActions = actionsData && actionsData?.length > 0;

      return ldFlags.showActions261 && hasActions;
    } else if (item.key === 'documents_key') {
      return ldFlags.showDocumentsUploadModuleCold492;
    } else if (item.key === 'compliance_key') {
      return ldFlags.showComplianceModule;
    } else if (item.key === 'journey_key') {
      // TODO: Delete this once we replace the journey page completely
      item.label = 'Gaps';
      return true;
    } else {
      return true;
    }
  };

  const getSidebarItems = () => {
    if (!ldFlags.showReiComplianceMvpSidebarCold506) {
      data = {
        id: 'cc0267d8-f49c-493e-8ea0-2aaa58bb61f3',
        name: 'sidebar_navigation',
        type: 'NAVIGATION_SIDE',
        description: 'Provides links in the application sidebar',
        definition: {
          items: [
            {
              key: 'home_key',
              icon: {
                name: 'ColdHomeIcon',
              },
              label: 'Home',
              route: '/home',
            },
            {
              key: 'footprint_key',
              icon: {
                name: 'ColdFootprintIcon',
              },
              label: 'Footprint',
              route: '/footprint',
            },
            {
              key: 'journey_key',
              icon: {
                name: 'ColdJourneyIcon',
              },
              label: 'Journey',
              route: '/journey',
            },
            {
              key: 'documents_key',
              icon: {
                name: 'ColdDocumentsIcon',
              },
              label: 'Documents',
              route: '/documents',
            },
            {
              key: 'compliance_key',
              icon: {
                name: 'ColdComplianceIcon',
              },
              label: 'Compliance',
              route: '/compliance',
            },
            {
              key: 'actions_key',
              icon: {
                name: 'ColdActionsIcon',
              },
              items: [
                {
                  key: 'overview_actions_key',
                  label: 'Overview',
                  route: '/actions',
                },
                {
                  key: 'facilities_actions_key',
                  label: 'Facilities',
                  route: '/actions/facilities',
                },
                {
                  key: 'travel_actions_key',
                  label: 'Travel',
                  route: '/actions/travel',
                },
                {
                  key: 'operations_actions_key',
                  label: 'Operations',
                  route: '/actions/operations',
                },
                {
                  key: 'product_actions_key',
                  label: 'Product',
                  route: '/actions/product',
                },
                {
                  key: 'employee_footprint_actions_key',
                  label: 'Employee Footprint',
                  route: '/actions/employee_footprint',
                },
                {
                  key: 'employee_activation_actions_key',
                  label: 'Employee Activation',
                  route: '/actions/employee_activation',
                },
                {
                  key: 'internal_alignment_actions_key',
                  label: 'Internal Alignment',
                  route: '/actions/internal_alignment',
                },
                {
                  key: 'community_impact_actions_key',
                  label: 'Community Impact',
                  route: '/actions/community_impact',
                },
              ],
              label: 'Actions',
            },
            {
              key: 'settings_key',
              icon: {
                name: 'ColdSettingsIcon',
              },
              label: 'Settings',
              roles: ['cold:admin', 'company:admin', 'company:owner'],
              route: '/settings',
              placement: 'bottom',
            },
          ],
        },
        created_at: '2023-09-11T17:17:02.295Z',
        updated_at: '2024-02-12T10:49:58.323Z',
      };
      isLoading = false;
      error = null;
    }
  };

  const location = useLocation();

  const [activeChild, setActiveChild] = useState('');

  const { logError } = useColdContext();

  const getOrgSelector = () => {
    if (auth0.user && auth0.user.coldclimate_claims.roles[0] === 'cold:admin') {
      return <OrganizationSelector />;
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (data) {
      data.definition.items.forEach((item: NavbarItem) => {
        if (location.pathname === item.route && activeChild !== item.key) {
          setActiveChild(item.key);
        }
        if (item.items) {
          item.items.forEach((subItem: NavbarItem) => {
            if (location.pathname === subItem.route && activeChild !== subItem.key) {
              setActiveChild(subItem.key);
            }
          });
        }
      });
    }
  }, [location.pathname, data]);

  getSidebarItems();

  if (isLoading || auth0.isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );

  if (error || actionsError || auth0.error) {
    if (error) {
      logBrowser('Error loading sidebar data', 'error', { ...error }, error);
      logError(error, ErrorType.SWRError);
    }
    if (actionsError) {
      logBrowser('Error loading actions data', 'error', { ...actionsError }, actionsError);
      logError(actionsError, ErrorType.SWRError);
    }
    if (auth0.error) {
      logBrowser('Error loading auth0 data', 'error', { ...auth0.error }, auth0.error);
      logError(auth0.error, ErrorType.Auth0Error);
    }
    return <></>;
  }

  // filter top-level nav items
  let filteredSidebarItems = data.definition.items.filter(filterSidebar) ?? [];

  // filter nested action items
  if (!ldFlags.showReiComplianceMvpSidebarCold506 && ldFlags.showActions261 && filteredSidebarItems.some((item: any) => item.key === 'actions_key')) {
    filteredSidebarItems = filteredSidebarItems.map((item: any) => {
      if (item.key === 'actions_key') {
        return {
          ...item,
          items: item.items.filter((actionItem: any) => {
            return actionItem.key === 'overview_actions_key' || actionsData?.some(action => actionItem.key === `${action.action.subcategory}_actions_key`);
          }),
        };
      } else {
        return item;
      }
    });
  }

  if (filteredSidebarItems) {
    // Separate the items into top and bottom nav items
    logBrowser('Sidebar data loaded', 'info', { data, filteredSidebarItems });
    const topItems: NavbarItem[] = clone(filteredSidebarItems);

    const bottomItems = remove(topItems, (item: NavbarItem) => {
      return item.placement && item.placement === 'bottom';
    });

    return (
      <FBSidebar theme={flowbiteThemeOverride.sidebar} data-testid={'sidebar'}>
        <div className="flex px-4 self-stretch items-center">
          <div className="h-6 w-[76px]">
            <ColdWordmark color={HexColors.white} />
          </div>
        </div>
        <FBSidebar.Items className="gap-2 mb-auto">
          <FBSidebar.ItemGroup className="space-y-2 border-t pt-8 first:mt-0 first:border-t-0 first:pt-0 mt-0 overflow-visible flex-grow">
            {topItems.map((item: NavbarItem, index: number) => {
              if (item.items) {
                return <SideBarCollapse setActiveChild={setActiveChild} activeChild={activeChild} item={item} key={item.key} />;
              } else {
                return <SideBarItem setActiveChild={setActiveChild} activeChild={activeChild} item={item} key={item.key} />;
              }
            })}
          </FBSidebar.ItemGroup>
        </FBSidebar.Items>
        <FBSidebar.Items className="gap-2">
          <FBSidebar.ItemGroup className="mt-0 border-t-0 overflow-visible">
            <div id={'orgSelector'}>{getOrgSelector()}</div>
            {bottomItems.map((item: NavbarItem, index: number) => {
              if (item.items) {
                return <SideBarCollapse setActiveChild={setActiveChild} activeChild={activeChild} item={item} key={item.key} />;
              } else {
                return <SideBarItem setActiveChild={setActiveChild} activeChild={activeChild} item={item} key={item.key} />;
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
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in SideBar: ', error);
  },
});
