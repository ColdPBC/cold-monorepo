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
			type: 'TEST',
		},
		{
			id: '2',
			name: 'Lead-Test',
			level: 'SUPPLIER',
			type: 'TEST',
		},
		{
			id: '3',
			name: 'phthalate',
			level: 'SUPPLIER',
			type: 'TEST',
		},
		{
			id: '4',
			name: 'bluesign',
			level: 'MATERIAL',
			type: 'TEST',
		},
		{
			id: '5',
			name: 'WRAP',
			level: 'SUPPLIER',
			type: 'TEST',
		},
		{
			id: '6',
			name: 'PFAS',
			level: 'SUPPLIER',
			type: 'TEST',
		},
	];
};

export const getClaimsMockByName = (name: string): Claims => {
	return getClaimsMock().find(cert => cert.name === name) || getClaimsMock()[0];
};
