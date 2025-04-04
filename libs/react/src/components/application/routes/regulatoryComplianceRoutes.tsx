import {Navigate, Route} from "react-router-dom";
import {RegulatoryComplianceDetail, RegulatoryCompliance, DEFAULT_PAGE} from "@coldpbc/components";
import {useFlags} from "launchdarkly-react-client-sdk";


export const RegulatoryComplianceRoutes = () => {
  const ldFlags = useFlags()
  return (
    <Route path={'/regulatory_compliance'}>
      {
        ldFlags.showRegulationPage ? (
          <>
            <Route index element={<RegulatoryCompliance />} />
            <Route path={':id'} element={<RegulatoryComplianceDetail />} />
          </>
        ) : (
          <Route index element={<Navigate to={DEFAULT_PAGE} replace={true} />} />
        )
      }
    </Route>
  );
}
