import {withErrorBoundary} from "react-error-boundary";
import {ErrorFallback, MainContent} from "@coldpbc/components";
import React from "react";


const _Suppliers = () => {
  return (
    <MainContent title="Suppliers">
    </MainContent>
  )
}

export const Suppliers = withErrorBoundary(_Suppliers, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in Suppliers: ', error);
  },
});
