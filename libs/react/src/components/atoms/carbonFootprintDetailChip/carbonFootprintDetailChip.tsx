import { clsx } from 'clsx';

export interface CarbonFootprintDetailChipProps {
	emissions: number;
	center?: boolean;
}

export const CarbonFootprintDetailChip = (props: CarbonFootprintDetailChipProps) => {
	const formatEmissions = (emissions: number) => {
		// if emissions is more than 1000, convert to kilotonnes and add 'k' to the end
		if (emissions >= 1000) {
			return `${(emissions / 1000).toFixed(0)}k`;
		} else {
			return emissions.toFixed(0);
		}
	};

	return (
		<div
			className={clsx('inline-flex flex-col px-2 py-1 items-center justify-center rounded-2xl bg-transparent', {
				'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2': props.center,
			})}>
			<span className={'text-h1 w-auto'}>{formatEmissions(props.emissions)}</span>
			<div className="text-caption text-center text-tc-primary whitespace-pre w-full">tCO2e</div>
		</div>
	);
};
