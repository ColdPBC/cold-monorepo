export const toUTCDate = (date: string): Date => {
	const dateParts = date.split('-');
	const year = parseInt(dateParts[0], 10);
	const month = parseInt(dateParts[1], 10) - 1; // Months are zero-based in JavaScript
	const day = parseInt(dateParts[2], 10);
	return new Date(Date.UTC(year, month, day));
};
