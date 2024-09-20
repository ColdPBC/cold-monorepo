import {parseISO} from "date-fns";


/**
 * This function is used to handle the date strings that are not in ISO format i.e. 2021-09-01
 * Use the current timezone of the browser when the date string is not in ISO format
 * @param dateString
 */
export const getDateIrrespectiveOfTimeZone = (dateString: string) => {
  // check if date string is in ISO format
  if (isISODate(dateString)) {
    return parseISO(dateString);
  } else {
    // set the expiration date to current timezone
    return parseISO(dateString + "T00:00:00");
  }
}

export function isISODate(dateString: string) {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(dateString)) return false;
  const d = new Date(dateString);
  return !isNaN(d.getTime()) && d.toISOString()===dateString;
}
