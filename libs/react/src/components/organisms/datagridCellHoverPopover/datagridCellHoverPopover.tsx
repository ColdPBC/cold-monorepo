import React, {useEffect, useRef} from "react";
import {Popover} from '@mui/material';
import {HexColors} from "@coldpbc/themes";
import {GridRenderCellParams, GridTreeNodeWithRender} from "@mui/x-data-grid";
import {orderBy, sortBy} from "lodash";
import {child} from "winston";

// todo: set max width

const MAX_WIDTH = 200;

export const DataGridCellHoverPopover = (props: {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
  color?: string;
}) => {
  const { params, color = HexColors.primary.DEFAULT } = props;
  const values = params.value as string[];
  const [valuesToDisplay, setValuesToDisplay] = React.useState<string[]>(
    values
  );
  const [hovering, setHovering] = React.useState<boolean>(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);

  const getPopoverContent = () => {
		// list values as a unordered list
    const otherValues = values.slice(valuesToDisplay.length);
		return (
			<div className={'rounded-[8px] bg-gray-50 border-[1px] border-lightblue-300 p-[8px] text-tc-primary text-body transition-none w-[275px] max-h-[200px] overflow-y-scroll'}>
				<ul className={'list-disc ml-[20px]'}>
					{otherValues.map((value, index) => (
						<li key={index}>{value}</li>
					))}
				</ul>
			</div>
		);
	};

  const onMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    setHovering(true);
  }

  const onMouseLeave = () => {
    setHovering(false);
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
        onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
      >
        <div
          className={'h-full w-auto'}
          ref={anchorRef}
        >
          <span className={'text-body'}>{`+${values.length - valuesToDisplay.length}`}</span>
        </div>
        <Popover
          sx={{
            pointerEvents: 'auto',
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
          ref={popperRef}
          onClose={onMouseLeave}
          disableRestoreFocus={true}
          slotProps={{
            paper: {
              onMouseEnter: onMouseEnter,
              onMouseLeave: onMouseLeave,
            }
          }}
        >
          {getPopoverContent()}
        </Popover>
      </div>
		);
  };

  useEffect(() => {
    const handleResize = () => {
      let observer: ResizeObserver | null = null;
      if(containerRef.current && divRef.current){
        observer = new ResizeObserver(() => {
          if(divRef.current && containerRef.current) {
            const totalWidth = containerRef.current.getBoundingClientRect().width - 110
            console.log('totalWidth', totalWidth);
            console.log('divWidth', divRef.current.getBoundingClientRect().width)
            console.log('values', values);
            console.log('valuesToDisplay', valuesToDisplay);
            const tempValues = [...values];
            let tempWidth = 0;
            let index = 0;
            const itemWidths = Array.from(
              divRef.current.children
            ).map((value: Element) => value.getBoundingClientRect().width);

            while (index < tempValues.length && tempWidth <= totalWidth) {
              // Get width of each hidden item
              const itemWidth = itemWidths[index];
              if((tempWidth + itemWidth) > totalWidth) {
                break;
              }
              tempWidth += itemWidth;
              index++;
            }

            // Slice array to get items within calculated width
            const itemsToFit = tempValues.slice(0, index);

            console.log('itemsToFit', itemsToFit);
            // If the length of the values to display is different from the length of itemsToFit
            if(itemsToFit.length !== valuesToDisplay.length) {
              setValuesToDisplay(itemsToFit);
            }
          }
        });

        observer.observe(containerRef.current);
      }
      return () => {
        observer?.disconnect();
      }
    }
    handleResize();
  }, [containerRef, divRef, values, valuesToDisplay, setValuesToDisplay]);

  return (
    <div className={'h-full w-full flex items-center justify-start text-body text-tc-primary gap-[10px]'} ref={containerRef}>
      {
        valuesToDisplay.length > 0 && (
          <div className={'h-full w-auto flex items-center gap-[10px]'}>
            {
              valuesToDisplay
              .map((value: string, index: number) => {
              return (
                <div
                  key={index}
                  className={'rounded-[32px] border-[1px] px-[16px] py-[4px] whitespace-nowrap truncate w-auto'}
                  style={{
                    borderColor: color,
                    maxWidth: MAX_WIDTH,
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
      {/* This div is hidden offscreen and is used to calculate the actual width of the elements*/}
      <div
        style={{
          position: 'absolute',
          left: '-9999px',
          // Ensures the items stay in a line and don't wrap to next line
          whiteSpace: 'nowrap',
        }}
        ref={divRef}
        className={'w-auto flex items-center gap-[10px]'}
      >
        {
          values
            .map((value: string, index: number) => {
              return (
                <div
                  key={index}
                  className={'rounded-[32px] border-[1px] px-[16px] py-[4px] whitespace-nowrap truncate w-auto'}
                  style={{
                    borderColor: color,
                    maxWidth: MAX_WIDTH,
                  }}
                >
                  <span className={'text-body'}>{value}</span>
                </div>
              );
            })
        }
      </div>
    </div>
  );
};
