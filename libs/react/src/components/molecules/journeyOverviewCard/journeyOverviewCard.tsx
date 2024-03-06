import React, { PropsWithChildren, useState } from 'react';
import { Card } from '../card/card';
import { useNavigate } from 'react-router-dom';
import { JourneySpiderChart } from '../journeySpiderChart/journeySpiderChart';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface JourneyOverviewCardProps {
  omitCta?: boolean;
}

export function JourneyOverviewCard(props: PropsWithChildren<JourneyOverviewCardProps>) {
  const navigate = useNavigate();
  const [isEmptyData, setIsEmptyData] = useState(false);

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
      <div className="flex items-center justify-center self-stretch flex-col">
        <JourneySpiderChart setIsEmptyData={setIsEmptyData} />
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
