import { differenceInDays } from 'date-fns';
import { ClaimStatus } from '@coldpbc/enums';
import {addTZOffset} from "./dateUtils";

export const getDateActiveStatus = (expirationDate: string | null) => {
  let text = ClaimStatus.Inactive;
  if (expirationDate === null || expirationDate === undefined) {
    text = ClaimStatus.Inactive;
  } else {
    // get the difference between the current date and the date in the cell
    const diff = differenceInDays(addTZOffset(expirationDate), new Date());
    if (diff < 0) {
      text = ClaimStatus.Expired;
    } else if (diff < 60) {
      text = ClaimStatus.ExpiringSoon;
    } else {
      text = ClaimStatus.Active;
    }
  }
  return text;
};
