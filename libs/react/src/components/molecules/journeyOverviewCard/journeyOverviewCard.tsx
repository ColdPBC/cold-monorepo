import React, {PropsWithChildren, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, JourneySpiderChart, JourneyComplianceSwitcher } from '@coldpbc/components';
import {AssessmentsContext} from "@coldpbc/context";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface JourneyOverviewCardProps {
  omitCta?: boolean;
}

export function JourneyOverviewCard(props: PropsWithChildren<JourneyOverviewCardProps>) {
  const navigate = useNavigate();
  const {currentAssessment, data} = useContext(AssessmentsContext);

  const isEmptyData = !data[currentAssessment];

  const cta = props.omitCta
    ? []
    : [
        {
          text: 'Learn More',
          action: () => {
            navigate('/assessments');
          },
        },
      ];

  return (
    <Card title="Assessments" ctas={cta} data-testid="journey-overview-card">
      <JourneyComplianceSwitcher />
      <div className="flex items-center justify-center self-stretch flex-col">
        <JourneySpiderChart />
        {isEmptyData && (
          <div className="m-auto table w-1">
            <h4 className="text-h4 text-center whitespace-nowrap mx-8">Waiting on your first assessment</h4>
            <p className="text-center mt-4">Results will appear here as soon as they are ready.</p>
          </div>
        )}
      </div>
    </Card>
  );
}
