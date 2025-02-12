import {ReactNode} from "react";
import {LightBulbIcon} from "@heroicons/react/20/solid";
import {ColdIcon} from "@coldpbc/components";
import {HexColors} from "@coldpbc/themes";
import {IconNames} from "@coldpbc/enums";
import {ProductsQuery} from "@coldpbc/interfaces";


export const EmissionsFactorDetailedExpandedView = (
  props : {
    emissionsFactor: ProductsQuery['productMaterials'][0]['material']['emissionsFactor']
    weight: number | null
  }
) => {
  const { emissionsFactor, weight } = props;

  let element: ReactNode;
  let className: string;

  if(!emissionsFactor || !weight) {
    className = ' flex flex-col'
    element = (
      <>
        <div className={'text-h5'}>
          Unknown Emissions Factor
        </div>
        <div className={'text-body text-wrap'}>
          This material doesn't have enough information to calculate an emissions factor. Please add necessary
          information on the material page.
        </div>
      </>
    )
  } else {
    className = ' flex flex-row justify-between'
    const totalEmissions = emissionsFactor.emissionsFactor * weight;
    element = (
      <>
        <div className={'flex flex-col gap-4 w-full'}>
          <div className={'text-h5'}>
            {emissionsFactor.name} | {emissionsFactor.emissionsFactor}
          </div>
          <div className={'text-body text-wrap'}>
            {emissionsFactor.description}
          </div>
          <div className={'flex flex-row gap-[10px]'}>
            <LightBulbIcon className={'w-[15px] h-[15px] self-center'} color={'white'}/>
            <div className={'text-tc-secondary text-body'}>
              Tip: Look wrong? To match to a different factor, select a new material classification and refresh.
            </div>
          </div>
        </div>
        <div className={'flex flex-col h-auto rounded-lg p-4 gap-2 border-[1px] border-gray-90 bg-gray-40 w-[236px] shrink-0 self-start'}>
          <div className={'text-h5'}>
            Emissions Estimate
          </div>
          <div className={'text-body flex flex-row justify-between'}>
            <div className={'text-tc-secondary'}>
              Weight
            </div>
            <div>
              {weight} kg
            </div>
          </div>
          <div className={'text-body flex flex-row justify-between'}>
            <div className={'text-tc-secondary'}>
              Factor Value
            </div>
            <ColdIcon
              className={'w-[10px] h-[10px] self-center'}
              color={HexColors.tc.primary}
              name={IconNames.CloseModalIcon}
            />
            <div>
              {emissionsFactor.emissionsFactor.toFixed(1)}
            </div>
          </div>
          <div className={'h-[1px] w-full bg-gray-80'}></div>
          <div className={'text-body flex flex-row justify-between'}>
            <div className={'text-tc-secondary'}>
              Emissions
            </div>
            <div className={'font-bold'}>
              {totalEmissions.toFixed(2)} kg CO2e
            </div>
          </div>
        </div>
      </>
    )
  }


  return (
    <div className={'w-full h-auto p-6'}>
      <div className={('w-full h-full p-4 gap-4 text-tc-primary bg-gray-30 rounded-lg' + className)}>
        {element}
      </div>
    </div>
  )
}
