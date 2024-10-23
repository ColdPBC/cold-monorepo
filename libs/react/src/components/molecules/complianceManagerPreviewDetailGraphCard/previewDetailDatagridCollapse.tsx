import { Table } from 'flowbite-react';
import React, { useState } from 'react';
import { darkTableTheme, HexColors } from '@coldpbc/themes';
import { ColdIcon } from '@coldpbc/components';
import { IconNames } from '@coldpbc/enums';

export const PreviewDetailDatagridCollapse = ({
	definition,
	data,
	selectedRow,
	setSelectedRow,
}: {
	definition: {
		field: string;
		headerTitle: string;
		headerStyle: string;
	}[];
	data: {
		title: string;
		sections: {
			title: string;
			score: number;
			max_score: number;
			ai_score: number;
		}[];
		score: number;
		max_score: number;
		ai_score: number;
	};
	selectedRow: string | null;
	setSelectedRow: (selectedRow: string | null) => void;
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const getScoreTableCell = (index: number) => {
		let score = 0;
		let max_score = 0;
		if (index === -1) {
			score = data.score;
			max_score = data.max_score;
		} else {
			score = data.sections[index].score;
			max_score = data.sections[index].max_score;
		}
		const ratio = `${score.toFixed(1)}/${max_score.toFixed(1)}`;
		return (
			<Table.Cell theme={darkTableTheme.table?.body?.cell} className={getCellClassName(index, 'points')}>
				<div className={'w-full flex flex-row items-center'}>
					<div className={'min-w-[80px] max-w-[80px]'}>{ratio}</div>
					{score > 0 && (
						<div className={'w-full flex items-center'}>
							<div
								style={{
									width: `${(score / max_score) * 100}%`,
									height: '4px',
									backgroundColor: HexColors.green['200'],
									borderRadius: '16px',
								}}></div>
						</div>
					)}
				</div>
			</Table.Cell>
		);
	};

	const getCellClassName = (index: number, field: string) => {
		let className = 'cursor-pointer';

		if (field === 'title') {
			className += ' flex flex-row items-center';
			if (index !== -1) {
				className += ' pl-[30px] text-ellipsis';
			} else {
				className += ' font-bold text-ellipsis';
			}
		}
		if (isRowSelected(index)) {
			className += ' bg-gray-70';
		}

		if (isRowSelected(index) && field === 'title' && index === -1) {
			className += ' px-0 py-0 pr-4';
		}

		return className + definition.find(def => def.field === field)?.headerStyle;
	};

	const isRowSelected = (index: number) => {
		if (index === -1) {
			return selectedRow === data.title;
		} else {
			return selectedRow === data.sections[index]?.title;
		}
	};

	const getTopicAreaCell = (index: number) => {
		const title = index === -1 ? data.title : data.sections[index].title;
		return (
			<Table.Cell theme={darkTableTheme.table?.body?.cell} className={getCellClassName(index, 'title')}>
				{isRowSelected(index) && index === -1 && <div className={'h-[51px] w-[4px]'} style={{ backgroundColor: HexColors.primary.DEFAULT }}></div>}
				<div className={'w-full truncate ' + (isRowSelected(index) && index === -1 && 'ml-3')}>{title}</div>
				{index === -1 && (isOpen ? <ColdIcon name={IconNames.ColdChevronUpIcon} /> : <ColdIcon name={IconNames.ColdChevronDownIcon} />)}
			</Table.Cell>
		);
	};

	// if the data.max_score is 0, return null
	if (data.max_score === 0) {
		return null;
	}

	return (
		<>
			<Table.Row theme={darkTableTheme.table?.row} onMouseEnter={() => setSelectedRow(data.title)} onMouseLeave={() => setSelectedRow(null)} onClick={() => setIsOpen(!isOpen)}>
				{getTopicAreaCell(-1)}
				{getScoreTableCell(-1)}
			</Table.Row>
			{isOpen &&
				data.sections
					.filter(
						// remove sections with max_score 0
						section => section.max_score > 0,
					)
					.map((section, index) => {
						return (
							<Table.Row className={'w-full'} theme={darkTableTheme.table?.row} onMouseEnter={() => setSelectedRow(section.title)} onMouseLeave={() => setSelectedRow(null)}>
								{getTopicAreaCell(index)}
								{getScoreTableCell(index)}
							</Table.Row>
						);
					})}
		</>
	);
};
