import { differenceInDays } from 'date-fns';
import { CertificationStatus } from '@coldpbc/enums';

export const getDateActiveStatus = (expirationDate: string | null) => {
  let text = CertificationStatus.Inactive;
  if (expirationDate === null || expirationDate === undefined) {
    text = CertificationStatus.Inactive;
  } else {
    // get the difference between the current date and the date in the cell
    const diff = differenceInDays(new Date(expirationDate), new Date());
    if (diff < 0) {
      text = CertificationStatus.Expired;
    } else if (diff < 60) {
      text = CertificationStatus.ExpiringSoon;
    } else {
      text = CertificationStatus.Active;
    }
  }
  return text;
};
