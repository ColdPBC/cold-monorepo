import {
	AppContent,
	Card,
	CenterColumnContent,
	DismissableInfoCard,
	EmissionsCarbonFootprintCharts,
	EmissionsDonutChart,
	EmissionsDonutChartVariants,
	EmissionsYearlyCarbonFootprintChart,
	MainContent,
	Select,
} from '@coldpbc/components';
import React, { useContext } from 'react';
import { ColdEmissionsContext } from '@coldpbc/context';
import { isAxiosError } from 'axios';
import { useColdContext } from '@coldpbc/hooks';

export const EmissionsCarbonFootprintBase = () => {
	const { logBrowser } = useColdContext();
	const { data, setSelectedFacility, selectedFacility, isSingleYear, selectedYear, setSelectedYear } = useContext(ColdEmissionsContext);
	const { facilityOptions, yearOptions, emissions } = data;

	if (isAxiosError(emissions) && emissions?.response?.status === 404) {
		logBrowser('No emissions data found', 'error', { data }, data);
		return (
			<AppContent title="Carbon Footprint">
				<CenterColumnContent>
					<div className={'flex flex-col space-y-[35px]'}>
						<DismissableInfoCard
							text="Your footprint is a snapshot of the greenhouse gases your company emitted over a specific timeframe. It is measured in tons of carbon dioxide equivalent, expressed as tCO2e."
							onDismiss={() => {}}
							dismissKey="footprint-page"
						/>
						<Card>
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
					</div>
				</CenterColumnContent>
			</AppContent>
		);
	}

	const getFilters = () => {
		if (isSingleYear) {
			return <div className={'w-[218px] text-tc-disabled text-left text-body p-4 border-[1px] border-bgc-accent rounded-lg'}>{selectedYear.name}</div>;
		} else {
			return (
				<Select
					options={yearOptions}
					value={selectedYear.name}
					onChange={input => {
						setSelectedYear(input);
					}}
					name={'Year'}
					className={`w-[218px]`}
					buttonClassName={selectedYear.value !== 'all' ? 'border-white' : ''}
				/>
			);
		}
	};

	return (
		<MainContent>
			<div className={'flex flex-row justify-between py-[36px] fixed top-0 shadow-2xl bg-bgc-main z-10 w-[1129px]'}>
				<div className={'text-h1 text-tc-primary'}>Carbon Footprint</div>
				<div className={'flex flex-row gap-[5px]'}>
					<Select
						options={facilityOptions}
						value={selectedFacility.name}
						onChange={input => {
							setSelectedFacility(input);
						}}
						name={'Facility'}
						className={`w-[218px]`}
						buttonClassName={selectedFacility.value !== 'all' ? 'border-white' : ''}
					/>
					{getFilters()}
				</div>
			</div>
			<div className={'flex flex-col space-y-[35px] pt-[136px] justify-start w-full'}>
				{!isSingleYear && <EmissionsYearlyCarbonFootprintChart />}
				<EmissionsCarbonFootprintCharts />
			</div>
		</MainContent>
	);
};
