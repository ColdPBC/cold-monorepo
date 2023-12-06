import { StoryMockProvider, getFootprintHandler, getFootprintDataMock } from '@coldpbc/mocks';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { Footprint } from './footprint';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Footprint> = {
  title: 'Pages/Footprint',
  component: Footprint,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => (
    <StoryMockProvider {...args} handlers={[getFootprintHandler.default]}>
      <Footprint />
    </StoryMockProvider>
  ),
  play: async ({ canvasElement, step }) => {
    // find the div by test id footprint-detail-card-facilities
    const canvas = within(canvasElement);

    await step('Find All Footprint Cards', async () => {
      // within each card's parentElement find the View {subcategoryName} Actions button
      const facilitiesCard = await canvas.findByTestId('footprint-detail-card-facilities');
      const facilitiesCardButton = await within(facilitiesCard.parentElement).findByRole('button', {
        name: 'View Facilities Actions',
      });
      const productCard = await canvas.findByTestId('footprint-detail-card-product');
      const productCardButton = await within(productCard.parentElement).findByRole('button', {
        name: 'View Product Actions',
      });
      const operationsCard = await canvas.findByTestId('footprint-detail-card-operations');
      const operationsCardButton = await within(operationsCard.parentElement).findByRole('button', {
        name: 'View Operations Actions',
      });
      const travelCard = await canvas.findByTestId('footprint-detail-card-travel');
      const travelCardButton = await within(travelCard.parentElement).findByRole('button', {
        name: 'View Travel Actions',
      });
      // check tables for each card
      const footprintData = getFootprintDataMock();

      const verifyTable = async (card: HTMLElement, subCategory: string) => {
        const table = card.parentElement.querySelector('table');
        const tableBody = table.querySelector('tbody');
        const tableRows = await within(tableBody).findAllByTestId('table-row-element');
        const newData = [];
        let newTotalFootprint = 0;
        const newLegendRows = [];
        // Transform chart data
        Object.keys(footprintData?.subcategories[subCategory].activities ?? {}).forEach((activityKey: any) => {
          const activity = footprintData?.subcategories[subCategory].activities[activityKey];
          const activityFootprint = activity.footprint?.[2022]?.value ?? 0;

          if (activityFootprint > 0) {
            newData.push({
              name: activity.activity_name,
              footprint: activityFootprint,
            });
            newTotalFootprint += activityFootprint;
          }
        });
        // sort the data
        newData
          .sort((a, b) => b.footprint - a.footprint)
          .forEach((nD, i) => {
            newLegendRows.push({
              value: nD.footprint,
              name: nD.name,
              percent: Math.round((nD.footprint / newTotalFootprint) * 100),
            });
          });
        // verify the table has the correct number of rows
        expect(tableRows.length).toEqual(newLegendRows.length);
        // verify the table has the correct data
        // loop through the rows
        tableRows.forEach((row, index) => {
          // get the row cells
          const cells = row.querySelectorAll('td');
          expect(cells[0].textContent).toEqual(newLegendRows[index].name);
          expect(cells[1].textContent).toEqual(`${newLegendRows[index].percent}%`);
          expect(cells[2].textContent).toEqual(newLegendRows[index].value.toString());
        });
      };
      await verifyTable(facilitiesCard, 'facilities');
      await verifyTable(productCard, 'product');
      await verifyTable(operationsCard, 'operations');
      await verifyTable(travelCard, 'travel');
    });
    await step('Verify Footprint Overview Card', async () => {
      // find the footprint overview card with title 2022 Company Footprint
      const footprintOverviewCard = await canvas.findByText('2022 Company Footprint');
      await within(footprintOverviewCard.parentElement.parentElement).findAllByText('Travel');
      await within(footprintOverviewCard.parentElement.parentElement).findAllByText('Operations');
      await within(footprintOverviewCard.parentElement.parentElement).findAllByText('Product');
      await within(footprintOverviewCard.parentElement.parentElement).findAllByText('Facilities');
    });
  },
};

export const EmptyData: Story = {
  render: args => (
    <StoryMockProvider {...args} handlers={[getFootprintHandler.empty]}>
      <Footprint />
    </StoryMockProvider>
  ),
  play: async ({ canvasElement, step }) => {
    await step('Verify Screen', async () => {
      const canvas = within(canvasElement);
      await within(canvasElement).findByText("We'll be in touch as soon as your initial footprint results are available.");
      await within(canvasElement).findByText('We are reviewing your data');
      await within(canvasElement).findByText('Footprint Breakdown');
    });
  },
};

export const ThreeFootprintSubcats: Story = {
  render: () => {
    return (
      <StoryMockProvider handlers={[getFootprintHandler.threeSubCats]}>
        <Footprint />
      </StoryMockProvider>
    );
  },
};

export const TwoFootprintSubcats: Story = {
  render: () => {
    return (
      <StoryMockProvider handlers={[getFootprintHandler.twoSubCats]}>
        <Footprint />
      </StoryMockProvider>
    );
  },
};

export const AllNullFootprintValues: Story = {
  render: () => {
    return (
      <StoryMockProvider handlers={[getFootprintHandler.allNullFootprintValues]}>
        <Footprint />
      </StoryMockProvider>
    );
  },
};
