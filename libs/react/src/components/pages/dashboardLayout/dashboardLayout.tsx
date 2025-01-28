import React, { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import { SideBar, ApplicationToaster } from '@coldpbc/components';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { twMerge } from 'tailwind-merge';

export const DashboardLayout = (props: PropsWithChildren<any>) => {
  const ldFlags = useFlags();
  return (
    <div className={twMerge('overflow-y-auto scrollbar-hide flex-row relative justify-start w-full h-full', ldFlags.showNewSidebarCold1354 ? 'pl-[241px]' : 'pl-[58px]')}>
      <SideBar />
      <>
        <Outlet />
        <ApplicationToaster />
      </>
    </div>
  );
};
