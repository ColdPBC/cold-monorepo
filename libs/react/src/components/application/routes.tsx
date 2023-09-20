import { DashboardLayout } from '../pages';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { TeamMembersSettings } from '../pages';
import { Home } from '../pages';
import { ApplicationToaster } from '../molecules';
import { Terms } from '../pages';
import { Interceptor } from './interceptor';
import { Footprint } from '../pages/';
import { ProtectedRoute, Signup } from './authentication';

export const ColdRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Interceptor />}>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/footprint" element={<Footprint />} />
              <Route path="/settings" element={<TeamMembersSettings />} />
              <Route path={'/privacy'} element={<Terms type={'privacy'} />} />
              <Route path={'/terms'} element={<Terms type={'tos'} />} />
              <Route
                path="*"
                element={<div className={'text-tc-primary'}>Pending...</div>}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
      <ApplicationToaster />
    </>
  );
};
