import React from 'react';

interface EmptyStateProps {
  header: string | React.ReactNode;
  body?: string | React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ header, body }) => {
  return (
    <div className="text-center px-20 py-20 max-w-full">
      <div className="text-xl font-bold mb-4 text-cold-gray-130">{header}</div>
      {body && <p className="text-base text-cold-gray-120">{body}</p>}
    </div>
  );
};
