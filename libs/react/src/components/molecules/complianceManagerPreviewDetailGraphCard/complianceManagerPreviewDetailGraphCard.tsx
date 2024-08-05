import React, { useContext, useState } from 'react';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import { Card, ErrorFallback, PreviewDetailDatagridCollapse, PreviewSpiderChart } from '@coldpbc/components';
import { Table } from 'flowbite-react';
import { darkTableTheme } from '@coldpbc/themes';
import { forEach, get, map, sortBy } from 'lodash';
import { withErrorBoundary } from 'react-error-boundary';
import { isAxiosError } from 'axios';

const _ComplianceManagerPreviewDetailGraphCard = () => {
  const [selectedRow, setSelectedRow] = useState<null | string>(null);
  const { data } = useContext(ColdComplianceManagerContext);
  const { complianceCounts } = data;

  const tableData: {
    definition: {
      field: string;
      headerTitle: string;
      headerStyle: string;
    }[];
    data: {
      title: string;
      sections: {
        title: string;
        score: number;
        ai_score: number;
        max_score: number;
      }[];
      score: number;
      ai_score: number;
      max_score: number;
    }[];
  } = {
    definition: [
      {
        field: 'title',
        headerTitle: 'Topic Area',
        headerStyle: ' min-w-[360px] max-w-[360px]',
      },
      {
        field: 'points',
        headerTitle: 'Completed Points',
        headerStyle: ' w-full',
      },
    ],
    data: [],
  };

  forEach(sortBy(get(complianceCounts, 'data.compliance_section_groups', []), ['order', 'title'], ['asc', 'asc']), (value, key) => {
    tableData.data.push({
      title: value.title,
      sections: sortBy(value.compliance_sections, ['order', 'title'], ['asc', 'asc']).map(section => ({
        title: section.title,
        score: section.score,
        ai_score: section.estimated_score,
        max_score: section.max_score,
      })),
      score: value.score,
      ai_score: value.estimated_score,
      max_score: value.max_score,
    });
  });

  if (isAxiosError(complianceCounts?.data)) {
    return null;
  }

  return (
    <Card className={'bg-bgc-elevated flex flex-row h-auto w-full gap-[0px] justify-between'} glow={false}>
      <div className={'flex flex-col w-1/2 h-full gap-[40px] justify-start'}>
        <PreviewSpiderChart selectedRow={selectedRow} setSelectedRow={setSelectedRow} />
        <div className={'flex flex-col items-start gap-[6px] p-[16px] w-full'}>
          <div className={'flex flex-row justify-start text-eyebrow text-gray-130 gap-[12px] items-center w-auto'}>
            <div className={'w-[35px] h-[2px] rounded-[16px] border-b-[2px] border-yellow-200 border-dashed'}></div>
            <div>Points from AI Answers</div>
          </div>
          <div className={'flex flex-row justify-start text-eyebrow text-gray-130 gap-[12px] items-center w-auto'}>
            <div className={'w-[35px] h-[2px] rounded-[16px] border-b-[2px] border-green-200'}></div>
            <div>Points from Completed Answers</div>
          </div>
        </div>
      </div>
      <div className={'w-1/2 h-auto flex flex-col justify-start'}>
        <Table className="text-white h-auto" theme={darkTableTheme.table} data-testid={'footprint-detail-chart-table'}>
          <Table.Head className="text-white normal-case">
            {map(tableData.definition, (def, i) => (
              <Table.HeadCell key={`${def.field}-${i}`} theme={darkTableTheme.table?.head?.cell} className={def.headerStyle}>
                {def.headerTitle}
              </Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body className="divide-y">
            {tableData.data.map((row, i) => (
              <PreviewDetailDatagridCollapse key={`${row.title}-${i}`} definition={tableData.definition} data={row} selectedRow={selectedRow} setSelectedRow={setSelectedRow} />
            ))}
          </Table.Body>
        </Table>
      </div>
    </Card>
  );
};

export const ComplianceManagerPreviewDetailGraphCard = withErrorBoundary(_ComplianceManagerPreviewDetailGraphCard, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in ComplianceManagerPreviewDetailGraphCard: ', error);
  },
});
