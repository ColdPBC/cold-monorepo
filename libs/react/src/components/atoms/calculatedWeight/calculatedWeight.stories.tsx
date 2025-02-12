import { Meta, StoryObj } from '@storybook/react';
import { CalculatedWeight } from '@coldpbc/components';
import { withKnobs } from '@storybook/addon-knobs';
import { ProductMaterialMock } from '../../../__mocks__/productMaterialMock';
import { Length, MaterialClassificationCategory } from '@coldpbc/enums';
import { getCalculatedWeight } from '@coldpbc/lib';

const meta: Meta<typeof CalculatedWeight> = {
  title: 'Atoms/CalculatedWeight',
  component: CalculatedWeight,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <CalculatedWeight weightResult={getCalculatedWeight({...ProductMaterialMock, weight: 0.3})} />
    );
  },
};

export const MissingData: Story = {
  render: () => {
    return (
      <CalculatedWeight weightResult={getCalculatedWeight(ProductMaterialMock)} />
    );
  },
};

export const Calculated: Story = {
  render: () => {
    return (
      <CalculatedWeight
        weightResult={getCalculatedWeight({
          ...ProductMaterialMock,
          yield: 2.7,
          unitOfMeasure: Length.m,
          material: {
            ...ProductMaterialMock.material,
            width: 58,
            widthUnitOfMeasure: Length.in,
            materialClassification: {
              id: 'matclass_1',
              name: 'Nylon fabric',
              category: MaterialClassificationCategory.TEXTILES,
              weightFactor: 0.3,
            }
          }
        })}
      />
    );
  },
};

