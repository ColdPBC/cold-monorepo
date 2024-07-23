import { addDays, subDays } from 'date-fns';
import { getCertificationsMock } from './claimsMock';

export const getSupplierMock = () => {
  return [
    {
      id: 1,
      name: 'VietWear Garments Co., Ltd.',
      country: 'Vietnam',
      certificate_claims: {
        pfas: {
          expiration_date: addDays(new Date(), 5).toISOString(),
        },
        lead: {
          expiration_date: null,
        },
        phthalate: {
          expiration_date: null,
        },
        bluesign: {
          expiration_date: addDays(new Date(), 5).toISOString(),
        },
      },
    },
    {
      id: 2,
      name: 'Pritt, Inc.',
      country: 'China',
      certificate_claims: {
        pfas: {
          expiration_date: addDays(new Date(), 5).toISOString(),
        },
        lead: {},
        phthalate: {
          expiration_date: addDays(new Date(), 5).toISOString(),
        },
        bluesign: {},
      },
    },
    {
      id: 3,
      name: 'Smotherman, Inc.',
      country: 'Vietnam',
      certificate_claims: {
        pfas: {
          expiration_date: addDays(new Date(), 10).toISOString(),
        },
        lead: {
          expiration_date: addDays(new Date(), 70).toISOString(),
        },
      },
    },
    {
      id: 4,
      name: 'Menzie, Inc.',
      country: 'Vietnam',
      certificate_claims: {
        pfas: {
          expiration_date: addDays(new Date(), 30).toISOString(),
        },
        bluesign: {
          expiration_date: addDays(new Date(), 70).toISOString(),
        },
      },
    },
    {
      id: 5,
      name: 'Want, Inc.',
      country: 'Vietnam',
      certificate_claims: {
        pfas: {
          expiration_date: addDays(new Date(), 70).toISOString(),
        },
        bluesign: {
          expiration_date: subDays(new Date(), 3).toISOString(),
        },
      },
    },
    {
      id: 6,
      name: 'Tattershall, Inc.',
      country: 'Vietnam',
      certificate_claims: {
        lead: {
          expiration_date: subDays(new Date(), 30).toISOString(),
        },
        phthalate: {
          expiration_date: subDays(new Date(), 3).toISOString(),
        },
      },
    },
    {
      id: 7,
      name: 'Panek, Inc.',
      country: 'Vietnam',
      certificate_claims: {
        pfas: {
          expiration_date: addDays(new Date(), 60).toISOString(),
        },
        lead: {
          expiration_date: addDays(new Date(), 30).toISOString(),
        },
        bluesign: {
          expiration_date: addDays(new Date(), 70).toISOString(),
        },
      },
    },
    {
      id: 8,
      name: 'Faul, Inc.',
      country: 'Vietnam',
      certificate_claims: {
        pfas: {
          expiration_date: addDays(new Date(), 5).toISOString(),
        },
        lead: {
          expiration_date: addDays(new Date(), 5).toISOString(),
        },
        phthalate: {},
        bluesign: {
          expiration_date: addDays(new Date(), 70).toISOString(),
        },
      },
    },
    {
      id: 9,
      name: 'Hushon, Inc.',
      country: 'Vietnam',
      certificate_claims: {
        pfas: {
          expiration_date: addDays(new Date(), 70).toISOString(),
        },
        lead: {
          expiration_date: addDays(new Date(), 5).toISOString(),
        },
        phthalate: {
          expiration_date: addDays(new Date(), 5).toISOString(),
        },
        bluesign: {
          expiration_date: addDays(new Date(), 70).toISOString(),
        },
      },
    },
  ];
};

export const getSupplierWithCertificationClaimsMock = () => {
  const certifications = getCertificationsMock();
  return [
    {
      id: 1,
      name: 'VietWear Garments Co., Ltd.',
      country: 'Vietnam',
      certificate_claims: [
        {
          certification: certifications.find(cert => cert.name === 'PFAS-Test'),
          expiration_date: addDays(new Date(), 5).toISOString(),
        },
        {
          certification: certifications.find(cert => cert.name === 'Lead-Test'),
          expiration_date: null,
        },
        {
          certification: certifications.find(cert => cert.name === 'phthalate'),
          expiration_date: null,
        },
        {
          certification: certifications.find(cert => cert.name === 'bluesign'),
          expiration_date: addDays(new Date(), 5).toISOString(),
        },
      ],
    },
    {
      id: 2,
      name: 'Pritt, Inc.',
      country: 'China',
      certificate_claims: [
        {
          certification: certifications.find(cert => cert.name === 'PFAS-Test'),
          expiration_date: addDays(new Date(), 5).toISOString(),
        },
        {
          certification: certifications.find(cert => cert.name === 'phthalate'),
          expiration_date: addDays(new Date(), 5).toISOString(),
        },
      ],
    },
    {
      id: 3,
      name: 'Smotherman, Inc.',
      country: 'Vietnam',
      certificate_claims: [
        {
          certification: certifications.find(cert => cert.name === 'PFAS-Test'),
          expiration_date: addDays(new Date(), 10).toISOString(),
        },
        {
          certification: certifications.find(cert => cert.name === 'Lead-Test'),
          expiration_date: addDays(new Date(), 70).toISOString(),
        },
      ],
    },
    {
      id: 4,
      name: 'Menzie, Inc.',
      country: 'Vietnam',
      // certificate_claims: {
      //   pfas: {
      //     expiration_date: addDays(new Date(), 30).toISOString(),
      //   },
      //   bluesign: {
      //     expiration_date: addDays(new Date(), 70).toISOString(),
      //   },
      // },
      certificate_claims: [
        {
          certification: certifications.find(cert => cert.name === 'PFAS-Test'),
          expiration_date: addDays(new Date(), 30).toISOString(),
        },
        {
          certification: certifications.find(cert => cert.name === 'bluesign'),
          expiration_date: addDays(new Date(), 70).toISOString(),
        },
      ],
    },
    {
      id: 5,
      name: 'Want, Inc.',
      country: 'Vietnam',
      // certificate_claims: {
      //   pfas: {
      //     expiration_date: addDays(new Date(), 70).toISOString(),
      //   },
      //   bluesign: {
      //     expiration_date: subDays(new Date(), 3).toISOString(),
      //   },
      // },
      certificate_claims: [
        {
          certification: certifications.find(cert => cert.name === 'PFAS-Test'),
          expiration_date: addDays(new Date(), 70).toISOString(),
        },
        {
          certification: certifications.find(cert => cert.name === 'bluesign'),
          expiration_date: subDays(new Date(), 3).toISOString(),
        },
      ],
    },
    {
      id: 6,
      name: 'Tattershall, Inc.',
      country: 'Vietnam',
      // certificate_claims: {
      //   lead: {
      //     expiration_date: subDays(new Date(), 30).toISOString(),
      //   },
      //   phthalate: {
      //     expiration_date: subDays(new Date(), 3).toISOString(),
      //   },
      // },
      certificate_claims: [
        {
          certification: certifications.find(cert => cert.name === 'Lead-Test'),
          expiration_date: subDays(new Date(), 30).toISOString(),
        },
        {
          certification: certifications.find(cert => cert.name === 'phthalate'),
          expiration_date: subDays(new Date(), 3).toISOString(),
        },
      ],
    },
    {
      id: 7,
      name: 'Panek, Inc.',
      country: 'Vietnam',
      // certificate_claims: {
      //   pfas: {
      //     expiration_date: addDays(new Date(), 60).toISOString(),
      //   },
      //   lead: {
      //     expiration_date: addDays(new Date(), 30).toISOString(),
      //   },
      //   bluesign: {
      //     expiration_date: addDays(new Date(), 70).toISOString(),
      //   },
      // },
      certificate_claims: [
        {
          certification: certifications.find(cert => cert.name === 'PFAS-Test'),
          expiration_date: addDays(new Date(), 60).toISOString(),
        },
        {
          certification: certifications.find(cert => cert.name === 'Lead-Test'),
          expiration_date: addDays(new Date(), 30).toISOString(),
        },
        {
          certification: certifications.find(cert => cert.name === 'bluesign'),
          expiration_date: addDays(new Date(), 70).toISOString(),
        },
      ],
    },
    {
      id: 8,
      name: 'Faul, Inc.',
      country: 'Vietnam',
      certificate_claims: [
        {
          certification: certifications.find(cert => cert.name === 'PFAS-Test'),
          expiration_date: addDays(new Date(), 5).toISOString(),
        },
        {
          certification: certifications.find(cert => cert.name === 'Lead-Test'),
          expiration_date: addDays(new Date(), 5).toISOString(),
        },
        {
          certification: certifications.find(cert => cert.name === 'phthalate'),
          expiration_date: null,
        },
        {
          certification: certifications.find(cert => cert.name === 'bluesign'),
          expiration_date: addDays(new Date(), 70).toISOString(),
        },
      ],
    },
    {
      id: 9,
      name: 'Hushon, Inc.',
      country: 'Vietnam',
      // certificate_claims: {
      //   pfas: {
      //     expiration_date: addDays(new Date(), 70).toISOString(),
      //   },
      //   lead: {
      //     expiration_date: addDays(new Date(), 5).toISOString(),
      //   },
      //   phthalate: {
      //     expiration_date: addDays(new Date(), 5).toISOString(),
      //   },
      //   bluesign: {
      //     expiration_date: addDays(new Date(), 70).toISOString(),
      //   },
      // },
      certificate_claims: [
        {
          certification: certifications.find(cert => cert.name === 'PFAS-Test'),
          expiration_date: addDays(new Date(), 70).toISOString(),
        },
        {
          certification: certifications.find(cert => cert.name === 'Lead-Test'),
          expiration_date: addDays(new Date(), 5).toISOString(),
        },
        {
          certification: certifications.find(cert => cert.name === 'phthalate'),
          expiration_date: addDays(new Date(), 5).toISOString(),
        },
        {
          certification: certifications.find(cert => cert.name === 'bluesign'),
          expiration_date: addDays(new Date(), 70).toISOString(),
        },
      ],
    },
  ];
};
