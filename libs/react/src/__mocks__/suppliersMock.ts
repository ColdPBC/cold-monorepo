import { addDays, subDays } from 'date-fns';
import { ClaimType } from '@coldpbc/enums';

export const getSupplierMock = (): {
  id: string;
  name: string;
  address_1: string;
  address_2: string;
  city: string;
  country: string;
  certificate_claims: {
    [key: string]: {
      expiration_date: string;
      type: ClaimType;
      documents: {
        name: string;
        expiration_date: string | null;
        type: ClaimType;
      }[];
    };
  };
}[] => {
  // add documents to the model. give a mix of different number of documents for each supplier and claim
  // make each document have a different expiration date and unique name, because a user cant upload multiple documents with the same name
  // the model is suppliers > claims > documents
  // do not repeat the same document name across different suppliers
  // the names dont have to reflect the claim, but they can. try adding the supplier name to the document name to make it more unique
  return [
    {
      id: '1',
      name: 'VietWear Garments Co., Ltd.',
      address_1: '1234 Street',
      address_2: 'Suite 123',
      city: 'Ho Chi Minh City',
      country: 'Vietnam',
      certificate_claims: {
        pfas: {
          expiration_date: addDays(new Date(), 5).toISOString(),
          type: ClaimType.Certificate,
          documents: [
            {
              name: 'Pfas Certificate vietwear',
              expiration_date: addDays(new Date(), 70).toISOString(),
              type: ClaimType.Certificate,
            },
            {
              name: 'Pfas Test Results vietwear',
              expiration_date: addDays(new Date(), 5).toISOString(),
              type: ClaimType.Certificate,
            },
            // add some expired documents and null expiration date documents
            {
              name: 'Pfas Certificate vietwear',
              expiration_date: subDays(new Date(), 3).toISOString(),
              type: ClaimType.Certificate,
            },
            {
              name: 'Pfas Test Results vietwear',
              expiration_date: null,
              type: ClaimType.Certificate,
            },
          ],
        },
        bluesign: {
          expiration_date: addDays(new Date(), 5).toISOString(),
          documents: [
            {
              name: 'Bluesign Certificate vietwear',
              expiration_date: addDays(new Date(), 5).toISOString(),
              type: ClaimType.Certificate,
            },
            {
              name: 'Bluesign Test Results vietwear',
              expiration_date: addDays(new Date(), 5).toISOString(),
              type: ClaimType.Certificate,
            },
          ],
          type: ClaimType.Certificate,
        },
      },
    },
    {
      id: '2',
      name: 'Pritt, Inc.',
      address_1: '1234 Street',
      address_2: 'Suite 123',
      city: 'Shanghai',
      country: 'China',
      certificate_claims: {
        pfas: {
          expiration_date: addDays(new Date(), 5).toISOString(),
          documents: [
            {
              name: 'Pfas Certificate pritt',
              expiration_date: addDays(new Date(), 5).toISOString(),
              type: ClaimType.Certificate,
            },
            {
              name: 'Pfas Test Results pritt',
              expiration_date: addDays(new Date(), 5).toISOString(),
              type: ClaimType.Certificate,
            },
          ],
          type: ClaimType.Certificate,
        },
        phthalate: {
          expiration_date: addDays(new Date(), 5).toISOString(),
          documents: [
            {
              name: 'Phthalate Certificate pritt',
              expiration_date: addDays(new Date(), 5).toISOString(),
              type: ClaimType.Certificate,
            },
            {
              name: 'Phthalate Test Results pritt',
              expiration_date: addDays(new Date(), 5).toISOString(),
              type: ClaimType.Certificate,
            },
          ],
          type: ClaimType.Certificate,
        },
      },
    },
    {
      id: '3',
      name: 'Smotherman, Inc.',
      address_1: '1234 Street',
      address_2: 'Suite 123',
      city: 'Ho Chi Minh City',
      country: 'Vietnam',
      certificate_claims: {
        pfas: {
          expiration_date: addDays(new Date(), 10).toISOString(),
          documents: [
            // give unique names to the documents
            {
              name: 'Pfas Certificate smotherman',
              expiration_date: addDays(new Date(), 10).toISOString(),
              type: ClaimType.Certificate,
            },
            {
              name: 'Pfas Test Results smotherman',
              expiration_date: addDays(new Date(), 10).toISOString(),
              type: ClaimType.Certificate,
            },
          ],
          type: ClaimType.Certificate,
        },
        lead: {
          expiration_date: addDays(new Date(), 70).toISOString(),
          documents: [
            {
              name: 'Lead Certificate smotherman',
              expiration_date: addDays(new Date(), 70).toISOString(),
              type: ClaimType.Certificate,
            },
            {
              name: 'Lead Test Results smotherman',
              expiration_date: addDays(new Date(), 70).toISOString(),
              type: ClaimType.Certificate,
            },
          ],
          type: ClaimType.Certificate,
        },
      },
    },
    {
      id: '4',
      name: 'Menzie, Inc.',
      address_1: '1234 Street',
      address_2: 'Suite 123',
      city: 'Ho Chi Minh City',
      country: 'Vietnam',
      certificate_claims: {
        pfas: {
          expiration_date: addDays(new Date(), 30).toISOString(),
          documents: [
            {
              name: 'Pfas Certificate menzie',
              expiration_date: addDays(new Date(), 30).toISOString(),
              type: ClaimType.Certificate,
            },
            {
              name: 'Pfas Test Results menzie',
              expiration_date: addDays(new Date(), 30).toISOString(),
              type: ClaimType.Certificate,
            },
          ],
          type: ClaimType.Certificate,
        },
        bluesign: {
          expiration_date: addDays(new Date(), 70).toISOString(),
          documents: [
            {
              name: 'Bluesign Certificate menzie',
              expiration_date: addDays(new Date(), 70).toISOString(),
              type: ClaimType.Certificate,
            },
            {
              name: 'Bluesign Test Results menzie',
              expiration_date: addDays(new Date(), 70).toISOString(),
              type: ClaimType.Certificate,
            },
          ],
          type: ClaimType.Certificate,
        },
      },
    },
    {
      id: '5',
      name: 'Want, Inc.',
      address_1: '1234 Street',
      address_2: 'Suite 123',
      city: 'Ho Chi Minh City',
      country: 'Vietnam',
      certificate_claims: {
        pfas: {
          expiration_date: addDays(new Date(), 70).toISOString(),
          documents: [
            {
              name: 'Pfas Certificate want',
              expiration_date: addDays(new Date(), 70).toISOString(),
              type: ClaimType.Certificate,
            },
            {
              name: 'Pfas Test Results want',
              expiration_date: addDays(new Date(), 70).toISOString(),
              type: ClaimType.Certificate,
            },
          ],
          type: ClaimType.Certificate,
        },
        bluesign: {
          expiration_date: subDays(new Date(), 3).toISOString(),
          documents: [
            {
              name: 'Bluesign Certificate want',
              expiration_date: subDays(new Date(), 3).toISOString(),
              type: ClaimType.Certificate,
            },
            {
              name: 'Bluesign Test Results want',
              expiration_date: subDays(new Date(), 3).toISOString(),
              type: ClaimType.Certificate,
            },
          ],
          type: ClaimType.Certificate,
        },
      },
    },
    {
      id: '6',
      name: 'Tattershall, Inc.',
      address_1: '1234 Street',
      address_2: 'Suite 123',
      city: 'Ho Chi Minh City',
      country: 'Vietnam',
      certificate_claims: {
        lead: {
          expiration_date: subDays(new Date(), 30).toISOString(),
          documents: [
            {
              name: 'Lead Certificate tattershall',
              expiration_date: subDays(new Date(), 30).toISOString(),
              type: ClaimType.Certificate,
            },
            {
              name: 'Lead Test Results tattershall',
              expiration_date: subDays(new Date(), 30).toISOString(),
              type: ClaimType.Certificate,
            },
          ],
          type: ClaimType.Certificate,
        },
        phthalate: {
          expiration_date: subDays(new Date(), 3).toISOString(),
          documents: [
            {
              name: 'Phthalate Certificate tattershall',
              expiration_date: subDays(new Date(), 3).toISOString(),
              type: ClaimType.Certificate,
            },
            {
              name: 'Phthalate Test Results tattershall',
              expiration_date: subDays(new Date(), 3).toISOString(),
              type: ClaimType.Certificate,
            },
          ],
          type: ClaimType.Certificate,
        },
      },
    },
    {
      id: '7',
      name: 'Panek, Inc.',
      address_1: '1234 Street',
      address_2: 'Suite 123',
      city: 'Ho Chi Minh City',
      country: 'Vietnam',
      certificate_claims: {
        pfas: {
          expiration_date: addDays(new Date(), 60).toISOString(),
          documents: [
            {
              name: 'Pfas Certificate panek',
              expiration_date: addDays(new Date(), 60).toISOString(),
              type: ClaimType.Certificate,
            },
            {
              name: 'Pfas Test Results panek',
              expiration_date: addDays(new Date(), 60).toISOString(),
              type: ClaimType.Certificate,
            },
          ],
          type: ClaimType.Certificate,
        },
        lead: {
          expiration_date: addDays(new Date(), 30).toISOString(),
          documents: [
            {
              name: 'Lead Certificate panek',
              expiration_date: addDays(new Date(), 30).toISOString(),
              type: ClaimType.Certificate,
            },
            {
              name: 'Lead Test Results panek',
              expiration_date: addDays(new Date(), 30).toISOString(),
              type: ClaimType.Certificate,
            },
          ],
          type: ClaimType.Certificate,
        },
        bluesign: {
          expiration_date: addDays(new Date(), 70).toISOString(),
          documents: [
            {
              name: 'Bluesign Certificate panek',
              expiration_date: addDays(new Date(), 70).toISOString(),
              type: ClaimType.Certificate,
            },
            {
              name: 'Bluesign Test Results panek',
              expiration_date: addDays(new Date(), 70).toISOString(),
              type: ClaimType.Certificate,
            },
          ],
          type: ClaimType.Certificate,
        },
      },
    },
    {
      id: '8',
      name: 'Faul, Inc.',
      address_1: '1234 Street',
      address_2: 'Suite 123',
      city: 'Ho Chi Minh City',
      country: 'Vietnam',
      certificate_claims: {
        pfas: {
          expiration_date: addDays(new Date(), 5).toISOString(),
          documents: [
            {
              name: 'Pfas Certificate faul',
              expiration_date: addDays(new Date(), 5).toISOString(),
              type: ClaimType.Certificate,
            },
            {
              name: 'Pfas Test Results faul',
              expiration_date: addDays(new Date(), 5).toISOString(),
              type: ClaimType.Certificate,
            },
          ],
          type: ClaimType.Certificate,
        },
        lead: {
          expiration_date: addDays(new Date(), 5).toISOString(),
          type: ClaimType.Certificate,
          documents: [
            {
              name: 'Lead Certificate faul',
              expiration_date: addDays(new Date(), 5).toISOString(),
              type: ClaimType.Certificate,
            },
            {
              name: 'Lead Test Results faul',
              expiration_date: addDays(new Date(), 5).toISOString(),
              type: ClaimType.Certificate,
            },
          ],
        },
        bluesign: {
          expiration_date: addDays(new Date(), 70).toISOString(),
          type: ClaimType.Certificate,
          documents: [
            {
              name: 'Bluesign Certificate faul',
              expiration_date: addDays(new Date(), 70).toISOString(),
              type: ClaimType.Certificate,
            },
            {
              name: 'Bluesign Test Results faul',
              expiration_date: addDays(new Date(), 70).toISOString(),
              type: ClaimType.Certificate,
            },
          ],
        },
      },
    },
    {
      id: '9',
      name: 'Hushon, Inc.',
      address_1: '1234 Street',
      address_2: 'Suite 123',
      city: 'Ho Chi Minh City',
      country: 'Vietnam',
      certificate_claims: {
        pfas: {
          expiration_date: addDays(new Date(), 70).toISOString(),
          type: ClaimType.Certificate,
          documents: [
            {
              name: 'Pfas Certificate hushon',
              expiration_date: addDays(new Date(), 70).toISOString(),
              type: ClaimType.Certificate,
            },
            {
              name: 'Pfas Test Results hushon',
              expiration_date: addDays(new Date(), 70).toISOString(),
              type: ClaimType.Certificate,
            },
          ],
        },
        lead: {
          expiration_date: addDays(new Date(), 5).toISOString(),
          type: ClaimType.Certificate,
          documents: [
            {
              name: 'Lead Certificate hushon',
              expiration_date: addDays(new Date(), 5).toISOString(),
              type: ClaimType.Certificate,
            },
            {
              name: 'Lead Test Results hushon',
              expiration_date: addDays(new Date(), 5).toISOString(),
              type: ClaimType.Certificate,
            },
          ],
        },
        phthalate: {
          expiration_date: addDays(new Date(), 5).toISOString(),
          type: ClaimType.Certificate,
          documents: [
            {
              name: 'Phthalate Certificate hushon',
              expiration_date: addDays(new Date(), 5).toISOString(),
              type: ClaimType.Certificate,
            },
            {
              name: 'Phthalate Test Results hushon',
              expiration_date: addDays(new Date(), 5).toISOString(),
              type: ClaimType.Certificate,
            },
          ],
        },
        bluesign: {
          expiration_date: addDays(new Date(), 70).toISOString(),
          type: ClaimType.Certificate,
          documents: [
            {
              name: 'Bluesign Certificate hushon',
              expiration_date: addDays(new Date(), 70).toISOString(),
              type: ClaimType.Certificate,
            },
            {
              name: 'Bluesign Test Results hushon',
              expiration_date: addDays(new Date(), 70).toISOString(),
              type: ClaimType.Certificate,
            },
          ],
        },
      },
    },
  ];
};
