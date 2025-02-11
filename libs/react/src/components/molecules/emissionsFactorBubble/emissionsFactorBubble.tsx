

export const EmissionsFactorBubble = (props: {
  emissionsFactor: {
    name: string;
    emissions_factor: number;
  } | null
}) => {
  const { emissionsFactor } = props;
  let emissionsName = emissionsFactor?.name || 'Unknown'
  let emissionsFactorValue = emissionsFactor?.emissions_factor ? (emissionsFactor.emissions_factor.toFixed(1)).toString() : '--'
  let borderColor = emissionsFactor ? ' border-tc-link-primary-press' : ' border-tc-disabled'
  let backgroundColor = emissionsFactor ? ' bg-tc-link-primary-press' : ' bg-tc-disabled'
  return (
    <div className={('flex flex-row items-center shrink-0 grow-0 gap-[4px] h-[35px] w-[258px] rounded-[30px] justify-between text-body pl-[20px] pr-[16px] border-[1px]' + borderColor)}>
      <div className={'text-tc-primary font-bold w-full truncate'}>
        {emissionsName}
      </div>
      <div className={('w-[1px] h-full' + backgroundColor)}>
      </div>
      <div className={'text-tc-secondary text-body shrink-0 text-nowrap w-[32px] pl-[8px]'}>
        {emissionsFactorValue}
      </div>
    </div>
  )
}
