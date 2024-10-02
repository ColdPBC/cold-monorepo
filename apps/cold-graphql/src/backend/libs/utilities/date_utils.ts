export function convertLocalDateToUTC(localDate: Date): Date {
	const year = localDate.getUTCFullYear();
	const month = localDate.getUTCMonth();
	const day = localDate.getUTCDate();
	const hours = localDate.getUTCHours();
	const minutes = localDate.getUTCMinutes();
	const seconds = localDate.getUTCSeconds();
	const milliseconds = localDate.getUTCMilliseconds();

	return new Date(Date.UTC(year, month, day, hours, minutes, seconds, milliseconds));
}
