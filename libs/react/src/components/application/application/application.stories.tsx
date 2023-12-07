import React, { createContext } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { Application } from './application';
import {
  StoryMockProvider,
  getFootprintHandler,
  getCategoriesHandler,
  auth0UserMock,
  getSignupHandlersForApplicationSignup,
  getSurveyHandler,
  getActionsMock,
  getCategoriesDataMock,
} from '@coldpbc/mocks';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { find, findKey, forEach, uniq, uniqBy } from 'lodash';

const meta: Meta<typeof Application> = {
  title: 'Application/Application',
  component: Application,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <StoryMockProvider>
        <Application />
      </StoryMockProvider>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const sidebar = await canvas.findByTestId('sidebar');
    const verifyActionsPage = async (subCategoryName: string, subCategoryTitle: string) => {
      await canvas.findByTestId(`subcategory-journey-preview-${subCategoryName}`);
      await canvas.findByTestId(`subcategory-footprint-card-${subCategoryName}`);
      await canvas.findAllByTestId(`subcategory-action-detail-card`);
      await canvas.findByTestId('subcategory-description');
      await canvas.findByText(`${subCategoryTitle} Score`);
    };
    await step('Navigate to Footprint Page', async () => {
      // find text 2022 Company Footprint
      const cardTitle = await canvas.findByText('2022 Company Footprint');
      const card = cardTitle.parentElement.parentElement;
      // find Learn More button within card
      const button = await within(card).findByText('Learn More');
      await userEvent.click(button);
      // verify that we are on the footprint page
      await canvas.findByTestId('footprint-detail-card-facilities');
      await canvas.findByTestId('footprint-detail-card-product');
      await canvas.findByTestId('footprint-detail-card-operations');
      await canvas.findByTestId('footprint-detail-card-travel');
      // navigate back to home page
      const homeSidebarItem = await within(sidebar).findByText('Home');
      await userEvent.click(homeSidebarItem);
    });
    await step('Navigate to Journey Page', async () => {
      const cardTitle = await canvas.findByText('Climate Journey');
      const card = cardTitle.parentElement.parentElement;
      // find Learn More button within card
      const button = await within(card).findByText('Learn More');
      await userEvent.click(button);
      // verify that we are on the journey page
      await canvas.findByTestId('journey-detail-view');
      await canvas.findByTestId('journey-spider-chart');
      await canvas.findByTestId('temperature-check-card');
      // navigate back to home page
      const homeSidebarItem = await within(sidebar).findByText('Home');
      await userEvent.click(homeSidebarItem);
    });
    await step('Navigate to Actions Page', async () => {
      const cardTitle = await canvas.findByText('Your Next Actions');
      const card = cardTitle.parentElement.parentElement;
      // find Learn More button within card
      const button = await within(card).findByText('Learn More');
      await userEvent.click(button);
      // verify that we are on the next actions page
      await canvas.findByTestId('temperature-check-card');
      await canvas.findByTestId('journey-overview-card');
      await canvas.findAllByTestId('subcategory-actions-overview-card');
      // navigate back to home page
      const homeSidebarItem = await within(sidebar).findByText('Home');
      await userEvent.click(homeSidebarItem);
    });
    await step('Navigate to Actions from Footprint Page', async () => {
      // click Footprint sidebar item
      const footprintSidebarItem = await within(sidebar).findByText('Footprint');
      await userEvent.click(footprintSidebarItem);
      const verifyActionsPage = async (subCategoryName: string, subCategoryTitle: string) => {
        // click all the footprint detail cards Learn more buttons and verify that we are on the actions page
        const card = await canvas.findByTestId(`footprint-detail-card-${subCategoryName}`);
        const cardButton = await within(card.parentElement).findByRole('button', {
          name: `View ${subCategoryTitle} Actions`,
        });
        await userEvent.click(cardButton);
        // use test id subcategory-action-detail-card-' + actionPayload.id
        await canvas.findByTestId(`subcategory-journey-preview-${subCategoryName}`);
        await canvas.findByTestId(`subcategory-footprint-card-${subCategoryName}`);
        await canvas.findAllByTestId(`subcategory-action-detail-card`);
        await canvas.findByTestId('subcategory-description');
        // navigate back to home page
        const homeSidebarItem = await within(sidebar).findByText('Footprint');
        await userEvent.click(homeSidebarItem);
      };
      await verifyActionsPage('facilities', 'Facilities');
      await verifyActionsPage('travel', 'Travel');
    });
    await step('Navigate to Actions from Journey Page', async () => {
      // go to journey page
      const journeySidebarItem = await within(sidebar).findByText('Journey');
      await userEvent.click(journeySidebarItem);
      // get the all the subcategory journey preview cards. compnay_decarbonization, employee_engagement, climate_leadership
      const companyDecarbonizationCard = await canvas.findByTestId('journey-detail-view-company-decarbonization');
      const employeeEngagementCard = await canvas.findByTestId('journey-detail-view-employee-engagement');
      const climateLeadershipCard = await canvas.findByTestId('journey-detail-view-climate-leadership');
      const travelPage = await within(companyDecarbonizationCard).findByText('Travel');
      const travelPageLink = travelPage.parentElement.querySelector('a');
      await userEvent.click(travelPageLink);
      await verifyActionsPage('travel', 'Travel');
      const journeySidebarItem2 = await within(sidebar).findByText('Journey');
      await userEvent.click(journeySidebarItem2);
    });
    await step('Navigate to Actions from Sidebar', async () => {
      // click Actions sidebar item
      const actionsSidebarItem = await within(sidebar).findByRole('button', {
        name: 'Actions',
      });
      // get parent element of sidebar item, then get the unordered list of action pages
      const actionsSidebarItemParent = actionsSidebarItem.parentElement;
      const actionsSidebarItemPages = actionsSidebarItemParent.querySelector('ul');
      // click overview page
      const overviewPage = await within(actionsSidebarItemPages).findByText('Overview');
      await userEvent.click(overviewPage);
      // verify we are on the overview page
      await canvas.findByTestId('temperature-check-card');
      await canvas.findByTestId('journey-overview-card');
      await canvas.findAllByTestId('subcategory-actions-overview-card');

      const categoryData = getCategoriesDataMock().definition.categories;
      const actionsData = getActionsMock();
      // get list of unique subcategory_name subcategories from actionsData and use that to get the subcategory_name from categoryData
      const subCategoryNames = actionsData.map(action => {
        let subcategoryName = {
          title: '',
          name: '',
        };
        forEach(Object.keys(categoryData), category => {
          forEach(Object.keys(categoryData[category].subcategories), subcategory => {
            if (subcategory === action.action.subcategory) {
              subcategoryName = {
                title: categoryData[category].subcategories[subcategory].subcategory_name,
                name: subcategory,
              };
            }
          });
        });
        return subcategoryName;
      });
      const uniqueSubCategoryNames = uniq(subCategoryNames);

      forEach(uniqueSubCategoryNames, async (subcategory, index) => {
        await waitFor(async () => {
          if (index === 0 || index > 1) return;
          const page = await within(await canvas.findByTestId('sidebar')).findByText(subcategory.title);
          await userEvent.click(page);
          const subCategoryName = subcategory.name;
          const subCategoryTitle = subcategory.title;
          await verifyActionsPage(subCategoryName, subCategoryTitle);
        });
      });
    });
  },
};

export const Loading: Story = {
  render: () => {
    return (
      <StoryMockProvider>
        <Application />
      </StoryMockProvider>
    );
  },
  parameters: {
    auth0AddOn: null,
  },
};

export const EmptyFootprintData: Story = {
  render: () => {
    return (
      <StoryMockProvider handlers={[getFootprintHandler.empty, getCategoriesHandler.empty]}>
        <Application />
      </StoryMockProvider>
    );
  },
};

export const NeedsSignup: Story = {
  render: () => {
    return (
      <StoryMockProvider handlers={getSignupHandlersForApplicationSignup.DEFAULT}>
        <Application />
      </StoryMockProvider>
    );
  },
  parameters: {
    auth0AddOn: {
      user: {
        ...auth0UserMock,
        coldclimate_claims: '',
        family_name: null,
        given_name: null,
      },
    },
  },
};

export const Handle404 = () => {
  return (
    <StoryMockProvider handlers={[getFootprintHandler.handle404, getCategoriesHandler.handle404]}>
      <Application />
    </StoryMockProvider>
  );
};

export const NeedsToCompleteInitialSurvey: Story = {
  render: () => {
    return (
      <StoryMockProvider handlers={getSurveyHandler.initialIncomplete}>
        <Application />
      </StoryMockProvider>
    );
  },
  parameters: {},
};

export const ColdAdmin: Story = {
  render: () => {
    return (
      <StoryMockProvider>
        <Application />
      </StoryMockProvider>
    );
  },
  parameters: {
    auth0AddOn: {
      user: {
        coldclimate_claims: {
          roles: ['cold:admin'],
        },
      },
    },
  },
};
