import React from 'react';
import { InputTypes } from '@coldpbc/enums';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';
import { isUndefined } from 'lodash';
import { Card, Input, ListItem, PercentSlider, SelectOption, YesNo } from '@coldpbc/components';
import { getAIResponseValue, isAIResponseValueValid } from '@coldpbc/lib';

export interface SurveyInputProps {
  input_key: string;
  prompt: string;
  options: string[];
  tooltip?: string;
  component: string;
  placeholder: string;
  value: any | null;
  onFieldUpdated: (name: string, value: any) => void;
  isAdditional?: boolean;
  question_summary?: string;
  ai_attempted?: boolean;
  ai_response?: {
    justification?: string;
    answer?: any;
  };
}

const _SurveyInput = (props: SurveyInputProps) => {
  const { input_key, prompt, options, tooltip, component, placeholder, onFieldUpdated, value, isAdditional, ai_attempted, ai_response } = props;

  const getDisplayValue = () => {
    // get the value to be displayed
    let displayValue = value;
    if (isUndefined(displayValue) && isAIResponseValueValid(props)) {
      displayValue = getAIResponseValue(props);
    }
    return displayValue;
  };

  const inputComponent = () => {
    const displayValue = getDisplayValue();
    switch (component) {
      case 'yes_no':
        return (
          <YesNo
            onChange={value => {
              onFieldUpdated(input_key, value);
            }}
            value={displayValue}
            data-testid={input_key + (isAdditional ? '-additional' : '')}
          />
        );
      case 'text':
        return (
          <Input
            type={InputTypes.Text}
            input_props={{
              name: input_key,
              value: displayValue === null ? undefined : displayValue,
              onChange: e => {
                if (e.target.value === '') {
                  onFieldUpdated(input_key, null);
                } else {
                  onFieldUpdated(input_key, e.target.value);
                }
              },
              onValueChange: value => {
                onFieldUpdated(input_key, value);
              },
              className:
                'text-sm not-italic text-tc-primary font-medium bg-transparent w-full rounded-lg py-6 px-4 border border-bgc-accent focus:border focus:border-bgc-accent focus:ring-0',
              placeholder: placeholder,
              title: tooltip,
              'aria-label': input_key + (isAdditional ? '-additional' : ''),
            }}
            container_classname={'w-full'}
          />
        );
      case 'currency':
        return (
          <div className={'flex h-[72px] w-full space-between border border-bgc-accent rounded-lg'}>
            <div className={'h-[72px] w-[56px] py-6 px-4 align-content-center'}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M16 9.00021C16 7 15 6 12 6M12 6C9 6 8 7 8 9C8 11 9 12 12 12C15 12 16 13 16 15C16 17 14 18 12 18M12 6V4M12 18C10 18 8 17 8 15M12 18V20"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <Input
              type={InputTypes.Number}
              input_props={{
                name: input_key,
                value: displayValue,
                onValueChange: value => {
                  onFieldUpdated(input_key, value);
                },
              }}
              numeric_input_props={{
                name: input_key,
                value: displayValue === null ? undefined : displayValue,
                thousandSeparator: ',',
                onValueChange: values => {
                  if (values.floatValue === undefined) {
                    onFieldUpdated(input_key, null);
                  } else {
                    onFieldUpdated(input_key, values.floatValue);
                  }
                },
                placeholder: placeholder,
                title: tooltip,
                className: 'text-sm not-italic text-tc-primary font-medium bg-transparent w-full h-full pl-0 pr-6 py-6 border-0 focus:border-0 focus:ring-0',
                'aria-label': input_key + (isAdditional ? '-additional' : ''),
              }}
              container_classname={'w-full'}
            />
          </div>
        );
      case 'number':
        return (
          <Input
            type={InputTypes.Number}
            input_props={{
              name: input_key,
              value: displayValue === null ? undefined : displayValue,
              onValueChange: value => {
                onFieldUpdated(input_key, value);
              },
            }}
            numeric_input_props={{
              name: input_key,
              value: displayValue === null ? undefined : displayValue,
              thousandSeparator: ',',
              onValueChange: values => {
                if (values.floatValue === undefined) {
                  onFieldUpdated(input_key, null);
                } else {
                  onFieldUpdated(input_key, values.floatValue);
                }
              },
              title: tooltip,
              className:
                'text-sm not-italic text-tc-primary font-medium bg-transparent w-full rounded-lg py-6 px-4 border border-bgc-accent focus:border focus:border-bgc-accent focus:ring-0',
              'aria-label': input_key + (isAdditional ? '-additional' : ''),
            }}
            container_classname={'w-full h-full'}
          />
        );
      case 'percent_slider':
        return (
          <PercentSlider
            value={displayValue}
            onChange={value => {
              onFieldUpdated(input_key, value);
            }}
            tooltip={tooltip}
            data-testid={input_key + (isAdditional ? '-additional' : '')}
          />
        );
      case 'multi_select':
        return (
          <SelectOption
            isMultiSelect={true}
            options={options}
            onChange={value => {
              onFieldUpdated(input_key, value);
            }}
            value={displayValue}
            data-testid={input_key + (isAdditional ? '-additional' : '')}
          />
        );
      case 'select':
        return (
          <SelectOption
            options={options}
            onChange={value => {
              onFieldUpdated(input_key, value);
            }}
            value={displayValue}
            data-testid={input_key + (isAdditional ? '-additional' : '')}
          />
        );
      case 'textarea':
        return (
          <Input
            type={InputTypes.TextArea}
            textarea_props={{
              onChange: e => {
                if (e.target.value === '') {
                  onFieldUpdated(input_key, null);
                } else {
                  onFieldUpdated(input_key, e.target.value);
                }
              },
              name: input_key,
              value: displayValue === null ? undefined : displayValue,
              placeholder: placeholder,
              title: tooltip,
              'aria-label': input_key + (isAdditional ? '-additional' : ''),
            }}
            container_classname={'w-full'}
          />
        );
      case 'multi_text':
        return (
          <ListItem
            value={displayValue}
            onChange={value => {
              onFieldUpdated(input_key, value);
            }}
            data-testid={input_key + (isAdditional ? '-additional' : '')}
            input_props={{
              placeholder: placeholder,
            }}
          />
        );
      default:
        return <></>;
    }
  };

  const getPrompt = () => {
    const className = 'text-left text-tc-primary';

    const promptWithLinebreaks = prompt.split('\n');

    return (
      <div className={className}>
        {promptWithLinebreaks.map(prompt => {
          return <div className={'mb-4'}>{prompt}</div>;
        })}
      </div>
    );
  };

  const getAISource = () => {
    let justification = '';
    let originalAnswer = '';
    if (ai_attempted && !isUndefined(ai_response) && !isUndefined(ai_response.answer) && ai_response.justification && isAIResponseValueValid(props)) {
      justification = ai_response.justification;
      if (!isUndefined(value)) {
        if (ai_response.answer === true) {
          originalAnswer = 'Yes';
        } else if (ai_response.answer === false) {
          originalAnswer = 'No';
        } else if (Array.isArray(ai_response.answer)) {
          originalAnswer = ai_response.answer.join(', ');
        } else {
          originalAnswer = ai_response.answer;
        }
      }
    } else {
      return null;
    }

    return (
      <Card glow={false} className={'border-[1px] border-purple-300 w-full bg-bgc-elevated'} data-testid={'survey-input-ai-response'}>
        <div className={'text-sm space-y-3'}>
          <div className={'font-bold'}>✨ Cold AI</div>
          {originalAnswer && (
            <div>
              <span className={'font-bold'}>Original Answer:</span> {originalAnswer}
            </div>
          )}
          <div>
            <span className={'font-bold'}>Why:</span> {justification}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="w-full space-y-6">
      {getPrompt()}
      {tooltip && <div className="text-left text-sm not-italic font-medium text-tc-primary">{tooltip}</div>}
      <div className="w-full justify-center">{inputComponent()}</div>
      {getAISource()}
    </div>
  );
};

export const SurveyInput = withErrorBoundary(_SurveyInput, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in SurveyInput: ', error);
  },
});
