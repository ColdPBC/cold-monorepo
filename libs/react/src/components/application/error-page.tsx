import React from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage(error?: Error) {
  const routeError = useRouteError() as { statusText?: string; message?: string}
  console.error(routeError);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{routeError.statusText || error?.stack}</i>
        <i>{routeError.message || error?.message}</i>
      </p>
    </div>
  );
}
