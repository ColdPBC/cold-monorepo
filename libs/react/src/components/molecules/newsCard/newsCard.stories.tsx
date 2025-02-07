import { withKnobs } from "@storybook/addon-knobs";
import { Meta, StoryObj } from "@storybook/react";
import {NewsCard} from './newsCard';
import { CenterColumnContent } from '@coldpbc/components';
import {getNewsHandler, StoryMockProvider} from "@coldpbc/mocks";

const meta: Meta<typeof NewsCard> = {
    title: "Molecules/NewsCard",
    component: NewsCard,
    tags: ["autodocs"],
    decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => {
        return (
            <StoryMockProvider handlers={[getNewsHandler.default]}>
                <CenterColumnContent>
                    <NewsCard />
                </CenterColumnContent>
            </StoryMockProvider>
        );
    },
};

export const EmptyData: Story = {
    render: () => {
        return (
            <StoryMockProvider handlers={[getNewsHandler.empty]}>
                <CenterColumnContent>
                    <NewsCard />
                </CenterColumnContent>
            </StoryMockProvider>
        );
    },
};

export const AllItemsMissingRequiredProps: Story = {
    render: () => {
        return (
            <StoryMockProvider handlers={[getNewsHandler.allMissingProperties]}>
                <CenterColumnContent>
                    <NewsCard />
                </CenterColumnContent>
            </StoryMockProvider>
        );
    },
};

export const SomeItemsMissingRequiredProps: Story = {
    render: () => {
        return (
            <StoryMockProvider handlers={[getNewsHandler.someMissingProperties]}>
                <CenterColumnContent>
                    <NewsCard />
                </CenterColumnContent>
            </StoryMockProvider>
        );
    },
};

export const FourNewsItemsReturned: Story = {
    render: () => {
        return (
            <StoryMockProvider handlers={[getNewsHandler.fourNewsItems]}>
                <CenterColumnContent>
                    <NewsCard />
                </CenterColumnContent>
            </StoryMockProvider>
        );
    },
};
