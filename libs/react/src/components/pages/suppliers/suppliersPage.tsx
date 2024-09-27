import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback, MainContent, SuppliersDataGrid } from '@coldpbc/components';
import React from 'react';

const _SuppliersPage = () => {
  const [managementView, setManagementView] = React.useState('Tier 1 Suppliers');
  const tabs = ['Tier 1 Suppliers', 'Tier 2 Suppliers'];

  const getActiveTabElement = (tab: string) => {
    if (tab === tabs[0]) {
      return <SuppliersDataGrid tier={1} />;
    } else {
      return <SuppliersDataGrid tier={2} />;
    }
  };

  return (
    <MainContent title="Suppliers" className={'w-[calc(100%-100px)]'}>
      <div className={'flex flex-row w-full justify-start relative'} data-testid={'suppliers-tabs'}>
        <div className={'absolute bottom-0 left-0 h-[2px] bg-gray-90 w-full'}></div>
        {tabs.map(tab => (
          <div
            className={`px-[16px] py-[8px] text-h5 cursor-pointer relative ` + (managementView === tab ? 'text-tc-primary' : 'text-tc-disabled')}
            onClick={() => setManagementView(tab)}
            key={tab}>
            {tab}
            {managementView === tab && <div className={'absolute bottom-0 left-0 w-full h-[4px] bg-primary-300'}></div>}
          </div>
        ))}
      </div>
      <div className={'flex flex-row justify-center w-full'}>{getActiveTabElement(managementView)}</div>
    </MainContent>
  );
};

export const SuppliersPage = withErrorBoundary(_SuppliersPage, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in Suppliers: ', error);
  },
});
