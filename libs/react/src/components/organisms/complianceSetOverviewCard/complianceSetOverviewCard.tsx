import { useAddToastMessage, useAuth0Wrapper, useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { axiosFetcher } from '@coldpbc/fetchers';
import { ComplianceSurveyPayloadType, ToastMessage } from '@coldpbc/interfaces';
import React, { useContext } from 'react';
import { ColdCompliancePageContext } from '@coldpbc/context';
import { ComplianceStatus, ErrorType } from '@coldpbc/enums';
import { Card, ComplianceStatusChip, ErrorFallback, Spinner } from '@coldpbc/components';
import { differenceInDays, format, intlFormatDistance } from 'date-fns';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';

const _ComplianceSetOverviewCard = ({ name }: { name: string }) => {
  const navigate = useNavigate();
  const { orgId } = useAuth0Wrapper();
  const { logError } = useColdContext();
  const { addToastMessage } = useAddToastMessage();
  const { data, filter } = useContext(ColdCompliancePageContext);

  const { orgComplianceSets, complianceSets } = data;

  const complianceSet = complianceSets.find(complianceSet => complianceSet.name === name) || complianceSets[0];
  const orgComplianceSet = orgComplianceSets.find(orgComplianceSet => orgComplianceSet.compliance_definition.name === name);

  const getSurveyUrl = () => {
    const compliance = complianceSets.find(compliance => compliance.name === name);
    if (!compliance) {
      return null;
    }
    return [`/surveys/${compliance.surveys[0]}`, 'GET'];
  };

  const surveyData = useOrgSWR<ComplianceSurveyPayloadType>(getSurveyUrl(), axiosFetcher);

  if (surveyData.isLoading) {
    return <Spinner />;
  }

  if (surveyData.error) {
    return null;
  }
  const { data: surveyPayload } = surveyData;

  if (!surveyPayload) return null;

  const { definition, progress, status } = surveyPayload;

  let complianceStatus = ComplianceStatus.inActive;

  let isNotActive = true;

  isNotActive = !orgComplianceSets.some(orgCompliance => orgCompliance.compliance_definition.name === name);

  if (!isNotActive && surveyData.data) {
    complianceStatus = ComplianceStatus.inProgress;
    if (status) {
      const recentStatus = status[0];
      if (recentStatus.name === 'user_submitted') {
        complianceStatus = ComplianceStatus.submissionInProgress;
      } else if (recentStatus.name === 'cold_submitted') {
        complianceStatus = ComplianceStatus.submittedByCold;
      }
    }
  }

  const getComplianceLogo = () => {
    const img = <img src={complianceSet.logo_url} alt={`${complianceSet.name}-logo`}></img>;
    if (!isNotActive) {
      return <div className={'rounded-full min-w-[80px] min-h-[80px] max-w-[80px] max-h-[80px] bg-gray-50 flex justify-center items-center'}>{img}</div>;
    } else {
      return (
        <div className={'rounded-full min-w-[80px] min-h-[80px] max-w-[80px] max-h-[80px] bg-transparent flex justify-center items-center border-[1px] border-gray-50 opacity-50'}>
          {img}
        </div>
      );
    }
  };

  const getComplianceSetTitle = () => {
    if (surveyData.data) {
      const dueDateYear = surveyData.data.definition.due_date ? new Date(surveyData.data.definition.due_date).getFullYear() : undefined;
      const term = surveyData.data.definition.term;
      let termString = '';
      switch (term) {
        case 'annual':
          termString = 'Annual';
          break;
        case 'quarterly':
          termString = 'Quarterly';
          break;
        case 'every_three_years':
          termString = '3-Year Term';
          break;
        default:
          termString = '';
          break;
      }

      const dueDateAndTerm = () => {
        if (dueDateYear && term) {
          return `${dueDateYear} | ${termString}`;
        } else if (term) {
          return `${termString}`;
        } else if (dueDateYear) {
          return `${dueDateYear}`;
        } else {
          return '';
        }
      };

      return (
        <div className={'w-full h-full flex flex-col'}>
          <div className={'text-h3'}>{complianceSet.title}</div>
          <div
            className={`text-body
          ${complianceStatus === ComplianceStatus.inActive ? 'text-tc-disabled' : 'text-tc-secondary'}`}>
            {dueDateAndTerm()}
          </div>
        </div>
      );
    }
  };

  const getComplianceStatusChip = () => {
    if (surveyData.data) {
      return (
        <div className={'h-full flex flex-col justify-center relative'}>
          <ComplianceStatusChip status={complianceStatus} percentage={surveyData.data.progress.percentage} />
          {complianceStatus === ComplianceStatus.submittedByCold && status && (
            <div className={'absolute w-full top-full text-label text-gray-100 flex flex-row justify-center'}>Submitted {format(new Date(status[0].date), 'MMMM dd, yyyy')}</div>
          )}
        </div>
      );
    }
  };

  const getComplianceDueDate = () => {
    if (surveyData.data) {
      // format due date to MM DD, YYYY
      if (surveyData.data.definition.due_date) {
        const dateString = surveyData.data.definition.due_date ? format(new Date(surveyData.data.definition.due_date), 'MMMM dd, yyyy') : undefined;
        const dueInDays = differenceInDays(new Date(surveyData.data.definition.due_date), new Date());
        let dueInDaysString = '';
        if (dueInDays < 0) {
          dueInDaysString = 'Deadline Passed';
        } else {
          const format = intlFormatDistance(new Date(surveyData.data.definition.due_date).valueOf(), new Date());
          dueInDaysString = `Due ${format}`;
        }
        const isDueInLessThan7Days = dueInDays < 7;

        return (
          <div className={'flex flex-col min-w-[166px] text-right'}>
            <div className={`text-h5 w-full ${complianceStatus === ComplianceStatus.inActive ? 'text-tc-disabled' : 'text-tc-primary'}`}>{dateString}</div>
            <div
              className={`text-body w-full ${
                isDueInLessThan7Days && complianceStatus !== ComplianceStatus.submittedByCold && complianceStatus !== ComplianceStatus.submissionInProgress
                  ? 'text-tc-warning'
                  : 'text-tc-secondary'
              }`}>
              {dueInDaysString}
            </div>
          </div>
        );
      } else {
        return (
          <div className={'flex flex-col min-w-[166px] text-right'}>
            <div className={`text-h5 w-full ${complianceStatus === ComplianceStatus.inActive ? 'text-tc-disabled' : 'text-tc-primary'}`}>No Deadline</div>
            <div className={'text-body w-full text-tc-secondary'}>Submit at any time</div>
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

  const checkFilter = () => {
    switch (filter) {
      case 'All Records':
        return true;
      case 'Upcoming':
        if (!surveyData.data) return false;
        if (!surveyData.data.definition.due_date) return false;
        return differenceInDays(new Date(surveyData.data.definition.due_date), new Date()) >= 0;
      case 'Passed':
        if (!surveyData.data) return false;
        if (!surveyData.data.definition.due_date) return false;
        return differenceInDays(new Date(surveyData.data.definition.due_date), new Date()) < 0;
      case 'Active':
        return !isNotActive;
      case 'Not Active':
        return isNotActive;
    }
  };

  const shouldRender = checkFilter();

  if (!shouldRender) return null;

  return (
    <Card
      className="w-full h-auto border-[1px] border-gray-60 cursor-pointer hover:bg-gray-50 hover:border-[1px] hover:border-white flex flex-row justify-start items-center"
      glow={false}
      onClick={onCardClick}>
      {getComplianceLogo()}
      {getComplianceSetTitle()}
      {getComplianceStatusChip()}
      {getComplianceDueDate()}
    </Card>
  );
};

export const ComplianceSetOverviewCard = withErrorBoundary(_ComplianceSetOverviewCard, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in ComplianceSetOverviewCard: ', error);
  },
});
