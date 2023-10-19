import { axiosFetcher } from '@coldpbc/fetchers';
import useSWR from 'swr';
import { JourneySpiderChart } from '../journeySpiderChart';
import { SubcategoryJourneyPreview } from '../subcategoryJourneyPreview';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application/errors/errorFallback';

const _JourneyDetailView = () => {
  const { data } = useSWR<any>(['/categories', 'GET'], axiosFetcher);

  const showCompanySection =
    data?.definition?.categories['company_decarbonization']?.subcategories[
      'facilities'
    ] ||
    data?.definition?.categories['company_decarbonization']?.subcategories[
      'operations'
    ] ||
    data?.definition?.categories['company_decarbonization']?.subcategories[
      'travel'
    ] ||
    data?.definition?.categories['company_decarbonization']?.subcategories[
      'product'
    ];

  const showEmployeeSection =
    data?.definition?.categories['employee_engagement']?.subcategories[
      'employee_footprint'
    ] ||
    data?.definition?.categories['employee_engagement']?.subcategories[
      'employee_activation'
    ];

  const showLeadershipSection =
    data?.definition?.categories['climate_leadership']?.subcategories[
      'internal_alignment'
    ] ||
    data?.definition?.categories['climate_leadership']?.subcategories[
      'community_impact'
    ];

  return (
    <div>
      <div className="mt-4 mb-10 mx-auto">
        <JourneySpiderChart />
      </div>
      {showCompanySection && (
        <>
          <h2 className="text-xl mt-6 mb-3 font-bold text-white">
            Company Decarbonization
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <SubcategoryJourneyPreview
              subcategory_key="facilities"
              category_key="company_decarbonization"
            />
            <SubcategoryJourneyPreview
              subcategory_key="operations"
              category_key="company_decarbonization"
            />
            <SubcategoryJourneyPreview
              subcategory_key="travel"
              category_key="company_decarbonization"
            />
            <SubcategoryJourneyPreview
              subcategory_key="product"
              category_key="company_decarbonization"
            />
          </div>
        </>
      )}
      {showEmployeeSection && (
        <>
          <h2 className="text-xl mt-6 mb-3 font-bold text-white">
            Employee Engagement
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <SubcategoryJourneyPreview
              subcategory_key="employee_footprint"
              category_key="employee_engagement"
            />
            <SubcategoryJourneyPreview
              subcategory_key="employee_activation"
              category_key="employee_engagement"
            />
          </div>
        </>
      )}
      {showLeadershipSection && (
        <>
          <h2 className="text-xl mt-6 mb-3 font-bold text-white">
            Climate Leadership
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <SubcategoryJourneyPreview
              subcategory_key="internal_alignment"
              category_key="climate_leadership"
            />
            <SubcategoryJourneyPreview
              subcategory_key="community_impact"
              category_key="climate_leadership"
            />
          </div>
        </>
      )}
    </div>
  );
};

export const JourneyDetailView = withErrorBoundary(_JourneyDetailView, {
  FallbackComponent: ErrorFallback,
  onError: (error, info) => {
    console.error('Error occurred in JourneyDetailView: ', error);
  },
});
