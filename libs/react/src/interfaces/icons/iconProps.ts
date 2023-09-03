import { DefaultHexColors } from '../../enums/colors';
import { IconNames } from '../../enums/iconNames';

export interface IconProps {
    name?: IconNames;
    color?: DefaultHexColors;
    strokeWidth?: number;
    className?: string;
}
