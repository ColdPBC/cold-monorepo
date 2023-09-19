import { DashboardLayout } from '../pages';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Logout from '../../routes/logout';
import { TeamMembersSettings } from '../pages';
import { Home } from '../pages';
import { ApplicationToaster } from '../molecules';
import { Terms } from '../pages';
import { Interceptor } from './interceptor';
import { Footprint } from '../pages/footprint';
import { Journey } from '../pages/journey';

export const ColdRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<Interceptor />}>
          <Route element={<DashboardLayout />}>
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/footprint" element={<Footprint />} />
            <Route path="/journey" element={<Journey />} />
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
