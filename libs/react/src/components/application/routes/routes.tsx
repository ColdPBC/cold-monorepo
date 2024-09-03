import { Navigate, Route, Routes } from 'react-router-dom';
import {
  AccountSettingsPage,
  ActionsOverview,
  BillingPage,
  CarbonFootprint,
  CompliancePage,
  ComplianceRoutes,
  DashboardLayout,
  DocumentsPage,
  DocumentUpload,
  Footprint,
  Interceptor,
  MaterialDetail,
  MaterialsPage,
  ProtectedRoute,
  Signup,
  SupplierDetail,
  SuppliersPage,
  Terms,
  UserSettingsPage,
  WizardRoutes,
} from '@coldpbc/components';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { QuestionnaireRoutes } from './questionnaireRoutes';

export const ColdRoutes = () => {
  const ldFlags = useFlags();

  const getFilteredRoutes = () => {
    return (
      <>
        <Route path={'/'} element={<CompliancePage />} />
        {ComplianceRoutes()}
        {QuestionnaireRoutes()}
        {ldFlags.showActions261 && <Route path={'/actions'} element={<ActionsOverview />} />}
        <Route path={'/reports/carbon_footprint'} element={ldFlags.showNewCarbonFootprintModuleCold634 ? <CarbonFootprint /> : <Footprint />} />
        <Route path={'/documents'} element={ldFlags.showNewDocumentsPage ? <DocumentsPage /> : <DocumentUpload />} />
        <Route path={'/settings/account'} element={<AccountSettingsPage />} />
        <Route path={'/settings/users'} element={<UserSettingsPage />} />
        <Route path="*" element={<Navigate to={'/compliance'} replace={true} />} />
        {WizardRoutes()}
        <Route path={'/suppliers'} element={ldFlags.showSuppliersPageCold890 ? <SuppliersPage /> : <Navigate to={'/compliance'} replace={true} />} />
        <Route path={'/suppliers/:id'} element={ldFlags.showSuppliersPageCold890 ? <SupplierDetail /> : <Navigate to={'/compliance'} replace={true} />} />
        <Route path={'/materials'} element={ldFlags.showMaterialsPageCold912 ? <MaterialsPage /> : <Navigate to={'/compliance'} replace={true} />} />
        <Route path={'/materials/:id'} element={ldFlags.showMaterialsPageCold912 ? <MaterialDetail /> : <Navigate to={'/compliance'} replace={true} />} />
        <Route path={'/settings/billing'} element={ldFlags.showBillingPageCold957 ? <BillingPage /> : <Navigate to={'/compliance'} replace={true} />} />
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
