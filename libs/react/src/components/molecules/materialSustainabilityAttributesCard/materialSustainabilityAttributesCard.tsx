import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';
import { MaterialGraphQL } from '@coldpbc/interfaces';
import { Card, SustainabilityAttributeCard, SustainabilityAttributeCardStyle } from '@coldpbc/components';
import { filterAttributes, processEntityLevelAssurances } from '@coldpbc/lib';
import { ButtonTypes, EntityLevel } from '@coldpbc/enums';

interface MaterialSustainabilityAttributesCardProps {
  material: MaterialGraphQL;
  setShowUpdateAttributesModal: (show: boolean) => void;
}

const _MaterialSustainabilityAttributesCard: React.FC<MaterialSustainabilityAttributesCardProps> = ({ material, setShowUpdateAttributesModal }) => {
  // This filter reflects the current state of our data, but be unnecessary if we had better data validations
  const materialSustainabilityAttributes = filterAttributes(
    processEntityLevelAssurances([material]),
    EntityLevel.MATERIAL
  );

  const ctas = [
    {
      text: 'Edit Attributes',
      action: () => setShowUpdateAttributesModal(true),
      variant: ButtonTypes.secondary,
    },
  ]

  return (
    <Card title={'Sustainability Attributes'} ctas={ctas} className={'w-full h-fit'} data-testid={'material-sustainability-attributes-card'}>
      {materialSustainabilityAttributes.length === 0 ? (
        <span className="text-body text-cold-secondary">Add a new attribute manually or upload documents to track sustainability attributes on this material.</span>
      ) : (
        <div className="w-full h-fit flex flex-col gap-2 justify-start items-start">
          {materialSustainabilityAttributes.map(sustainabilityAttribute => (
            <div className="w-full" key={sustainabilityAttribute.id}>
              <SustainabilityAttributeCard
                sustainabilityAttribute={sustainabilityAttribute}
                cardStyle={SustainabilityAttributeCardStyle.SINGLE_STATUS}
              />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export const MaterialSustainabilityAttributesCard = withErrorBoundary(_MaterialSustainabilityAttributesCard, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in MaterialSustainabilityAttributesCard: ', error);
  },
});
