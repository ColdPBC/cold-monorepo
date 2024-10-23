import { GlobalSizes } from '../enums/sizes';
import { IButtonProps } from '../interfaces/buttons/baseButton';

export const getButtonSize = (props: IButtonProps) => {
	switch (props.size) {
		case GlobalSizes.xxxSmall:
			return `px-1 py-1.5 text-xs`;
		case GlobalSizes.xxSmall:
			return `px-1.5 py-2 text-xs`;
		case GlobalSizes.xSmall:
			return `px-2 py-2.5 text-xs`;
		case GlobalSizes.small:
			return `px-2.5 py-3 text-sm`;
		default:
		case GlobalSizes.medium:
			return `px-3 py-3.5 text-md`;
		case GlobalSizes.large:
			return `px-3.5 py-3.5 text-lg`;
		case GlobalSizes.xLarge:
			return `px-3.5 py-3.5 text-xl`;
		case GlobalSizes.xxLarge:
			return `px-3.5 py-3.5 text-2xl`;
		case GlobalSizes.xxxLarge:
			return `px-3.5 py-3.5 text-3xl`;
	}
};

export const getSizeStyle = (size: GlobalSizes) => {
	switch (size) {
		case GlobalSizes.xxxSmall:
			return 'w-4 h-4';
		case GlobalSizes.xxSmall:
			return 'w-6 h-6';
		case GlobalSizes.xSmall:
			return 'w-8 h-8';
		case GlobalSizes.small:
			return 'w-10 h-10';
		default:
		case GlobalSizes.medium:
			return 'w-16 h-16';
		case GlobalSizes.large:
			return 'w-24 h-24';
		case GlobalSizes.xLarge:
			return 'w-32 h-32';
		case GlobalSizes.xxLarge:
			return 'w-48 h-48';
		case GlobalSizes.xxxLarge:
			return 'w-64 h-64';
	}
};
