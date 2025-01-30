import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { axiosFetcher } from '@coldpbc/fetchers';
import { clone, get, upperCase } from 'lodash';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { useLocation } from 'react-router-dom';
import { NavbarItem, NavbarItemWithRoute } from '@coldpbc/interfaces';
import { withErrorBoundary } from 'react-error-boundary';
import { useAuth0Wrapper, useColdContext } from '@coldpbc/hooks';
import { ErrorType } from '@coldpbc/enums';
import {
  ColdLogoAnimation,
  OrganizationSelector,
  SideBarItem,
  ErrorFallback,
  Spinner,
} from '@coldpbc/components';

const _SideBar = ({ defaultExpanded }: { defaultExpanded?: boolean }): JSX.Element => {
	const ldFlags = useFlags();
	const [activeItem, setActiveItem] = useState<NavbarItem | NavbarItemWithRoute | null>(null);
	const {
		data,
		error,
		isLoading,
	}: {
		data: any;
		error: any;
		isLoading: boolean;
	} = useSWR(['/components/sidebar_navigation', 'GET'], axiosFetcher);

	const auth0 = useAuth0Wrapper();
	const { logBrowser } = useColdContext();

	const filterSidebar = (item: NavbarItem) => {
    if (item.items) {
      item.items = item.items.filter(filterSidebar);
    }

		if (item.key === 'settings_billing_key') {
      return ldFlags.showBillingPageCold957;
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
    const items: NavbarItem[] = get(data, 'definition.items', []);
		if (items && items.length > 0) {
			items.forEach((item: NavbarItem) => {
				if (location.pathname === item.route && activeItem?.key !== item.key) {
					setActiveItem(item);
				}
				if (item.items) {
					item.items.forEach((subItem: NavbarItemWithRoute) => {
						if (location.pathname === subItem.route && activeItem?.key !== subItem.key) {
							setActiveItem(subItem);
						}
					});
				}
			});
		}
	}, [location.pathname, data, activeItem?.key]);

	if (isLoading || auth0.isLoading)
		return (
			<div>
				<Spinner />
			</div>
		);

	if (error || auth0.error) {
		if (error) {
			logBrowser('Error loading sidebar data', 'error', { ...error }, error);
			logError(error, ErrorType.SWRError);
		}
		if (auth0.error) {
			logBrowser('Error loading auth0 data', 'error', { ...auth0.error }, auth0.error);
			logError(auth0.error, ErrorType.Auth0Error);
		}
		return <></>;
	}

	// filter top-level nav items
	const filteredSidebarItems = get(data, 'definition.items', []).filter(filterSidebar) ?? [];

	if (filteredSidebarItems) {
		// Separate the items into top and bottom nav items
		logBrowser('Sidebar data loaded', 'info', { data, filteredSidebarItems });
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
