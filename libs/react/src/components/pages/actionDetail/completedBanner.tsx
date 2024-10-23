import React, { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

export interface CompletedBannerProps {
	className?: string;
}

export const CompletedBanner = (props: PropsWithChildren<CompletedBannerProps>) => {
	return (
		<div
			className={twMerge('flex flex-col justify-center bg-primary-300 px-4 h-[120px] relative rounded-2xl text-white overflow-hidden', props.className)}
			data-testid={'action-completed-banner'}>
			<div className="w-[857px] h-[845px] absolute left-[-67px] bottom-[-363px] bg-primary-200 blur-[150px] z-10" />
			<div className="z-20">{props.children}</div>
			<svg className="absolute right-[0]" width="899" height="120" viewBox="0 0 899 120" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx="817.669" cy="100.669" r="11.6688" fill="#ADFFF7" />
				<circle cx="677.524" cy="22.5102" r="5.83439" fill="#66C8FF" />
				<circle cx="641.539" cy="99.3227" r="5.83439" fill="#E1E2EB" />
				<circle cx="808.34" cy="19.6664" r="5.83439" fill="#E1E2EB" />
				<circle cx="527.834" cy="31.3813" r="5.83439" fill="#E1E2EB" />
				<circle cx="761.497" cy="51.575" r="11.6688" fill="#E1E2EB" />
				<rect x="609.188" y="58.625" width="7.77918" height="19.448" rx="3.88959" transform="rotate(60.9887 609.188 58.625)" fill="#E1E2EB" />
				<rect x="807.285" y="63.8828" width="7.77918" height="19.448" rx="3.88959" transform="rotate(60.9887 807.285 63.8828)" fill="#E1E2EB" />
				<rect x="726.846" y="12.3438" width="7.77918" height="19.448" rx="3.88959" transform="rotate(29.4959 726.846 12.3438)" fill="#C79EEF" />
				<rect x="755.611" y="102.738" width="14.3986" height="35.9964" rx="7.19928" transform="rotate(135.565 755.611 102.738)" fill="#66FFA9" />
				<rect x="587.832" y="24.7031" width="14.3986" height="35.9964" rx="7.19928" transform="rotate(135.565 587.832 24.7031)" fill="#E1E2EB" />
				<rect x="729.461" y="48.4453" width="14.3986" height="35.9964" rx="7.19928" transform="rotate(105.398 729.461 48.4453)" fill="#66FFA9" />
				<rect x="876.529" y="39.3359" width="39.7197" height="21.62" rx="7.77918" transform="rotate(121.925 876.529 39.3359)" fill="#66FFA9" />
				<rect x="901.652" y="136.195" width="39.7197" height="21.62" rx="7.77918" transform="rotate(-129.684 901.652 136.195)" fill="#E1E2EB" />
				<rect x="773.838" y="20.9297" width="7.77918" height="19.448" rx="3.88959" transform="rotate(-16.9392 773.838 20.9297)" fill="#C79EEF" />
				<rect x="774.059" y="115.613" width="7.77918" height="15.6371" rx="3.88959" transform="rotate(-56.2386 774.059 115.613)" fill="#66C8FF" />
				<rect x="847.959" y="96.168" width="7.77918" height="15.6371" rx="3.88959" transform="rotate(-56.2386 847.959 96.168)" fill="#66FFA9" />
				<path
					d="M619.098 19.8742L624.815 19.8757C635.481 19.8784 643.372 29.8036 640.971 40.1965V40.1965C638.908 49.1218 644.472 58.0291 653.397 60.0915L655.475 60.5716C665.547 62.8991 671.826 72.9514 669.498 83.024V83.024C667.171 93.0966 673.449 103.149 683.522 105.476L685.602 105.957C694.526 108.019 700.088 116.925 698.026 125.849V125.849C695.625 136.242 703.518 146.167 714.185 146.167L728.008 146.167"
					stroke="#66C8FF"
					strokeWidth="7.77918"
					strokeLinecap="round"
				/>
				<path
					d="M549.775 58.7703L561.178 58.7703C567.475 58.7703 572.581 63.8756 572.581 70.1733V70.1733C572.581 76.4711 577.686 81.5764 583.984 81.5764V81.5764C590.282 81.5764 595.387 86.6817 595.387 92.9795V92.9795C595.387 99.2772 600.492 104.383 606.79 104.383L618.193 104.383"
					stroke="#C79EEF"
					strokeWidth="7.77918"
					strokeLinecap="round"
				/>
				<path
					d="M869.5 -14.9809L868.935 -3.59176C868.623 2.69827 863.272 7.54464 856.982 7.23292V7.23292C850.692 6.9212 845.34 11.7676 845.028 18.0576V18.0576C844.716 24.3476 839.365 29.194 833.075 28.8823V28.8823C826.785 28.5706 821.433 33.4169 821.121 39.707L820.557 51.0961"
					stroke="#99A2E6"
					strokeWidth="7.77918"
					strokeLinecap="round"
				/>
			</svg>
		</div>
	);
};
