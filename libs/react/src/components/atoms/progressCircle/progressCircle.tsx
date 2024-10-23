import Circle from 'react-circle';
import { HexColors } from '@coldpbc/themes';

export interface ProgressCircleProps {
	color?: string;
	backgroundColor?: string;
	percentage?: number;
	radius?: number;
}

export const ProgressCircle = (props: ProgressCircleProps) => {
	const { color = 'white', percentage = 0, radius = 6, backgroundColor } = props;
	const svgSize = `${radius * 2}`;
	const lineWidth = radius * 8;
	return (
		<div
			className={'rounded-full rotate-90'}
			style={{
				width: `${radius * 2}px`,
				height: `${radius * 2}px`,
				backgroundColor: `${backgroundColor || HexColors.gray['20']}`,
			}}>
			<Circle
				animate={true}
				animationDuration="1s"
				progress={percentage}
				responsive={false}
				size={svgSize}
				lineWidth={lineWidth.toString()}
				progressColor={color}
				bgColor="transparent"
				showPercentage={false}
				showPercentageSymbol={false}
			/>
		</div>
	);
};
