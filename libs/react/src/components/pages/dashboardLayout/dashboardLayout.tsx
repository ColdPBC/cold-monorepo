import React, { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import { SideBar, ApplicationToaster } from '@coldpbc/components';

export const DashboardLayout = (props: PropsWithChildren<any>) => {
  return (
    <div className={'overflow-y-auto flex-row relative justify-start w-full h-full pl-[58px]'}>
      <SideBar />
      <>
        <Outlet />
        <ApplicationToaster />
      </>
    </div>
  );
};
