import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Card } from '../card';
import { motion } from 'framer-motion';

const scoreQuadrants = [
	{
		name: 'Seeker',
		bottom: 0,
		top: 24,
	},
	{
		name: 'Explorer',
		bottom: 25,
		top: 49,
	},
	{
		name: 'Adventurer',
		bottom: 50,
		top: 74,
	},
	{
		name: 'Trailblazer',
		bottom: 75,
		top: 100,
	},
];

interface Props {
	section_type: string;
	score: number;
	cardTitle?: string;
	containerClassName?: string;
	glow?: boolean;
}

export const SubcategoryJourneyPreview = ({ section_type, score, cardTitle, containerClassName, glow }: Props) => {
	const curScoreQuadrantIndex = scoreQuadrants.findIndex(s => score >= s.bottom && score <= s.top);

	return (
		<Card
			className={twMerge('gap-0 p-4 border-bgc-accent border rounded-lg w-[310px] text-white bg-bgc-elevated', containerClassName)}
			glow={!!glow}
			data-testid={'subcategory-journey-preview-' + section_type}>
			<div className={'flex h-[24px] w-full justify-start'}>
				<h4 className="font-bold text-sm">{cardTitle ?? section_type}</h4>
			</div>

			<div className="h-[12px] relative my-2 flex  w-full">
				<motion.div
					className={clsx('h-[8px] absolute rounded-lg top-[2px] left-[2px] right-[2px]', {
						'bg-gray-130': curScoreQuadrantIndex === 0,
						'bg-primary-100': curScoreQuadrantIndex === 1,
						'bg-primary-200': curScoreQuadrantIndex === 2,
						'bg-primary-300': curScoreQuadrantIndex === 3,
					})}
					initial={{
						width: 0,
					}}
					animate={{
						width: `calc(${score}% - 4px)`,
					}}
					transition={{
						duration: 0.5,
					}}
				/>
				<div className="bg-gray-30 flex-1 rounded-l-lg mr-0.5" />
				<div className="bg-gray-30 flex-1 mr-0.5" />
				<div className="bg-gray-30 flex-1 mr-0.5" />
				<div className="bg-gray-30 flex-1 rounded-r-lg" />
			</div>

			<div className="flex text-xs w-full">
				<div className="flex flex-1 rounded-lg justify-between py-1.5 px-2 bg-bgc-accent">
					<div>Estimated Compliance</div>
					<div>{score}%</div>
				</div>
			</div>
		</Card>
	);
};
