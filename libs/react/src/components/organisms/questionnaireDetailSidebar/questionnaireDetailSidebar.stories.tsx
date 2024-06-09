import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { QuestionnaireDetailSidebar } from '@coldpbc/components';
import { StoryMockProvider } from '@coldpbc/mocks';
import { useState } from 'react';

const meta: Meta<typeof QuestionnaireDetailSidebar> = {
  title: 'Organisms/QuestionnaireDetailSidebar',
  component: QuestionnaireDetailSidebar,
  tags: ['autodocs'],
  decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: args => {
    return <SidebarStory {...args} />;
  },
  args: {
    sidebarOpen: true,
    setSidebarOpen: () => {},
  },
};

const SidebarStory = (args: any) => {
  const [open, setOpen] = useState(true);
  return (
    <StoryMockProvider
      complianceQuestionnaireContext={{
        focusQuestion: {
          key: 'key',
          aiDetails: {
            ai_response: {
              source: [],
              references: [
                {
                  file: 'Askov Demo Doc.pdf',
                  text: "does your company formally screen for regarding the social or \nenvironmental practices and performance of your suppliers?\nAskov Finlayson Answer:\nCompliance with all local laws and regulations, including those \nrelated to social and environmental performance\nGood governance, including policies related to ethics and corruption\nPositive practices beyond what is required by regulations (e.g. \nenvironmentally-friendly manufacturing process, excellent labor \npractices)\nB Corp Question 91\nCategory: Community - Supply Chain Management - Supplier Evaluation \nPractices\nQuestion:\nWhat methods does your company use to evaluate the social or \nenvironmental impact of your suppliers?\nAskov Finlayson Answer:\nWe share policies or rules with suppliers but we don't have a \n\nverification process in place\nB Corp Question 92\nCategory: Community - Supply Chain Management - Outsourced Staffing \nServices\nQuestion:\nDoes your company outsource support services (staffing) essential to \nthe delivery of your",
                  score: 0.818098307,
                },
                {
                  file: 'Askov Demo Doc.pdf',
                  text: "and treatments that pollute \nwater; our other apparel items are made from certified organic pima \ncotton, which is produced without chemical fertilizers/pesticides/\nherbicides/defoliants and is hand-picked; and with the carbon offsets \npurchased at more than we used to produce the product, many positive \nenvironmental outcomes are realized (Google global warming \nexternalities). We’ve committed to investing more money fighting \nclimate change than running our business costs the planet. We call \nthis way of doing business climate positive, and we achieve it by \nmeasuring our annual carbon footprint, converting that amount of \ncarbon into a dollar amount using the social cost of carbon, and then \nGiving 110% of that amount every year to leading-edge organizations \nworking to solve the climate crisis.  #KeepTheNorthCold\nB Corp Question 101\nCategory: Environment - Environment Impact Area Introduction - \nEnvironmental Product or Service Impact\nQuestion:\nIs the environmental impact you've",
                  score: 0.816384256,
                },
                {
                  file: 'Askov Demo Doc.pdf',
                  text: 'your product/service conserve the \nenvironment?\nPlease select ONE option per product line. You may select an \nadditional option if your product line has two separate environmental \nattributes.\nAskov Finlayson Answer:\nConserves or diverts resources (including energy, water, materials, \netc.)\nReduces or is made of less toxic/hazardous substances (e.g. brownfield \nremediation services, organic certified food, non-toxic cleaners)\nB Corp Question 103\nCategory: Environment - Environment Impact Area Introduction - \nResource Conservation Overview\nQuestion:\nTell us more about how your product or service reduces energy, GHG \nemissions, water and/or waste.\nAskov Finlayson Answer:\nOur outerwear products and hats are made with recycled materials \n(e.g., 100% recycled polyester and nylon), which reduces waste by \nrepurposing existing materials. Our other apparel items (e.g., tees \nand crews) are produced with organic cotton that is hand-picked in \norder to reduce energy consumption and emissions',
                  score: 0.813558102,
                },
              ],
              justification:
                "The provided excerpts from the 'Askov Demo Doc.pdf' do not contain any specific information regarding a formal policy or target related to the geographic origin of the leather used in the company's products. To effectively answer the question, we would need explicit information stating the company's policy on the sourcing of leather, including any specific targets or guidelines that address the geographic origin of the materials and how they relate to sustainability concerns such as deforestation.",
              answer: 'Yes',
            },
            ai_answered: true,
            ai_attempted: true,
            value: 'Yes',
            questionAnswerSaved: false,
            questionAnswerChanged: false,
          },
        },
      }}>
      <div className={'w-[407px] h-screen'}>
        <QuestionnaireDetailSidebar />
      </div>
    </StoryMockProvider>
  );
};
