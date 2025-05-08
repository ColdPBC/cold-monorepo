import React, {useEffect, useMemo, useState} from 'react';
import {clone, get, upperCase} from 'lodash';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { useLocation } from 'react-router-dom';
import {NavbarItem, NavbarItemWithRoute, SidebarGraphQL} from '@coldpbc/interfaces';
import { withErrorBoundary } from 'react-error-boundary';
import {useAuth0Wrapper, useColdContext, useGraphQLSWR} from '@coldpbc/hooks';
import { ErrorType } from '@coldpbc/enums';
import {
  ColdLogoAnimation,
  OrganizationSelector,
  SideBarItem,
  ErrorFallback,
  Spinner,
} from '@coldpbc/components';
import {getGraphqlError, hasGraphqlError} from '@coldpbc/lib';

const _SideBar = ({ defaultExpanded }: { defaultExpanded?: boolean }): JSX.Element => {
	const ldFlags = useFlags();
  const {orgId} = useAuth0Wrapper()
	const [activeItem, setActiveItem] = useState<NavbarItem | NavbarItemWithRoute | null>(null);
	const sidebarQuery =  useGraphQLSWR<{
    componentDefinitions: SidebarGraphQL[];
  }>(
    'GET_COMPONENT_DEFINITIONS', {
      filter: {
        name: 'sidebar_navigation',
      }
    });

	const auth0 = useAuth0Wrapper();
	const { logBrowser } = useColdContext();

	const filterSidebar = (item: NavbarItem) => {
    if (item.items) {
      if (item.key === 'reporting_automation_key') {
        if (!ldFlags.showReportingAutomation) return false;
      } else if (item.key === 'climate_key') {
        if (!ldFlags.showClimateSection) return false;
      } else if (item.key === 'my_data_key') {
        if (!ldFlags.showMyData) return false;
      }

      // Filter children but preserve parent structure
      item.items = item.items.filter(filterSidebar);

      // Hide parent if all children are filtered out
      return item.items.length > 0;
    }

    if (item.key === 'settings_billing_key') {
      return ldFlags.showBillingPageCold957;
    } else if (item.key === 'assurance_documents_key' || item.key === 'uploads_key') {
      // Show new documents items when FF is on
      return ldFlags.showNewDocumentUploadUxCold1410;
    } else if (item.key === 'documents_key') {
      // Hide old Documents item when FF is on
      return !ldFlags.showNewDocumentUploadUxCold1410;
    } else if (item.key === 'regulatory_compliance_key') {
      return ldFlags.showRegulationsPage;
    } else if (item.key === 'sustainability_key' || item.key === 'assurance_documents_key') {
      return ldFlags.sustainabilityAttributesAndAssuranceDocs;
    } else {
			return true;
		}
	};

	const location = useLocation();

	const { logError } = useColdContext();

	const getOrgSelector = () => {
		if (auth0.user && auth0.user.coldclimate_claims.roles.includes('cold:admin')) {
			return <OrganizationSelector sidebarExpanded={true} />;
		} else {
			return null;
		}
	};

	const getSidebarLogo = () => {
		return <ColdLogoAnimation expanded={true} />;
	};

	useEffect(() => {
    const matchPathWithSidebarItem = (items: NavbarItem[]) => {
      const findMatchingItem = (items: NavbarItem[]): NavbarItem | undefined => {
        for (const item of items) {
          if (item.route && location.pathname.includes(item.route)) {
            return item;
          }

          if (item.items && item.items.length > 0) {
            const matchInChildren = findMatchingItem(item.items);
            if (matchInChildren) {
              return matchInChildren;
            }
          }
        }
        return undefined;
      };

      const matchingItem = findMatchingItem(items);

      // Only set active item if it's different from current
      if (matchingItem && (!activeItem || activeItem.key !== matchingItem.key)) {
        setActiveItem(matchingItem);
      } else if (!matchingItem && activeItem) {
        // Clear active item if no match is found
        setActiveItem(null);
      }
    };

    const items: NavbarItem[] = get(sidebarQuery.data, 'data.componentDefinitions[0].definition.items', []);
    matchPathWithSidebarItem(items);
  }, [location.pathname, sidebarQuery.data, activeItem?.key, orgId, ldFlags]);

  const filteredSidebarItems = useMemo(() => {
    // Get the original, complete sidebar items from the query response
    const originalItems = get(sidebarQuery.data, 'data.componentDefinitions[0].definition.items', []) ?? [];

    // Create a deep clone to avoid modifying the original data
    const clonedItems = JSON.parse(JSON.stringify(originalItems));

    // Apply filtering to the fresh clone
    return clonedItems.filter(filterSidebar);
  }, [ldFlags, sidebarQuery, orgId]);

  if (sidebarQuery.isLoading || auth0.isLoading)
		return (
			<div>
				<Spinner />
			</div>
		);

	if (hasGraphqlError(sidebarQuery) || auth0.error) {
    const error = getGraphqlError(sidebarQuery);
		if (error) {
			logBrowser('Error loading sidebar data', 'error', { error: error });
			logError(new Error('Error loading sidebar data'), ErrorType.SWRError, error);
		}
		if (auth0.error) {
			logBrowser('Error loading auth0 data', 'error', { ...auth0.error }, auth0.error);
			logError(auth0.error, ErrorType.Auth0Error);
		}
		return <></>;
	}

	if (filteredSidebarItems) {
		// Separate the items into top and bottom nav items
		logBrowser('Sidebar data loaded', 'info', { data: sidebarQuery.data, filteredSidebarItems });
		const topItems: NavbarItem[] = clone(filteredSidebarItems);
    const orgSelector = getOrgSelector();

    return (
      <div
        data-testid={'sidebar'}
        className={
          'text-tc-primary fixed left-0 top-0 h-[100vh] w-[241px] overflow-auto justify-between flex flex-col items-center ' +
          'bg-bgc-elevated z-20 gap-[32px] scrollbar-hide'
        }>
        <div className={`flex flex-col gap-[32px] w-full ${orgSelector ? 'pb-10' : ''}`}>
          <div className={'py-[24px] px-[16px]'}>
            {getSidebarLogo()}
          </div>
          {topItems.map((item: NavbarItem, index: number) => {
            return (
              <div className={'flex flex-col gap-[8px]'} key={index}>
                <div className={'px-[16px] text-gray-120 text-eyebrow'}>
                    {upperCase(item.label)}
                </div>
                {
                  item.items?.map((item, index) => {
                    return (
                      <SideBarItem key={index} item={item} activeItem={activeItem} setActiveItem={setActiveItem} expanded={true} />
                    )
                  })
                }
              </div>
            )
          })}
        </div>
        {/* Sticky Org Selector */}
        {
          orgSelector && (
            <div className={'sticky bottom-0 left-0 right-0 bg-bgc-elevated p-4'}>{orgSelector}</div>
          )
        }
      </div>
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
