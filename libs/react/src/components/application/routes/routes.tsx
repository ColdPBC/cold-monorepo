import { Route, Routes } from 'react-router-dom';
import {
  AccountSettingsPage,
  ActionsOverview,
  ApplicationToaster,
  CarbonFootprint,
  ComplianceQuestionnaire,
  ComplianceRoutes,
  DashboardLayout,
  DocumentUpload,
  Footprint,
  Home,
  Interceptor,
  Journey,
  ProtectedRoute,
  Signup,
  Terms,
  UserSettingsPage,
  WizardRoutes,
} from '@coldpbc/components';
import { useFlags } from 'launchdarkly-react-client-sdk';

export const ColdRoutes = () => {
  const ldFlags = useFlags();

  const getFilteredRoutes = () => {
    return (
      <>
        <Route path={'/'} element={<Home />} />
        <Route path={'/home'} element={<Home />} />
        <Route path={'/assessments'} element={<Journey />} />
        {ComplianceRoutes()}
        {ldFlags.showNewComplianceManagerCold711 && <Route path={'/questionnaire/:complianceName'} element={<ComplianceQuestionnaire />} />}
        {ldFlags.showActions261 && <Route path="/actions" element={<ActionsOverview />} />}
        <Route path={'/reports/carbon_footprint'} element={ldFlags.showNewCarbonFootprintModuleCold634 ? <CarbonFootprint /> : <Footprint />} />
        {ldFlags.showDocumentsUploadModuleCold492 && <Route path="/documents" element={<DocumentUpload />} />}
        <Route path={'/settings/account'} element={<AccountSettingsPage />} />
        <Route path={'/settings/users'} element={<UserSettingsPage />} />
        <Route path="*" element={<div className={'text-tc-primary'}>Pending...</div>} />
        {WizardRoutes()}
      </>
    );
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
