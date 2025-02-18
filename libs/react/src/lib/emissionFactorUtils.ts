import {EmissionFactorDisplay, MaterialEmissionFactor} from "@coldpbc/interfaces";


export const getAggregateEmissionFactors = (materialEmissionFactors: MaterialEmissionFactor[] | undefined): EmissionFactorDisplay | null => {
  if (materialEmissionFactors === undefined || materialEmissionFactors.length === 0) {
    return null;
  }

  // get the sum of all emission factors
  const sum = materialEmissionFactors.reduce((acc, materialEmissionFactor) => acc + materialEmissionFactor.emissionFactor.value, 0);
  return {
    value: sum,
    emissionFactors: materialEmissionFactors.map(mef => mef.emissionFactor),
  }
}
