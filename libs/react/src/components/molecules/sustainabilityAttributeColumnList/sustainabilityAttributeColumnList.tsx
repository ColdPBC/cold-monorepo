import React, { useRef, useEffect, useMemo, useState } from 'react';
import { SustainabilityAttributeLogoWithStatus, SustainabilityAttributeLogoOverflow, ErrorFallback } from '@coldpbc/components';
import { withErrorBoundary } from 'react-error-boundary';
import { SustainabilityAttribute, SustainabilityAttributeWithStatus } from '@coldpbc/interfaces';
import { getAggregateStatusFromAttributeAssurances, sustainabilityAttributeSortFn } from '@coldpbc/lib';

interface SustainabilityAttributeColumnListProps {
  sustainabilityAttributes: SustainabilityAttribute[];
}

const CARD_WIDTH = 40; // Width of the image
const CARD_GAP = 10; // Gap between cards
const TOTAL_CARD_WIDTH = CARD_WIDTH + CARD_GAP; // Total width including gap
const MIN_VISIBLE_CARDS = 2;
const CONTAINER_PADDING_X = 32; // px-4

const _SustainabilityAttributeColumnList: React.FC<SustainabilityAttributeColumnListProps> = ({ sustainabilityAttributes }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [availableContainerWidth, setAvailableContainerWidth] = useState(0);

  const sortedSustainabilityAttributesWithStatus: SustainabilityAttributeWithStatus[] = sustainabilityAttributes.map(sustainabilityAttribute => {
    const { assuranceStatus, assuranceExpiration } = getAggregateStatusFromAttributeAssurances(sustainabilityAttribute.attributeAssurances);

    return {
      id: sustainabilityAttribute.id,
      name: sustainabilityAttribute.name,
      logoUrl: sustainabilityAttribute.logoUrl,
      level: sustainabilityAttribute.level,
      assuranceStatus: assuranceStatus,
      expirationDate: assuranceExpiration,
    };
  }).sort(sustainabilityAttributeSortFn);

	useEffect(() => {
    let observer: ResizeObserver | null = null;
    observer = new ResizeObserver(() => {
			if (containerRef.current) {
        const newContainerWidth = containerRef.current.offsetWidth;
        const availableWidth = newContainerWidth - CONTAINER_PADDING_X;
        setAvailableContainerWidth(availableWidth);
			}
		});

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer?.disconnect();
    };
	}, []);

  const { visibleAttributes, overflowItemCount } = useMemo(() => {
    const totalItems = sortedSustainabilityAttributesWithStatus.length;

    const itemsThatFit = Math.floor((availableContainerWidth - CARD_WIDTH) / TOTAL_CARD_WIDTH) + 1; // last item doesn't have gap

    const shownItemCount = totalItems > itemsThatFit ? (itemsThatFit - 1) : totalItems;
    const overflow = Math.max(totalItems - shownItemCount, 0);

    return {
      visibleAttributes: sortedSustainabilityAttributesWithStatus.slice(0, shownItemCount),
      overflowItemCount: overflow
    };
  }, [sortedSustainabilityAttributesWithStatus, availableContainerWidth]);

	return (
		<div ref={containerRef} className="px-4 py-4 flex items-start w-full" style={{ gap: `${CARD_GAP}px`, minWidth: `${(MIN_VISIBLE_CARDS * TOTAL_CARD_WIDTH) - CARD_GAP + CONTAINER_PADDING_X}px` }}>
			{visibleAttributes.map(sustainabilityAttribute => (
				<SustainabilityAttributeLogoWithStatus
          sustainabilityAttribute={sustainabilityAttribute}
          key={sustainabilityAttribute.id}
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
