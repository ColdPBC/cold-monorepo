import { BaseButton, Card, ColdIcon, ComplianceProgressStatusIcon, ErrorFallback, Input, ListItem } from '@coldpbc/components';
import { ButtonTypes, ComplianceProgressStatus, IconNames, InputTypes } from '@coldpbc/enums';
import React, { useContext, useEffect, useState } from 'react';
import { isArray, isNull, toArray } from 'lodash';
import {
  getComplianceAIResponseValue,
  getComplianceOrgResponseAdditionalContextAnswer,
  getComplianceOrgResponseAnswer,
  ifAdditionalContextConditionMet,
  isComplianceAIResponseValueValid,
} from '@coldpbc/lib';
import { HexColors } from '@coldpbc/themes';
import { QuestionnaireYesNo } from './questionnaireYesNo';
import { QuestionnaireSelect } from './questionnaireSelect';
import { NumericFormat } from 'react-number-format';
import { QuestionnaireQuestion } from '@coldpbc/interfaces';
import { ColdComplianceQuestionnaireContext } from '@coldpbc/context';
import { axiosFetcher } from '@coldpbc/fetchers';
import { useAuth0Wrapper, useColdContext } from '@coldpbc/hooks';
import { isAxiosError } from 'axios';
import { withErrorBoundary } from 'react-error-boundary';

const _QuestionnaireQuestionItem = (props: { question: QuestionnaireQuestion; number: number; sectionId: string; sectionGroupId: string; questionnaireMutate: () => void }) => {
  const { logBrowser } = useColdContext();
  const { name, focusQuestion, setFocusQuestion, scrollToQuestion, setScrollToQuestion, sectionGroups } = useContext(ColdComplianceQuestionnaireContext);
  const { orgId } = useAuth0Wrapper();
  const { question, number, sectionId, sectionGroupId, questionnaireMutate } = props;
  const { id, key, prompt, options, tooltip, component, placeholder, bookmarked, user_answered, ai_answered, additional_context, ai_attempted, compliance_responses } = question;
  const value = getComplianceOrgResponseAnswer(component, compliance_responses);
  const ai_response = compliance_responses.length === 0 ? null : compliance_responses[0]?.ai_response;
  const additionalContextValue = getComplianceOrgResponseAdditionalContextAnswer(additional_context);

  const getDisplayValue = () => {
    let displayValue = value;
    if (isNull(displayValue) && isComplianceAIResponseValueValid(question)) {
      displayValue = getComplianceAIResponseValue(question);
    }
    return displayValue;
  };

  const getQuestionStatus = () => {
    if (user_answered) {
      return ComplianceProgressStatus.user_answered;
    } else if (ai_answered) {
      return ComplianceProgressStatus.ai_answered;
    } else {
      return ComplianceProgressStatus.not_started;
    }
  };

  const [questionInput, setQuestionInput] = useState<any>(getDisplayValue());
  const [questionBookmarked, setQuestionBookmarked] = useState<boolean>(bookmarked);
  const [questionAnswerChanged, setAnswerQuestionChanged] = useState<boolean>(false);
  const [questionAnswerSaved, setQuestionAnswerSaved] = useState<boolean>(false);
  const [questionStatus, setQuestionStatus] = useState<ComplianceProgressStatus>(getQuestionStatus());
  const [additionalContextOpen, setAdditionalContextOpen] = useState<boolean>(false);
  const [additionalContextInput, setAdditionalContextInput] = useState<any | undefined>(additionalContextValue);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  useEffect(() => {
    if (scrollToQuestion) {
      setTimeout(() => {
        setScrollToQuestion(null);
      }, 2000);
    }
  }, [scrollToQuestion]);

  useEffect(() => {
    if (questionInput !== value || additionalContextInput !== additionalContextValue) {
      setAnswerQuestionChanged(true);
    }
    showAdditionalContext(questionInput);
  }, [questionInput, additionalContextInput]);

  useEffect(() => {
    if (focusQuestion === null) return;
    setFocusQuestion({
      key: id,
      aiDetails: {
        ai_response: ai_response,
        ai_answered: ai_answered,
        ai_attempted: ai_attempted,
        value: questionInput,
        questionAnswerSaved: questionAnswerSaved,
        questionAnswerChanged: questionAnswerChanged,
      },
    });
  }, [questionInput, questionAnswerSaved, questionAnswerChanged]);

  const getQuestionStatusIcon = () => {
    return (
      <div className={'w-[12px] h-[12px]'}>
        <ComplianceProgressStatusIcon type={questionStatus} inverted={true} />
      </div>
    );
  };

  const getBookMarkIcon = () => {
    return (
      <div className={'flex items-center justify-center w-[24px] h-[24px] cursor-pointer'} onClick={bookMarkQuestion}>
        <ColdIcon name={IconNames.ColdBookmarkIcon} filled={questionBookmarked} color={questionBookmarked ? HexColors.lightblue['200'] : 'white'} width={15} height={20} />
      </div>
    );
  };

  const getPrompt = () => {
    const className = 'text-left text-h3 text-tc-primary';

    const promptWithLinebreaks = prompt.split('\n');

    return (
      <div className={className}>
        {promptWithLinebreaks.map(prompt => {
          return prompt;
        })}
      </div>
    );
  };

  const inputComponent = (isAdditional?: boolean) => {
    const displayValue = isAdditional ? additionalContextInput : questionInput;
    const onFieldChange = (value: any) => {
      if (isAdditional) {
        setAdditionalContextInput(value);
      } else {
        setQuestionInput(value);
      }
    };
    const displayComponent = isAdditional ? additional_context?.component : component;
    switch (displayComponent) {
      case 'yes_no':
        return (
          <QuestionnaireYesNo
            onChange={value => {
              onFieldChange(value);
            }}
            value={displayValue}
            data-testid={key + (isAdditional ? '-additional' : '')}
          />
        );
      case 'text':
        return (
          <Input
            type={InputTypes.Text}
            input_props={{
              name: key,
              value: displayValue === null ? '' : displayValue,
              onChange: e => {
                if (e.target.value === '') {
                  onFieldChange(null);
                } else {
                  onFieldChange(e.target.value);
                }
              },
              onValueChange: value => {
                onFieldChange(value);
              },
              className:
                'text-sm not-italic text-tc-primary font-medium bg-transparent w-full rounded-lg py-6 px-4 border-[1px] border-gray-60 focus:border-[1px] focus:border-gray-60 focus:ring-0',
              placeholder: placeholder,
              title: tooltip,
              'aria-label': key + (isAdditional ? '-additional' : ''),
            }}
            container_classname={'w-full'}
          />
        );
      case 'currency':
        return (
          <div className={'flex h-[72px] w-full space-between'}>
            <div className={'h-[72px] w-[56px] py-6 px-4 align-content-center border-[1px] border-gray-60 rounded-l-lg'}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M16 9.00021C16 7 15 6 12 6M12 6C9 6 8 7 8 9C8 11 9 12 12 12C15 12 16 13 16 15C16 17 14 18 12 18M12 6V4M12 18C10 18 8 17 8 15M12 18V20"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <Input
              type={InputTypes.Number}
              input_props={{
                name: key,
                value: displayValue,
                onValueChange: value => {
                  onFieldChange(value);
                },
              }}
              numeric_input_props={{
                name: key,
                value: displayValue === null ? '' : displayValue,
                thousandSeparator: ',',
                onValueChange: values => {
                  if (values.floatValue === undefined) {
                    onFieldChange(null);
                  } else {
                    onFieldChange(values.floatValue);
                  }
                },
                placeholder: placeholder,
                title: tooltip,
                className:
                  'text-sm not-italic text-tc-primary font-medium bg-transparent w-full rounded-l-none rounded-r-lg h-full pl-0 pr-6 py-6 border-[1px] border-gray-60 focus:border-[1px] focus:border-gray-60 focus:ring-0',
                'aria-label': key + (isAdditional ? '-additional' : ''),
              }}
              container_classname={'w-full'}
            />
          </div>
        );
      case 'number':
        return (
          <Input
            type={InputTypes.Number}
            input_props={{
              name: key,
              value: displayValue,
              onValueChange: value => {
                onFieldChange(value);
              },
            }}
            numeric_input_props={{
              name: key,
              value: displayValue === null ? '' : displayValue,
              thousandSeparator: ',',
              onValueChange: values => {
                if (values.floatValue === undefined) {
                  onFieldChange(null);
                } else {
                  onFieldChange(values.floatValue);
                }
              },
              title: tooltip,
              className:
                'text-sm not-italic text-tc-primary font-medium bg-transparent w-full rounded-lg py-6 px-4 border-[1px] border-gray-60 focus:border-[1px] focus:border-gray-60 focus:ring-0',
              'aria-label': key + (isAdditional ? '-additional' : ''),
            }}
            container_classname={'w-full h-full'}
          />
        );
      case 'percent_slider':
        return (
          <div className={'w-full flex flex-col items-start gap-[8px] min-w-[56px]'}>
            <div className={'text-eyebrow text-tc-primary'}>Enter %</div>
            <NumericFormat
              value={displayValue === null ? '' : displayValue}
              onValueChange={values => {
                if (values.floatValue === undefined) {
                  onFieldChange(null);
                } else {
                  onFieldChange(values.floatValue);
                }
              }}
              className={
                'w-[56px] h-[56px] rounded-lg py-4 text-sm text-tc-primary text-center font-bold not-italic bg-transparent border-[1px] border-gray-60 focus:border-[1px] focus:border-gray-60 focus:ring-0'
              }
              allowNegative={false}
              max={100}
              min={0}
            />
          </div>
        );
      case 'multi_select':
        return (
          <QuestionnaireSelect
            isMultiSelect={true}
            options={options}
            onChange={value => {
              onFieldChange(value);
            }}
            value={displayValue}
            data-testid={key + (isAdditional ? '-additional' : '')}
          />
        );
      case 'select':
        return (
          <QuestionnaireSelect
            options={options}
            onChange={value => {
              onFieldChange(value);
            }}
            value={displayValue}
            data-testid={key + (isAdditional ? '-additional' : '')}
          />
        );
      case 'textarea':
        return (
          <Input
            type={InputTypes.TextArea}
            input_props={{
              name: key,
              value: displayValue === null ? '' : displayValue,
              onValueChange: value => {
                onFieldChange(value);
              },
              placeholder: placeholder,
              title: tooltip,
            }}
            textarea_props={{
              draggable: false,
              rows: 4,
              onChange: e => {
                if (e.target.value === '') {
                  onFieldChange(null);
                } else {
                  onFieldChange(e.target.value);
                }
              },
              name: key,
              value: displayValue === null ? '' : displayValue,
              className:
                'text-sm not-italic text-tc-primary font-medium bg-transparent w-full rounded-lg py-6 px-4 border-[1px] border-gray-60 focus:border-[1px] focus:border-gray-60 focus:ring-0 resize-none',
              placeholder: placeholder,
              title: tooltip,
              'aria-label': key + (isAdditional ? '-additional' : ''),
            }}
            container_classname={'w-full'}
          />
        );
      case 'multi_text':
        const isArrayLengthMoreThanZero = isArray(displayValue) && toArray(displayValue).length > 0;
        return (
          <ListItem
            value={displayValue === null ? null : displayValue}
            onChange={value => {
              onFieldChange(value);
            }}
            data-testid={key + (isAdditional ? '-additional' : '')}
            input_props={{
              placeholder: placeholder,
              className: `border-[1px] border-gray-60 focus:border-[1px] focus:border-gray-60 p-[16px] text-body text-tc-primary focus:border-[1px] focus:border-gray-60 ${
                isArrayLengthMoreThanZero && 'focus:border-r-0 border-r-0 rounded-l-none'
              }`,
            }}
            buttonProps={{
              variant: ButtonTypes.secondary,
              className: 'w-full h-[30px]',
            }}
            className={'gap-[16px]'}
            listClassName={'flex flex-col gap-[16px]'}
            deleteButtonProps={{
              className: 'bg-transparent border-[1px] border-gray-60 hover:bg-transparent active:bg-transparent w-[72px] border-l-0 rounded-l-none',
            }}
          />
        );
      default:
        return <></>;
    }
  };

  const getAISource = () => {
    let justification: string | undefined = '';
    let originalAnswer;
    if (isComplianceAIResponseValueValid(question) && questionStatus === ComplianceProgressStatus.ai_answered) {
      justification = ai_response?.justification;
      if (ai_response?.answer === true) {
        originalAnswer = 'Yes';
      } else if (ai_response?.answer === false) {
        originalAnswer = 'No';
      } else if (Array.isArray(ai_response?.answer)) {
        originalAnswer = ai_response?.answer.join(', ');
      } else {
        originalAnswer = ai_response?.answer;
      }
    } else {
      return null;
    }

    return (
      <Card
        glow={true}
        glowColor={HexColors.yellow['200']}
        className={'border-[1px] border-yellow-200 w-full px-[16px] py-[24px] gap-[16px] text-tc-primary'}
        data-testid={'questionnaire-input-ai-response'}>
        <div className={'w-full flex flex-row justify-start h-auto gap-[1px] items-stretch z-10'}>
          <div className={'bg-gray-50 rounded-l-[16px] h-full gap-[4px] pl-[4px] py-[4px] pr-[16px] flex flex-row items-center'}>
            <div className={'w-[15px] h-[15px] flex items-center justify-center'}>
              <ColdIcon name={IconNames.ColdAiIcon} color={HexColors.yellow['200']} />
            </div>
            <div className={'text-body font-bold'}>Cold AI Answer</div>
          </div>
          <div className={'bg-gray-50 rounded-r-[16px] h-full py-[4px] px-[16px] text-body flex items-center justify-center'}>{originalAnswer}</div>
        </div>
        <div className={'w-full text-body italic text-left'}>{justification}</div>
      </Card>
    );
  };

  const getSubmitButton = () => {
    let label = 'Complete';
    let disabled = true;
    let iconLeftName = IconNames.ColdCheckIcon;
    let variant = ButtonTypes.primary;
    let onClick = async () => {
      await updateQuestion(false);
    };
    const loading = buttonLoading;
    if ((questionInput !== undefined && questionInput !== null) || (additionalContextInput !== undefined && additionalContextInput !== null)) {
      // if answer is updated or answer was cleared, but the status is ai answered
      if (questionAnswerChanged || (!questionAnswerChanged && questionStatus === ComplianceProgressStatus.ai_answered)) {
        disabled = false;
      } else {
        // if answer already exists or answer updated or additional context updated
        if (value === questionInput || questionAnswerSaved || additionalContextValue === additionalContextInput) {
          label = 'Clear Answer';
          disabled = false;
          iconLeftName = IconNames.CloseModalIcon;
          variant = ButtonTypes.secondary;
          onClick = async () => {
            await updateQuestion(true);
          };
        }
      }
    }

    return (
      <div className={'w-full pb-[24px] flex flex-row justify-end'}>
        <BaseButton variant={variant} disabled={disabled} onClick={onClick} loading={loading}>
          <div className={'w-full flex flex-row gap-[8px] items-center'}>
            <ColdIcon name={iconLeftName} />
            {label}
          </div>
        </BaseButton>
      </div>
    );
  };

  const showAdditionalContext = (questionInput: any | undefined) => {
    if (additional_context && ifAdditionalContextConditionMet(questionInput, additional_context)) {
      setAdditionalContextOpen(true);
    } else {
      setAdditionalContextOpen(false);
    }
  };

  const additionalContext = () => {
    if (additionalContextOpen && additional_context) {
      return (
        <div className={'w-full flex flex-col justify-center mb-[24px] gap-[16px]'}>
          <div className={'w-full text-tc-primary text-body'}>{additional_context.prompt}</div>
          {inputComponent(true)}
        </div>
      );
    } else {
      return null;
    }
  };

  const bookMarkQuestion = async () => {
    setButtonLoading(true);
    let response;
    if (questionBookmarked) {
      response = await axiosFetcher([`compliance/${name}/organizations/${orgId}/questions/${id}/bookmarks`, 'DELETE']);
    } else {
      response = await axiosFetcher([`compliance/${name}/organizations/${orgId}/questions/${id}/bookmarks`, 'POST']);
    }
    if (!isAxiosError(response)) {
      await sectionGroups?.mutate();
      setQuestionBookmarked(!questionBookmarked);
    }
    setButtonLoading(false);
  };

  const updateQuestion = async (isUpdate: boolean) => {
    setButtonLoading(true);

    const response = await axiosFetcher([
      `compliance/${name}/organizations/${orgId}/section_groups/${sectionGroupId}/sections/${sectionId}/questions/${id}/responses`,
      'PUT',
      {
        value: questionInput,
        additional_context: {
          ...additional_context,
          value: additionalContextInput,
        },
      },
    ]);
    if (!isAxiosError(response)) {
      if (isUpdate) {
        setQuestionAnswerSaved(true);
        setQuestionInput(null);
        setAdditionalContextInput(null);
        setAnswerQuestionChanged(false);
        if (isComplianceAIResponseValueValid(question)) {
          setQuestionStatus(ComplianceProgressStatus.ai_answered);
          setQuestionInput(ai_response?.answer);
        } else {
          setQuestionStatus(ComplianceProgressStatus.not_started);
        }
      } else {
        setQuestionAnswerSaved(true);
        setAnswerQuestionChanged(false);
        setQuestionStatus(ComplianceProgressStatus.user_answered);
      }
      // update the sidebar
      await sectionGroups?.mutate();
      // update the questionnaire
      await questionnaireMutate();
    }
    setButtonLoading(false);
  };

  logBrowser('QuestionnaireQuestionItem rendered', 'info', {
    question,
    questionInput,
    questionBookmarked,
    questionAnswerChanged,
    questionAnswerSaved,
    questionStatus,
    additionalContextOpen,
    additionalContextInput,
    buttonLoading,
  });

  return (
    <div
      className={`flex flex-col w-full rounded-[16px] bg-gray-30 gap-[16px] ${questionBookmarked ? 'border-[1px] border-lightblue-200 p-[23px]' : ' p-[24px]'}
    ${focusQuestion !== null && focusQuestion.key !== id ? 'opacity-20' : ''}`}
      ref={el => {
        if (scrollToQuestion === key && el) {
          el.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }}
      id={key}>
      <div className={'flex flex-row gap-[8px] justify-between'}>
        <div className={'flex flex-row gap-[8px] items-center'}>
          {getQuestionStatusIcon()}
          <div className={'w-full flex justify-start text-gray-120'}>QUESTION {number}</div>
        </div>
        <div className={'flex flex-row gap-[8px] items-center'}>
          {getBookMarkIcon()}
          <div
            className={'w-[24px] h-[24px] cursor-pointer'}
            onClick={() => {
              if (focusQuestion?.key === id) {
                setFocusQuestion(null);
              } else {
                setFocusQuestion({
                  key: id,
                  aiDetails: {
                    ai_response: ai_response,
                    ai_answered: ai_answered,
                    ai_attempted: ai_attempted,
                    value: questionInput,
                    questionAnswerSaved: questionAnswerSaved,
                    questionAnswerChanged: questionAnswerChanged,
                  },
                });
              }
            }}>
            <ColdIcon name={IconNames.ColdRightArrowIcon} />
          </div>
        </div>
      </div>
      {getPrompt()}
      {tooltip && <div className="text-left text-body not-italic font-medium text-tc-primary">{tooltip}</div>}
      <div className="w-full justify-center mb-[24px]">{inputComponent()}</div>
      {additionalContext()}
      {getAISource()}
      {getSubmitButton()}
    </div>
  );
};

export const QuestionnaireQuestionItem = withErrorBoundary(_QuestionnaireQuestionItem, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in QuestionnaireQuestionItem: ', error);
  },
});
