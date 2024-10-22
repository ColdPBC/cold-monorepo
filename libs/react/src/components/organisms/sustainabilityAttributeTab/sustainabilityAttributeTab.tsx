import React, { useRef, useState, useEffect } from 'react';
import { EmptyState, SustainabilityAttributeCard } from '@coldpbc/components';
import type { SustainabilityAttribute } from '@coldpbc/interfaces';

interface SustainabilityAttributeTabProps {
  tab: 'My Attributes' | 'Other Attributes';
  sustainabilityAttributes: SustainabilityAttribute[];
}

const CARD_MIN_WIDTH = 475; // Minimum width of a single card
const GAP_WIDTH = 16; // Gap between cards

const ASK_FOR_NEW_ATTRIBUTE = (
  <p>
    Not seeing the certification you're looking for?{' '}
    If you would like to add a new Sustainability Attribute to Cold contact our{' '}
    <a href="mailto:support@coldclimate.com" className="hover:underline">
      support@coldclimate.com
    </a>{' '}
    to request.
  </p>
);

const MY_ATTRIBUTES_EMPTY_STATE_PROPS = {
  header: (
    <p>
      Welcome! To get started with sustainability attribute tracking, upload documents for any certifications,
      standards, or statements on the{' '}
      <a href={'/documents'} className="hover:underline">
        Documents Tab
      </a>
    </p>
  )
};

const OTHER_ATTRIBUTES_EMPTY_STATE_PROPS = {
  header: "Wow! You're already tracking all of Cold's current sustainability attributes.",
  body: ASK_FOR_NEW_ATTRIBUTE
};

export const SustainabilityAttributeTab: React.FC<SustainabilityAttributeTabProps> = ({ tab, sustainabilityAttributes }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columnCount, setColumnCount] = useState(1);

  useEffect(() => {
    const updateColumnCount = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const newColumnCount = Math.floor((containerWidth + GAP_WIDTH) / (CARD_MIN_WIDTH + GAP_WIDTH));

      setColumnCount(newColumnCount);
    };

    // Initial calculation
    updateColumnCount();

    // Create ResizeObserver to watch for container size changes
    const resizeObserver = new ResizeObserver(updateColumnCount);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  if (sustainabilityAttributes.length === 0) {
    return (
      <EmptyState {...tab === 'My Attributes' ? MY_ATTRIBUTES_EMPTY_STATE_PROPS : OTHER_ATTRIBUTES_EMPTY_STATE_PROPS } />
    );
  }

  return (
    <div ref={containerRef} className="w-full">
      <div className={`py-6 grid grid-cols-${columnCount} gap-[${GAP_WIDTH}px]`}>
        {sustainabilityAttributes.map(sustainabilityAttribute => (
          <div key={sustainabilityAttribute.id} className="w-full">
            <SustainabilityAttributeCard sustainabilityAttribute={sustainabilityAttribute} />
          </div>
        ))}
      </div>
      {tab === 'Other Attributes' && (
        <div className="mt-3 w-full">
          {ASK_FOR_NEW_ATTRIBUTE}
        </div>
      )}
    </div>
  );
};
