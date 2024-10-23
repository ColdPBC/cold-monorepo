export const MUIDataGridNoRowsOverlay = () => {
	return (
		<div className={'h-full w-full flex flex-col justify-center items-center bg-transparent'}>
			<div className={'text-body text-tc-disabled'}>There are no records yet.</div>
		</div>
	);
};
