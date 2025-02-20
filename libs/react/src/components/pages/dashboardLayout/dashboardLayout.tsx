import React, { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import {SideBar, ApplicationToaster, SustainabiliBuddy} from '@coldpbc/components';
import { twMerge } from 'tailwind-merge';
import { useFlags } from 'launchdarkly-react-client-sdk';

export const DashboardLayout = (props: PropsWithChildren<any>) => {
  const ldFlags = useFlags();
  return (
    <div className={twMerge('overflow-y-auto scrollbar-hide flex-row relative justify-start w-full h-full pl-[241px]')}>
      <SideBar />
      <>
        <Outlet />
        <ApplicationToaster />
        {ldFlags.showAiSustainabilibuddyCold1464 && <SustainabiliBuddy />}
      </>
    </div>
  );
};
