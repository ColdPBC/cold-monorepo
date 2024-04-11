import { useAddToastMessage, useAuth0Wrapper, useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { axiosFetcher } from '@coldpbc/fetchers';
import { ComplianceSurveyPayloadType, ToastMessage } from '@coldpbc/interfaces';
import { useContext } from 'react';
import { CompliancePageContext } from '@coldpbc/context';
import { ComplianceStatus, ErrorType } from '@coldpbc/enums';
import { Card, ComplianceStatusChip, Spinner } from '@coldpbc/components';
import { differenceInDays, format } from 'date-fns';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export const ComplianceSetOverviewCard = ({ name }: { name: string }) => {
  const navigate = useNavigate();
  const { orgId } = useAuth0Wrapper();
  const { logError } = useColdContext();
  const { addToastMessage } = useAddToastMessage();
  const { data } = useContext(CompliancePageContext);

  const { orgComplianceSets, complianceSets } = data;

  const complianceSet = complianceSets.find(complianceSet => complianceSet.name === name) || complianceSets[0];
  const orgComplianceSet = orgComplianceSets.find(orgComplianceSet => orgComplianceSet.compliance_definition.name === name);

  const getSurveyUrl = () => {
    const compliance = orgComplianceSets.find(orgCompliance => orgCompliance.compliance_definition.name === name);
    if (compliance) {
      return [`/surveys/${compliance.compliance_definition.surveys[0]}`, 'GET'];
    } else {
      return null;
    }
  };

  const surveyData = useOrgSWR<ComplianceSurveyPayloadType>(getSurveyUrl(), axiosFetcher);

  if (surveyData.isLoading) {
    return <Spinner />;
  }

  if (surveyData.error) {
    return null;
  }
  let status = ComplianceStatus.inActive;

  let isNotActive = true;

  isNotActive = !orgComplianceSets.some(orgCompliance => orgCompliance.compliance_definition.name === name);

  if (!isNotActive && surveyData.data) {
    // get the percentage of answered questions
    const percentageAnswered = surveyData.data.progress.percentage;
    status = ComplianceStatus.inProgress;
    if (percentageAnswered === 100) {
      const isSubmitted = surveyData.data.definition.submitted;
      if (isSubmitted) {
        status = ComplianceStatus.submissionInProgress;
        if (surveyData.data.definition.submission_date) {
          status = ComplianceStatus.submittedByCold;
        }
      }
    }
  }

  const getComplianceSetTitle = () => {
    if (surveyData.data) {
      const dueDateYear = surveyData.data.definition.due_date ? new Date(surveyData.data.definition.due_date).getFullYear() : undefined;
      const term = surveyData.data.definition.term;
      return (
        <div className={'w-full h-full flex flex-col'}>
          <div className={'text-h3'}>{complianceSet.title}</div>
          <div className={'text-h5'}>{`${dueDateYear} | ${term}`}</div>
        </div>
      );
    }
  };

  const getComplianceStatusChip = () => {
    if (surveyData.data) {
      return (
        <div className={'h-full flex justify-center'}>
          <ComplianceStatusChip status={status} percentage={surveyData.data.progress.percentage} />;
        </div>
      );
    }
  };

  const getComplianceDueDate = () => {
    if (surveyData.data) {
      // format due date to MM DD, YYYY
      if (surveyData.data.definition.due_date) {
        const dateString = surveyData.data.definition.due_date ? format(new Date(surveyData.data.definition.due_date), 'MM dd, yyyy') : undefined;
        const dueInDays = differenceInDays(new Date(surveyData.data.definition.due_date), new Date());
        let dueInDaysString = '';
        if (dueInDays === 0) {
          dueInDaysString = 'Due Today';
        } else if (dueInDays < 0) {
          dueInDaysString = 'Deadline Passed';
        } else {
          dueInDaysString = `Due in ${dueInDays} days`;
        }
        return (
          <div className={'flex flex-col w-[166px] items-end'}>
            <div className={'text-h5'}>{dateString}</div>
            <div className={'text-body'}>{dueInDaysString}</div>
          </div>
        );
      }
    }
  };

  const onCardClick = async () => {
    if (orgComplianceSet !== undefined) {
      navigate(`/wizard/compliance/${orgComplianceSet.compliance_definition.name}`);
    } else {
      const response = await axiosFetcher([`/compliance_definitions/${complianceSet.name}/organizations/${orgId}`, 'POST']);
      if (isAxiosError(response)) {
        await addToastMessage({ message: 'Compliance could not be added', type: ToastMessage.FAILURE });
        logError(response.message, ErrorType.AxiosError, response);
      } else {
        await addToastMessage({ message: 'Compliance activated', type: ToastMessage.SUCCESS });
        navigate(`/wizard/compliance/${complianceSet.name}`);
      }
    }
  };

  return (
    <Card className="w-full h-auto cursor-pointer hover:bg-gray-60" glow={false} onClick={onCardClick}>
      <div className={'w-full space-x-[24px]'}></div>
      <img src={complianceSet.logo_url} alt={complianceSet.title} className={'w-[80px] h-[80px]'} />
      {getComplianceSetTitle()}
      {getComplianceStatusChip()}
      {getComplianceDueDate()}
    </Card>
  );
};
