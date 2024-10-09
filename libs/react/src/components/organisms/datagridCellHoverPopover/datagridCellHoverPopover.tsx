import React, {PropsWithChildren, ReactNode, useEffect, useRef} from "react";
import { Popover } from '@mui/material';
import {HexColors} from "@coldpbc/themes";
import {GridRenderCellParams, GridTreeNodeWithRender} from "@mui/x-data-grid";

export const DataGridCellHoverPopover = (props: {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
  color?: string;
}) => {
  const { params, color = HexColors.primary.DEFAULT } = props;
  const values = params.value as string[];
  const [valuesToDisplay, setValuesToDisplay] = React.useState<string[]>(
    values
  );
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const open = Boolean(anchorEl);
  const divRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getPopoverContent = () => {
		// list values as a unordered list
    const otherValues = values.slice(valuesToDisplay.length);
		return (
			<div className={'rounded-[8px] bg-gray-50 border-[1px] border-lightblue-300 p-[8px] text-tc-primary text-body transition-none w-[275px]'}>
				<ul className={'list-disc ml-[20px]'}>
					{otherValues.map((value, index) => (
						<li key={index}>{value}</li>
					))}
				</ul>
				Click on the row for more details
			</div>
		);
	};

  const onMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const onMouseLeave = () => {
    setAnchorEl(null);
  }

  const getExtraContentElement = () => {
		if (values.length === valuesToDisplay.length) {
			return null;
		}
		return (
			<div
        className={'rounded-[32px] border-[1px] px-[16px] py-[4px] w-auto'}
        style={{
          borderColor: color,
        }}
      >
        <div className={'h-full w-auto'} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          <span className={'text-body'}>{`+${values.length - valuesToDisplay.length}`}</span>
        </div>
        <Popover
          sx={{
            pointerEvents: 'none',
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={onMouseLeave}
          disableRestoreFocus
        >
          {getPopoverContent()}
        </Popover>
			</div>
		);
	};

  useEffect(() => {
    if(divRef.current && containerRef.current) {
      const divWidth = divRef.current.offsetWidth;
      const totalWidth = containerRef.current.offsetWidth - 30;
      if (totalWidth <= divWidth) {
        const tempValues = [...values];
        let tempWidth = divWidth;
        while (totalWidth <= tempWidth) {
          tempValues.pop();
          tempWidth = tempValues.reduce((acc, value) => acc + (value.length * 10) + 24, 0);
        }
        setValuesToDisplay(tempValues);
      }
    }
  }, [valuesToDisplay]);

  return (
    <div className={'h-full w-full flex items-center justify-start text-body text-tc-primary gap-[10px]'} ref={containerRef}>
      {
        valuesToDisplay.length > 0 && (
          <div className={'h-full w-fit flex items-center gap-[10px]'} ref={divRef}>
            {valuesToDisplay.map((value: string, index: number) => {
              return (
                <div
                  key={index}
                  className={'rounded-[32px] border-[1px] px-[16px] py-[4px] w-auto whitespace-nowrap'}
                  style={{
                    borderColor: color,
                  }}
                >
                  <span className={'text-body'}>{value}</span>
                </div>
              );
            })}
          </div>
        )
      }
      {
        getExtraContentElement()
      }
    </div>
  );
};
