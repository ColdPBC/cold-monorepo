import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { axiosFetcher } from '../../../fetchers/axiosFetcher';
import { NavbarItem } from '../../../interfaces/sideBar';
import { Spinner } from '../../atoms/spinner/spinner';
import { clone, remove } from 'lodash';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { useLocation, useNavigate } from 'react-router-dom';
import { ActionPayload } from '@coldpbc/interfaces';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application/errors/errorFallback';
import { useAuth0Wrapper, useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { ColdLogoNames, ErrorType, IconNames } from '@coldpbc/enums';
import { OrganizationSelector, SideBarCollapse, SideBarItem } from '@coldpbc/components';
import { ColdIcon, ColdLogos } from '../../atoms';

const _SideBar = (): JSX.Element => {
  const ldFlags = useFlags();
  const navigate = useNavigate();
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

  const location = useLocation();

  const { logError } = useColdContext();

  const getOrgSelector = () => {
    if (auth0.user && auth0.user.coldclimate_claims.roles[0] === 'cold:admin') {
      return <OrganizationSelector sidebarExpanded={expanded} />;
    } else {
      return null;
    }
  };

  const getSidebarLogo = () => {
    if (expanded) {
      return (
        <div className="h-[24px] flex items-center justify-start px-[16px] w-full">
          <ColdLogos name={ColdLogoNames.ColdWordmark} color={'white'} height={'24'} />
        </div>
      );
    } else {
      return (
        <div className="h-[24px] flex items-center justify-center w-full">
          <ColdIcon name={IconNames.ColdScoreIcon} color={'white'} />
        </div>
      );
    }
  };

  const navigateTo = (route: string) => {
    navigate(route);
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

    return (
      <div
        data-testid={'sidebar'}
        className={
          'text-tc-primary fixed left-0 top-0 h-[100vh] justify-between w-[51px] flex flex-col items-center ' +
          'py-[24px] bg-bgc-elevated transition-all duration-200 hover:w-[208px] z-20 ' +
          'hover:shadow-[0px_8px_12px_4px_rgba(0,0,0,0.85)]'
        }
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}>
        <div className={'flex flex-col gap-[24px] w-full'}>
          {getSidebarLogo()}
          <div className={'w-full flex flex-col gap-[8px]'}>
            {topItems.map((item: NavbarItem, index: number) => {
              return item.items ? (
                <SideBarCollapse key={index} item={item} activeItem={activeItem} setActiveItem={setActiveItem} expanded={expanded} navigateTo={navigateTo} />
              ) : (
                <SideBarItem key={index} item={item} activeItem={activeItem} setActiveItem={setActiveItem} expanded={expanded} navigateTo={navigateTo} />
              );
            })}
          </div>
        </div>
        {/* put org selector at the bottom of the nav bar */}
        <div className={'flex px-[18px] items-center justify-center w-full'}>{getOrgSelector()}</div>
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
