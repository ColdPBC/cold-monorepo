import { DashboardLayout, DocumentUpload } from '../../pages';
import { Route, Routes } from 'react-router-dom';
import { Settings } from '../../pages';
import { Home } from '../../pages';
import { ApplicationToaster } from '../../molecules';
import { Terms } from '../../pages';
import { Interceptor } from '../authentication';
import { Footprint } from '../../pages';
import { Journey } from '../../pages';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { ActionRoutes } from './actionRoutes';
import { Signup } from '../authentication';
import { ProtectedRoute } from '../authentication';
import { ComplianceRoutes } from './complianceRoutes';

export const ColdRoutes = () => {
  const ldFlags = useFlags();

  return (
    <>
      <Routes>
        <Route path={'/signup'} element={<Signup />} />
        <Route path={'/privacy'} element={<Terms type={'privacy'} />} />
        <Route path={'/terms'} element={<Terms type={'tos'} />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Interceptor />}>
            <Route element={<DashboardLayout />}>
              <Route path={'/'} element={<Home />} />
              <Route path={'/home'} element={<Home />} />
              <Route path={'/footprint'} element={<Footprint />} />
              {ldFlags.showComplianceModule && <Route path={'/journey'} element={<Journey />} />}
              <Route path={'/settings'} element={<Settings />} />
              {ldFlags.showActions261 && ActionRoutes()}
              {ldFlags.showComplianceModule && ComplianceRoutes()}
              {ldFlags.showDocumentsUploadModuleCold492 && <Route path="/documents" element={<DocumentUpload />} />}
              <Route path="*" element={<div className={'text-tc-primary'}>Pending...</div>} />
            </Route>
          </Route>
        </Route>
      </Routes>
      <ApplicationToaster />
    </>
  );
};
