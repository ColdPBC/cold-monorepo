import clsx from 'clsx';
import { motion } from 'framer-motion';

export type GlowPosition = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'centerRight' | 'centerLeft';

interface Props {
	icon: JSX.Element;
	title: string;
	value: string | number | null;
	unitLabel?: string;
	glowPosition: GlowPosition;
}

export const TemperatureCheckItem = ({ icon, title, value, unitLabel, glowPosition }: Props) => {
	return (
		<div className="relative z-0 overflow-hidden rounded-lg">
			<div className="bg-bgc-accent w-full h-full absolute z-[-1] rounded-lg absolute" />
			<motion.div
				className={clsx('z-[-1] justify-center flex items-center absolute pointer-events-none', {
					'bottom-[-60px] left-[-65px] w-[120px] h-[120px]': glowPosition === 'bottomLeft',
					'top-[-60px] left-[-65px] w-[120px] h-[120px]': glowPosition === 'topLeft',
					'bottom-[-60px] right-[-35px] w-[120px] h-[120px]': glowPosition === 'bottomRight',
					'top-[-60px] right-[-35px] w-[120px] h-[120px]': glowPosition === 'topRight',
					'top-[50%] right-[0px] h-[10px] w-[10px] transform -translate-y-1/2': glowPosition === 'centerRight',
					'top-[50%] left-[-10px] h-[10px] w-[10px] transform -translate-y-1/2': glowPosition === 'centerLeft',
				})}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}>
				<div
					className={clsx('shrink-0 rounded-[200px] bg-gradient-to-l from-primary via-primary via-[36.46%] to-bgc-accent', {
						'w-[120px] h-[120px] opacity-80 blur-[12px]': ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].includes(glowPosition),
						'w-[40px] h-[40px] opacity-100 blur-[6px]': ['centerRight', 'centerLeft'].includes(glowPosition),
					})}
				/>
			</motion.div>
			<div className="z-[2] bg-bgc-elevated h-[calc(100%-2px)] m-[1px] rounded-lg p-4 text-white flex flex-col items-center">
				<span className="text-xs mb-1 font-medium">{title}</span>
				<div className="flex items-center">
					<span className="mr-1">{icon}</span>
					<div className="flex items-end">
						<span className={clsx('font-bold text-xl leading-none', { 'mr-1': unitLabel })}>{value !== null ? value : '-'}</span>
						<span className="text-xs font-medium leading-4">{unitLabel}</span>
					</div>
				</div>
			</div>
		</div>
	);
};
