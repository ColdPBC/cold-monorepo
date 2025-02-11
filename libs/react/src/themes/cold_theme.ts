import { DefaultHexColors } from '../enums/colors';
import { set } from 'lodash';

// Core color palette from Turtle design project July - Aug 2023
const FoundationalHexColors = {
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    '05': '#080912',
    '10': '#0A0B10',
    '20': '#14151F',
    '30': '#1F202E',
    '40': '#292A3D',
    '50': '#33354C',
    '60': '#3D405C',
    '70': '#474B6B',
    '80': '#51567B',
    '90': '#656C9A',
    '100': '#8489AE',
    '110': '#A3A6C2',
    '120': '#C2C4D6',
    '130': '#E0E1EA',
  },
  primary: {
    DEFAULT: '#485CEA',
    '100': '#99A2E6',
    '200': '#707DDB',
    '300': '#485CEA',
  },
  lightblue: {
    DEFAULT: '#31B5FF',
    DEFAULT_BRIGHTEN: '#6ECBFF',
    '100': '#99DAFF',
    '200': '#66C8FF',
    '300': '#31B5FF',
    '400': '#00A3FF',
    '500': '#0083CC',
    '600': '#006299',
    '700': '#005280',
    '800': '#004166',
    '900': '#00314D',
    '1000': '#002133',
  },
  yellow: {
    DEFAULT: '#FCE500',
    '100': '#FFF8B2',
    '200': '#FFF166',
    '300': '#FCE500',
    '400': '#E0CB00',
    '500': '#C7B400',
    '600': '#AD9D00',
    '700': '#948600',
    '800': '#7A6F00',
    '900': '#615800',
    '1000': '#474100',
  },
  green: {
    DEFAULT: '#00F16A',
    DEFAULT_BRIGHTEN: '#4CF596',
    '100': '#B2FFD4',
    '200': '#66FFA9',
    '300': '#00F16A',
    '400': '#00CC5A',
    '500': '#00B24F',
    '600': '#009943',
    '700': '#008038',
    '800': '#00662D',
    '900': '#004D22',
    '1000': '#003316',
  },
  teal: {
    DEFAULT: '#00E0CB',
    DEFAULT_BRIGHTEN: '#4CE9DA',
    '100': '#ADFFF7',
    '200': '#47FFEE',
    '300': '#00E0CB',
    '400': '#00AD9D',
    '500': '#009486',
    '600': '#007A6F',
    '700': '#006158',
    '800': '#004741',
    '900': '#002E2A',
    '1000': '#001F1C',
  },
  purple: {
    DEFAULT: '#A15EE5',
    DEFAULT_BRIGHTEN: '#BD8EEC',
    '100': '#E0CAF6',
    '200': '#C79EEF',
    '300': '#A15EE5',
    '400': '#8C39DF',
    '500': '#7721CE',
    '600': '#631CAB',
    '700': '#4F1688',
    '800': '#3A1065',
    '900': '#260A42',
    '1000': '#19072C',
  },
  red: {
    DEFAULT: '#FD022F',
    '100': '#FE6782',
    '200': '#FD3559',
    '300': '#FD022F',
  },
};

// Colors as defined for specific usages
export const HexColors = {
  ...FoundationalHexColors,
  bgc: {
    main: '#080912',
    elevated: '#14161F',
    accent: '#282C3E',
    backdrop: '#080912B3', // Has 70% alpha
    menu: '#3C425D',
  },
  tc: {
    primary: FoundationalHexColors.white,
    secondary: FoundationalHexColors.gray['130'],
    disabled: FoundationalHexColors.gray['110'],
    success: FoundationalHexColors.green['300'],
    warning: FoundationalHexColors.yellow['300'],
    critical: FoundationalHexColors.red['300'],
    onaccent: FoundationalHexColors.gray['10'],
    link: {
      primary: {
        DEFAULT: FoundationalHexColors.primary['300'], // rgba(72, 92, 234, 1)
        press: FoundationalHexColors.primary['200'], // rgba(112, 125, 219, 1)
      },
      secondary: {
        DEFAULT: FoundationalHexColors.gray['120'], // rgba(194, 196, 214, 1)
        press: FoundationalHexColors.white, // rgba(255, 255, 255, 1)
      },
    },
    linkPrimaryDefault: FoundationalHexColors.primary['300'], // rgba(72, 92, 234, 1)
    linkPrimaryPress: FoundationalHexColors.primary['200'], // rgba(112, 125, 219, 1)
    linkSecondaryDefault: FoundationalHexColors.gray['120'], // rgba(194, 196, 214, 1)
    linkSecondaryPress: FoundationalHexColors.white, // rgba(255, 255, 255, 1)
  },
  link: {
    primary: {
      DEFAULT: FoundationalHexColors.primary['300'],
      press: FoundationalHexColors.primary['200'],
    },
    secondary: {
      DEFAULT: FoundationalHexColors.gray['120'],
      press: FoundationalHexColors.white,
    },
  },
};

export function hexAToRGBA(hex: string, addAlpha: boolean) {
  let color = hex.replace(/#/g, '');

  if (color.length === 6 && addAlpha) {
    color = `${color}FF`;
  }

  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);

  if (color.length === 8) {
    let a = parseInt(color.substr(6, 2), 16);
    a = +(a / 255).toFixed(3);

    return { r, g, b, a };
  } else {
    return { r, g, b };
  }
}

export function hslaToRGBA(h: number, s: number, l: number, a?: number) {
  // Must be fractions of 1
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  if (a) a = Math.round(a);

  return { r, g, b, a };
}

function toString(values: { hsla?: { h: number; s: number; l: number; a?: number }; rgba?: { r: number; g: number; b: number; a?: number } }) {
  const { hsla, rgba } = values;

  if (rgba && hsla) {
    return {
      hslaString: hsla.a ? `hsla(${hsla.h},${hsla.s.toFixed(0)}%,${hsla.l.toFixed(0)}%,${hsla.a})` : `hsla(${hsla.h},${hsla.s.toFixed(0)}%,${hsla.l.toFixed(0)}%`,
      rgbaString: rgba.a ? `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})` : `rgba(${rgba.r},${rgba.g},${rgba.b})`,
    };
  }

  if (hsla) {
    return hsla.a ? `hsla(${hsla.h},${hsla.s.toFixed(0)}%,${hsla.l.toFixed(0)}%,${hsla.a})` : `hsla(${hsla.h},${hsla.s.toFixed(0)}%,${hsla.l.toFixed(0)}%`;
  }

  if (rgba) {
    return rgba.a ? `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})` : `rgba(${rgba.r},${rgba.g},${rgba.b})`;
  }

  return '';
}

export function rgbaToHex(rgba: { r: number; g: number; b: number; a?: number }) {
  const red = rgba.r.toString(16).padStart(2, '0');
  const green = rgba.g.toString(16).padStart(2, '0');
  const blue = rgba.b.toString(16).padStart(2, '0');

  let alpha;

  if (rgba.a) {
    alpha = Math.round(rgba.a * 255)
      .toString(16)
      .padStart(2, '0');

    return `#${red}${green}${blue}${alpha}`;
  } else {
    return `#${red}${green}${blue}`;
  }
}

/***
 * Returns a color object with variants
 * @param hex
 * @param addAlpha
 */
export function convert(hex: string | DefaultHexColors, addAlpha: boolean) {
  const rgba = hexAToRGBA(hex, addAlpha);
  const hsla = hexAToHSLA(hex, addAlpha);
  const formats = {
    hexA: hex,
    rgba: {
      ...rgba,
    },
    hsla: {
      ...hsla,
    },
  };

  if (hsla.a) {
    set(
      formats.hsla,
      'hslaString',
      toString({
        hsla: {
          h: hsla.h,
          s: hsla.s,
          l: hsla.l,
          a: hsla.a,
        },
        rgba: {
          r: rgba.r,
          g: rgba.g,
          b: rgba.b,
          a: rgba.a,
        },
      }),
    );
  }

  return formats;
}

/***
 * Returns the color that is most visible when placed on top of the given color
 * @param rgba
 */
export function getAccessibleColor(rgba: { r: number; g: number; b: number; a?: number }) {
  const yiq = (rgba.r * 299 + rgba.g * 587 + rgba.b * 114) / 1000;
  return yiq >= 128 ? DefaultHexColors.jetBlack : DefaultHexColors.fadeAwayGray;
}

/////////////////////////////////////////////////////////////////////
// Change hex color into RGB
/////////////////////////////////////////////////////////////////////
export function dynamicHsl(h: string | number, s: string | number, l: string | number) {
  return ({ opacityVariable, opacityValue }: any) => {
    if (opacityValue !== undefined) {
      return `hsla(${h},${s},${l},${opacityValue})`;
    }
    if (opacityVariable !== undefined) {
      return `hsla(${h},${s},${l},${opacityVariable},1)`;
    }
    return `hsl(${h},${s},${l})`;
  };
}

export function generateVariants(hexColor: string, addAlpha = false): any {
  const variants = {
    DEFAULT: '',
    a11y: '',
  };

  // Convert to HSLA & RGBA
  const formats = convert(hexColor, addAlpha);
  const { hsla, rgba } = formats;

  variants.DEFAULT = hexColor;
  variants.a11y = getAccessibleColor(rgba);

  const lightValues = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9];

  // Generate variants by adjusting the lightness property of the color
  lightValues.map((value, idx) => {
    const converted = {
      rgba: hslaToRGBA(hsla.h, hsla.s, hsla.l * value, hsla.a),
    };
    const a11y = getAccessibleColor(converted.rgba);
    const DEFAULT = toString({ rgba: converted.rgba });
    set(variants, `${(idx + 1) * 10}`, { a11y, DEFAULT });
  });

  return variants;
}

export function hexAToHSLA(hex: string, addAlpha: boolean) {
  // Convert hex to RGB first
  // eslint-disable-next-line prefer-const
  let { r, g, b, a } = hexAToRGBA(hex, addAlpha);
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  const cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin;
  let h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return { h, s, l, a };
}

/***
 * Convert RGBA to HSLA
 * @param r
 * @param g
 * @param b
 * @param a
 * @constructor
 */
export function RGBToHSL(r: number, g: number, b: number, a: number) {
  r /= 255;
  g /= 255;
  b /= 255;

  // Find channel max and min values values
  const cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin;
  let h = 0,
    s = 0,
    l = 0;

  // No difference in hue
  if (delta == 0) {
    h = 0;
  } else if (cmax == r) {
    h = ((g - b) / delta) % 6;
  } else if (cmax == g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);
  a = +(a / 255).toFixed(3);

  return { h, s, l: l.toFixed(0), a };
}

export function withOpacity(variableName: string) {
  return ({ opacityValue }: any) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

export interface IColorProps {
  DEFAULT: string;
  10: string;
  20: string;
  30: string;
  40: string;
  50: string;
  60: string;
  70: string;
  80: string;
  90: string;
  110: string;
  120: string;
  130: string;
  140: string;
  150: string;
  160: string;
  170: string;
  180: string;
  190: string;
  a11y: string;
}

export interface IThemeColorProps {
  [t: string]: IColorProps;
}

const changeLightness = (hex: string, lpct: number) => {
  const hover = hexAToHSLA(hex, true);
  return `hsla(${hover.h}, ${hover.s}%, ${hover.l + 10}%, ${hover.a})`;
};

export const themeColors = (): any => {
  const theme = {
    ...HexColors,
  };

  return theme;
};

export const fontSizes = (): any => {
  return {
    h1: [
      '2.5rem',
      {
        lineHeight: '3.75rem',
        letterSpacing: '0.025rem',
        fontWeight: 700,
      },
    ],
    h2: [
      '2rem',
      {
        lineHeight: '3rem',
        fontWeight: 700,
      },
    ],
    h3: [
      '1.5rem',
      {
        lineHeight: '2.25rem',
        fontWeight: 700,
      },
    ],
    h4: [
      '1.25rem',
      {
        lineHeight: '1.875rem',
        fontWeight: 700,
      },
    ],
    h5: [
      '1.125rem',
      {
        lineHeight: '1.6875rem',
        fontWeight: 600,
      },
    ],
    body: [
      '0.875rem',
      {
        lineHeight: '1.3125rem',
        fontWeight: 400,
      },
    ],
    label: [
      '0.625rem',
      {
        lineHeight: '0.9375rem',
        fontWeight: 500,
      },
    ],
    eyebrow: [
      '0.75rem',
      {
        lineHeight: '0.75rem',
        fontWeight: 500,
      },
    ],
    button: [
      '0.875rem',
      {
        lineHeight: '1.313rem',
        fontWeight: 600,
      },
    ],
    caption: [
      '0.75rem',
      {
        lineHeight: '1.125rem',
        fontWeight: 400,
      },
    ],
  };
};

export const getSchemeForColor = (scheme: { [key: string]: string }) => {
  return [scheme['100'], scheme['200'], scheme['300'], scheme['400'], scheme['500'], scheme['600'], scheme['700'], scheme['800'], scheme['900'], scheme['1000']];
};

export const footprintSubcategoryColors: {
  [key: string]: 'lightblue' | 'purple' | 'green' | 'teal';
} = {
  facilities: 'lightblue',
  travel: 'purple',
  operations: 'green',
  product: 'teal',
};
