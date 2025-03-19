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
  setErrors: (errors: { [key: string]: string | undefined }) => void;
  errors: { [key: string]: string | undefined };
}

export const NumericInputWithUnitOfMeasure = <T,>({
  fieldName,
  unitOfMeasureFieldName,
  unitOfMeasureOptions,
  label,
  setEntityState,
  entityState,
  setErrors,
  errors,
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

  const validate = (newState: T) => {
    // Clear both errors initially
    let valueError: string | undefined;
    let uomError: string | undefined;

    // Check if we have a UOM but no value
    if (newState[unitOfMeasureFieldName] && newState[fieldName] === null) {
      valueError = `${label} is required`;
    }
    // Check if we have a value but no UOM
    else if ((newState[fieldName] !== null || newState[fieldName] === 0) && !newState[unitOfMeasureFieldName]) {
      uomError = 'Unit of measure is required';
    }
    // Check for pcs validation
    else if (newState[unitOfMeasureFieldName] === UnitOfMeasurement.pcs && newState[fieldName] !== null && !Number.isInteger(newState[fieldName])) {
      valueError = `${label} must be a whole number`;
    }

    setErrors({
      ...errors,
      [fieldName]: valueError,
      [unitOfMeasureFieldName]: uomError,
    })
  }

  const onChange = (fieldName, newValue) => {
    const newState = {
      ...entityState,
      [fieldName]: newValue,
    };

    setEntityState(newState);
    validate(newState);
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
          value: (entityState[fieldName] || entityState[fieldName] === 0) ? Number(entityState[fieldName]) : '',
          thousandSeparator: ',',
          onValueChange: values => {
            const value = values.value;
            const valueToSet = value === '' ? null : Number(value);
            onChange(fieldName, valueToSet)
          },
          className: 'text-body p-4 rounded-[8px] border-[1.5px] border-gray-90 w-full focus:border-[1.5px] focus:border-gray-90 focus:ring-0',
          showError: !!errors[fieldName as string],
          error: errors[fieldName as string],
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
          buttonClassName={errors[unitOfMeasureFieldName as string] ? 'border-red-100' : ''}
        />
        {errors[unitOfMeasureFieldName as string] && <div className="text-red-100 text-eyebrow mt-[8px]">{errors[unitOfMeasureFieldName as string]}</div>}
      </div>
    </div>
  );
}
