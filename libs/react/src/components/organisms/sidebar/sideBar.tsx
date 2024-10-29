import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { axiosFetcher } from '../../../fetchers/axiosFetcher';
import { NavbarItem } from '../../../interfaces/sideBar';
import { Spinner } from '../../atoms/spinner/spinner';
import { clone, remove } from 'lodash';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { useLocation } from 'react-router-dom';
import { ActionPayload } from '@coldpbc/interfaces';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application/errors/errorFallback';
import { useAuth0Wrapper, useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { ErrorType } from '@coldpbc/enums';
import { ColdLogoAnimation, ColdWordmark, OrganizationSelector, SideBarCollapse, SideBarItem } from '@coldpbc/components';
import { flowbiteThemeOverride, HexColors } from '@coldpbc/themes';
import { Sidebar as FBSidebar } from 'flowbite-react';

const _SideBar = ({ defaultExpanded }: { defaultExpanded?: boolean }): JSX.Element => {
	const ldFlags = useFlags();
	const [expanded, setExpanded] = useState(false);
	const [activeItem, setActiveItem] = useState<NavbarItem | null>(null);
	const {
		data,
		error,
		isLoading,
	}: {
		data: any;
		error: any;
		isLoading: boolean;
	} = useSWR(['/components/sidebar_navigation', 'GET'], axiosFetcher);

	// Fetch actions if actions feature flag is present
	const { data: actionsData, error: actionsError } = useOrgSWR<ActionPayload[], any>(ldFlags.showActions261 ? [`/actions`, 'GET'] : null, axiosFetcher);

	const auth0 = useAuth0Wrapper();
	const { logBrowser } = useColdContext();

	const filterSidebar = (item: NavbarItem) => {
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
		} else if (item.key === 'suppliers_key') {
			return ldFlags.showSuppliersPageCold890;
		} else if (item.key === 'materials_key') {
			return ldFlags.showMaterialsPageCold912;
		} else if (item.key === 'settings_billing_key') {
      return ldFlags.showBillingPageCold957;
    } else if (item.key === 'products_key') {
      return ldFlags.showProductsPageCold1096;
		} else {
			return true;
		}
	};

	const location = useLocation();

	const { logError } = useColdContext();

	const getOrgSelector = () => {
		if (auth0.user && auth0.user.coldclimate_claims.roles.includes('cold:admin')) {
			return <OrganizationSelector sidebarExpanded={expanded || !ldFlags.showNewNavigationCold698} />;
		} else {
			return null;
		}
	};

	const getSidebarLogo = () => {
		return <ColdLogoAnimation expanded={expanded} />;
	};

	useEffect(() => {
		if (data) {
			data.definition.items.forEach((item: NavbarItem) => {
				if (location.pathname === item.route && activeItem?.key !== item.key) {
					setActiveItem(item);
				}
				if (item.items) {
					item.items.forEach((subItem: NavbarItem) => {
						if (location.pathname === subItem.route && activeItem?.key !== subItem.key) {
							setActiveItem(subItem);
						}
					});
				}
			});
		}
	}, [location.pathname, data]);

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
	const filteredSidebarItems = data.definition.items.filter(filterSidebar) ?? [];

	if (filteredSidebarItems) {
		// Separate the items into top and bottom nav items
		logBrowser('Sidebar data loaded', 'info', { data, filteredSidebarItems });
		const topItems: NavbarItem[] = clone(filteredSidebarItems);

		const bottomItems = remove(topItems, (item: NavbarItem) => {
			return item.placement && item.placement === 'bottom';
		});

		if (ldFlags.showNewNavigationCold698) {
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
						{getSidebarLogo()}
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
		} else {
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
									return <SideBarCollapse setActiveItem={setActiveItem} activeItem={activeItem} item={item} key={item.key} expanded={expanded} />;
								} else {
									return <SideBarItem setActiveItem={setActiveItem} activeItem={activeItem} item={item} key={item.key} expanded={expanded} />;
								}
							})}
						</FBSidebar.ItemGroup>
					</FBSidebar.Items>
					<FBSidebar.Items className="gap-2">
						<FBSidebar.ItemGroup className="mt-0 border-t-0 overflow-visible">
							<div id={'orgSelector'} className={'w-full p-4'}>
								{getOrgSelector()}
							</div>
							{bottomItems.map((item: NavbarItem, index: number) => {
								if (item.items) {
									return <SideBarCollapse setActiveItem={setActiveItem} activeItem={activeItem} item={item} key={item.key} expanded={expanded} />;
								} else {
									return <SideBarItem setActiveItem={setActiveItem} activeItem={activeItem} item={item} key={item.key} expanded={expanded} />;
								}
							})}
						</FBSidebar.ItemGroup>
					</FBSidebar.Items>
				</FBSidebar>
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
