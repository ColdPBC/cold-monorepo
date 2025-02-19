import type { SetURLSearchParams } from 'react-router-dom';

export const handleTabChange = (tabLabel: string, setSearchParams: SetURLSearchParams) => {
  // Scroll to top of the page
  window.scrollTo(0, 0);

  setSearchParams(
    prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('tab', encodeURIComponent(tabLabel));
      return newParams;
    },
    { replace: true },
  );
};
