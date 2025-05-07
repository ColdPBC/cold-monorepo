import {EprSubmissionGraphQL} from "@coldpbc/interfaces";
import {addDays} from "date-fns";


export const getEPRMocks = (): EprSubmissionGraphQL[] => {
  return [
    {
      id: '1',
      state: 'California',
      pro_name: 'CAA, Dept of Pollution',
      bill_identifier: 'SB 24',
      due_date: '2025-08-01',
      status: 'Upcoming',
      submission_date: null,
    },
    {
      id: '2',
      state: 'Minnesota',
      pro_name: 'CAA',
      bill_identifier: 'HF 3911',
      due_date: '2026-07-01',
      status: 'Upcoming',
      submission_date: null,
    },
    {
      id: '3',
      state: 'Maine',
      pro_name: 'CAA',
      bill_identifier: 'Stewardship Program for Packaging',
      due_date: null,
      status: 'Upcoming',
      submission_date: null,
    },
    {
      id: '4',
      state: 'Colorado',
      pro_name: 'CAA',
      bill_identifier: 'SB 582',
      due_date: addDays(new Date(), 85).toISOString(),
      status: 'In Progress',
      submission_date: null,
    },
    {
      id: '5',
      state: 'Oregon',
      pro_name: 'CAA',
      bill_identifier: 'SB 582',
      due_date: addDays(new Date(), 85).toISOString(),
      status: 'Submitted',
      submission_date: new Date().toISOString(),
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
