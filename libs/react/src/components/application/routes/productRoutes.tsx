import {useFlags} from "launchdarkly-react-client-sdk";
import {Route} from "react-router-dom";
import {ProductsPage} from "@coldpbc/components";


export const ProductRoutes = () => {
  const ldFlags = useFlags();

  return (
    <Route path={'/products'} element={<ProductsPage /> } />
  );
}
