import { hexAToRGBA, rgbaToHex } from '@coldpbc/themes';

// Convenience function for getting a value along a gradient
export function pickGradientValue(
  hexColor1: string,
  hexColor2: string,
  percent: number,
) {
  const w2 = percent;
  const w1 = 1 - w2;

  const color1 = hexAToRGBA(hexColor1, false);
  const color2 = hexAToRGBA(hexColor2, false);

  return rgbaToHex({
    r: Math.round(color1.r * w1 + color2.r * w2),
    g: Math.round(color1.g * w1 + color2.g * w2),
    b: Math.round(color1.b * w1 + color2.b * w2),
  });
}
