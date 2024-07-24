import { Navigate, Route, Routes } from 'react-router-dom';
import {
  AccountSettingsPage,
  ActionsOverview,
  ApplicationToaster,
  CarbonFootprint,
  ComplianceRoutes,
  DashboardLayout,
  DocumentUpload,
  Footprint,
  Interceptor,
  Journey,
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
        <Route index element={<Navigate to="/compliance" replace={true} />} />
        {!ldFlags.showNewComplianceManagerPreviewCold713 && <Route path={'/assessments'} element={<Journey />} />}
        {ComplianceRoutes()}
        {QuestionnaireRoutes()}
        {ldFlags.showActions261 && <Route path="/actions" element={<ActionsOverview />} />}
        <Route path={'/reports/carbon_footprint'} element={ldFlags.showNewCarbonFootprintModuleCold634 ? <CarbonFootprint /> : <Footprint />} />
        {ldFlags.showDocumentsUploadModuleCold492 && <Route path="/documents" element={<DocumentUpload />} />}
        <Route path={'/settings/account'} element={<AccountSettingsPage />} />
        <Route path={'/settings/users'} element={<UserSettingsPage />} />
        <Route path="*" element={<div className={'text-tc-primary'}>Pending...</div>} />
        {WizardRoutes()}
        {ldFlags.showSuppliersPageCold890 && <Route path={'/suppliers'} element={<SuppliersPage />} />}
        {ldFlags.showSuppliersPageCold890 && <Route path={'/suppliers/:id'} element={<SupplierDetail />} />}
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
