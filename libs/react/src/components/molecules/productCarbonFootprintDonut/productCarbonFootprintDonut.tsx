import React from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';
import {PaginatedProductsQuery, ProductMaterial, ProductsQuery} from '@coldpbc/interfaces';
import { darkTableTheme, HexColors } from '@coldpbc/themes';
import { Chart } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import { Plugin as PluginType } from 'chart.js/dist/types';
import { useActiveSegment } from '@coldpbc/hooks';
import { Table } from 'flowbite-react';
import { map } from 'lodash';
import { useFlags } from 'launchdarkly-react-client-sdk';
import { Card } from '../card';

interface ProductDetailsCardProps {
	product: ProductsQuery;
}

interface ActiveSegment {
	index?: number;
	thickness?: number;
	medium?: 'segment' | 'legend';
}

const COLORS = [
	HexColors.lightblue['100'],
	HexColors.lightblue['200'],
	HexColors.lightblue['300'],
	HexColors.lightblue['400'],
	HexColors.lightblue['500'],
	HexColors.lightblue['600'],
	HexColors.lightblue['700'],
];

const emissionsForProductMaterial = (productMaterial: ProductMaterial) => {
  return ((productMaterial.weight || 0) * (productMaterial.material.emissionsFactor || 0))
};

const _ProductCarbonFootprintDonut: React.FC<ProductDetailsCardProps> = ({ product }) => {
	const [hoveredRow, setHoveredRow] = React.useState<number | null>(null);
  const ldFlags = useFlags();

	const { totalEmissions, maxEmissions, materialsData } = React.useMemo(() => {
		const totalEmissions = product.productMaterials.reduce((total, productMaterial) => total + emissionsForProductMaterial(productMaterial), 0);

		if (totalEmissions === 0) {
			return { totalEmissions, maxEmissions: 0, materialsData: [] };
		}

		const rawData = product.productMaterials.map(productMaterial => {
			const emissions = emissionsForProductMaterial(productMaterial);

			return {
				id: productMaterial.material.id,
				name: productMaterial.material.name,
				emissions: emissions,
				percentage: emissions > 0 ? emissions / totalEmissions : null,
			};
		});

		const sortedData = [...rawData].sort((a, b) => {
			if (a.emissions === null && b.emissions === null) {
				return a.name.localeCompare(b.name);
			}
			if (a.emissions === null) return 1;
			if (b.emissions === null) return -1;
			if (a.emissions === b.emissions) {
				return a.name.localeCompare(b.name);
			}
			return b.emissions - a.emissions;
		});

		const indexedData = sortedData.map((item, index) => ({
			...item,
			index,
		}));

		const maxEmissions = indexedData[0]?.emissions || 0;

		if (indexedData.length <= 7) {
			return { totalEmissions, maxEmissions, materialsData: indexedData };
		} else {
			const otherDataEmissions = indexedData.slice(6).reduce((count, item) => count + (item.emissions || 0), 0);
			const otherDataPercentage = otherDataEmissions / totalEmissions;
			const truncatedData = [
				...indexedData.slice(0, 6),
				{
					id: 'other',
					name: 'Other',
					emissions: otherDataEmissions,
					percentage: otherDataPercentage,
					index: 6,
				},
			];
			return { totalEmissions, maxEmissions, materialsData: truncatedData };
		}
	}, [product]);

	const { activeSegment, setActiveSegment, animateSegmentThickness, segmentOnHover, chartBeforeDraw } = useActiveSegment({
		chartHasSpacers: false,
	});

	if (!ldFlags.productCarbonFootprintMvp || totalEmissions === 0) {
		return null;
	}

  const chartOptions: ChartOptions<'doughnut'> & { activeSegment: ActiveSegment | null } = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '80%',
    onHover: (event, elements, chart) => {
      segmentOnHover(event, elements, chart, 105);
      if (elements.length > 0) {
        setHoveredRow(elements[0].index);
      } else {
        setHoveredRow(null);
      }
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
    activeSegment,
  };

  const chartPlugins: PluginType<'doughnut'>[] = [
    {
      id: 'sliceThickness',
      // @ts-expect-error considered wrong type, but works and used elsewhere
      beforeDraw: chart => chartBeforeDraw(chart, undefined, true, true),
    },
  ];

	const chartData = {
		datasets: [
			{
				data: materialsData.map(datum => datum.emissions),
				backgroundColor: materialsData.map((_, index) => COLORS[index]),
				hoverBackgroundColor: materialsData.map((_, index) => COLORS[index]),
				borderWidth: 0,
			},
		],
		labels: materialsData.map(datum => datum.name),
	};

	const tableData = {
		definition: [
			{
				size: 'w-100',
				field: 'name',
				headerTitle: 'Material',
			},
			{
				size: 'w-60',
				field: 'percentage',
				headerTitle: '%',
			},
			{
				size: 'w-10',
				field: 'emissions',
				headerTitle: 'kgCO2e',
			},
		],
		data: materialsData,
	};

	return (
    <Card title={'Carbon Footprint'}>
      <div className="w-full h-full flex gap-8 items-start">
        {/* Left side graphic */}
        <div className="relative h-80 w-80">
          <div className="relative h-80 w-80 z-10">
            <Chart options={chartOptions} type="doughnut" data={chartData} plugins={chartPlugins} data-chromatic="ignore" />
          </div>
          <div className="absolute inset-0 z-0 flex flex-col items-center justify-center text-tc-primary">
            <div className="text-4xl font-bold">{totalEmissions.toFixed(2)}</div>
            <div className="text-body">kgCO2e</div>
          </div>
        </div>
        {/* Right side table */}
        <div className="w-full">
          <div className="overflow-x-auto">
            <Table theme={darkTableTheme.table} className="w-full text-left text-tc-primary">
              <Table.Head className="text-white normal-case">
                {map(tableData.definition, (def, i) => (
                  <Table.HeadCell key={`${def.field}-${i}`} theme={darkTableTheme.table?.head?.cell}>
                    {def.headerTitle}
                  </Table.HeadCell>
                ))}
              </Table.Head>
              <Table.Body className="divide-y">
                {tableData.data.map((row, index) => (
                  <Table.Row
                    key={`${row.name}-${index}`}
                    theme={darkTableTheme.table?.row}
                    className={'w-full'}
                    onMouseEnter={() => {
                      setHoveredRow(index);
                      animateSegmentThickness(index, 'segment', 105);
                    }}
                    onMouseLeave={() => {
                      setHoveredRow(null);
                      setActiveSegment(null);
                    }}>
                    <Table.Cell className={`px-0 font-bold ${hoveredRow === index ? 'py-0 bg-gray-70' : 'py-4'}`} theme={darkTableTheme.table?.body?.cell}>
                      <div className="flex items-center w-full">
                        {hoveredRow === index && (
                          <div
                            className="h-[51px] w-[4px]"
                            style={{
                              backgroundColor: COLORS[index],
                            }}
                          />
                        )}
                        {!(hoveredRow === index) && <div className="w-[4px]" />}
                        <div className={'flex items-center px-4 w-full'}>
                          <div
                            style={{
                              background: COLORS[index],
                            }}
                            className="mr-2 h-[10px] w-[10px] min-w-[10px] rounded-full"
                          />
                          <div className="w-full truncate text-tc-primary">{row.name}</div>
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell theme={darkTableTheme.table?.body?.cell} className={`${hoveredRow === index && 'bg-gray-70'}`}>
                      <div className={'flex flex-row items-center h-full'}>
                        <div className={'min-w-[65px] h-full'}>{((row.percentage || 0) * 100).toFixed(0)}%</div>
                        <div className={'w-full flex flex-row items-center h-full'}>
                          <div
                            className="h-1 rounded-lg"
                            style={{
                              backgroundColor: COLORS[index],
                              width: `${(row.emissions / maxEmissions) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell theme={darkTableTheme.table?.body?.cell} className={`${hoveredRow === index && 'bg-gray-70'}`}>
                      {row.emissions.toFixed(2)}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </Card>
	);
};

export const ProductCarbonFootprintDonut = withErrorBoundary(_ProductCarbonFootprintDonut, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in ProductCarbonFootprintDonut: ', error);
	},
});
