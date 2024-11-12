import { Claims, SuppliersClaimNamesPayload } from '@coldpbc/interfaces';
import { EntityLevel } from '@coldpbc/enums';

export const getSupplierClaimsMock = (): SuppliersClaimNamesPayload[] => {
	return getClaimsMock()
		.filter(cert => {
			return cert.level === EntityLevel.SUPPLIER;
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
			level: EntityLevel.SUPPLIER,
      logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/generics/RSL.png',
			type: 'TEST',
		},
		{
			id: '2',
			name: 'Lead-Test',
			level: EntityLevel.SUPPLIER,
      logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/generics/RSL.png',
      type: 'TEST',
		},
		{
			id: '3',
			name: 'phthalate',
			level: EntityLevel.SUPPLIER,
      logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/generics/RSL.png',
      type: 'TEST',
		},
		{
			id: '4',
			name: 'bluesign',
			level: EntityLevel.MATERIAL,
      logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Bluesign.png',
      type: 'TEST',
		},
		{
			id: '5',
			name: 'WRAP',
			level: EntityLevel.SUPPLIER,
      logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Worldwide+Responsible+Accredited+Production.png',
      type: 'TEST',
		},
		{
			id: '6',
			name: 'PFAS',
			level: EntityLevel.SUPPLIER,
      logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/generics/RSL.png',
      type: 'TEST',
		},
	];
};

export const getClaimsMockByName = (name: string): Claims => {
	return getClaimsMock().find(cert => cert.name === name) || getClaimsMock()[0];
};
