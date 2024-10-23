import { clsx } from 'clsx';
import { formatTonnes } from '../../../lib/footprintUtils';

export function FootprintDetailChip(props: { emissions: number; large?: boolean; center?: boolean }) {
	return (
		<div
			className={clsx('inline-flex px-2 py-1 items-center gap-2 rounded-2xl bg-bgc-accent', {
				'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2': props.center,
			})}>
			<div className="text-label text-tc-primary whitespace-pre">
				<span className={clsx({ 'font-bold text-base': props.large })}>{formatTonnes(props.emissions.toFixed(props.large ? 1 : 2))}</span> tCO2e
			</div>
		</div>
	);
}
