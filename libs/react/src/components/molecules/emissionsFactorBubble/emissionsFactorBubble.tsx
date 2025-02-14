import {EmissionFactor} from "@coldpbc/interfaces";


export const EmissionsFactorBubble = (props: {
  emissionsFactor: EmissionFactor | null
}) => {
  const { emissionsFactor } = props;
  if(!emissionsFactor) {
    return (
      <div className={('flex flex-row items-center shrink-0 grow-0 gap-[4px] h-[35px] w-full max-w-[258px] rounded-[30px] justify-between text-body pl-[20px] pr-[16px] border-[1px] border-tc-disabled')}>
        <div className={'text-tc-primary font-bold w-full truncate'}>
          Unknown
        </div>
        <div className={('w-[1px] h-full bg-tc-disabled')}>
        </div>
        <div className={'text-tc-secondary shrink-0 text-nowrap w-[32px] pl-[8px]'}>
          --
        </div>
      </div>
    )

  }

  return (
    <div className={('flex flex-row items-center shrink-0 grow-0 gap-[4px] h-[35px] w-full max-w-[258px] rounded-[30px] justify-between text-body pl-[20px] pr-[16px] border-[1px] border-tc-link-primary-press')}>
      <div className={'text-tc-primary font-bold w-full truncate'}>
        {emissionsFactor.name}
      </div>
      <div className={('w-[1px] h-full bg-tc-link-primary-press')}>
      </div>
      <div className={'text-tc-secondary shrink-0 text-nowrap w-[32px] pl-[8px]'}>
        {(emissionsFactor.emissionsFactor.toFixed(1)).toString()}
      </div>
    </div>
  )
}
