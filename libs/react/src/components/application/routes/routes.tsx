import { Navigate, Route, Routes } from 'react-router-dom';
import {
  AccountSettingsPage,
  BillingPage,
  CarbonFootprint,
  ComplianceRoutes,
  DashboardLayout,
  DocumentsPage,
  Interceptor,
  MaterialRoutes,
  ProtectedRoute,
  Signup,
  SupplierRoutes,
  SustainabilityPage,
  SustainabilityAttributeDetail,
  Terms,
  UserSettingsPage,
  WizardRoutes, UploadsPage, RegulatoryComplianceRoutes,
} from '@coldpbc/components';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { QuestionnaireRoutes } from './questionnaireRoutes';
import {ProductRoutes} from "./productRoutes";
import { LDFlagSet } from '@launchdarkly/node-server-sdk';

export const getDefaultPage = (flags: LDFlagSet): string => {
  switch(true){
    case flags.sustainabilityAttributesAndAssuranceDocs:
      return '/sustainability_claims';
    case flags.showMyData:
      return '/products';
    case flags.showClimateSection:
      return '/regulatory_compliance';
    case flags.showReportingAutomation:
      return '/assessments';
    default:
      return '/settings/account';
  }
}

export const ColdRoutes = () => {
  const ldFlags = useFlags();
  const DEFAULT_PAGE = getDefaultPage(ldFlags);
  const getFilteredRoutes = () => {

    return (
      <>
        <Route path={'/'} element={<Navigate to={DEFAULT_PAGE} replace={true} />} />
        {ComplianceRoutes()}
        {QuestionnaireRoutes()}
        <Route path={'/sustainability_claims'} element={<SustainabilityPage />} />
        <Route path={'/sustainability_claims/:id'} element={<SustainabilityAttributeDetail />} />
        <Route path={'/carbon_footprint'} element={<CarbonFootprint />} />
        <Route path={'/documents'} element={<DocumentsPage />} />
        <Route path={'/uploads'} element={ldFlags.showNewDocumentUploadUxCold1410 ? <UploadsPage /> : <Navigate to={DEFAULT_PAGE} replace={true} />} />
        <Route path={'/settings/account'} element={<AccountSettingsPage />} />
        <Route path={'/settings/users'} element={<UserSettingsPage />} />
        <Route path="*" element={<Navigate to={DEFAULT_PAGE} replace={true} />} />
        {WizardRoutes()}
        {MaterialRoutes()}
        {SupplierRoutes()}
        {ProductRoutes()}
        {RegulatoryComplianceRoutes()}
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
