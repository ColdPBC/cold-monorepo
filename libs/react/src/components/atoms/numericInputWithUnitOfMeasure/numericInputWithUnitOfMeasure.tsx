import { ComboBox, Input } from '@coldpbc/components';
import { InputTypes, UnitOfMeasurement } from '@coldpbc/enums';
import React from 'react';
import { InputOption } from '@coldpbc/interfaces';


interface NumericInputWithUnitOfMeasureProps<T> {
  fieldName: keyof T;
  unitOfMeasureFieldName: keyof T;
  unitOfMeasureOptions: string[];
  label: string;
  setEntityState: (state: T) => void;
  entityState: T;
  setError: (error?: string) => void;
  error?: string;
}

export const NumericInputWithUnitOfMeasure = <T,>({
  fieldName,
  unitOfMeasureFieldName,
  unitOfMeasureOptions,
  label,
  setEntityState,
  entityState,
  setError,
  error
}: NumericInputWithUnitOfMeasureProps<T>) => {
  const placeholderOption = {
    id: -1,
    name: '',
    value: '',
  };

  const uomOptions: InputOption[] = unitOfMeasureOptions.sort((a, b) => a.localeCompare(b)).map((uom, index) => ({
    id: index,
    name: uom,
    value: uom,
  }));

  const validate = () => {
    // if they select a UOM, numeric value must be not be null
    // if they select pcs as UOM, numeric value must be a whole number
    if(entityState[unitOfMeasureFieldName] && entityState[fieldName] === null) {
      setError(`${label} is required`);
    } else if(entityState[unitOfMeasureFieldName] === UnitOfMeasurement.pcs && entityState[fieldName] !== null && !Number.isInteger(entityState[fieldName])) {
      setError(`${label} must be a whole number`);
    } else {
      return undefined;
    }
  }

  const onChange = (fieldName, newValue) => {
    validate();
    setEntityState({
      ...entityState,
      [fieldName]: newValue,
    });
  }

  return (
    <div className={'w-full flex flex-row gap-[16px] justify-between'}>
      <Input
        type={InputTypes.Number}
        input_label={label}
        input_label_props={{
          className: 'text-eyebrow',
        }}
        numeric_input_props={{
          name: String(fieldName),
          value: entityState[fieldName] ? Number(entityState[fieldName]) : '',
          thousandSeparator: ',',
          onValueChange: e => {
            onChange(fieldName, Number(e.value))
          },
          className: 'text-body p-4 rounded-[8px] border-[1.5px] border-gray-90 w-full focus:border-[1.5px] focus:border-gray-90 focus:ring-0',
          showError: !!error,
          error,
        }}
        container_classname={'w-1/2'}
      />
      <div className={'flex flex-col w-1/2'}>
        <div className={'text-eyebrow leading-6'}>{label} UOM</div>
        <ComboBox
          options={[placeholderOption, ...uomOptions]}
          value={uomOptions.find(option => option.value === entityState[unitOfMeasureFieldName]) || placeholderOption}
          name={String(unitOfMeasureFieldName)}
          onChange={(selectedOption) => {
            onChange(unitOfMeasureFieldName, selectedOption.value);
          }}
        />
      </div>
    </div>
  );
}
