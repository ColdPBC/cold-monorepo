import React from 'react';
import { YesNo } from '../yesNo/yesNo';
import { Input } from '../../atoms/input/input';
import { PercentSlider } from '../percentSlider/percentSlider';
import { SelectOption } from '../selectOption/selectOption';
import { InputTypes } from '../../../enums/inputs';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';

export interface SurveyInputProps {
  input_key: string;
  prompt: string;
  options: string[];
  tooltip: string;
  component: string;
  placeholder: string;
  value: any | null;
  onFieldUpdated: (name: string, value: any) => void;
}

const _SurveyInput = (props: SurveyInputProps) => {
  const { input_key, prompt, options, tooltip, component, placeholder, onFieldUpdated, value } = props;

  const inputComponent = () => {
    switch (component) {
      case 'yes_no':
        return (
          <YesNo
            onChange={value => {
              onFieldUpdated(input_key, value);
            }}
            value={value}
          />
        );
      case 'text':
        return (
          <Input
            type={InputTypes.Text}
            input_props={{
              name: input_key,
              value: value === null ? undefined : value,
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
              'aria-label': input_key,
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
                value: value,
                onValueChange: value => {
                  onFieldUpdated(input_key, value);
                },
              }}
              numeric_input_props={{
                name: input_key,
                'aria-label': input_key,
                value: value === null ? undefined : value,
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
              value: value === null ? undefined : value,
              onValueChange: value => {
                onFieldUpdated(input_key, value);
              },
            }}
            numeric_input_props={{
              name: input_key,
              value: value === null ? undefined : value,
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
              'aria-label': input_key,
            }}
            container_classname={'w-full h-full'}
          />
        );
      case 'percent_slider':
        return (
          <PercentSlider
            value={value}
            onChange={value => {
              onFieldUpdated(input_key, value);
            }}
            tooltip={tooltip}
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
            value={value}
          />
        );
      case 'select':
        return (
          <SelectOption
            options={options}
            onChange={value => {
              onFieldUpdated(input_key, value);
            }}
            value={value}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="text-left text-2xl not-italic font-bold text-tc-primary">{prompt}</div>
      {tooltip && <div className="text-left text-sm not-italic font-medium text-tc-primary">{tooltip}</div>}

      <div className="w-full justify-center">{inputComponent()}</div>
    </div>
  );
};

export const SurveyInput = withErrorBoundary(_SurveyInput, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in SurveyInput: ', error);
  },
});
