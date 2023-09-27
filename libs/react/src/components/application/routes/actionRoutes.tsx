import React from 'react';
import { Route, Routes } from 'react-router-dom';

export const ActionRoutes = () => {
  // get the /actions and /actions/:name routes

  return (
    <Route path={'/actions'}>
      <Route index element={<div className={'text-tc-primary'}>Actions</div>} />
      <Route
        path={':name'}
        element={<div className={'text-tc-primary'}>Specific action</div>}
      />
    </Route>
  );
};
