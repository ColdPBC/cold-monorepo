import React from 'react';
import MarkdownToJSX from 'markdown-to-jsx';
import { twMerge } from 'tailwind-merge';

export interface MarkdownProps {
  className?: string;
  markdown: string;
}

export const Markdown = ({ markdown, className }: MarkdownProps) => {
  return (
    <div className={twMerge('prose', className)}>
      <MarkdownToJSX>{markdown}</MarkdownToJSX>
    </div>
  );
};
