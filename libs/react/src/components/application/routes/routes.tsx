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
  SupplierDetail, SupplierRoutes,
  SuppliersPage,
  SustainabilityPage,
  SustainabilityAttributeDetail,
  Terms,
  UserSettingsPage,
  WizardRoutes,
} from '@coldpbc/components';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { QuestionnaireRoutes } from './questionnaireRoutes';
import {ProductRoutes} from "./productRoutes";

const DEFAULT_PAGE = '/sustainability_claims';

export const ColdRoutes = () => {
  const ldFlags = useFlags();

  const getFilteredRoutes = () => {

    return (
      <>
        <Route path={'/'} element={<Navigate to={DEFAULT_PAGE} replace={true} />} />
        {ComplianceRoutes()}
        {QuestionnaireRoutes()}
        <Route path={'/sustainability_claims'} element={<SustainabilityPage />} />
        {ldFlags.cold1220SustainabilityAttributePage && <Route path={'/sustainability_claims/:id'} element={<SustainabilityAttributeDetail />} />}
        <Route path={'/carbon_footprint'} element={ldFlags.showNewCarbonFootprintModuleCold634 ? <CarbonFootprint /> : <Footprint />} />
        <Route path={'/documents'} element={ldFlags.showNewDocumentsPage ? <DocumentsPage /> : <DocumentUpload />} />
        <Route path={'/settings/account'} element={<AccountSettingsPage />} />
        <Route path={'/settings/users'} element={<UserSettingsPage />} />
        <Route path="*" element={<Navigate to={DEFAULT_PAGE} replace={true} />} />
        {WizardRoutes()}
        {MaterialRoutes()}
        {SupplierRoutes()}
        {ProductRoutes()}
        <Route path={'/settings/billing'} element={ldFlags.showBillingPageCold957 ? <BillingPage /> : <Navigate to={DEFAULT_PAGE} replace={true} />} />

        // Temporary redirects from old route until we're certain that the seeds are updated to the new sidebar.
        <Route path={'/questionnaires'} element={<Navigate to={'/assessments'} replace={true} />} />
        <Route path={'/sustainability'} element={<Navigate to={'/sustainability_claims'} replace={true} />} />
        <Route path={'/questionnaire/:complianceName'} element={<Navigate to={'/assessment/:complianceName'} replace={true} />} />
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
