import React, { useContext, useEffect } from 'react';
import { CarbonFootprintDetailChip, Card, ErrorFallback, ScopeDataGrid } from '@coldpbc/components';
import { ColdEmissionsContext } from '@coldpbc/context';
import { withErrorBoundary } from 'react-error-boundary';
import { findIndex, forEach, get, includes, isArray, set, sortBy } from 'lodash';
import { ChartData, ChartOptions } from 'chart.js';
import { useActiveSegment } from '@coldpbc/hooks';
import { Chart } from 'react-chartjs-2';
import { Plugin as PluginType } from 'chart.js/dist/types';
import { getSchemeForColor, HexColors } from '@coldpbc/themes';
import { EmissionsScope3Categories, ScopeColors } from '@coldpbc/enums';

const _EmissionsCarbonFootprintCharts = () => {
	const [byActivity, setByActivity] = React.useState(true);
	const [selectedActivity, setSelectedActivity] = React.useState<{
		scope: number;
		activity: string;
	} | null>(null);

	const { data, selectedYear, setSelectedYear, selectedFacility, setSelectedFacility, isSingleYear } = useContext(ColdEmissionsContext);

	const { uniqueScopes, emissions } = data;

	let totalEmissions = 0;

	const allScopeActivities: {
		[key: string]: {
			[key: string]: {
				emissions: number;
				percentage: string;
			};
		};
	} = {};

	const scopeColors = {
		'1': getSchemeForColor(HexColors[ScopeColors['1']]),
		'2': getSchemeForColor(HexColors[ScopeColors['2']]),
		'3': getSchemeForColor(HexColors[ScopeColors['3']]),
	};

	const emissionsDataSet: ChartData<'doughnut'> = {
		datasets: [
			{
				data: Array<number>(),
				backgroundColor: Array<string>(),
				borderColor: Array<string>(),
				borderWidth: 1,
				hoverBackgroundColor: Array<string>(),
			},
		],
		labels: Array<string | null>(),
	};

	forEach(emissions, facility => {
		if (facility.facility_id.toString() === selectedFacility.value || selectedFacility.value === 'all') {
			forEach(facility.periods, period => {
				if (period.value.toString() !== selectedYear.value && selectedYear.value !== 'all') {
					return;
				}
				forEach(period.emissions, emission => {
					const scopeNumber = emission.scope.ghg_category;
					const scopeActivities = get(allScopeActivities, scopeNumber, {});
					const subcategory = emission.scope.ghg_subcategory;
					forEach(emission.activities, activity => {
						totalEmissions += activity.tco2e;
						if (byActivity) {
							const scopeActivity = get(scopeActivities, activity.name, {
								emissions: 0,
								percentage: '0%',
							});
							scopeActivity.emissions += activity.tco2e;
							scopeActivity.percentage = '0%';
							set(scopeActivities, activity.name, scopeActivity);
						} else {
							// by category
							if (includes([1, 2], scopeNumber)) {
								const scopeActivity = get(scopeActivities, `Scope ${scopeNumber}`, {
									emissions: 0,
									percentage: '0%',
								});
								scopeActivity.emissions += activity.tco2e;
								scopeActivity.percentage = '0%';
								set(scopeActivities, `Scope ${scopeNumber}`, scopeActivity);
							} else {
								const subCategoryName = EmissionsScope3Categories[subcategory - 1];
								const scopeActivity = get(scopeActivities, `${subCategoryName}`, {
									emissions: 0,
									percentage: '0%',
								});
								scopeActivity.emissions += activity.tco2e;
								scopeActivity.percentage = '0%';
								set(scopeActivities, `${subCategoryName}`, scopeActivity);
							}
						}
					});
					set(allScopeActivities, scopeNumber, scopeActivities);
				});
			});
		}
	});

	const allEmissions = Array<{
		scope: number;
		activity: string;
		emissions: number;
		color: string;
	}>();
	const otherActivities = Array<{
		scope: number;
		activity: string;
		emissions: number;
		color: string;
	}>();

	let maxEmissions = 0;

	// sort the activities by emissions in each scope
	forEach(allScopeActivities, (scopeActivities, scope) => {
		let sortedActivities = Array<string>();
		if (byActivity) {
			sortedActivities = sortBy(Object.keys(scopeActivities), activity => {
				return -scopeActivities[activity].emissions;
			});
		} else {
			if (scope === '3') {
				sortedActivities = sortBy(Object.keys(scopeActivities), activity => {
					return EmissionsScope3Categories.indexOf(activity);
				});
			} else {
				sortedActivities = sortBy(Object.keys(scopeActivities), activity => {
					return activity;
				});
			}
		}
		const scopeColor = get(scopeColors, scope, scopeColors['2']);
		forEach(sortedActivities, (activity, index) => {
			if (scope === '3' && byActivity) {
				if (index < 4) {
					allEmissions.push({
						scope: Number(scope),
						activity,
						emissions: scopeActivities[activity].emissions,
						color: scopeColor[index],
					});
				} else {
					// get from allEmissions with activity 'Other Activities'
					const otherActivitiesIndex = findIndex(allEmissions, emission => {
						return emission.activity === 'Other Activities';
					});
					if (otherActivitiesIndex !== -1) {
						const otherActivities = allEmissions[otherActivitiesIndex];
						otherActivities.emissions += scopeActivities[activity].emissions;
						set(allEmissions, otherActivitiesIndex, otherActivities);
					} else {
						allEmissions.push({
							scope: Number(scope),
							activity: 'Other Activities',
							emissions: scopeActivities[activity].emissions,
							color: scopeColor[index],
						});
					}
					otherActivities.push({
						scope: Number(scope),
						activity,
						emissions: scopeActivities[activity].emissions,
						color: scopeColor[index],
					});
				}
			} else {
				allEmissions.push({
					scope: Number(scope),
					activity,
					emissions: scopeActivities[activity].emissions,
					color: scopeColor[index],
				});
			}
		});
	});

	const sortedEmissions = sortBy(allEmissions, emission => {
		return -emission.emissions;
	});

	const gapStylingConstant = 100;
	const spacerValue = maxEmissions / gapStylingConstant;

	const hoverColorArray = Array<string>();

	forEach(sortedEmissions, (emission, index) => {
		if (emission.emissions > maxEmissions) {
			maxEmissions = emission.emissions;
		}
		emissionsDataSet.datasets[0].data.push(emission.emissions);
		if (isArray(emissionsDataSet.datasets[0].backgroundColor)) {
			emissionsDataSet.datasets[0].backgroundColor?.push(emission.color);
		}
		if (isArray(emissionsDataSet.datasets[0].hoverBackgroundColor)) {
			emissionsDataSet.datasets[0].hoverBackgroundColor?.push(emission.color);
		}
		hoverColorArray.push(emission.color);
		if (isArray(emissionsDataSet.datasets[0].borderColor)) {
			emissionsDataSet.datasets[0].borderColor?.push('black');
		}
		emissionsDataSet.labels?.push(emission.activity);
		emissionsDataSet.labels?.push(null);
		if (isArray(emissionsDataSet.datasets[0].hoverBackgroundColor)) {
			emissionsDataSet.datasets[0].hoverBackgroundColor?.push('#FFFFFF00');
		}
		if (isArray(emissionsDataSet.datasets[0].hoverBackgroundColor)) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			emissionsDataSet.datasets[0].backgroundColor?.push('#FFFFFF00'); // make spacer transparent
		}
		emissionsDataSet.datasets[0].data.push(spacerValue);
	});

	const { activeSegment, setActiveSegment, animateSegmentThickness, segmentOnHover, chartBeforeDraw } = useActiveSegment({ chartHasSpacers: false });

	const chartPlugins: PluginType<'doughnut'>[] = [
		{
			id: 'sliceThickness',
			// @ts-expect-error todo: fix type error
			beforeDraw: (chart: ChartJS) => chartBeforeDraw(chart, undefined, true, true),
		},
	];

	const chartOptions: ChartOptions<'doughnut'> = {
		responsive: true,
		maintainAspectRatio: false,
		cutout: '80%',
		onHover: (event, elements, chart) => {
			segmentOnHover(event, elements, chart, 125);
		},
		plugins: {
			tooltip: {
				enabled: false,
			},
		},
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore - inject this into the chart options
		activeSegment,
	};

	const onEmissionTypeClick = (isActivity: boolean) => {
		setByActivity(isActivity);
	};

	const getActivityFromSegment = () => {
		if (activeSegment !== null && activeSegment.index !== undefined) {
			const index = activeSegment.index;
			return sortedEmissions[index / 2];
		} else {
			return null;
		}
	};

	const getActivityIndex = (scope: number, activity: string) => {
		const index = findIndex(sortedEmissions, emission => {
			return emission.scope === scope && emission.activity === activity;
		});
		return getIndexOffsetForSegment(index);
	};

	const getIndexOffsetForSegment = (index: number) => {
		return index === 0 ? 0 : index + index;
	};

	useEffect(() => {
		if (selectedActivity) {
			const index = getActivityIndex(selectedActivity.scope, selectedActivity.activity);
			if (index !== -1) {
				animateSegmentThickness(index, 'segment', 125);
			}
		} else {
			setActiveSegment(null);
		}
	}, [selectedActivity]);

	return (
		<div className={'flex flex-col space-y-[35px] w-auto'}>
			<Card glow={false} className={'w-full text-tc-primary'}>
				<div className={'w-full flex flex-col gap-[40px]'}>
					<div className={'w-full flex flex-row justify-between'}>
						<div className={'text-h2 text-start'}>Emissions By {byActivity ? 'Activity' : 'Category'}</div>
						<div className={'w-auto flex flex-row bg-bgc-accent border-[1px] border-gray-70 rounded-[8px] p-[8px]'}>
							<div className={`rounded-[8px] cursor-pointer p-[8px] text-button ${byActivity ? 'bg-bgc-accent' : 'bg-primary-300'}`} onClick={() => onEmissionTypeClick(false)}>
								Category
							</div>
							<div className={`rounded-[8px] cursor-pointer p-[8px] text-button ${byActivity ? 'bg-primary-300' : 'bg-bgc-accent'}`} onClick={() => onEmissionTypeClick(true)}>
								Activity
							</div>
						</div>
					</div>
					<div className={'flex flex-row gap-[32px]'}>
						<div className={'flex flex-col justify-start w-[347px] gap-[32px]'}>
							<div className={'w-[347px] h-[347px] relative'}>
								<CarbonFootprintDetailChip emissions={totalEmissions} center />
								<Chart options={chartOptions} type="doughnut" data={emissionsDataSet} plugins={chartPlugins} data-chromatic="ignore" />
							</div>
						</div>
						<div className={'flex flex-col gap-[16px] w-full'}>
							{uniqueScopes.map(scope => {
								return (
									<ScopeDataGrid
										scope_category={scope}
										key={scope}
										byActivity={byActivity}
										allEmissions={sortedEmissions}
										otherActivities={otherActivities}
										maxEmissions={maxEmissions}
										totalEmissions={totalEmissions}
										setSelectedActivity={setSelectedActivity}
										selectedActivity={selectedActivity}
										getActivityFromSegment={getActivityFromSegment}
									/>
								);
							})}
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
};

export const EmissionsCarbonFootprintCharts = withErrorBoundary(_EmissionsCarbonFootprintCharts, {
	FallbackComponent: props => <ErrorFallback {...props} />,
});
