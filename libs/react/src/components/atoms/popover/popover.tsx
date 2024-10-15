import React, {ReactNode, useRef} from 'react';
import {Popover as MUIPopover, PopoverProps} from '@mui/material';
import {twMerge} from "tailwind-merge";


export interface MUIPopoverProps {
  children: ReactNode;
  content: ReactNode;
  containerClassName?: string;
  contentClassName?: string;
  popoverProps?: PopoverProps;
}

export const Popover = (props: MUIPopoverProps) => {
  const { containerClassName, contentClassName, content, children, popoverProps,  } = props;
  const [hovering, setHovering] = React.useState<boolean>(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const onMouseEnter = () => {
    setHovering(true);
  }

  const onMouseLeave = () => {
    setHovering(false);
  }

  return (
    <div
      className={twMerge('text-tc-primary text-body', containerClassName)}
      onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
      ref={anchorRef}
    >
      {children}
      <MUIPopover
        sx={{
          pointerEvents: 'none',
        }}
        open={hovering}
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={onMouseLeave}
        disableRestoreFocus={true}
        {...popoverProps}
      >
        <div
          className={twMerge('rounded-[8px] bg-gray-50 border-[1px] border-lightblue-300 p-[8px] text-tc-primary text-body transition-none', contentClassName)}>
          {content}
        </div>
      </MUIPopover>
    </div>
);
};
