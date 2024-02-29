import { Route, Routes } from 'react-router-dom';
import {
  AccountSettingsPage,
  ActionRoutes,
  ActionsOverview,
  ApplicationToaster,
  ComplianceRoutes,
  DashboardLayout,
  DocumentUpload,
  Footprint,
  Home,
  Interceptor,
  Journey,
  ProtectedRoute,
  Settings,
  Signup,
  Terms,
  UserSettingsPage,
  WizardRoutes,
} from '@coldpbc/components';
import { useFlags } from 'launchdarkly-react-client-sdk';

export const ColdRoutes = () => {
  const ldFlags = useFlags();

  const getFilteredRoutes = () => {
    if (ldFlags.showReiComplianceMvpSidebarCold506) {
      return (
        <>
          <Route path={'/'} element={<Home />} />
          <Route path={'/home'} element={<Home />} />
          {ldFlags.showComplianceModule && ComplianceRoutes()}
          <Route path={'/assessments'} element={<Journey />} />
          {ldFlags.showActions261 && <Route path="/actions" element={<ActionsOverview />} />}
          <Route path={'/reports/carbon_footprint'} element={<Footprint />} />
          {ldFlags.showDocumentsUploadModuleCold492 && <Route path="/documents" element={<DocumentUpload />} />}
          <Route path={'/settings/account'} element={<AccountSettingsPage />} />
          <Route path={'/settings/user'} element={<UserSettingsPage />} />
          <Route path="*" element={<div className={'text-tc-primary'}>Pending...</div>} />
          {WizardRoutes()}
        </>
      );
    } else {
      return (
        <>
          <Route path={'/'} element={<Home />} />
          <Route path={'/home'} element={<Home />} />
          <Route path={'/footprint'} element={<Footprint />} />
          {ldFlags.showComplianceModule && <Route path={'/journey'} element={<Journey />} />}
          <Route path={'/settings'} element={<Settings />} />
          {ldFlags.showActions261 && ActionRoutes()}
          {ldFlags.showComplianceModule && ComplianceRoutes()}
          {ldFlags.showDocumentsUploadModuleCold492 && <Route path="/documents" element={<DocumentUpload />} />}
          <Route path="*" element={<div className={'text-tc-primary'}>Pending...</div>} />
        </>
      );
    }
  };

  return (
    <>
      <Routes>
        <Route path={'/signup'} element={<Signup />} />
        <Route path={'/privacy'} element={<Terms type={'privacy'} />} />
        <Route path={'/terms'} element={<Terms type={'tos'} />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Interceptor />}>
            <Route element={<DashboardLayout />}>{getFilteredRoutes()}</Route>
          </Route>
        </Route>
      </Routes>
      <ApplicationToaster />
    </>
  );
};
