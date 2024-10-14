import React, {useEffect, useRef} from "react";
import { Tooltip } from '@mui/material';
import {HexColors} from "@coldpbc/themes";
import {GridRenderCellParams, GridTreeNodeWithRender} from "@mui/x-data-grid";
import {DataGridCellPillPopover} from "./datagridCellPillPopover";

const MAX_WIDTH = 200;

export const DataGridCellHoverPopover = (props: {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
  color?: string;
}) => {
  const { params, color = HexColors.primary.DEFAULT } = props;
  const values = (params.value as string[]).sort();
  const [valuesToDisplay, setValuesToDisplay] = React.useState<string[]>(
    values
  );
  const divRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getPopoverContent = () => {
    const otherValues = values.slice(valuesToDisplay.length);
    return (
      <ul className={'list-disc ml-[20px] text-tc-primary text-body'}>
        {otherValues.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
    );
	};

  const timeoutId: NodeJS.Timeout | null = null;

  const getExtraContentElement = () => {
		if (values.length === valuesToDisplay.length) {
			return null;
		}

		return (
			<Tooltip
        title={getPopoverContent()}
        slotProps={{
          tooltip: {
            sx: {
              backgroundColor: HexColors.gray["50"],
              borderColor: HexColors.lightblue["300"],
              padding: '8px',
              color: HexColors.tc.primary,
              transition: 'none',
              width: '275px',
              maxHeight: '200px',
              overflowY: 'scroll',
              borderRadius: '8px',
              borderWidth: '1px',
            }
          }
        }}
      >
				<div
					className={'rounded-[32px] border-[1px] px-[16px] py-[4px] w-auto'}
					style={{
						borderColor: color,
					}}>
					<div className={'h-full w-auto'}>
						<span className={'text-body'}>{`+${values.length - valuesToDisplay.length}`}</span>
					</div>
				</div>
			</Tooltip>
		);
	};

	const displayPill = (value: string, index: number) => {
		// first check if the div is truncated. if so use a popover component to display the rest of the value
		return <DataGridCellPillPopover key={index} text={value} color={color} width={MAX_WIDTH} />;
	};

	useEffect(() => {
		const handleResize = () => {
			let observer: ResizeObserver | null = null;
			if (containerRef.current && divRef.current && values.length > 0) {
				observer = new ResizeObserver(() => {
					if (divRef.current && containerRef.current) {
						const totalWidth = containerRef.current.getBoundingClientRect().width - 110;
						const tempValues = [...values];
						let tempWidth = 0;
						let index = 0;
						const itemWidths = Array.from(divRef.current.children).map((value: Element) => value.getBoundingClientRect().width);

						while (index < tempValues.length && tempWidth <= totalWidth) {
							// Get width of each hidden item
							const itemWidth = itemWidths[index];
							if (tempWidth + itemWidth > totalWidth) {
								break;
							}
							tempWidth += itemWidth;
							index++;
						}

						// Slice array to get items within calculated width
						const itemsToFit = tempValues.slice(0, index);

						// If the length of the values to display is different from the length of itemsToFit
						if (itemsToFit.length !== valuesToDisplay.length) {
							setValuesToDisplay(itemsToFit);
						}
					}
				});

				observer.observe(containerRef.current);
			}
			return () => {
				observer?.disconnect();
			};
		};
		handleResize();
	}, [containerRef, divRef, values, valuesToDisplay, setValuesToDisplay]);

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <div className={'h-full w-full flex items-center justify-start text-body text-tc-primary gap-[10px]'} ref={containerRef}>
      {
        valuesToDisplay.length > 0 && (
          <div className={'h-full w-auto flex items-center gap-[10px]'}>
            {
              valuesToDisplay
              .map((value: string, index: number) => {
              return displayPill(value, index);
            })}
          </div>
        )
      }
      {
        getExtraContentElement()
      }
      {/* This div is hidden offscreen and is used to calculate the actual width of the elements*/}
      <div
        ref={divRef}
        className={'w-auto flex items-center gap-[10px] invisible whitespace-nowrap'}
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
