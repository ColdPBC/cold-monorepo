import { Navigate, Route, Routes } from 'react-router-dom';
import {
  AccountSettingsPage,
  ActionsOverview,
  BillingPage,
  CarbonFootprint,
  ComplianceRoutes,
  DashboardLayout,
  DocumentsPage,
  DocumentUpload,
  Footprint,
  Interceptor,
  MaterialDetail,
  MaterialRoutes,
  MaterialsPage,
  ProtectedRoute,
  Signup,
  SupplierDetail,
  SuppliersPage,
  SustainabilityPage,
  Terms,
  UserSettingsPage,
  WizardRoutes,
} from '@coldpbc/components';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { QuestionnaireRoutes } from './questionnaireRoutes';

export const ColdRoutes = () => {
  const ldFlags = useFlags();
  const defaultPage = ldFlags.showSustainabilityPageCold999 ? '/sustainability' : '/questionnaires';

  const getFilteredRoutes = () => {

    return (
      <>
        <Route path={'/'} element={<Navigate to={defaultPage} replace={true} />} />
        {ComplianceRoutes()}
        {QuestionnaireRoutes()}
        {ldFlags.showActions261 && <Route path={'/actions'} element={<ActionsOverview />} />}
        <Route path={'/sustainability'} element={ldFlags.showSustainabilityPageCold999 ? <SustainabilityPage /> : <Navigate to={defaultPage} replace={true} />} />
        <Route path={'/carbon_footprint'} element={ldFlags.showNewCarbonFootprintModuleCold634 ? <CarbonFootprint /> : <Footprint />} />
        <Route path={'/documents'} element={ldFlags.showNewDocumentsPage ? <DocumentsPage /> : <DocumentUpload />} />
        <Route path={'/settings/account'} element={<AccountSettingsPage />} />
        <Route path={'/settings/users'} element={<UserSettingsPage />} />
        <Route path="*" element={<Navigate to={defaultPage} replace={true} />} />
        {WizardRoutes()}
        <Route path={'/suppliers'} element={ldFlags.showSuppliersPageCold890 ? <SuppliersPage /> : <Navigate to={defaultPage} replace={true} />} />
        <Route path={'/suppliers/:id'} element={ldFlags.showSuppliersPageCold890 ? <SupplierDetail /> : <Navigate to={defaultPage} replace={true} />} />
        {MaterialRoutes()}
        <Route path={'/settings/billing'} element={ldFlags.showBillingPageCold957 ? <BillingPage /> : <Navigate to={defaultPage} replace={true} />} />

        // Temporary redirects from old route until we're certain that the seeds are updated to the new sidebar.
        <Route path={'/reports/carbon_footprint'} element={<Navigate to={'/carbon_footprint'} replace={true} />} />
        <Route path={'/compliance'} element={<Navigate to={'/questionnaires'} replace={true} />} />
      </>
    );
  };

  return (
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
  );
};
