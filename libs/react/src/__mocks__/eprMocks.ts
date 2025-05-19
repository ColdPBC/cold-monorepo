import {EprSubmissionGraphQL} from "@coldpbc/interfaces";
import {addDays} from "date-fns";


export const getEPRMocks = (): EprSubmissionGraphQL[] => {
  return [
    {
      id: '1',
      state: 'California',
      billIdentifier: 'SB 24',
      dueDate: '2025-08-01',
      status: 'Upcoming',
      submittedAt: null,
      metadata: {
        pro_name: 'CAA, Dept of Pollution',
      },
    },
    {
      id: '2',
      state: 'Minnesota',
      billIdentifier: 'HF 3911',
      dueDate: '2026-07-01',
      status: 'Upcoming',
      submittedAt: null,
      metadata: {
        pro_name: 'CAA',
      },
    },
    {
      id: '3',
      state: 'Maine',
      billIdentifier: 'Stewardship Program for Packaging',
      dueDate: null,
      status: 'Upcoming',
      submittedAt: null,
      metadata: {
        pro_name: 'CAA',
      },
    },
    {
      id: '4',
      state: 'Colorado',
      billIdentifier: 'SB 582',
      dueDate: addDays(new Date(), 85).toISOString(),
      status: 'In Progress',
      submittedAt: null,
      metadata: {
        pro_name: 'CAA',
      },
    },
    {
      id: '5',
      state: 'Oregon',
      billIdentifier: 'SB 582',
      dueDate: addDays(new Date(), 85).toISOString(),
      status: 'Submitted',
      submittedAt: new Date().toISOString(),
      metadata: {
        pro_name: 'CAA',
      },
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
