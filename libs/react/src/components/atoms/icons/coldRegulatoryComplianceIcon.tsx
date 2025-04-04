import {IconProps} from "@coldpbc/interfaces";
import {twMerge} from "tailwind-merge";


export const ColdRegulatoryComplianceIcon = (props: IconProps) => {
  const {className, ...otherProps} = props;
  return (
    <div className={twMerge('w-[24px] h-[24px] flex items-center justify-center', className)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" {...otherProps}>
        <g clipPath="url(#clip0_6037_165)">
          <path d="M2.25 17.5125H15.75C16.7218 17.5125 17.5125 16.7218 17.5125 15.75C17.5125 14.7782 16.7218 13.9875 15.75 13.9875H2.25C1.27823 13.9875 0.4875 14.7782 0.4875 15.75C0.4875 16.7218 1.27823 17.5125 2.25 17.5125ZM1.7625 15.75C1.7625 15.4814 1.98098 15.2625 2.25 15.2625H15.75C16.019 15.2625 16.2375 15.4814 16.2375 15.75C16.2375 16.0186 16.019 16.2375 15.75 16.2375H2.25C1.98098 16.2375 1.7625 16.0186 1.7625 15.75Z" fill={otherProps.color || "white"} stroke={otherProps.color || "white"} strokeWidth="0.15"/>
          <path d="M7.56726 0.868046L7.56725 0.868053L1.37528 4.40623C0.827569 4.71884 0.4875 5.30511 0.4875 5.93609V6.4373C0.4875 7.40907 1.27823 8.1998 2.25 8.1998H15.721L15.7215 8.20025H15.7505C16.7223 8.20025 17.513 7.40952 17.513 6.43775V5.93654C17.513 5.30611 17.1729 4.71987 16.6247 4.40671L10.4327 0.868055L10.4327 0.868051C9.55019 0.363823 8.45207 0.362686 7.56726 0.868046ZM9 1.76315H9.01379C9.2856 1.76547 9.55732 1.83639 9.79983 1.97481C9.79984 1.97481 9.79985 1.97482 9.79986 1.97482L15.9918 5.51343C16.1434 5.60025 16.2375 5.7622 16.2375 5.9366V6.43781C16.2375 6.7064 16.019 6.92531 15.75 6.92531L2.25002 6.92537C1.981 6.92537 1.76252 6.70646 1.76252 6.43787V5.93666C1.76252 5.76198 1.85624 5.59968 2.00755 5.51358L2.00767 5.51351L8.19967 1.97486L8.19974 1.97483C8.44621 1.83364 8.72299 1.76315 9 1.76315ZM8.16246 1.90975L1.97046 5.4484L9 1.68815C8.71032 1.68815 8.42062 1.76186 8.16246 1.90975Z" fill={otherProps.color || "white"} stroke={otherProps.color || "white"} strokeWidth="0.15"/>
          <path d="M12.5415 7.48652H12.4665V7.56152V14.6243V14.6993H12.5415H13.6665H13.7415V14.6243V7.56152V7.48652H13.6665H12.5415Z" fill={otherProps.color || "white"} stroke={otherProps.color || "white"} strokeWidth="0.15"/>
          <path d="M14.625 7.48652H14.55V7.56152V14.6243V14.6993H14.625H15.75H15.825V14.6243V7.56152V7.48652H15.75H14.625Z" fill={otherProps.color || "white"} stroke={otherProps.color || "white"} strokeWidth="0.15"/>
          <path d="M2.24951 7.4875H2.17451V7.5625V14.6253V14.7003H2.24951H3.37451H3.44951V14.6253V7.5625V7.4875H3.37451H2.24951Z" fill={otherProps.color || "white"} stroke={otherProps.color || "white"} strokeWidth="0.15"/>
          <path d="M4.33301 7.4875H4.25801V7.5625V14.6253V14.7003H4.33301H5.45801H5.53301V14.6253V7.5625V7.4875H5.45801H4.33301Z" fill={otherProps.color || "white"} stroke={otherProps.color || "white"} strokeWidth="0.15"/>
          <path d="M7.5 7.925H7.425V8V15.0628V15.1378H7.5H8.625H8.7V15.0628V8V7.925H8.625H7.5Z" fill={otherProps.color || "white"} stroke={otherProps.color || "white"} strokeWidth="0.15"/>
          <path d="M9.5835 7.925H9.5085V8V15.0628V15.1378H9.5835H10.7085H10.7835V15.0628V8V7.925H10.7085H9.5835Z" fill={otherProps.color || "white"} stroke={otherProps.color || "white"} strokeWidth="0.15"/>
        </g>
        <defs>
          <clipPath id="clip0_6037_165">
            <rect width="18" height="18" fill={otherProps.color || "white"}/>
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}
