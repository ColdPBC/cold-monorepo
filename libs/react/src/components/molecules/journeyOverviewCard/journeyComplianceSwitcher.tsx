import React, { PropsWithChildren, useContext } from 'react';
import { Select } from '@coldpbc/components';
import { AssessmentsContext } from '@coldpbc/context';
import { map } from 'lodash';
import { InputOption } from '@coldpbc/interfaces';

export function JourneyComplianceSwitcher(props: PropsWithChildren) {
  const { setCurrentAssessment, currentAssessment, data } = useContext(AssessmentsContext);

  let idIterator = 0;

  if (Object.keys(data).length > 1) {
    return (
      <div className="flex items-center justify-center self-stretch flex-col">
        <Select
          className="w-1/2"
          name={'Active Assessment'}
          options={map(data, complianceInfo => {
            const option: InputOption = {
              id: ++idIterator,
              value: complianceInfo?.compliance?.compliance_definition.name || '',
              name: complianceInfo?.compliance?.compliance_definition.title || '',
            };
            return option;
          })}
          value={data[currentAssessment]?.compliance?.compliance_definition.title}
          onChange={input => {
            setCurrentAssessment(input.value);
          }}
        />
      </div>
    );
  } else {
    return null;
  }
}
