import { Files } from '@coldpbc/interfaces';
import { addDays } from 'date-fns';
import FilesType from '@storybook/addon-knobs/dist/components/types/Files';
import { FileTypes } from '@coldpbc/enums';

export function getAllFilesMock() {
  return [
    {
      id: 'clrl1562j0009mgk60trjvcyy',
      object: 'assistant.file',
      assistant_id: 'asst_kWVC0fO9mkS8skjOZFXu0tBd',
      bucket: 'cold-api-uploaded-files',
      key: 'staging/org_cAD7FM8ONewFumnY/qaalib.farah@coldclimate.com/wordpress-pdf-invoice-plugin-sample.pdf',
      original_name: 'wordpress-pdf-invoice-plugin-sample.pdf',
      checksum: 'd41d8cd98f00b204e9800998ecf8427e',
      organization_id: 'org_cAD7FM8ONewFumnY',
      openai_assistant_id: 'asst_kWVC0fO9mkS8skjOZFXu0tBd',
      openai_file_id: 'file-ARQyPWCo7Li29GPbPL2bpJcf',
      integration_id: 'asst_kWVC0fO9mkS8skjOZFXu0tBd',
      mimetype: 'application/pdf',
      size: 43627,
      acl: 'private',
      contentType: 'application/pdf',
      encoding: '7bit',
      fieldname: 'file',
      location: 'https://cold-api-uploaded-files.s3.us-east-1.amazonaws.com/staging/org_cAD7FM8ONewFumnY/qaalib.farah%40coldclimate.com/wordpress-pdf-invoice-plugin-sample.pdf',
      versionId: 'pJ2fIdrMpb7lgZecDuLg2z2vfiHX249n',
      updated_at: '2024-05-01T20:00:00.000Z',
      created_at: '2024-05-01T20:00:00.000Z',
    },
    {
      id: 'clrl0wzkr0007mgk6uncv7u8k',
      object: 'assistant.file',
      assistant_id: 'asst_kWVC0fO9mkS8skjOZFXu0tBd',
      bucket: 'cold-api-uploaded-files',
      key: 'staging/org_cAD7FM8ONewFumnY/qaalib.farah@coldclimate.com/sample.pdf',
      original_name: 'sample.pdf',
      checksum: 'd41d8cd98f00b204e9800998ecf8427e',
      organization_id: 'org_cAD7FM8ONewFumnY',
      openai_assistant_id: 'asst_kWVC0fO9mkS8skjOZFXu0tBd',
      openai_file_id: 'file-OUw0zSDm8d6KDWwxXWESU7tn',
      integration_id: 'asst_kWVC0fO9mkS8skjOZFXu0tBd',
      mimetype: 'application/pdf',
      size: 357602,
      acl: 'private',
      contentType: 'application/pdf',
      encoding: '7bit',
      fieldname: 'file',
      location: 'https://cold-api-uploaded-files.s3.us-east-1.amazonaws.com/staging/org_cAD7FM8ONewFumnY/qaalib.farah%40coldclimate.com/sample.pdf',
      versionId: '3PF2iN17HgJuD4.o5RCT3xWmVO2rMKCa',
      updated_at: '2024-04-29T20:00:00.000Z',
      created_at: '2024-04-29T20:00:00.000Z',
    },
  ];
}

export function getFilesWithCertificateClaimsMock(): Files[] {
  return [
    {
      id: 'clrl1562j0009mgk60trjvcyy',
      original_name: 'PFAS-Test Certificate',
      effective_start_date: addDays(new Date(), 5).toISOString(),
      effective_end_date: addDays(new Date(), 5).toISOString(),
      type: FileTypes.CERTIFICATE,
      certification_claim: [],
    },
    {
      id: 'clrl0wzkr0007mgk6uncv7u8k',
      original_name: 'Lead-Test Certificate',
      effective_start_date: null,
      effective_end_date: null,
      type: FileTypes.CERTIFICATE,
      certification_claim: [],
    },
    {
      id: 'clrl0wzkr0007mgk6uncv7u8k',
      original_name: 'phthalate Certificate',
      effective_start_date: null,
      effective_end_date: null,
      type: FileTypes.CERTIFICATE,
      certification_claim: [],
    },
    {
      id: 'clrl0wzkr0007mgk6uncv7u8k',
      original_name: 'bluesign Certificate without date',
      effective_start_date: null,
      effective_end_date: null,
      type: FileTypes.CERTIFICATE,
      certification_claim: [],
    },
    {
      id: 'clrl0wzkr0007mgk6uncv7u8k',
      original_name: 'bluesign Certificate expiring soon',
      effective_start_date: addDays(new Date(), 5).toISOString(),
      effective_end_date: addDays(new Date(), 5).toISOString(),
      type: FileTypes.CERTIFICATE,
      certification_claim: [],
    },
    {
      id: 'clrl0wzkr0007mgk6uncv7u8k',
      original_name: 'PFAS-Test Certificate Want, Inc.',
      effective_start_date: addDays(new Date(), 70).toISOString(),
      effective_end_date: addDays(new Date(), 70).toISOString(),
      type: FileTypes.CERTIFICATE,
      certification_claim: [],
    },
  ];
}
