import { useAddToastMessage, useAuth0Wrapper, useColdContext } from '@coldpbc/hooks';
import { axiosFetcher } from '@coldpbc/fetchers';
import { AllCompliance, OrgCompliance, ToastMessage } from '@coldpbc/interfaces';
import React, { useContext } from 'react';
import { ColdCompliancePageContext } from '@coldpbc/context';
import { ComplianceStatus, ErrorType } from '@coldpbc/enums';
import { Card, ComplianceStatusChip, ErrorFallback, Spinner } from '@coldpbc/components';
import { differenceInDays, format, intlFormatDistance } from 'date-fns';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { withErrorBoundary } from 'react-error-boundary';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { get, isArray } from 'lodash';
import { getTermString } from '@coldpbc/lib';
import { isDefined } from 'class-validator';
import useSWR from 'swr';

const _ComplianceSetOverviewCard = ({ complianceSet }: { complianceSet: AllCompliance }) => {
  const navigate = useNavigate();
  const ldFlags = useFlags();
  const { orgId } = useAuth0Wrapper();
  const { logError } = useColdContext();
  const { addToastMessage } = useAddToastMessage();
  const { filter } = useContext(ColdCompliancePageContext);
  const [complianceSetLoading, setComplianceSetLoading] = React.useState<boolean>(false);

  const dueDate = get(complianceSet, 'metadata.due_date', undefined);
  const term = get(complianceSet, 'metadata.term', undefined);

  let complianceStatus = ComplianceStatus.inActive;

  let isNotActive = true;

  const progress = get(complianceSet, 'progress', null);
  const statuses = get(complianceSet, 'statuses', null);

  isNotActive = progress === null;

  if (!isNotActive) {
    complianceStatus = ComplianceStatus.inProgress;
    if (statuses && isArray(statuses) && statuses.length > 0) {
      const recentStatus = statuses[0];
      if (recentStatus.type === 'user_submitted') {
        complianceStatus = ComplianceStatus.submissionInProgress;
      } else if (recentStatus.type === 'cold_submitted') {
        complianceStatus = ComplianceStatus.submittedByCold;
      }
    }
  }

  const getComplianceLogo = () => {
    let imageClassName = 'max-w-[60px] max-h-[60px]';
    if (ldFlags.showNewCompliancePageHomeCold671) {
      imageClassName += ' invert';
    }
    const img = <img src={complianceSet.logo_url} alt={`${complianceSet.name}-logo`} className={imageClassName}></img>;
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
    const dueDateYear = dueDate ? new Date(dueDate).getFullYear() : undefined;
    let termString = '';
    if (term) {
      termString = getTermString(term);
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
  };

  const getComplianceStatusChip = () => {
    let percentage = 0;
    if (isDefined(progress)) {
      percentage = progress;
    }

    return (
      <div className={'h-full flex flex-col justify-center relative'}>
        <ComplianceStatusChip status={complianceStatus} percentage={percentage} />
        {complianceStatus === ComplianceStatus.submittedByCold && statuses && (
          <div className={'absolute w-full top-full text-label text-gray-100 flex flex-row justify-center'} data-chromatic="ignore">
            Submitted {format(new Date(statuses[0].updated_at), 'MMMM dd, yyyy')}
          </div>
        )}
      </div>
    );
  };

  const getComplianceDueDate = () => {
    // format due date to MM DD, YYYY
    if (dueDate) {
      const dateString = dueDate ? format(new Date(dueDate), 'MMMM dd, yyyy') : undefined;
      const dueInDays = differenceInDays(new Date(dueDate), new Date());
      let dueInDaysString = '';
      if (dueInDays < 0) {
        dueInDaysString = 'Deadline Passed';
      } else {
        const format = intlFormatDistance(new Date(dueDate).valueOf(), new Date());
        dueInDaysString = `Due ${format}`;
      }
      const isDueInLessThan7Days = dueInDays < 7 && dueInDays >= 0;

      return (
        <div className={'flex flex-col min-w-[166px] text-right'} data-chromatic="ignore">
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
        <div className={'flex flex-col min-w-[166px] text-right'} data-chromatic="ignore">
          <div className={`text-h5 w-full ${complianceStatus === ComplianceStatus.inActive ? 'text-tc-disabled' : 'text-tc-primary'}`}>No Deadline</div>
          <div className={'text-body w-full text-tc-secondary'}>Submit at any time</div>
        </div>
      );
    }
  };

  const onCardClick = async () => {
      if (!isAxiosError(orgComplianceSet) && orgComplianceSet !== undefined) {
        navigate(`/wizard/compliance/${complianceSet.name}`);
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
      case 'Upcoming':
        if (!dueDate) return false;
        return differenceInDays(new Date(dueDate), new Date()) >= 0;
      case 'Passed':
        if (!dueDate) return false;
        return differenceInDays(new Date(dueDate), new Date()) < 0;
      case 'Active':
        return !isNotActive;
      case 'Not Active':
        return isNotActive;
      default:
      case 'All Records':
        return true;
    }
  };

  const complianceSetLoadingBackground = () => {
    // return an overlay with transparent background and spinner to put over the card
    // put the spinner in the center of the card
    return (
      <div className={'absolute left-0 top-0 w-full h-full bg-bgc-accent bg-opacity-50 flex justify-center items-center'}>
        <Spinner size={GlobalSizes.xLarge} />
      </div>
    );
  };

  const shouldRender = checkFilter();

  if (!shouldRender) return null;

  return (
    <Card
      className={
        'w-full h-auto border-[1px] border-gray-60 flex flex-row justify-start items-center relative ' +
        (complianceSetLoading ? '' : ' cursor-pointer hover:bg-gray-50 hover:border-[1px] hover:border-white')
      }
      glow={false}
      onClick={onCardClick}>
      {getComplianceLogo()}
      {getComplianceSetTitle()}
      {getComplianceStatusChip()}
      {getComplianceDueDate()}
      {complianceSetLoading && complianceSetLoadingBackground()}
    </Card>
  );
};

export const ComplianceSetOverviewCard = withErrorBoundary(_ComplianceSetOverviewCard, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in ComplianceSetOverviewCard: ', error);
  },
});
