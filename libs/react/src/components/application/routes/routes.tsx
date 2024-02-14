import { Route, Routes } from 'react-router-dom';
import {
  ApplicationToaster,
  Terms,
  Home,
  Settings,
  DocumentUpload,
  DashboardLayout,
  Interceptor,
  Footprint,
  Journey,
  ActionRoutes,
  Signup,
  ProtectedRoute,
  ComplianceRoutes,
  AccountSettingsPage,
  UserSettingsPage,
  ActionsOverview,
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
          <Route path={'/assessments'} element={null} />
          {ldFlags.showActions261 && <Route path="/actions" element={<ActionsOverview />} />}
          <Route path={'/reports/carbon_footprint'} element={null} />
          {ldFlags.showDocumentsUploadModuleCold492 && <Route path="/documents" element={<DocumentUpload />} />}
          <Route path={'/settings/company_info'} element={null} />
          <Route path={'/settings/account'} element={<AccountSettingsPage />} />
          <Route path={'/settings/user'} element={<UserSettingsPage />} />
          <Route path="*" element={<div className={'text-tc-primary'}>Pending...</div>} />
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
