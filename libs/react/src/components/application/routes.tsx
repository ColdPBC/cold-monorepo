import {DashboardLayout} from "../pages/dashboardLayout/dashboardLayout";
import React from "react";
import {Route, Routes} from "react-router-dom";
import Logout from '../../routes/logout';
import {TeamMembersSettings} from "../pages/teamMemberSettings/teamMembersSettings";
import {Home} from "../pages/home/home";
import {ApplicationToaster} from "../molecules/applicationToaster/applicationToaster";

export const ColdRoutes = () => {
    return (
        <DashboardLayout>
            <Routes>
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
            </Routes>
            <ApplicationToaster/>
        </DashboardLayout>
    );
};
