import { Card, ColdInfoIcon, ErrorFallback } from '@coldpbc/components';
import { get } from 'lodash';
import React, { useContext } from 'react';
import { ColdComplianceManagerContext } from '@coldpbc/context';
import { motion } from 'framer-motion';
import { HexColors } from '@coldpbc/themes';
import opacity from 'hex-color-opacity';
import { Tooltip } from 'flowbite-react';
import { withErrorBoundary } from 'react-error-boundary';
import { isAxiosError } from 'axios';

const _ComplianceManagerPreviewOverallGraphCard = () => {
	const { data } = useContext(ColdComplianceManagerContext);
	const { complianceCounts, compliance } = data;
	const AI_SCORE = get(complianceCounts, 'data.estimated_score', 0);
	const ORG_SCORE = get(complianceCounts, 'data.score', 0);
	const MAX_SCORE = get(complianceCounts, 'data.max_score', 0);
	const TARGET_SCORE = get(compliance, 'metadata.target_score', undefined);

	const getOrgScoreBarChart = () => {
		const percentageWidth = (ORG_SCORE / MAX_SCORE) * 100;
		return (
			<div className={'w-full h-[16px] flex flex-row gap-[8px] items-center'}>
				{ORG_SCORE > 0 && (
					<motion.div
						style={{
							width: `${percentageWidth}%`,
							height: '100%',
							backgroundImage: `linear-gradient(to right, ${opacity(HexColors.green['200'], 0.2)} 0%, ${opacity(HexColors.green['200'], 0.4)} 100%)`,
							// 1 px border with color green 200
							border: `1px solid ${HexColors.green['200']}`,
							// right border radius 16px
							borderTopRightRadius: '16px',
							borderBottomRightRadius: '16px',
						}}
					/>
				)}
				<div className={'text-label text-green-200'}>Complete ({ORG_SCORE.toFixed(0)})</div>
			</div>
		);
	};

	const getAIScoreBarChart = () => {
		const percentageWidth = (AI_SCORE / MAX_SCORE) * 100;
		return (
			<div className={'w-full h-[16px] flex flex-row gap-[8px] items-center'}>
				{AI_SCORE > 0 && (
					<motion.div
						style={{
							width: `${percentageWidth}%`,
							height: '100%',
							backgroundImage: `linear-gradient(to right, ${opacity(HexColors.yellow['200'], 0.2)} 0%, ${opacity(HexColors.yellow['200'], 0.4)} 100%)`,
							border: `1px dashed ${HexColors.yellow['200']}`,
							borderTopRightRadius: '16px',
							borderBottomRightRadius: '16px',
						}}
					/>
				)}
				<div className={'text-label text-yellow-200'}>Cold AI ({AI_SCORE.toFixed(0)})</div>
			</div>
		);
	};

	const getPercentage = () => {
		const percentage = MAX_SCORE === 0 ? 0 : (ORG_SCORE / MAX_SCORE) * 100;
		return percentage.toFixed(0) + '%';
	};

	const getBarChartXAxis = () => {
		if (TARGET_SCORE === undefined) {
			return (
				<div className={'w-full flex flex-row items-center text-tc-disabled text-label gap-[4px]'}>
					<div className={'text-nowrap text-red-100'}>Lower Score</div>
					<div
						className={'w-full h-[1px]'}
						style={{
							backgroundImage: `linear-gradient(to right, ${HexColors.red['100']} 0%, ${HexColors.yellow['300']} 50%, ${HexColors.green['200']} 75%, ${HexColors.green['300']} 100%)`,
						}}></div>
					<div className={'text-nowrap text-green'}>Higher Score</div>
				</div>
			);
		} else {
			return (
				<div className={'w-full flex flex-row justify-between text-tc-disabled text-label'}>
					<div>Lower Score</div>
					<div>Higher Score</div>
				</div>
			);
		}
	};

	const getTargetScoreIndicator = () => {
		if (TARGET_SCORE === undefined || MAX_SCORE === 0) {
			return null;
		}

		return (
			<div
				className={'flex-col text-label text-white relative'}
				style={{
					position: 'absolute',
					left: `${(TARGET_SCORE / MAX_SCORE) * 100}%`,
					top: '-62px',
				}}>
				<div className={'h-[62px] w-[2px] rounded-[16px] bg-white'}></div>
				<div className={'text-nowrap absolute -right-[25px]'}>Target ({TARGET_SCORE.toFixed(0)})</div>
			</div>
		);
	};

	if (isAxiosError(complianceCounts?.data)) {
		return null;
	}

	return (
		<Card className={'flex flex-row space-x-[25px] bg-bgc-elevated'} glow={false}>
			<div className={'w-full'}>
				<div className={'text-h5 w-full'}>Overall Performance</div>
				<div className={'h-[68px] py-[18px] w-full flex flex-col gap-[8px] border-x-[1px] border-b-[1px] border-gray-50 mb-[3px]'}>
					{getOrgScoreBarChart()}
					{getAIScoreBarChart()}
				</div>
				<div className={'w-full relative flex flex-row justify-between text-tc-disabled text-label'}>
					<div>0</div>
					{getTargetScoreIndicator()}
					<div>100%</div>
				</div>
				{getBarChartXAxis()}
			</div>
			<div className={'bg-gray-30 relative rounded-[16px] p-[24px] w-[155px] text-tc-primary flex flex-col'}>
				<div className={'w-full text-body text-center'}>Estimated Assessment</div>
				<div className={'w-full text-h1 text-center'}>{getPercentage()}</div>
				<Tooltip
					className={'bg-gray-50 border-[1px] border-gray-60 p-[8px] text-tc-primary text-body transition-none'}
					content={'This shows your score based on how Cold AI has answered these questions.'}
					arrow={false}
					animation={false}>
					<div className={'absolute top-[8px] right-[8px]'}>
						<ColdInfoIcon color={HexColors.tc.disabled} />
					</div>
				</Tooltip>
			</div>
		</Card>
	);
};

export const ComplianceManagerPreviewOverallGraphCard = withErrorBoundary(_ComplianceManagerPreviewOverallGraphCard, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in ComplianceManagerPreviewOverallGraphCard: ', error);
	},
});
