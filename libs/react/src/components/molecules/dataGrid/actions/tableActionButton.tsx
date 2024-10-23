import { BaseButton } from '../../../atoms/button/button';
import { ButtonTypes } from '@coldpbc/enums';
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid';

export interface TableActionButtonProps {
	onClick: () => void;
}

export const TableActionButton = (props: TableActionButtonProps) => {
	const { onClick } = props;

	return (
		<BaseButton onClick={onClick} variant={ButtonTypes.secondary}>
			<EllipsisHorizontalIcon className="w-[24px]" />
		</BaseButton>
	);
};
