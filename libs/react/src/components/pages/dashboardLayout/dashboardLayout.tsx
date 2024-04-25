import React, { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import { SideBar } from '../../organisms';

export const DashboardLayout = (props: PropsWithChildren<any>) => {
  return (
    <div className="flex flex-row gap-6 relative justify-start w-full">
      <SideBar />
      <div className="px-[100px]">
        <Outlet />
      </div>
    </div>
  );
};
