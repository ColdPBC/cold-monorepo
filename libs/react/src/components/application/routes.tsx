import {DashboardLayout} from "../pages/dashboardLayout/dashboardLayout";
import React from "react";
import {Route, Routes} from "react-router-dom";
import Logout from '../../routes/logout';
import {TeamMembersSettings} from "../pages/teamMemberSettings/teamMembersSettings";
import {Home} from "../pages/home/home";
import {ApplicationToaster} from "../molecules/applicationToaster/applicationToaster";
import {Terms} from "../pages/terms/terms";

export const ColdRoutes = () => {
    return (
      <>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route
                path="/logout"
                element={
                    <Logout/>
                }
            />
            <Route
                path="/"
                element={
                    <Home />
                }
            />
            <Route
                path="/home"
                element={
                    <Home />
                }
            />
            <Route
                path="/settings"
                element={
                    <TeamMembersSettings/>
                }
            />
            <Route path="*" element={<div className={'text-tc-primary'}>Pending...</div>}/>
          </Route>
          <Route path={"/privacy"} element={<Terms type={"privacy"} />} />
          <Route path={"/terms"} element={<Terms type={"tos"} />} />
        </Routes>
        <ApplicationToaster/>
      </>
    );
};
