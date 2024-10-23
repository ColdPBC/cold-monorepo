export const addTZOffset = (dateString: string) => {
	const date = new Date(dateString);
	const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
	return localDate;
};

export const removeTZOffset = (dateString: string) => {
	const date = new Date(dateString);
	date.setHours(0, 0, 0, 0);
	const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
	return localDate;
};
