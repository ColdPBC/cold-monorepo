import React from "react";
import {useNavigate} from "react-router-dom";
import opacity from "hex-color-opacity";
import {HexColors} from "@coldpbc/themes";

export const Breadcrumbs = (props: {
  items: {
    label: string;
    href?: string;
  }[];
}) => {
  const navigate = useNavigate();
  const { items } = props;
  const breadcrumbs =
    items.map(
      (item, index) => {
        let classname = '';
        if (item.href) {
          classname = 'cursor-pointer hover:underline';
        }
        return (
          <div key={`breadcrumb_${index}`} className={classname} onClick={() => {
            if(item.href){
              navigate(item.href);
            }
          }
          }>
            {item.label}
          </div>
        )
      })
  // interleave the breadcrumbs with '>' characters
  const interleavedBreadcrumbs: JSX.Element[] = [];
  breadcrumbs.forEach((breadcrumb, index) => {
    interleavedBreadcrumbs.push(breadcrumb);
    if (index < breadcrumbs.length - 1) {
      interleavedBreadcrumbs.push(
        <span key={`interleaved_${index}`} className={'w-[24px] h-[24px] flex items-center justify-center'}>{'>'}</span>
      );
    }
  });

  return (
    <div
      className={'w-full px-[16px] flex flex-row py-[8px] gap-[6px] text-tc-primary'}
      style={{
        backgroundColor: opacity(HexColors.gray['30'], 0.5),
      }}>
      {
        interleavedBreadcrumbs
      }
    </div>
  );
}
