import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { BaseButton } from '@coldpbc/components';
import { ButtonTypes, GlobalSizes } from '@coldpbc/enums';
import { Modal } from '../modal/modal';
import { Takeover } from './takeover';

const meta: Meta<typeof Modal> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Atoms/TakeOver',
  component: Modal,
};
export default meta;

type Story = StoryObj<typeof Modal>;

/*
 * Example Button story with React Hooks.
 * See note below related to this example.
 */
const DefaultComponent = () => {
  const [isShow, setIsShow] = useState(false);
  const content = () => {
    return <div>Hello</div>;
  };

  return (
    <div>
      <BaseButton
        size={GlobalSizes.medium}
        onClick={() => {
          setIsShow(true);
        }}
        label="Open Take Over"
        rounded={true}
        variant={ButtonTypes.primary}
      />
      {isShow && (
        <Takeover
          show={isShow}
          setShow={setIsShow}
          dismiss={{
            label: 'close',
            dismissible: true,
          }}
          title={'Takeover Title'}
          logo_shown={true}
        >
          {content()}
        </Takeover>
      )}
    </div>
  );
};

export const Default: Story = {
  render: () => <DefaultComponent />,
};
