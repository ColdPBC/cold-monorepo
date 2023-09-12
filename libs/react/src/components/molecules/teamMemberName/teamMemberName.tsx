import React from 'react';

export interface TeamMemberNameProps {
  user: any;
}

// TODO: Create a story for this component

export const TeamMemberName = (props: TeamMemberNameProps) => {
  const { user } = props;
  const { name, email } = user;
  return (
    <div className="flex flex-col text-cold-tableCell">
      <span className="text-sm font-bold">{name}</span>
      <span className="text-xs font-light">{email}</span>
    </div>
  );
};
