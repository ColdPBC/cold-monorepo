import React from 'react';

export interface SelectOptionProps {
    options: string[],
    onChange: (value: any) => void,
    value: string | string[] | null,
    isMultiSelect?: boolean,
}

export const SelectOption = ({options, onChange, value, isMultiSelect = false}: SelectOptionProps) => {
    let vertical = true;

    if(options.length > 4){
        vertical = false;
    }

    const onOptionClick = (index: number) => {
        if(isMultiSelect){
            if (value === null) {
                onChange([options[index]]);
            } else {
                if(Array.isArray(value)){
                    if(value.includes(options[index])){
                        const newValues = value.filter((value) => value !== options[index]);
                        if(newValues.length === 0){
                            onChange(null);
                        } else {
                            onChange(newValues);
                        }
                    } else {
                        onChange([...value, options[index]]);
                    }
                }
            }
        } else {
            if (value === options[index]) {
                onChange(null);
            } else {
                onChange(options[index]);
            }
        }
    }

    const getClassName = (index: number) => {
        let className = vertical ? "whitespace-pre" : "";
        className += " text-sm not-italic font-semibold text-center text-tc-primary cursor-pointer";

        if(vertical){
            className += " p-2";
        } else {
            className += " h-[104px] py-16 px-8";
        }

        if(isMultiSelect) {
            if(value !== null && value.includes( options[index] )) {
                className += " rounded-lg bg-primary-300 hover:bg-primary-200 grid grid-cols-1 place-content-center";
            } else {
                className += " rounded-lg bg-bgc-accent hover:bg-gray-50 grid grid-cols-1 place-content-center";
            }
        } else {
            if (value === options[index]) {
                className += " rounded-lg bg-primary-300 hover:bg-primary-200 grid grid-cols-1 place-content-center";
            } else {
                className += " rounded-lg bg-bgc-accent hover:bg-gray-50 grid grid-cols-1 place-content-center";
            }
        }
        return className;
    }

    if(vertical){
        return (
            <div className={"w-full space-y-4"}>
                {
                    options.map((option, index) => {
                        return (
                            <div key={`select_option_${index}`} className={getClassName(index)} id={index.toString()} onClick={() => onOptionClick(index)}>
                                {option}
                            </div>
                        )
                    })
                }
            </div>
        )
    } else {
        return (
            <div className={"w-full grid grid-cols-2 gap-4"}>
                {
                    options.map((option, index) => {
                        return (
                            <div key={`select_option_${index}`} className={getClassName(index)} id={index.toString()} onClick={() => onOptionClick(index)}>
                                {option}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
