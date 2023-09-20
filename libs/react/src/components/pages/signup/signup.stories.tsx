import {
  auth0UserMock,
  getSignUpHandler,
  StoryMockProvider,
} from '@coldpbc/mocks';
import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { SignupPage } from '@coldpbc/components';

const meta: Meta<typeof SignupPage> = {
  title: 'Pages/SignupPage',
  component: SignupPage,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryMockProvider handlers={getSignUpHandler.DEFAULT}>
      <SignupPage />
    </StoryMockProvider>
  ),
  parameters: {
    auth0AddOn: {
      user: {
        ...auth0UserMock,
        given_name: null,
        family_name: null,
      },
    },
  },
};

// export const EmptyData: Story = {
//   render: (args) => (
//     <StoryMockProvider {...args} handlers={[getFootprintHandler.empty]}>
//       <Footprint />
//     </StoryMockProvider>
//   ),
// };
//
// export const ThreeFootprintSubcats: Story = {
//   render: () => {
//     return (
//       <StoryMockProvider handlers={[getFootprintHandler.threeSubCats]}>
//         <Footprint />
//       </StoryMockProvider>
//     );
//   },
// };
//
// export const TwoFootprintSubcats: Story = {
//   render: () => {
//     return (
//       <StoryMockProvider handlers={[getFootprintHandler.twoSubCats]}>
//         <Footprint />
//       </StoryMockProvider>
//     );
//   },
// };
