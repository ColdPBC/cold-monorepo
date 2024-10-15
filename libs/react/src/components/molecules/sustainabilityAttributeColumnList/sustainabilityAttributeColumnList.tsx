import React, { useRef, useEffect, useMemo, useState } from 'react';
import { SustainabilityAttributeLogoWithStatus, SustainabilityAttributeLogoOverflow, ErrorFallback } from '@coldpbc/components';
import { withErrorBoundary } from 'react-error-boundary';
import { SustainabilityAttribute } from '@coldpbc/interfaces';
import { getAggregateStatusFromAttributeAssurances } from '@coldpbc/lib';

interface SustainabilityAttributeColumnListProps {
  sustainabilityAttributes: SustainabilityAttribute[];
}

const CARD_WIDTH = 82; // Width of the image
const CARD_GAP = 10; // Gap between cards
const TOTAL_CARD_WIDTH = CARD_WIDTH + CARD_GAP; // Total width including gap
const MIN_VISIBLE_CARDS = 2;
const CONTAINER_PADDING_X = 32; // px-4

const _SustainabilityAttributeColumnList: React.FC<SustainabilityAttributeColumnListProps> = ({ sustainabilityAttributes }) => {
	const containerRef = useRef<HTMLDivElement>(null);
  const [availableContainerWidth, setAvailableContainerWidth] = useState(0);

	useEffect(() => {
		const updateContainerWidth = () => {
			if (containerRef.current) {
        const newContainerWidth = containerRef.current.offsetWidth;
        const availableWidth = newContainerWidth - CONTAINER_PADDING_X;
        setAvailableContainerWidth(availableWidth);
			}
		};

    updateContainerWidth();
		window.addEventListener('resize', updateContainerWidth);

		return () => window.removeEventListener('resize', updateContainerWidth);
	}, []);

  const { visibleAttributes, overflowItemCount } = useMemo(() => {
    const totalItems = sustainabilityAttributes.length;

    const itemsThatFit = Math.floor((availableContainerWidth - CARD_WIDTH) / TOTAL_CARD_WIDTH) + 1; // last item doesn't have gap

    const shownItemCount = totalItems > itemsThatFit ? (itemsThatFit - 1) : totalItems;
    const overflow = Math.max(totalItems - shownItemCount, 0);

    return {
      visibleAttributes: sustainabilityAttributes.slice(0, shownItemCount),
      overflowItemCount: overflow
    };
  }, [sustainabilityAttributes, availableContainerWidth]);

	return (
		<div ref={containerRef} className="px-4 py-4 flex items-start" style={{ gap: `${CARD_GAP}px`, minWidth: `${(MIN_VISIBLE_CARDS * TOTAL_CARD_WIDTH) - CARD_GAP + CONTAINER_PADDING_X}px` }}>
			{visibleAttributes.map((sustainabilityAttribute, index) => (
				<SustainabilityAttributeLogoWithStatus
          key={index}
					name={sustainabilityAttribute.name}
					logoUrl={sustainabilityAttribute.logoUrl}
					{...getAggregateStatusFromAttributeAssurances(sustainabilityAttribute.attributeAssurances)}
				/>
			))}
			{overflowItemCount > 0 && <SustainabilityAttributeLogoOverflow overflowItemCount={overflowItemCount} />}
		</div>
	);
};

export const SustainabilityAttributeColumnList = withErrorBoundary(_SustainabilityAttributeColumnList, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, _info) => {
		console.error('Error occurred in SustainabilityAttributeColumnList: ', error);
	},
});
