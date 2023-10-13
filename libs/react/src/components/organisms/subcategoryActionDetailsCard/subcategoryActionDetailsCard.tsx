import React, { useEffect } from 'react';
import { Action, ActionPayload, Assignee, Step } from '@coldpbc/interfaces';
import {
  ActionItem,
  BaseButton,
  Card,
  ColdIcon,
  ColdLogos,
  Spinner,
  StepDetails,
} from '@coldpbc/components';
import { useNavigate } from 'react-router-dom';
import {
  ActionItemVariants,
  ButtonTypes,
  ColdLogoNames,
  IconNames,
  StepDetailsVariants,
} from '@coldpbc/enums';
import { Disclosure } from '@headlessui/react';
import { useAuth0 } from '@auth0/auth0-react';
import useSWR from 'swr';
import { axiosFetcher } from '@coldpbc/fetchers';
import { HexColors } from '@coldpbc/themes';

export type SubcategoryActionDetailsCardProps = {
  assignees: Assignee[];
  actionId: string;
};
export const SubcategoryActionDetailsCard = ({
  actionId,
  assignees,
}: SubcategoryActionDetailsCardProps) => {
  const [actionData, setActionData] = React.useState<ActionPayload>();

  const areSurveysComplete = (action: Action) => {
    return action.dependent_surveys.every((survey) => survey.submitted);
  };

  const navigate = useNavigate();

  const { user } = useAuth0();

  const { data, error, isLoading } = useSWR<ActionPayload, any, any>(
    user && user.coldclimate_claims.org_id
      ? [`/organizations/${user.coldclimate_claims.org_id}/actions/${actionId}`]
      : null,
    axiosFetcher,
  );

  const getContent = (actionData: ActionPayload) => {
    const { action } = actionData;

    if (!areSurveysComplete(action)) {
      return (
        <Disclosure
          as="div"
          className={
            'w-full p-[16px] space-y-[16px] border-[1px] border-bgc-accent rounded-lg bg-bgc-elevated text-tc-primary'
          }
        >
          {({ open }) => (
            <>
              <Disclosure.Button
                className={
                  'flex w-full space-x-[16px] justify-between items-center'
                }
              >
                <div className={'text-body font-bold'}>
                  Get Started with this action
                </div>
                <div className={'flex items-center justify-center h-6 w-6'}>
                  {open ? (
                    <ColdIcon
                      name={IconNames.ColdChevronUpIcon}
                      className={'h-[8px]'}
                    />
                  ) : (
                    <ColdIcon
                      name={IconNames.ColdChevronDownIcon}
                      className={'h-[8px]'}
                    />
                  )}
                </div>
              </Disclosure.Button>
              <Disclosure.Panel as="dd" className="space-y-[16px]">
                <div className={'text-caption'}>
                  Take a few moments to provide the data necessary for this
                  action. After the surveys are complete, CØLD will step away to
                  evaluate your data and build the optimal solution for your
                  company.
                </div>
                <div className={'flex justify-start space-x-[16px]'}>
                  {action.dependent_surveys.map((survey) => {
                    return (
                      <BaseButton
                        onClick={() => {
                          if (!survey.submitted) {
                            navigate(`?surveyName=${survey.name}`);
                          }
                        }}
                        disabled={survey.submitted}
                        key={'button_action_detail_progress_' + survey.name}
                      >
                        <div className={'flex space-x-2'}>
                          {survey.submitted && (
                            <ColdIcon
                              name={IconNames.ColdCheckIcon}
                              width={24}
                              height={24}
                            />
                          )}
                          <div>{survey.title}</div>
                        </div>
                      </BaseButton>
                    );
                  })}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      );
    } else {
      if (!action.ready_to_execute) {
        return (
          <Card
            glow={false}
            className={
              'p-[16px] text-tc-primary rounded-lg border-[1px] border-bgc-accent bg-bgc-elevated w-full'
            }
          >
            <div
              className={
                'absolute top-[-39px] right-[-45px] w-[198px] h-[198px]'
              }
            >
              <ColdLogos
                name={ColdLogoNames.ColdSymbol}
                color={HexColors.primary.DEFAULT}
                className={'w-[198px] h-[198px]'}
              />
            </div>
            <div className={'py-[16px] space-y-[16px] justify-start w-[451px]'}>
              <div className={'text-h4'}>
                Hold tight while we build out your plan
              </div>
              <div className={'text-body'}>
                We’re working on building the optimal solution for your company
              </div>
            </div>
          </Card>
        );
      } else {
        return (
          <div className={'space-y-[16px] w-full'}>
            <StepDetails
              steps={action.steps}
              assignees={assignees}
              handleStepsUpdate={handleStepsUpdate}
              variant={StepDetailsVariants.SubcategoryActionDetailsCard}
            />
            <div className={'flex justify-center items-center w-full'}>
              <BaseButton
                onClick={() => {
                  navigate(`?actionId=${actionData.id}`);
                }}
                label={`View all (${action.steps.length}) Steps`}
                variant={ButtonTypes.secondary}
              />
            </div>
          </div>
        );
      }
    }
  };

  const handleStepsUpdate = (steps: Step[]) => {
    if (actionData) {
      const updatedAction = {
        ...actionData,
        action: {
          ...actionData.action,
          steps: steps,
        },
      };
      setActionData(updatedAction);
    }
  };

  useEffect(() => {
    if (data) {
      setActionData(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (error) {
    console.error(error);
    return <div></div>;
  }

  if (!actionData) {
    return (
      <div>
        <Spinner />
      </div>
    );
  } else {
    return (
      <Card
        glow
        className={
          'text-tc-primary gap-[8px] p-[16px] bg-bgc-elevated w-[668px]'
        }
      >
        <ActionItem
          actionPayload={actionData}
          variant={ActionItemVariants.SubcategoryActionDetailsCard}
          showProgress={
            actionData.action.ready_to_execute &&
            areSurveysComplete(actionData.action)
          }
        />
        {getContent(actionData)}
      </Card>
    );
  }
};
