import { Card, DetailsItem, EllipsisMenu, ErrorPage, MainContent } from '@coldpbc/components';
import { useParams } from 'react-router-dom';
import { useRegulations } from '@coldpbc/hooks';
import React from 'react';


export const RegulatoryComplianceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getRegulation } = useRegulations();

  // Get the regulation data using the slug from URL params
  const regulation = slug ? getRegulation(slug) : undefined;

  // Handle case where regulation is not found
  if (!regulation) {
    return <ErrorPage error={'Regulation not found'} showLogout={false} />;
  }

  const title = regulation['Bill Number'] && regulation['Bill Number'] !== regulation.Regulation ? `${regulation.Regulation} (${regulation['Bill Number']})` : regulation.Regulation;
  const subTitle = [regulation.Category, regulation.Subcategory, regulation.Jurisdiction].filter(val => !!val).join(' | ');

  const guidanceSteps = regulation["Guidance & Steps to Comply"].map(
    (step, index) => (
      <li key={index} className="mb-2">{step.trim()}</li>
    )
  );

  return (
    <MainContent
      title={title}
      subTitle={subTitle}
      breadcrumbs={[
        {
          label: "Regulatory Compliance",
          href: "/regulatory_compliance",
        },
        {
          label: title,
        }
      ]}
      headerElement={regulation['Bill Text Link'] && (
        <EllipsisMenu
          data-testid={'regulatory-compliance-details-menu'}
          items={[
            {
              label: 'Bill Text',
              onClick: () => {
                window.open(regulation['Bill Text Link'], '_blank', 'noopener,noreferrer');
              },
            }
          ]}/>
      )}
      className={'w-[calc(100%)]'}
      contentClassName={'min-w-[1129px]'}
    >
      <div className='w-full h-full flex gap-6 items-start'>
        <Card title={'Details'} className={'w-[406px] min-w-[406px] h-fit'} data-testid={'regulatory-compliance-details-card'}>
          <DetailsItem category={'Status'} value={`${regulation['In Effect']} (${regulation.Effective})`} />
          <DetailsItem category={'Summary'} value={regulation.Summary} />
          <DetailsItem category={'Fees'} value={regulation['Fee Explanation']} />
          <DetailsItem category={'Penalties (Beyond Fees)'} value={`${regulation['Penalties (Beyond Fees)']}. ${regulation['Penalty Explanation']}`} />
        </Card>
        <div className='w-full h-full flex flex-col gap-6'>
          <Card title={'Applicability'} className={'w-full h-fit'} data-testid={'regulatory-compliance-details-card'}>
            <DetailsItem category={'Products'} value={regulation['Product Type Eligibility']} />
            <DetailsItem category={'Company Type'} value={regulation['Company Type Applicability']} />
            <DetailsItem category={'Revenue'} value={regulation['Revenue Applicability']} />
            <DetailsItem category={'Employee Threshold'} value={regulation['Employee Threshold Applicability']} />
          </Card>
          <Card title={'Guidance & Steps to Comply'} className={'w-full h-fit'} data-testid={'regulatory-compliance-details-card'}>
            <ul className={'list-none pl-0 text-body'}>
              {guidanceSteps}
            </ul>
          </Card>
        </div>
      </div>
    </MainContent>
)
}
