import React, { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import { SideBar } from '../../organisms';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { twMerge } from 'tailwind-merge';

export const DashboardLayout = (props: PropsWithChildren<any>) => {
  const ldFlags = useFlags();
  return (
    <div className={twMerge('flex gap-6', ldFlags.showNewNavigationCold698 ? 'flex-row relative justify-start w-full px-[100px] py-[40px]' : 'p-10')}>
      <SideBar />
      <Outlet />
    </div>
  );
};
