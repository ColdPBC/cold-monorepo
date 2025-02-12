import {ProductsQuery} from "@coldpbc/interfaces";


export const EmissionsFactorBubble = (props: {
  emissionsFactor: ProductsQuery['productMaterials'][0]['material']['emissionsFactor']
}) => {
  const { emissionsFactor } = props;
  let emissionsName = emissionsFactor?.name || 'Unknown'
  let emissionsFactorValue = emissionsFactor?.emissionsFactor ? (emissionsFactor.emissionsFactor.toFixed(1)).toString() : '--'
  let borderColor = emissionsFactor ? ' border-tc-link-primary-press' : ' border-tc-disabled'
  let backgroundColor = emissionsFactor ? ' bg-tc-link-primary-press' : ' bg-tc-disabled'
  return (
    <div className={('flex flex-row items-center shrink-0 grow-0 gap-[4px] h-[35px] w-full max-w-[258px] rounded-[30px] justify-between text-body pl-[20px] pr-[16px] border-[1px]' + borderColor)}>
      <div className={'text-tc-primary font-bold w-full truncate'}>
        {emissionsName}
      </div>
      <div className={('w-[1px] h-full' + backgroundColor)}>
      </div>
      <div className={'text-tc-secondary shrink-0 text-nowrap w-[32px] pl-[8px]'}>
        {emissionsFactorValue}
      </div>
    </div>
  )
}
