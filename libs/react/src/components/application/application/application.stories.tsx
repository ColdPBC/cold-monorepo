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
  getSurveysMock,
  getComplianceMock,
  getOrganizationComplianceMock,
} from '@coldpbc/mocks';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { find, findKey, forEach, random, uniq, uniqBy } from 'lodash';
import { expect } from '@storybook/jest';
import { verifyActionDetailPage, verifyActionsPage } from '@coldpbc/lib';
import { verifyComplianceDetailPage } from '../../../lib/testing/complianceUtils';

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
    await step('Navigate to Footprint Page', async () => {
      // find text 2022 Company Footprint
      const card = await canvas.findByTestId('footprint-overview-card');
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
      const card = await canvas.findByTestId('journey-overview-card');
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
      const card = await canvas.findByTestId('next-actions-card');
      // find Learn More button within card
      const button = await within(card).findByText('Learn More');
      await userEvent.click(button);
      // verify that we are on the next actions page
      await canvas.findByTestId('temperature-check-card');
      await canvas.findByTestId('journey-overview-card');
      await canvas.findAllByTestId('subcategory-actions-overview-card');
      const actions = getActionsMock();
      const actionPayload = actions[0];
      const firstSubcategoryActionsItemCard = await canvas.findByTestId(`subcategory-action-item-${actionPayload.id}`);
      // click the first subcategory actions item card
      await userEvent.click(firstSubcategoryActionsItemCard);
      await verifyActionDetailPage(actionPayload, canvasElement);
      // navigate back to home page
      const homeSidebarItem = await within(sidebar).findByText('Home');
      await userEvent.click(homeSidebarItem);
    });
    await step('Navigate to Actions from Footprint Page', async () => {
      // click Footprint sidebar item
      const footprintSidebarItem = await within(sidebar).findByText('Footprint');
      await userEvent.click(footprintSidebarItem);
      const categoryData = [
        {
          name: 'facilities',
          title: 'Facilities',
        },
        {
          name: 'travel',
          title: 'Travel',
        },
      ];
      const firstCategory = await canvas.findByTestId(`footprint-detail-card-${categoryData[0].name}`);
      const firstCategoryCardButton = await within(firstCategory).findByRole('button', {
        name: `View ${categoryData[0].title} Actions`,
      });
      await userEvent.click(firstCategoryCardButton);
      await verifyActionsPage(categoryData[0].name, categoryData[0].title, canvasElement);

      await userEvent.click(await within(sidebar).findByText('Footprint'));

      // now click the second category
      const secondCategory = await canvas.findByTestId(`footprint-detail-card-${categoryData[1].name}`);
      const secondCategoryCardButton = await within(secondCategory).findByRole('button', {
        name: `View ${categoryData[1].title} Actions`,
      });
      await userEvent.click(secondCategoryCardButton);
      await verifyActionsPage(categoryData[1].name, categoryData[1].title, canvasElement);

      await userEvent.click(await within(sidebar).findByText('Home'));
    });
    await step('Navigate to Actions from Journey Page', async () => {
      // go to journey page
      const journeySidebarItem = await within(sidebar).findByText('Gaps');
      await userEvent.click(journeySidebarItem);
      // get the all the subcategory journey preview cards. compnay_decarbonization, employee_engagement, climate_leadership
      const companyDecarbonizationCard = await canvas.findByTestId('journey-detail-view-company-decarbonization');
      await canvas.findByTestId('journey-detail-view-employee-engagement');
      await canvas.findByTestId('journey-detail-view-climate-leadership');
      const travelPage = await within(companyDecarbonizationCard).findByText('Travel');
      const travelPageLink = travelPage.parentElement?.querySelector('a');
      if (!travelPageLink) {
        throw new Error('Could not find travel page link');
      }
      await userEvent.click(travelPageLink);
      await verifyActionsPage('travel', 'Travel', canvasElement);
      await userEvent.click(await within(sidebar).findByText('Home'));
    });
    await step('Navigate to Actions from Sidebar', async () => {
      // click Actions sidebar item
      const actionsSidebarItem = await within(sidebar).findByRole('button', {
        name: 'Actions',
      });
      // get parent element of sidebar item, then get the unordered list of action pages
      const actionsSidebarItemParent = actionsSidebarItem.parentElement;
      if (!actionsSidebarItemParent) {
        throw new Error('Could not find actions sidebar item parent');
      }
      const actionsSidebarItemPages = actionsSidebarItemParent.querySelector('ul');
      if (!actionsSidebarItemPages) {
        throw new Error('Could not find actions sidebar item pages');
      }
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

      forEach(uniqueSubCategoryNames, async subcategory => {});

      const randomSubCategory = uniqueSubCategoryNames[random(0, uniqueSubCategoryNames.length - 1)];
      const actionSidebarItem = await within(sidebar).findByText(randomSubCategory.title);
      await userEvent.click(actionSidebarItem);
      await verifyActionsPage(randomSubCategory.name, randomSubCategory.title, canvasElement);

      const homePage = await within(sidebar).findByText('Home');
      await userEvent.click(homePage);
    });
    await step('Verify Settings Page', async () => {
      const settingsSidebarItem = await within(sidebar).findByText('Settings');
      await userEvent.click(settingsSidebarItem);
      // verify that we are on the settings page
      await canvas.findByTestId('team-member-settings-card');
      await canvas.findByTestId('team-members-datagrid');
      await canvas.findByTestId('user-settings-card');
      // navigate back to home page
      const homeSidebarItem = await within(sidebar).findByText('Home');
      await userEvent.click(homeSidebarItem);
    });
    await step('Verify Documents Page', async () => {
      const documentsSidebarItem = await within(sidebar).findByText('Documents');
      await userEvent.click(documentsSidebarItem);
      // verify that we are on the documents page
      await canvas.findByTestId('documents-list-card');
      await canvas.findByTestId('documents-list-table');
      // navigate back to home page
      const homeSidebarItem = await within(sidebar).findByText('Home');
      await userEvent.click(homeSidebarItem);
    });
    await step('Verify Next Steps Card', async () => {
      const homeSidebarItem = await within(sidebar).findByText('Home');
      await userEvent.click(homeSidebarItem);
      // check next steps card. find all the next step cards and click the button in each of them
      const nextStepsCard = await canvas.findByTestId('next-steps-card');
      const nextStepCards = await within(nextStepsCard).findAllByTestId('next-step-card');
      const nextStepCard = nextStepCards[0];
      const button = await within(nextStepCard).findByRole('button');
      const progressBar = await within(nextStepCard).queryByTestId('next-step-card-progress');
      if (progressBar) {
        await within(nextStepCard).findByText('Continue Survey');
      } else {
        await within(nextStepCard).findByText('Start Survey');
      }
      await button.click();
      // check that we are on the survey page
      const surveyTakeover = await canvas.findByTestId('survey-takeover');
      // find close button and click it
      const closeButton = await within(surveyTakeover).findByRole('button', {
        name: 'Close',
      });
      await userEvent.click(closeButton);
      const surveyTakeoverClosed = await canvas.queryByTestId('survey-takeover');
      return await expect(surveyTakeoverClosed).toBeNull();
    });
    await step('Verify Compliance Page', async () => {
      const complianceSidebarItem = await within(sidebar).findByText('Compliance');
      await userEvent.click(complianceSidebarItem);
      const complianceSets = getComplianceMock();
      const complianceSet = complianceSets[0];
      const orgComplianceSets = getOrganizationComplianceMock();
      await waitFor(async () => {
        const complianceSidebarItem = await within(sidebar).findByText('Compliance');
        await userEvent.click(complianceSidebarItem);
        // check if compliance set is in orgComplianceSets
        const orgComplianceSet = find(orgComplianceSets, { compliance_id: complianceSet.id });
        const complianceCard = await canvas.findByTestId(`compliance-${complianceSet.id}`);
        let button: HTMLElement;
        if (orgComplianceSet) {
          button = await within(complianceCard).findByRole('button', {
            name: 'See Details',
          });
        } else {
          button = await within(complianceCard).findByRole('button', {
            name: 'Activate',
          });
        }
        await userEvent.click(button);
        // verify that we are on the compliance detail page
        if (!orgComplianceSet) {
          throw new Error('Org compliance set is undefined');
        }
        await verifyComplianceDetailPage(orgComplianceSet, canvasElement);
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
