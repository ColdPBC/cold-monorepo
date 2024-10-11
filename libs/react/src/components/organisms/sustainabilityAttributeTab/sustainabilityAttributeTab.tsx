import React from 'react';
import { EmptyState, SustainabilityAttributeCard } from '@coldpbc/components';
import type { SustainabilityAttribute } from '@coldpbc/interfaces';

interface SustainabilityAttributeTabProps {
  tab: 'My Attributes' | 'Other Attributes';
  sustainabilityAttributes: SustainabilityAttribute[];
}

const ASK_FOR_NEW_ATTRIBUTE = (
  <p>
    Not seeing the certification you’re looking for?{' '}
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
  header: "Wow! You’re already tracking all of Cold’s current sustainability attributes.",
  body: ASK_FOR_NEW_ATTRIBUTE
};

export const SustainabilityAttributeTab: React.FC<SustainabilityAttributeTabProps> = ({ tab, sustainabilityAttributes }) => {
  if (sustainabilityAttributes.length === 0) {
    return (
      <EmptyState {...tab === 'My Attributes' ? MY_ATTRIBUTES_EMPTY_STATE_PROPS : OTHER_ATTRIBUTES_EMPTY_STATE_PROPS } />
    );
  } else {
    return (
      <div className={'justify-items-stretch'}>
        <div className='py-6 grid single:grid-cols-1 double:grid-cols-2 triple:grid-cols-3 gap-4'>
          {
            sustainabilityAttributes.map(sustainabilityAttribute => (
              <div key={sustainabilityAttribute.id} className='w-full w-min-[475px]'>
                <SustainabilityAttributeCard sustainabilityAttribute={sustainabilityAttribute} />
              </div>
            ))
          }
        </div>
        { tab === 'Other Attributes' && (
          <div className={'mt-3 w-full'}>
            {ASK_FOR_NEW_ATTRIBUTE}
          </div>
        )}
      </div>
    );
  }
};
