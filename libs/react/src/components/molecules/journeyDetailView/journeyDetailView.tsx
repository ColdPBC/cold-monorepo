import { JourneySpiderChart } from '../journeySpiderChart';
import { SubcategoryJourneyPreview } from '../subcategoryJourneyPreview';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application/errors/errorFallback';
import React, {useContext} from "react";
import {AssessmentsContext} from "@coldpbc/context";
import {map} from "lodash";
import {Card, DismissableInfoCard, JourneyComplianceSwitcher, JourneyOverviewCard} from "@coldpbc/components";

const _JourneyDetailView = () => {
  const {currentAssessment, data} = useContext(AssessmentsContext);

  const isEmptyData = !data[currentAssessment];

  return (
    !isEmptyData ? (
      <Card title={data[currentAssessment].compliance?.compliance_definition.title}>
        <JourneyComplianceSwitcher />
        <div data-testid={'journey-detail-view'}>
          <div className="mt-4 mb-10 mx-auto">
            <JourneySpiderChart/>
          </div>
          <h2 className="text-xl mt-6 mb-3 font-bold text-white">Categories</h2>
          <div className="grid grid-cols-2 gap-4" data-testid={'journey-detail-view-categories'}>
            {map(data[currentAssessment].section_types, (sectionInfo, sectionType) => {
              return (
                <SubcategoryJourneyPreview section_type={sectionType} score={Math.floor((sectionInfo?.percentage || 0)*100)} />
              );
            })}
          </div>
        </div>
      </Card>
      ) : (
      <>
        <DismissableInfoCard
          text="Assessments show how much progress you've made towards a particular compliance set. Higher scores mean you're closer to doing everything possible for this compliance set."
          onDismiss={() => {}}
          dismissKey="journey-page"
        />
        <JourneyOverviewCard omitCta={true} />
      </>
    )
  );
};

export const JourneyDetailView = withErrorBoundary(_JourneyDetailView, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in JourneyDetailView: ', error);
  },
});
