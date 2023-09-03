import React, { useRef, useState, ReactElement } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { BaseButton } from '../../atoms/button/button';
import { ColorNames } from '../../../enums/colors';
import { GlobalSizes } from '../../../enums/sizes';
import { Modal } from '../modal/modal';
import { Takeover } from './takeover';

const meta: Meta<typeof Modal> = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: "Atoms/TakeOver",
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
        return (
            <div>
                Hello
            </div>
        )
    }

    return (
        <div>
            <BaseButton
                size={GlobalSizes.medium}
                onClick={() => {
                    setIsShow(true);
                }}
                label="Open Take Over"
                color={ColorNames.primary}
                rounded={true}
            />
            {
                isShow &&
                <Takeover show={isShow} setShow={setIsShow}>
                    {
                        content()
                    }
                </Takeover>
            }
        </div>
    );
};

export const Default: Story = {
    render: () => <DefaultComponent />,
};
