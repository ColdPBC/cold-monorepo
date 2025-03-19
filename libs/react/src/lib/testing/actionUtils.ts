import { userEvent, within, expect } from '@storybook/test';
import { Action, ActionPayload } from '@coldpbc/interfaces';
export const verifyActionsPage = async (subCategoryName: string, subCategoryTitle: string, canvasElement: HTMLElement) => {
  // click all the footprint detail cards Learn more buttons and verify that we are on the actions page
  const canvas = await within(canvasElement);
  // use test id subcategory-action-detail-card-' + actionPayload.id
  const footprint = await canvas.queryByTestId(`subcategory-footprint-card-${subCategoryName}`);
  if (!footprint) {
    console.log('footprint not found for sub category: ' + subCategoryName);
  }
  await canvas.findAllByTestId(`subcategory-action-detail-card`);
  await canvas.findByTestId('subcategory-description');
};

export const verifyActionDetailPage = async (actionPayload: ActionPayload, canvasElement: HTMLElement) => {
  const canvas = await within(canvasElement);
  const action = actionPayload.action;
  await canvas.findByTestId('action-detail');
  await canvas.findByTestId('action-detail-overview-card');
  await canvas.findByTestId('action-detail-progress-card');
  await canvas.findByTestId('action-detail-assignee-card');
  if (action.resources && action.resources.length > 0) {
    await canvas.findByTestId('action-detail-resources-card');
  }
  const complete = action.steps.every(step => step.complete) && action.ready_to_execute;
  if (complete) {
    await canvas.findByTestId('action-completed-banner');
  }
  await userEvent.click(await canvas.findByRole('button', { name: 'Close Action' }));
  // verify the action detail page is closed
  const actionDetailPage = await canvas.queryByTestId('action-detail');
  await expect(actionDetailPage).toBe(null);
};
