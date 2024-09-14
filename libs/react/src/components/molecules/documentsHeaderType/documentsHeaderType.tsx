export const DocumentsHeaderType = (props: { title: string; amount: number; totalAmount: number }) => {
	const { title, amount, totalAmount } = props;

	const getPercentage = () => {
		const displayAmount = amount === 0 || totalAmount === 0 ? '0%' : `${((amount / totalAmount) * 100).toFixed(0)}%`;
		return <div className={'rounded-[16px] bg-bgc-accent px-[8px] py-[4px] text-label'}>{displayAmount}</div>;
	};

	return (
		<div className={'flex flex-col rounded-[8px] p-[8px] w-full h-auto bg-gray-60'}>
			<div className={'w-full flex justify-between items-center'}>
				<div className={'text-eyebrow'}>{title}</div>
			</div>
			<div className={'w-full flex justify-between items-center'}>
				<div className={'text-h3'}>{amount}</div>
				<div className={'text-[16px] font-bold'}>{getPercentage()}</div>
			</div>
		</div>
	);
};
