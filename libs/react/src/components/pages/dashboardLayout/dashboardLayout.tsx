import React, { PropsWithChildren } from "react";
import { SideBar } from '../../organisms/sidebar/sideBar';


export const DashboardLayout = (props: PropsWithChildren<any>) => {
    return (
        <div className="flex p-10 gap-6">
          <SideBar />
          {props.children}
        </div>
    );
};
