import { ColorNames, DefaultHexColors } from '../enums/colors';

export const getTextColorStyle = (color: ColorNames) => {
	switch (color) {
		default:
		case ColorNames.primary:
			return `text-cold-primary`;
		case ColorNames.secondary:
			return `text-cold-secondary`;
		case ColorNames.alert:
			return `text-cold-alert`;
		case ColorNames.warning:
			return `text-cold-warning`;
		case ColorNames.success:
			return `text-cold-success`;
		case ColorNames.jetBlack:
			return `text-cold-jetBlack`;
		case ColorNames.starkWhite:
			return `text-cold-starkWhite`;
		case ColorNames.midnightBlue:
			return `text-cold-midnightBlue`;
		case ColorNames.charcoal:
			return `text-cold-charcoal`;
		case ColorNames.silver:
			return `text-cold-silver`;
		case ColorNames.fadeAwayGray:
			return `text-cold-fadeAwayGray`;
		case ColorNames.limestone:
			return `text-cold-limestone`;
		case ColorNames.astralYellow:
			return `text-cold-astralYellow`;
		case ColorNames.pineGreen:
			return `text-cold-pineGreen`;
		case ColorNames.lichenGreen:
			return `text-cold-lichenGreen`;
		case ColorNames.superiorBlue:
			return `text-cold-superiorBlue`;
		case ColorNames.skyBlue:
			return `text-cold-skyBlue`;
		case ColorNames.slate:
			return `text-cold-slate`;
		case ColorNames.red:
			return `text-cold-red`;
	}
};

export const getSVGColorStyle = (
	props: {
		color: ColorNames;
		stroke?: DefaultHexColors;
	} & React.SVGProps<SVGSVGElement>,
) => {
	let color: DefaultHexColors;
	let strokeColor: DefaultHexColors;
	switch (props.color) {
		default:
		case ColorNames.primary:
		case ColorNames.skyBlue:
			color = DefaultHexColors.skyBlue;
			strokeColor = props.stroke ? props.stroke : DefaultHexColors.skyBlue;
			break;
		case ColorNames.jetBlack:
			color = DefaultHexColors.jetBlack;
			strokeColor = props.stroke ? props.stroke : DefaultHexColors.jetBlack;
			break;
		case ColorNames.starkWhite:
			strokeColor = props.stroke ? props.stroke : DefaultHexColors.starkWhite;
			color = DefaultHexColors.starkWhite;
			break;
		case ColorNames.midnightBlue:
			color = DefaultHexColors.midnightBlue;
			strokeColor = props.stroke ? props.stroke : DefaultHexColors.midnightBlue;
			break;
		case ColorNames.charcoal:
			color = DefaultHexColors.charcoal;
			strokeColor = props.stroke ? props.stroke : DefaultHexColors.charcoal;
			break;
		case ColorNames.silver:
			color = DefaultHexColors.silver;
			strokeColor = props.stroke ? props.stroke : DefaultHexColors.silver;
			break;
		case ColorNames.fadeAwayGray:
			color = DefaultHexColors.fadeAwayGray;
			strokeColor = props.stroke ? props.stroke : DefaultHexColors.fadeAwayGray;
			break;
		case ColorNames.secondary:
		case ColorNames.limestone:
			color = DefaultHexColors.limestone;
			strokeColor = props.stroke ? props.stroke : DefaultHexColors.limestone;
			break;
		case ColorNames.warning:
		case ColorNames.astralYellow:
			color = DefaultHexColors.astralYellow;
			strokeColor = props.stroke ? props.stroke : DefaultHexColors.astralYellow;
			break;
		case ColorNames.success:
		case ColorNames.pineGreen:
			color = DefaultHexColors.pineGreen;
			strokeColor = props.stroke ? props.stroke : DefaultHexColors.pineGreen;
			break;
		case ColorNames.lichenGreen:
			color = DefaultHexColors.lichenGreen;
			strokeColor = props.stroke ? props.stroke : DefaultHexColors.lichenGreen;
			break;
		case ColorNames.superiorBlue:
			color = DefaultHexColors.superiorBlue;
			strokeColor = props.stroke ? props.stroke : DefaultHexColors.superiorBlue;
			break;
		case ColorNames.slate:
			color = DefaultHexColors.slate;
			strokeColor = props.stroke ? props.stroke : DefaultHexColors.slate;
			break;
		case ColorNames.alert:
		case ColorNames.red:
			color = DefaultHexColors.red;
			strokeColor = props.stroke ? props.stroke : DefaultHexColors.red;
			break;
	}

	return { color, strokeColor };
};

export const getBackgroundColorStyle = (color: ColorNames) => {
	switch (color) {
		default:
		case ColorNames.primary:
			return `bg-cold-primary`;
		case ColorNames.secondary:
			return `bg-cold-secondary`;
		case ColorNames.alert:
			return `bg-cold-alert`;
		case ColorNames.warning:
			return `bg-cold-warning`;
		case ColorNames.success:
			return `bg-cold-success`;
		case ColorNames.jetBlack:
			return `bg-cold-jetBlack`;
		case ColorNames.starkWhite:
			return `bg-cold-starkWhite`;
		case ColorNames.midnightBlue:
			return `bg-cold-midnightBlue`;
		case ColorNames.charcoal:
			return `bg-cold-charcoal`;
		case ColorNames.silver:
			return `bg-cold-silver`;
		case ColorNames.fadeAwayGray:
			return `bg-cold-fadeAwayGray`;
		case ColorNames.limestone:
			return `bg-cold-limestone`;
		case ColorNames.astralYellow:
			return `bg-cold-astralYellow`;
		case ColorNames.pineGreen:
			return `bg-cold-pineGreen`;
		case ColorNames.lichenGreen:
			return `bg-cold-lichenGreen`;
		case ColorNames.superiorBlue:
			return `bg-cold-superiorBlue`;
		case ColorNames.skyBlue:
			return `bg-cold-skyBlue`;
		case ColorNames.slate:
			return `bg-cold-slate`;
		case ColorNames.red:
			return `bg-cold-red`;
	}
};

export const getBorderColorStyle = (color: ColorNames) => {
	switch (color) {
		default:
		case ColorNames.primary:
			return `border-cold-primary`;
		case ColorNames.secondary:
			return `border-cold-secondary`;
		case ColorNames.alert:
			return `border-cold-alert`;
		case ColorNames.warning:
			return `border-cold-warning`;
		case ColorNames.success:
			return `border-cold-success`;
		case ColorNames.jetBlack:
			return `border-cold-jetBlack`;
		case ColorNames.starkWhite:
			return `border-cold-starkWhite`;
		case ColorNames.midnightBlue:
			return `border-cold-midnightBlue`;
		case ColorNames.charcoal:
			return `border-cold-charcoal`;
		case ColorNames.silver:
			return `border-cold-silver`;
		case ColorNames.fadeAwayGray:
			return `border-cold-fadeAwayGray`;
		case ColorNames.limestone:
			return `border-cold-limestone`;
		case ColorNames.astralYellow:
			return `border-cold-astralYellow`;
		case ColorNames.pineGreen:
			return `border-cold-pineGreen`;
		case ColorNames.lichenGreen:
			return `border-cold-lichenGreen`;
		case ColorNames.superiorBlue:
			return `border-cold-superiorBlue`;
		case ColorNames.skyBlue:
			return `border-cold-skyBlue`;
		case ColorNames.slate:
			return `border-cold-slate`;
		case ColorNames.red:
			return `border-cold-red`;
	}
};

export const getA11yTextColorStyle = (color: ColorNames) => {
	switch (color) {
		default:
		case ColorNames.primary:
			return `text-cold-primary-a11y`;
		case ColorNames.secondary:
			return `text-cold-secondary-a11y`;
		case ColorNames.alert:
			return `text-cold-alert-a11y`;
		case ColorNames.warning:
			return `text-cold-warning-a11y`;
		case ColorNames.success:
			return `text-cold-success-a11y`;
		case ColorNames.jetBlack:
			return `text-cold-jetBlack-a11y`;
		case ColorNames.starkWhite:
			return `text-cold-starkWhite-a11y`;
		case ColorNames.midnightBlue:
			return `text-cold-midnightBlue-a11y`;
		case ColorNames.charcoal:
			return `text-cold-charcoal-a11y`;
		case ColorNames.silver:
			return `text-cold-silver-a11y`;
		case ColorNames.fadeAwayGray:
			return `text-cold-fadeAwayGray-a11y`;
		case ColorNames.limestone:
			return `text-cold-limestone-a11y`;
		case ColorNames.astralYellow:
			return `text-cold-astralYellow-a11y`;
		case ColorNames.pineGreen:
			return `text-cold-pineGreen-a11y`;
		case ColorNames.lichenGreen:
			return `text-cold-lichenGreen-a11y`;
		case ColorNames.superiorBlue:
			return `text-cold-superiorBlue-a11y`;
		case ColorNames.skyBlue:
			return `text-cold-skyBlue-a11y`;
		case ColorNames.slate:
			return `text-cold-slate-a11y`;
		case ColorNames.red:
			return `text-cold-red-a11y`;
	}
};
