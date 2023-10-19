import React, { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import { SideBar } from '../../organisms';

export const DashboardLayout = (props: PropsWithChildren<any>) => {
  return (
    <div className="flex p-10 gap-6">
      <SideBar />
      <Outlet />
    </div>
  );
};
