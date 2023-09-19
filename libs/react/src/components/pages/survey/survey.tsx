import React, { useEffect } from 'react';
import { SurveyActiveKeyType, SurveyPayloadType } from '@coldpbc/interfaces';
import { Spinner, SurveyLeftNav, SurveyRightNav, Takeover } from '../../index';
import { cloneDeep, isEmpty } from 'lodash';
import useSWR from 'swr';
import { axiosFetcher } from '@coldpbc/fetchers';
import { GlobalSizes } from '@coldpbc/enums';

export interface SurveyProps {
  surveyName: string;
}

export const Survey = (props: SurveyProps) => {
  const { surveyName } = props;
  const [activeKey, setActiveKey] = React.useState<SurveyActiveKeyType>({
    value: '',
    isFollowUp: false,
  });
  const [show, setShow] = React.useState<boolean>(true);
  const [surveyData, setSurveyData] = React.useState<SurveyPayloadType>();
  const [headerShown, setHeaderShown] = React.useState<boolean>();
  const { data, error, isLoading } = useSWR<SurveyPayloadType, any, any>(
    [`/surveys/${surveyName}`, 'GET'],
    axiosFetcher,
  );

  const submitSurvey = () => {
    setShow(false);
  };

  const startSurvey = () => {
    console.log('start survey');
    // get the first section
    // set the active key to the first section
    if (surveyData) {
      // go to the first section, check if the component is null and prompt is empty.
      // if so, go to the first followup
      const firstSectionKey = Object.keys(surveyData.definition.sections)[0];
      const firstSection = surveyData.definition.sections[firstSectionKey];
      if (firstSection.component === null && isEmpty(firstSection.prompt)) {
        const firstFollowUpKey = Object.keys(firstSection.follow_up)[0];
        setActiveKey({
          value: firstFollowUpKey,
          isFollowUp: true,
        });
      } else {
        setActiveKey({
          value: firstSectionKey,
          isFollowUp: false,
        });
      }
    }
  };

  useEffect(() => {
    if (data) {
      // sort the sections and followups by the idx field
      // data.definition.sections is an object with keys as the section name
      // data.definition[section].followups is an object with keys as the followup name
      const copy = cloneDeep(data);
      // sort the sections and set the sorted sections in the copy
      Object.keys(data.definition.sections)
        .sort((a, b) => {
          return (
            data.definition.sections[a].category_idx -
            data.definition.sections[b].category_idx
          );
        })
        .forEach((key) => {
          copy.definition.sections[key] = data.definition.sections[key];
          // sort the followups and set the sorted followups in the copy
          Object.keys(data.definition.sections[key].follow_up)
            .sort((a, b) => {
              return (
                data.definition.sections[key].follow_up[a].idx -
                data.definition.sections[key].follow_up[b].idx
              );
            })
            .forEach((followupKey) => {
              copy.definition.sections[key].follow_up[followupKey] =
                data.definition.sections[key].follow_up[followupKey];
            });
        });
      setSurveyData(copy);
    }
  }, [data]);

  if (error) return <div>failed to load</div>;

  if (isLoading) {
    return (
      <Takeover
        show={show}
        setShow={setShow}
        header={{
          title: {},
          dismiss: {
            label: 'close',
            dismissible: true,
          },
        }}
      >
        <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <Spinner size={GlobalSizes.xLarge} />
        </div>
      </Takeover>
    );
  }

  if (surveyData) {
    return (
      <div>
        <Takeover
          show={show}
          setShow={setShow}
          header={{
            title: {},
            dismiss: {
              label: 'close',
              dismissible: true,
            },
          }}
        >
          <div className={'flex'}>
            <SurveyLeftNav
              surveyData={surveyData}
              activeKey={activeKey}
              setActiveKey={setActiveKey}
            />
            <SurveyRightNav
              activeKey={activeKey}
              setActiveKey={setActiveKey}
              surveyData={surveyData}
              setSurveyData={setSurveyData}
              submitSurvey={submitSurvey}
              startSurvey={startSurvey}
            />
          </div>
        </Takeover>
      </div>
    );
  } else {
    return <></>;
  }
};
