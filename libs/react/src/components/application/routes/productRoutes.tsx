import {Route} from "react-router-dom";
import {ProductDetail, ProductsPage, CreateProductPage} from "@coldpbc/components";

export const ProductRoutes = () => {
  return (
    <>
      <Route path={'/products'} element={<ProductsPage /> } />
      <Route path={'/products/:id'} element={<ProductDetail /> } />
      <Route path={'/products/new'} element={<CreateProductPage /> } />
    </>
  );
}
