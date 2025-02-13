import { ProductMaterial, ProductMaterialForWeightCalculation } from '../interfaces';
import { Area, Count, Length, Weight, WeightFactorUnits } from '../enums';
import numeral from 'numeral';

const GRAMS_TO_KG = 0.001;
const GLOBAL_PIECES_WEIGHT_FACTOR = 3 * GRAMS_TO_KG;

const LENGTH_TO_M = {
	[Length.in]: 0.0254,
	[Length.ft]: 0.3048,
	[Length.yd]: 0.9144,
	[Length.m]: 1.0,
};

const AREA_TO_M2 = {
	[Area.in2]: LENGTH_TO_M[Length.in] * LENGTH_TO_M[Length.in],
	[Area.ft2]: LENGTH_TO_M[Length.ft] * LENGTH_TO_M[Length.ft],
	[Area.yd2]: LENGTH_TO_M[Length.yd] * LENGTH_TO_M[Length.yd],
	[Area.m2]: LENGTH_TO_M[Length.m] * LENGTH_TO_M[Length.m],
};

export type WeightResult = {
	weightInKg: number;
	displayWeight: string;
	explanation?: string;
};

export type WeightError = {
	error: string;
};

export type CalculatedWeightResult = WeightResult | WeightError;

const formatGrams = (weightInKg: number): string => {
	const roundedGrams = Math.round(weightInKg * 1000);
	return `${numeral(roundedGrams).format('0,0')} g`;
};

export const getCalculatedWeight = (productMaterial: ProductMaterialForWeightCalculation): CalculatedWeightResult => {
  if (typeof productMaterial.weight === 'number') {
		return {
			weightInKg: productMaterial.weight,
			displayWeight: formatGrams(productMaterial.weight),
		};
	}

	const unitOfMeasure = productMaterial.unitOfMeasure;

	if (!(typeof productMaterial.yield === 'number') || !unitOfMeasure) {
		return {
			error: 'Missing yield or unit of measure',
		};
	}

	let weightFactor: number | undefined;

	if (unitOfMeasure === 'pcs') {
		const weightFactorOverride = productMaterial.material.weightFactorUnitOfMeasure === WeightFactorUnits.KG_PER_PCS ? productMaterial.material.weightFactor : undefined;
		weightFactor = weightFactorOverride || GLOBAL_PIECES_WEIGHT_FACTOR;
	} else {
		const weightFactorOverride = productMaterial.material.weightFactorUnitOfMeasure === WeightFactorUnits.KG_PER_M2 ? productMaterial.material.weightFactor : undefined;
		weightFactor = weightFactorOverride || productMaterial.material.materialClassification?.weightFactor;
	}

	if (!weightFactor) {
		return {
			error: 'Missing weight factor. Add a weight factor to the material or classify the material for an estimated weight factor.',
		};
	}

	switch (unitOfMeasure) {
		case Weight.kg:
			return {
				weightInKg: productMaterial.yield,
				displayWeight: formatGrams(productMaterial.yield),
			};
		case Count.pcs:
			return calculateWeightFromPieces(productMaterial.yield, weightFactor);
		case Area.in2:
		case Area.ft2:
		case Area.yd2:
		case Area.m2:
			return calculateWeightFromArea(productMaterial.yield, unitOfMeasure, weightFactor);
		case Length.in:
		case Length.ft:
		case Length.yd:
		case Length.m:
			return calculateWeightFromLength(productMaterial.yield, unitOfMeasure, productMaterial.material.width, productMaterial.material.widthUnitOfMeasure, weightFactor);
		default:
			return { error: `Cannot estimate weight for unit of measure: ${unitOfMeasure}` };
	}
};

const calculateWeightFromPieces = (yieldValue: number, weightFactor: number): WeightResult => {
	const weightInKg = yieldValue * weightFactor;
	return {
		weightInKg,
		displayWeight: formatGrams(weightInKg),
		explanation: `Weight estimated using a yield of ${yieldValue} pieces and a weight factor of ${weightFactor.toFixed(3)} kg per piece`,
	};
};

const calculateWeightFromArea = (yieldValue: number, unitOfMeasure: Area, weightFactor: number): WeightResult => {
	const weightInKg = yieldValue * AREA_TO_M2[unitOfMeasure] * weightFactor;
	return {
		weightInKg,
		displayWeight: formatGrams(weightInKg),
		explanation: `Weight estimated using a yield of ${yieldValue.toFixed(2)} ${unitOfMeasure} and a weight factor of ${weightFactor.toFixed(3)} kg per m2`,
	};
};

const calculateWeightFromLength = (
	yieldValue: number,
	unitOfMeasure: Length,
	width: number | null,
	widthUnitOfMeasure: Length | null,
	weightFactor: number,
): WeightResult | WeightError => {
	if (!width || !widthUnitOfMeasure) {
		return {
			error: 'Missing width or width unit of measure',
		};
	}

	const weightInKg = yieldValue * LENGTH_TO_M[unitOfMeasure] * width * LENGTH_TO_M[widthUnitOfMeasure] * weightFactor;
	return {
		weightInKg,
		displayWeight: formatGrams(weightInKg),
		explanation: `Weight estimated using a yield of ${yieldValue.toFixed(2)} ${unitOfMeasure}, a width of ${width.toFixed(
			2,
		)} ${widthUnitOfMeasure}, and a weight factor of ${weightFactor.toFixed(3)} kg per m2`,
	};
};
