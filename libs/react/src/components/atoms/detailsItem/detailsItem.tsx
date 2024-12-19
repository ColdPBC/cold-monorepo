import React, { ReactNode } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';
import { ColdIcon } from '@coldpbc/components';
import { IconNames } from '@coldpbc/enums';

interface DetailsItemProps {
  category: string | ReactNode;
  value: string | null | undefined;
  href?: string;
  cta?: () => void;
  ctaIconName?: IconNames;
}

const _DetailsItem: React.FC<DetailsItemProps> = ({ category, value, href, cta, ctaIconName }) => {
  const labelText = value || 'None';
  const label = href ? (
    <a href={href} className="hover:underline">
      {labelText}
    </a>
  ) : (
    labelText
  );

  return (
    <div className="w-full h-fit flex flex-col gap-2 items-start">
      <div className="text-eyebrow text-tc-disabled">{category}</div>
      <div className="w-full h-fit flex items-center justify-start gap-2">
        <span className="text-body text-white text-wrap">{label}</span>
        {cta && ctaIconName && <ColdIcon name={ctaIconName} onClick={cta} />}
      </div>
    </div>
  );
};

export const DetailsItem = withErrorBoundary(_DetailsItem, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in DetailsItem: ', error);
	},
});
