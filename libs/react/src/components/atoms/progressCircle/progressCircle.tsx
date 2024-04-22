import Circle from 'react-circle';

export interface ProgressCircleProps {
  color?: string;
  percentage?: number;
  radius?: number;
}

export const ProgressCircle = (props: ProgressCircleProps) => {
  const { color = 'white', percentage = 0, radius = 6 } = props;
  const svgSize = `${radius * 2}`;
  const lineWidth = radius * 8;
  return (
    <div
      className={'rounded-full bg-gray-20 rotate-90'}
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
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
