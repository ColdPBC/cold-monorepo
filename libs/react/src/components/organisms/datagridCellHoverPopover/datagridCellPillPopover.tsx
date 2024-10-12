import React, {useEffect, useRef, useState} from "react";
import {Popover} from "@coldpbc/components";
import {HexColors} from "@coldpbc/themes";

export const DataGridCellPillPopover = (props: {
  text: string,
  color?: string
  width?: number
}) => {
  const { text, color = HexColors.primary.DEFAULT, width = 200 } = props;
  const textRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const element = textRef.current;

    const checkTruncation = () => {
      if(element) {
        const isOverflowing = element.clientWidth < element.scrollWidth && element.getBoundingClientRect().width === width;
        setIsTruncated(isOverflowing);
      }
    }
    checkTruncation();
  }, [text]);

  if(!isTruncated) {
    return (
      <div
        className={'rounded-[32px] border-[1px] px-[16px] py-[4px] whitespace-nowrap truncate w-auto'}
        style={{
          borderColor: color,
          maxWidth: width,
        }}
        ref={textRef}
      >
        <span
          ref={contentRef}
        >
          {text}
        </span>
      </div>
    );
  } else {
    return (
      <Popover content={text}>
        <div
          className={'rounded-[32px] border-[1px] px-[16px] py-[4px] whitespace-nowrap truncate w-auto'}
          style={{
            borderColor: color,
            maxWidth: width,
          }}
          ref={textRef}
        >
          <span
            ref={contentRef}
          >
            {text}
          </span>
        </div>
      </Popover>
    )
  }
};

