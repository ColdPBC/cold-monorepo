import { DashboardLayout } from '../pages';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Logout } from './authentication/logout';
import { TeamMembersSettings } from '../pages';
import { Home } from '../pages';
import { ApplicationToaster } from '../molecules';
import { Terms } from '../pages';
import { Footprint } from '../pages/';
import { ProtectedRoute, Signup } from './authentication';
import { Login } from './authentication';

export const ColdRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/footprint" element={<Footprint />} />
            <Route path="/settings" element={<TeamMembersSettings />} />
            <Route
              path="*"
              element={<div className={'text-tc-primary'}>Pending...</div>}
            />
          </Route>
          <Route path={'/privacy'} element={<Terms type={'privacy'} />} />
          <Route path={'/terms'} element={<Terms type={'tos'} />} />
        </Route>
      </Routes>
      <ApplicationToaster />
    </>
  );
};
