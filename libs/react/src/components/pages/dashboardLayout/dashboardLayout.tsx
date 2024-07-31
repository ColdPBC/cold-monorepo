import React, { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import { SideBar } from '../../organisms';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { twMerge } from 'tailwind-merge';
import { ApplicationToaster } from '../../molecules';

export const DashboardLayout = (props: PropsWithChildren<any>) => {
  const ldFlags = useFlags();
  return (
    <div className={twMerge('overflow-y-auto', ldFlags.showNewNavigationCold698 ? 'flex-row relative justify-start w-full h-full pl-[58px]' : 'flex gap-6 p-10')}>
      <SideBar />
      <div>
        <Outlet />
        <ApplicationToaster />
      </div>
    </div>
  );
};
