import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { Application } from './application';
import {
  auth0UserMock,
  getActionsMock,
  getCategoriesDataMock,
  getCategoriesHandler,
  getComplianceMock,
  getFootprintHandler,
  getOrganizationComplianceMock,
  getSignupHandlersForApplicationSignup,
  StoryMockProvider,
} from '@coldpbc/mocks';
import { userEvent, within } from '@storybook/testing-library';
import { find, forEach, random, uniq } from 'lodash';
import { verifyActionDetailPage, verifyActionsPage, verifyCompliancePage } from '@coldpbc/lib';

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
    await step('Navigate to Actions Page', async () => {
      const card = await canvas.findByTestId('next-actions-card');
      // find Learn More button within card
      const button = await within(card).findByText('Learn More');
      await userEvent.click(button);
      // verify that we are on the next actions page
      await canvas.findByTestId('temperature-check-card');
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
    await step('Verify Compliance Page', async () => {
      const complianceSidebarItem = await within(sidebar).findByText('Compliance');
      await userEvent.click(complianceSidebarItem);
      const complianceSets = getComplianceMock();
      const orgComplianceSets = getOrganizationComplianceMock();
      await verifyCompliancePage(complianceSets, orgComplianceSets, canvasElement);
      const complianceSet = complianceSets[0];
      const complianceCard = await canvas.findByTestId(`compliance-${complianceSet.id}`);
      let button: HTMLElement;
      const orgComplianceSet = find(orgComplianceSets, { compliance_id: complianceSet.id });
      if (orgComplianceSet) {
        button = await within(complianceCard).findByRole('button', {
          name: 'See Details',
        });
        // await userEvent.click(button);
        // // await verifyComplianceDetailPage(orgComplianceSet, canvasElement);
        // await canvas.findByText(`${orgComplianceSet.compliance_definition.title} Compliance`);
        // // get Sections text
        // await canvas.findByText('Sections');
        // // find all compliance-section-overview-card
        // const complianceSectionOverviewCards = await canvas.findAllByTestId('compliance-section-overview-card');
        // // verify the number of compliance-section-overview-card with the number of compliance surveys
        // await expect(complianceSectionOverviewCards.length).toEqual(orgComplianceSet.compliance_definition.surveys.length);
        // const sidebarItem = await within(sidebar).findByText('Compliance');
        // await userEvent.click(sidebarItem);
      } else {
        button = await within(complianceCard).findByRole('button', {
          name: 'Activate',
        });
      }
      await verifyCompliancePage(complianceSets, orgComplianceSets, canvasElement);

      const homeSidebarItem = await within(sidebar).findByText('Home');
      await userEvent.click(homeSidebarItem);
    });
    await userEvent.click(sidebar);
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

export const REIComplianceMVP: Story = {
  render: () => {
    return (
      <StoryMockProvider>
        <Application />
      </StoryMockProvider>
    );
  },
  parameters: {
    launchdarkly: {
      flags: {
        showReiComplianceMvpSidebarCold506: true,
        showNewHomePageComplianceReiMvp: true,
      },
    },
  },
};
