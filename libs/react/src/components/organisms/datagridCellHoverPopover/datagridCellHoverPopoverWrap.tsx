import React, {useEffect, useRef} from "react";
import { Tooltip } from '@mui/material';
import {HexColors} from "@coldpbc/themes";
import {GridRenderCellParams, GridTreeNodeWithRender} from "@mui/x-data-grid";
import {DataGridCellPillPopover} from "./datagridCellPillPopover";

const MAX_WIDTH = 200;

export const DataGridCellHoverPopoverWrap = (props: {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
  color?: string;
}) => {
  const { params, color = HexColors.primary.DEFAULT } = props;
  const values = (params.value as string[]).sort();
  const [firstRow, setFirstRow] = React.useState<string[]>(values);
  const [secondRow, setSecondRow] = React.useState<string[]>([]);
  const divRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getPopoverContent = () => {
    // get the values that are not in the first row and second row
    const otherValues = values.slice(firstRow.length + secondRow.length);
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
    if (values.length === (secondRow.length + firstRow.length)) {
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
          className={'rounded-[32px] border-[1px] py-[4px] w-[60px] flex justify-center text-body'}
          style={{
            borderColor: color,
          }}>
            <div>{`+${values.length - (secondRow.length+firstRow.length)}`}</div>
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
						const totalWidth = containerRef.current.getBoundingClientRect().width;
						const tempValues = [...values];
						let firstRowWidth = 0;
						let secondRowWidth = 0;
						let index = 0;
						let secondRowStartIndex = 0;
						const itemWidths = Array.from(divRef.current.children).map((value: Element) => value.getBoundingClientRect().width);
						while (firstRowWidth < totalWidth && index <= tempValues.length) {
							firstRowWidth += itemWidths[index] + 10;
							index++;
						}
						secondRowStartIndex = index - 1;
						// do the same for the second row
						while (secondRowWidth < totalWidth - 70 && secondRowStartIndex <= tempValues.length) {
							secondRowWidth += itemWidths[secondRowStartIndex] + 10;
							secondRowStartIndex++;
						}
						setFirstRow(tempValues.slice(0, index - 1));
						setSecondRow(tempValues.slice(index - 1, secondRowStartIndex - 1));
					}
				});

				observer.observe(containerRef.current);
			}
			return () => {
				observer?.disconnect();
			};
		};
		handleResize();
	}, [containerRef, divRef, values]);

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
		<div className={'h-full w-full flex-col py-[21px] text-body text-tc-primary space-y-[10px] relative'} ref={containerRef}>
			{firstRow.length > 0 && (
				<div className={'h-auto flex gap-[10px]'}>
					{firstRow.map((value: string, index: number) => {
						return displayPill(value, index);
					})}
				</div>
			)}
      <div className={'h-auto flex gap-[10px]'}>
        {
          secondRow.length > 0 &&
          secondRow.map((value: string, index: number) => {
            return displayPill(value, index);
          })
        }
        {
          getExtraContentElement()
        }
      </div>
			{/* This div is hidden offscreen and is used to calculate the actual width of the elements*/}
			<div ref={divRef} className={'w-auto flex gap-[10px] invisible whitespace-nowrap absolute'}>
				{values.map((value: string, index: number) => {
					return (
						<div
							key={index}
							className={'rounded-[32px] border-[1px] px-[16px] py-[4px] whitespace-nowrap truncate w-auto'}
							style={{
								borderColor: color,
								maxWidth: MAX_WIDTH,
							}}>
							<span className={'text-body'}>{value}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};
