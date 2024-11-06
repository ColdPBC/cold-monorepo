import { Claims, SuppliersClaimNamesPayload } from '@coldpbc/interfaces';

export const getSupplierClaimsMock = (): SuppliersClaimNamesPayload[] => {
	return getClaimsMock()
		.filter(cert => {
			return cert.level === 'Supplier';
		})
		.map(certification => {
			return {
				claim_name: certification.name,
			};
		});
};

export const getClaimsMock = (): Claims[] => {
	return [
		{
			id: '1',
			name: 'PFAS-Test',
			level: 'SUPPLIER',
      logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/generics/RSL.png',
			type: 'TEST',
		},
		{
			id: '2',
			name: 'Lead-Test',
			level: 'SUPPLIER',
      logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/generics/RSL.png',
      type: 'TEST',
		},
		{
			id: '3',
			name: 'phthalate',
			level: 'SUPPLIER',
      logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/generics/RSL.png',
      type: 'TEST',
		},
		{
			id: '4',
			name: 'bluesign',
			level: 'MATERIAL',
      logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Bluesign.png',
      type: 'TEST',
		},
		{
			id: '5',
			name: 'WRAP',
			level: 'SUPPLIER',
      logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Worldwide+Responsible+Accredited+Production.png',
      type: 'TEST',
		},
		{
			id: '6',
			name: 'PFAS',
			level: 'SUPPLIER',
      logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/generics/RSL.png',
      type: 'TEST',
		},
	];
};

export const getClaimsMockByName = (name: string): Claims => {
	return getClaimsMock().find(cert => cert.name === name) || getClaimsMock()[0];
};
