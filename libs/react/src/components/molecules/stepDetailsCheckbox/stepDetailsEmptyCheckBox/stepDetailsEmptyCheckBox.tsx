import React from 'react';
import { ColdIcon } from '@coldpbc/components';
import { IconNames } from '@coldpbc/enums';
import { HexColors } from '@coldpbc/themes';

export type HoverStateProps = {
  onCheckboxClick: () => void;
};

export const StepDetailsEmptyCheckBox = ({
  onCheckboxClick,
}: HoverStateProps) => {
  const [checkboxHovered, setCheckboxHovered] = React.useState(false);

  const onCheckboxHover = () => {
    setCheckboxHovered(true);
  };

  const onCheckboxHoverOut = () => {
    setCheckboxHovered(false);
  };

  if (checkboxHovered) {
    return (
      <div
        onClick={onCheckboxClick}
        onMouseOver={onCheckboxHover}
        onMouseOut={onCheckboxHoverOut}
        className={'relative w-[32px] h-[32px]'}
      >
        <ColdIcon
          name={IconNames.ColdSmallCheckBoxIcon}
          className={'w-[24px] h-[24px]'}
          color={HexColors.gray['40']}
        />
      </div>
    );
  } else {
    return (
      <div
        onClick={onCheckboxClick}
        onMouseOver={onCheckboxHover}
        onMouseOut={onCheckboxHoverOut}
        className={'w-[32px] h-[32px] flex items-center justify-center'}
      >
        <ColdIcon
          name={IconNames.ColdEmptyCheckboxIcon}
          className={'w-[24px] h-[24px]'}
        />
      </div>
    );
  }
};
