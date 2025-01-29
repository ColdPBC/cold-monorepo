import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { axiosFetcher } from '@coldpbc/fetchers';
import { clone, upperCase } from 'lodash';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { useLocation } from 'react-router-dom';
import { ActionPayload, NavbarItem, NavbarItemWithRoute } from '@coldpbc/interfaces';
import { withErrorBoundary } from 'react-error-boundary';
import { useAuth0Wrapper, useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { ErrorType, IconNames } from '@coldpbc/enums';
import {
  ColdLogoAnimation,
  OrganizationSelector,
  SideBarCollapse,
  SideBarItem,
  ErrorFallback,
  Spinner,
  ColdDollarSignIcon,
} from '@coldpbc/components';

const OLD_ITEMS: NavbarItem[] = [
  {
    "key": "sustainability_key",
    "icon": {
      "name": IconNames.ColdSustainabilityIcon,
    },
    "label": "Sustainability",
    "route": "/sustainability_claims"
  },
  {
    "key": "questionnaires_key",
    "icon": {
      "name": IconNames.ColdQuestionnaireIcon
    },
    "label": "Questionnaires",
    "route": "/assessments"
  },
  {
    "key": "materials_key",
    "icon": {
      "name": IconNames.ColdMaterialsNavIcon,
    },
    "label": "Materials",
    "route": "/materials"
  },
  {
    "key": "products_key",
    "icon": {
      "name": IconNames.ColdProductsNavIcon
    },
    "label": "Products",
    "route": "/products"
  },
  {
    "key": "suppliers_key",
    "icon": {
      "name": IconNames.ColdSuppliersNavIcon
    },
    "label": "Suppliers",
    "route": "/suppliers"
  },
  {
    "key": "actions_key",
    "icon": {
      "name": IconNames.ColdActionsIcon
    },
    "label": "Actions",
    "route": "/actions"
  },
  {
    "key": "carbon_footprint_key",
    "icon": {
      "name": IconNames.ColdChartIcon
    },
    "label": "Carbon Footprint",
    "route": "/carbon_footprint"
  },
  {
    "key": "documents_key",
    "icon": {
      "name": IconNames.ColdDocumentsIcon
    },
    "label": "Documents",
    "route": "/documents"
  },
  {
    "key": "settings_key",
    "icon": {
      "name": IconNames.ColdSettingsIcon
    },
    "items": [
      {
        "key": "settings_account_key",
        "label": "Account",
        "route": "/settings/account"
      },
      {
        "key": "settings_user_key",
        "label": "Users",
        "route": "/settings/users"
      },
      {
        "key": "settings_billing_key",
        "label": "Billing",
        "route": "/settings/billing"
      }
    ],
    "label": "Settings",
    "roles": [
      "cold:admin",
      "company:admin",
      "company:owner"
    ],
    "route": "/settings"
  }
]

const _SideBar = ({ defaultExpanded }: { defaultExpanded?: boolean }): JSX.Element => {
	const ldFlags = useFlags();
	const [expanded, setExpanded] = useState(false);
	const [activeItem, setActiveItem] = useState<NavbarItem | NavbarItemWithRoute | null>(null);
	const {
		data,
		error,
		isLoading,
	}: {
		data: any;
		error: any;
		isLoading: boolean;
	} = useSWR(ldFlags.showNewSidebarCold1354 ? ['/components/sidebar_navigation', 'GET'] : null, axiosFetcher);

	// Fetch actions if actions feature flag is present
	const { data: actionsData, error: actionsError } = useOrgSWR<ActionPayload[], any>(ldFlags.showActions261 ? [`/actions`, 'GET'] : null, axiosFetcher);

	const auth0 = useAuth0Wrapper();
	const { logBrowser } = useColdContext();

	const filterSidebar = (item: NavbarItem) => {
    // if the flag is set, return true to show all items
    if(ldFlags.showNewSidebarCold1354){
      return true;
    }

		if (item.items) {
			item.items = item.items.filter(filterSidebar);
		}

		if (item.key === 'actions_key') {
			const hasActions = actionsData && actionsData?.length > 0;

			return ldFlags.showActions261 && hasActions;
		} else if (item.key === 'documents_key') {
			return ldFlags.showDocumentsUploadModuleCold492;
		} else if (item.key === 'compliance_key' || item.key === 'questionnaires_key') {
			return ldFlags.showComplianceModule;
		} else if (item.key === 'journey_key') {
			// TODO: Delete this once we replace the journey page completely
			item.label = 'Gaps';
			return true;
		} else if (item.key === 'assessments_key') {
			return !ldFlags.showNewComplianceManagerPreviewCold713;
		} else if (item.key === 'settings_billing_key') {
      return ldFlags.showBillingPageCold957;
    } else {
			return true;
		}
	};

	const location = useLocation();

	const { logError } = useColdContext();

	const getOrgSelector = () => {
		if (auth0.user && auth0.user.coldclimate_claims.roles.includes('cold:admin')) {
			return <OrganizationSelector sidebarExpanded={ldFlags.showNewSidebarCold1354 || expanded} />;
		} else {
			return null;
		}
	};

	const getSidebarLogo = () => {
		return <ColdLogoAnimation expanded={ldFlags.showNewSidebarCold1354 || expanded} />;
	};

	useEffect(() => {
    let items: NavbarItem[] = [];
    if(ldFlags.showNewSidebarCold1354 && data) {
      items = data.definition.items;
    } else {
      items = OLD_ITEMS;
    }
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
	}, [location.pathname, data, OLD_ITEMS]);

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

  const items = ldFlags.showNewSidebarCold1354 ? data.definition.items : OLD_ITEMS;

	// filter top-level nav items
	const filteredSidebarItems = items.filter(filterSidebar) ?? [];

	if (filteredSidebarItems) {
		// Separate the items into top and bottom nav items
		logBrowser('Sidebar data loaded', 'info', { data, filteredSidebarItems });
		const topItems: NavbarItem[] = clone(filteredSidebarItems);
    const orgSelector = getOrgSelector();
    if (ldFlags.showNewSidebarCold1354) {
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
      return (
        <div
          data-testid={'sidebar'}
          className={
            'text-tc-primary fixed left-0 top-0 h-[100vh] justify-between w-[58px] flex flex-col items-center ' +
            'py-[24px] bg-bgc-elevated transition-width ease-in duration-200 hover:w-[208px] z-20 ' +
            'hover:shadow-[0px_8px_12px_4px_rgba(0,0,0,0.85)]'
          }
          onMouseEnter={() => setExpanded(true)}
          onMouseLeave={() => setExpanded(false)}>
          <div className={'flex flex-col gap-[24px] w-full'}>
            <div className={'pl-[20px]'}>
              {getSidebarLogo()}
            </div>
            <div className={'w-full flex flex-col gap-[8px]'}>
              {topItems.map((item: NavbarItem, index: number) => {
                return item.items ? (
                  <SideBarCollapse key={index} item={item} activeItem={activeItem} setActiveItem={setActiveItem} expanded={expanded} />
                ) : (
                  <SideBarItem key={index} item={item} activeItem={activeItem} setActiveItem={setActiveItem} expanded={expanded} />
                );
              })}
            </div>
          </div>
          {/* put org selector at the bottom of the nav bar */}
          <div className={'flex px-[18px] items-center justify-center w-full'}>{getOrgSelector()}</div>
        </div>
      );
    }

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
