import {EprSubmissionGraphQL} from "@coldpbc/interfaces";
import {addDays} from "date-fns";


export const getEPRMocks = (): EprSubmissionGraphQL[] => {
  return [
    {
      id: '1',
      state: 'California',
      proName: 'CAA, Dept of Pollution',
      billIdentifier: 'SB 24',
      dueDate: '2025-08-01',
      status: 'Upcoming',
      submittedAt: null,
    },
    {
      id: '2',
      state: 'Minnesota',
      proName: 'CAA',
      billIdentifier: 'HF 3911',
      dueDate: '2026-07-01',
      status: 'Upcoming',
      submittedAt: null,
    },
    {
      id: '3',
      state: 'Maine',
      proName: 'CAA',
      billIdentifier: 'Stewardship Program for Packaging',
      dueDate: null,
      status: 'Upcoming',
      submittedAt: null,
    },
    {
      id: '4',
      state: 'Colorado',
      proName: 'CAA',
      billIdentifier: 'SB 582',
      dueDate: addDays(new Date(), 85).toISOString(),
      status: 'In Progress',
      submittedAt: null,
    },
    {
      id: '5',
      state: 'Oregon',
      proName: 'CAA',
      billIdentifier: 'SB 582',
      dueDate: addDays(new Date(), 85).toISOString(),
      status: 'Submitted',
      submittedAt: new Date().toISOString(),
    },
  ]
}

export const getEPRMocksFilterByStatus = (status: string): EprSubmissionGraphQL[] => {
  return getEPRMocks().filter((item) => {
    return item.status === status;
  });
}

export const getEPRMocksWithoutSubmitted = (): EprSubmissionGraphQL[] => {
  return getEPRMocks().filter((item) => {
    return item.status !== 'Submitted';
  })
}
