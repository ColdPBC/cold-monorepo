import { ColdIcon } from "@coldpbc/components"
import {IconNames} from "@coldpbc/enums";
import {HexColors} from "@coldpbc/themes";
import {ProductsQuery} from "@coldpbc/interfaces";


export const MissingMaterialEmissionsCard = (props: {
  productMaterials: ProductsQuery['productMaterials']
}) => {
  const { productMaterials } = props;

  const materialsMissingEmissions = productMaterials.filter(productMaterial => !productMaterial.material.emissionsFactor).length;

  if(materialsMissingEmissions === 0) {
    return null;
  }

  return (
    <div className={'flex flex-row w-full h-auto border-[1px] border-red-100 bg-gray-20 p-4 gap-4 text-tc-primary items-center rounded-lg'}>
      <ColdIcon
        name={IconNames.ColdDangerIcon}
        color={HexColors.red["100"]}
      />
      <div className={'text-h5 w-full'}>
        Missing emissions factor for {materialsMissingEmissions} material.
      </div>
    </div>
  )
}
