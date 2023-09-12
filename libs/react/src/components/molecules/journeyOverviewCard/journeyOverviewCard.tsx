import React, {PropsWithChildren, useState} from 'react';
import {Card} from '../card/card';
import {useNavigate} from 'react-router-dom';
import {JourneySpiderChart} from '../journeySpiderChart/journeySpiderChart';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface JourneyOverviewCardProps {}

export function JourneyOverviewCard(
  props: PropsWithChildren<JourneyOverviewCardProps>,
) {
  const navigate = useNavigate();
  const [isEmptyData, setIsEmptyData] = useState(false);

  return (
    <Card
      title="Climate Journey"
      ctas={[
        {
          text: 'Learn More',
          action: () => {
            navigate('/journey');
          },
        },
      ]}
    >
      <div className="flex items-center justify-center self-stretch flex-col">
        <JourneySpiderChart setIsEmptyData={setIsEmptyData} />
        {isEmptyData && (
          <div className="m-auto table w-1">
            <h4 className="text-h4 text-center whitespace-nowrap mx-8">
              Our Climate Experts are reviewing your data
            </h4>
            <p className="text-center mt-4">
              We'll get back to you as soon as the results are ready to discuss.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
