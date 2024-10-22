import React from "react";
import {twMerge} from "tailwind-merge";

export const Tabs = (props: {
  tabs: {
    label: string;
    content: React.ReactNode;
  }[];
  ['data-testid']?: string;
  className?: string;
  defaultTab?: string;
}) => {
  const {tabs, className, defaultTab} = props;
  const [activeTab, setActiveTab] = React.useState(defaultTab || props.tabs[0].label);

  const getActiveTabElement = (tab: string) => {
    return tabs.find(t => t.label === tab)?.content || null;
  }

  return (
    <div
      className={twMerge('w-full flex flex-col items-center gap-6 text-tc-primary', className)}>
    <div className={'flex flex-row w-full justify-start relative'} data-testid={props["data-testid"] || 'tabs'}>
        <div className={'absolute bottom-0 left-0 h-[2px] bg-gray-90 w-full'}></div>
        {tabs.map(tab => (
          <div
            className={`px-[16px] py-[8px] text-h5 cursor-pointer relative ` + (activeTab === tab.label ? 'text-tc-primary' : 'text-tc-disabled')}
            onClick={() => setActiveTab(tab.label)}
            key={tab.label}
            data-testid={`tab-${tab}`}
          >
            {tab.label}
            {activeTab === tab.label && <div className={'absolute bottom-0 left-0 w-full h-[4px] bg-primary-300'}></div>}
          </div>
        ))}
      </div>
      <div className={'flex flex-row justify-center w-full'}>{getActiveTabElement(activeTab)}</div>
    </div>
  )
}
