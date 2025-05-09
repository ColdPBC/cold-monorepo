import {Navigate, Route} from "react-router-dom";
import {RegulatoryComplianceDetail, RegulatoryCompliance, getDefaultPage} from '@coldpbc/components';
import {useFlags} from "launchdarkly-react-client-sdk";


export const RegulatoryComplianceRoutes = () => {
  const ldFlags = useFlags()
  const DEFAULT_PAGE = getDefaultPage(ldFlags);
  return (
    <>
      <Route path={'/regulatory_compliance'} element={ldFlags.showRegulationsPage ? <RegulatoryCompliance /> : <Navigate to={DEFAULT_PAGE} replace={true} />} />
      <Route path={'/regulatory_compliance/:slug'} element={ldFlags.showRegulationsPage ? <RegulatoryComplianceDetail /> : <Navigate to={DEFAULT_PAGE} replace={true} />} />
    </>
  );
}
