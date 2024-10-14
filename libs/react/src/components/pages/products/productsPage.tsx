import {MainContent, ProductsDataGrid} from "@coldpbc/components";
import React from "react";


export const ProductsPage = () => {
  return (
    <MainContent title="Products" className={'w-[calc(100%-100px)]'}>
      <ProductsDataGrid />
    </MainContent>
  );
}
