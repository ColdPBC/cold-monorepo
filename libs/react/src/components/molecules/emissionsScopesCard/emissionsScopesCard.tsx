import React, { ReactNode, useContext } from 'react';
import { ColdEmissionsContext } from '@coldpbc/context';
import { forEach, forOwn, isArray, max } from 'lodash';
import { withErrorBoundary } from 'react-error-boundary';
import { Card, EmissionsDonutChart, EmissionsDonutChartVariants, ErrorFallback, FootprintOverviewVerticalDetail, SubCategoryTotal } from '@coldpbc/components';
import clsx from 'clsx';
import { ButtonTypes, EmissionsScopesCardVariants } from '@coldpbc/enums';
import { ChartData } from 'chart.js';
import { HexColors } from '@coldpbc/themes';
import { formatTonnes } from '@coldpbc/lib';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const _EmissionsScopesCard = ({ variant, title }: { variant?: EmissionsScopesCardVariants; title?: string }) => {
  const { data, selectedFacility, selectedYear } = useContext(ColdEmissionsContext);
  const { emissions, uniqueScopes } = data;
  const navigate = useNavigate();

  const getCTAs = () => {
    if (title === 'Emissions Overview') {
      return [
        {
          text: 'Learn More',
          action: () => {
            navigate('/carbon_footprint');
          },
          variant: ButtonTypes.secondary,
        },
      ];
    } else {
      return undefined;
    }
  };

  const scopeColors: {
    [key: number]: 'lightblue' | 'purple' | 'green' | 'teal';
  } = {
    1: 'lightblue',
    2: 'teal',
    3: 'green',
  };

  const chartData: ChartData<'doughnut'> = {
    datasets: [
      {
        data: Array<number>(),
        borderRadius: 2,
        borderWidth: 0,
        backgroundColor: Array<string>(),
      },
    ],
    labels: Array<string>(),
  };

  const scopeData: {
    [key: number]: number;
  } = {};

  const totals: Array<SubCategoryTotal> = [];
  let totalEmissions = 0;
  const hoverColorArray = Array<string>();

  if (isAxiosError(emissions) && emissions?.response?.status === 404) {
    return (
      <Card title={title} ctas={getCTAs()} glow={false}>
        <EmissionsDonutChart
          isEmptyData={true}
          subcategoryTotals={[]}
          variant={EmissionsDonutChartVariants.horizontal}
          chartData={{
            labels: [],
            datasets: [],
          }}
        />
        <div className="m-auto table w-1">
          <h4 className="text-h4 text-center whitespace-nowrap m-4">{'We need more data to show your footprint'}</h4>
          <p className="text-center text-sm leading-normal">We'll be in touch soon to collect info needed for your latest footprint</p>
        </div>
      </Card>
    );
  }

  forEach(uniqueScopes, scope => {
    let nullFootprint = true;
    forEach(emissions, facility => {
      if (facility.facility_id.toString() === selectedFacility.value || selectedFacility.value === 'all') {
        forEach(facility.periods, period => {
          if (period.value.toString() !== selectedYear.value && selectedYear.value !== 'all') {
            return;
          }
          forEach(period.emissions, emission => {
            if (emission.scope.ghg_category === scope) {
              let value = 0;
              forEach(emission.activities, activity => {
                value += activity.tco2e;
                totalEmissions += activity.tco2e;
                nullFootprint = false;
              });
              if (!nullFootprint) {
                if (scopeData[scope]) {
                  scopeData[scope] += value;
                } else {
                  scopeData[scope] = value;
                }
              }
            }
          });
        });
      }
    });
  });

  forOwn(scopeData, (emissions, scope) => {
    const color = scopeColors[parseInt(scope)];
    const name = `Scope ${scope}`;
    totals.push({
      value: emissions,
      color: color,
      name: name,
      subcategoryKey: scope,
      percent: (emissions / totalEmissions) * 100,
    });
  });

  const totalsSorted = totals.sort((a, b) => b.value - a.value);

  forEach(totalsSorted, total => {
    chartData.labels?.push(total.name);
    chartData.datasets[0].data.push(total.value);

    if (isArray(chartData.datasets[0].backgroundColor)) {
      chartData.datasets[0].backgroundColor?.push(scopeColors[parseInt(total.subcategoryKey)]);
    }
    hoverColorArray.push(HexColors[scopeColors[parseInt(total.subcategoryKey)]].DEFAULT_BRIGHTEN);

    chartData.labels?.push(null);
    chartData.datasets[0].data.push(totalEmissions / 100);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    chartData.datasets[0].backgroundColor?.push('#FFFFFF00'); // make spacer transparent
  });

  if (chartData.datasets[0].data.length < 1) {
    return null;
  }

  const maxTotal = max(totalsSorted.map(t => t.value)) ?? 0;

  const detailViews = Array<ReactNode>();

  forEach(totalsSorted, total => {
    const leftAlign = detailViews.length < 2;
    const bottomAlign = detailViews.length === 1 || detailViews.length === 2;
    detailViews.push(
      <div
        key={total.name}
        className={clsx({
          'absolute w-[210px] inline-flex gap-2 items-start': variant === EmissionsScopesCardVariants.horizontal,
          'left-1/2 translate-x-[104px] justify-start': variant === EmissionsScopesCardVariants.horizontal && leftAlign,
          'right-1/2 translate-x-[-104px] justify-end': variant === EmissionsScopesCardVariants.horizontal && !leftAlign,
          'bottom-0': bottomAlign,
        })}>
        <FootprintOverviewVerticalDetail color={total.color} title={total.name} percent={total.percent ?? 0} emissions={total.value} percentWidth={total.value / maxTotal} />
      </div>,
    );
  });

  return (
    <Card glow={false} title={title} ctas={getCTAs()}>
      {variant ? (
        <EmissionsDonutChart
          variant={variant ? EmissionsDonutChartVariants.horizontal : EmissionsDonutChartVariants.vertical}
          chartData={chartData}
          subcategoryTotals={totalsSorted}
          totalEmissions={totalEmissions}
          hoverColorArray={hoverColorArray}
        />
      ) : (
        <div className={'flex flex-col w-full space-y-[24px]'}>
          <div className={'w-full flex flex-row items-end font-extrabold text-left space-x-1'}>
            <div className={'text-h1'}>{formatTonnes(totalEmissions)}</div>
            <div className={`text-h3 ${totalEmissions >= 1000 ? 'mb-[8px]' : 'mb-[6px]'}`}>tCO2e</div>
          </div>
          <div className="w-full m-auto mt-2">{detailViews}</div>
        </div>
      )}
    </Card>
  );
};

export const EmissionsScopesCard = withErrorBoundary(_EmissionsScopesCard, {
  FallbackComponent: props => <ErrorFallback {...props} />,
});
