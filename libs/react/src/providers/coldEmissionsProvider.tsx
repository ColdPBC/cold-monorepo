import React, { PropsWithChildren, useEffect } from 'react';
import { useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { EmissionPayload, InputOption } from '@coldpbc/interfaces';
import { axiosFetcher } from '@coldpbc/fetchers';
import { Spinner } from '@coldpbc/components';
import { ErrorType } from '@coldpbc/enums';
import { ColdEmissionsContext } from '@coldpbc/context';
import { isAxiosError } from 'axios';
import { find, forEach, map, sortBy, uniq } from 'lodash';

export const ColdEmissionsProvider = ({ children }: PropsWithChildren) => {
	const { logError, logBrowser } = useColdContext();
	const { data, isLoading, error } = useOrgSWR<EmissionPayload, any>(['/footprints', 'GET'], axiosFetcher);
	const [isSingleYear, setIsSingleYear] = React.useState<boolean>(false);
	const [selectedFacility, setSelectedFacility] = React.useState<InputOption>({
		id: 0,
		name: 'All Facilities',
		value: 'all',
	});
	const [selectedYear, setSelectedYear] = React.useState<InputOption>({
		id: 0,
		name: 'All Years',
		value: 'all',
	});

	const yearOptions = Array<{
		id: number;
		name: string;
		value: string;
	}>();

	const facilityOptions = Array<{
		id: number;
		name: string;
		value: string;
	}>();

	facilityOptions.push({
		id: 0,
		name: 'All Facilities',
		value: 'all',
	});

	yearOptions.push({
		id: 0,
		name: 'All Years',
		value: 'all',
	});

	useEffect(() => {
		if (!data) return;
		const yearSet = new Set<number>();
		forEach(data, (facility, index) => {
			if (yearSet.size > 1 || (selectedFacility.value !== 'all' && selectedFacility.value !== facility.facility_id.toString())) {
				return;
			}
			forEach(facility.periods, (period, index) => {
				yearSet.add(period.value);
			});
		});
		if (yearSet.size === 1) {
			setIsSingleYear(true);
			const singleYearOption = find(yearOptions, { value: Array.from(yearSet)[0].toString() });
			setSelectedYear(
				singleYearOption || {
					id: 0,
					name: 'All Years',
					value: 'all',
				},
			);
		} else {
			setIsSingleYear(false);
			setSelectedYear({
				id: 0,
				name: 'All Years',
				value: 'all',
			});
		}
	}, [data, selectedFacility]);

	if (isLoading) {
		return <Spinner />;
	}

	if (error) {
		logBrowser('Error fetching emissions data', 'error', { error }, error);
		logError(error, ErrorType.SWRError);
		return null;
	}

	let uniqueScopes = Array<number>();

	if (isAxiosError(data) && data?.response?.status === 404) {
		logBrowser('No emissions data found', 'error', { data }, data);
	} else {
		const yearSet = new Set<number>();

		forEach(data, (facility, index) => {
			facilityOptions.push({
				id: index + 1,
				name: facility.facility_name,
				value: facility.facility_id,
			});
			forEach(facility.periods, (period, index) => {
				yearSet.add(period.value);
			});
		});

		uniqueScopes = uniq(
			map(data, facility => {
				return map(facility.periods, period => {
					return map(period.emissions, emission => {
						return emission.scope.ghg_category;
					}).flat();
				}).flat();
			}).flat(),
		).sort();

		forEach(sortBy(Array.from(yearSet)), (year, index) => {
			yearOptions.push({
				id: index + 1,
				name: `${year} Emissions`,
				value: year.toString(),
			});
		});
	}

	logBrowser('Emissions Provider', 'info', { data, uniqueScopes, facilityOptions, yearOptions });

	return (
		<ColdEmissionsContext.Provider
			value={{
				data: {
					emissions: data,
					uniqueScopes: uniqueScopes,
					facilityOptions: facilityOptions,
					yearOptions: yearOptions,
				},
				selectedYear: selectedYear,
				setSelectedYear: setSelectedYear,
				selectedFacility: selectedFacility,
				setSelectedFacility: setSelectedFacility,
				isSingleYear: isSingleYear,
			}}>
			{children}
		</ColdEmissionsContext.Provider>
	);
};
