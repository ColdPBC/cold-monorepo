import { claim_levels, claim_types, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
console.log('ENVIRONMENT:', process.env['NODE_ENV']);
// Add new form_definition row data to the seeds array
const seeds: Array<{
	name: string;
	type: claim_types;
	level: claim_levels;
}> = [
	{
		name: 'BIFMA Level',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Blue Angel',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'FSC',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'MadeSafe',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Leaping Bunny',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Responsible Wool Standard',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Responsible Down Standard',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Organic Content Standard',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Recycled Claim Standard',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Leather Working Group Manufacturer Standard',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Wood-based Material',
		type: 'INTERNAL',
		level: 'MATERIAL',
	},
	{
		name: 'Global Recycled Standard',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'FSC Certificate',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'PEFC Programme for the Endorsement of Forest Certification (PEFC)',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'GOTS - Organic',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'GOTS - Made with X% Organic',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Better Cotton Initative',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'bioRE Sustainable Cotton',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Fairtrade Cotton',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Oeko-Tex Organic Cotton',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Responsible Alpaca Standard',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Responsible Mohair Standard',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Nativa',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'ZQ and ZQRX',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Bio-based Content Certification (EU)',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Down Codex',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'DownPass',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Global Traceable Down Standard',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Leather Working Group - Bronze',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Leather Working Group - Silver',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Leather Working Group - Gold',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Oeko-Tex Leather Standard',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'TerraCare Leather',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Higg BRM (Brand & Retail Module)',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Carbon Trust - Carbon Neutral Certification',
		type: 'THIRD_PARTY',
		level: 'ORGANIZATION',
	},
	{
		name: 'Carbon Trust - Carbon Reduction Certification',
		type: 'THIRD_PARTY',
		level: 'ORGANIZATION',
	},
	{
		name: 'Carbon Trust - Lower Co2 Lable',
		type: 'THIRD_PARTY',
		level: 'ORGANIZATION',
	},
	{
		name: 'Change Climate Certified',
		type: 'THIRD_PARTY',
		level: 'ORGANIZATION',
	},
	{
		name: 'Climate Neutral - South Pole',
		type: 'THIRD_PARTY',
		level: 'ORGANIZATION',
	},
	{
		name: "SBTi Accreditation - Near Term Target (1.5'C by 2030)",
		type: 'THIRD_PARTY',
		level: 'ORGANIZATION',
	},
	{
		name: 'SBTi Accreditation - Long Term Target (Net Zero by 2040)',
		type: 'THIRD_PARTY',
		level: 'ORGANIZATION',
	},
	{
		name: 'SBTi Accreditation - Long Term Target (Net Zero by 2050)',
		type: 'THIRD_PARTY',
		level: 'ORGANIZATION',
	},
	{
		name: 'B-Corp Certification',
		type: 'THIRD_PARTY',
		level: 'ORGANIZATION',
	},
	{
		name: 'Green Button',
		type: 'THIRD_PARTY',
		level: 'ORGANIZATION',
	},
	{
		name: 'ISO 50001 - Energy Management',
		type: 'THIRD_PARTY',
		level: 'ORGANIZATION',
	},
	{
		name: '1% for the Planet',
		type: 'THIRD_PARTY',
		level: 'ORGANIZATION',
	},
	{
		name: 'BSCI',
		type: 'THIRD_PARTY',
		level: 'ORGANIZATION',
	},
	{
		name: 'Ethical Trading Initiative Base Code',
		type: 'THIRD_PARTY',
		level: 'ORGANIZATION',
	},
	{
		name: 'Fair Trade Quaterly Reporting',
		type: 'THIRD_PARTY',
		level: 'PRODUCT',
	},
	{
		name: 'Cradle to Cradle',
		type: 'THIRD_PARTY',
		level: 'PRODUCT',
	},
	{
		name: 'EU Ecolabel Textile Standard',
		type: 'THIRD_PARTY',
		level: 'PRODUCT',
	},
	{
		name: 'Green Shape',
		type: 'THIRD_PARTY',
		level: 'PRODUCT',
	},
	{
		name: 'Yonderland',
		type: 'THIRD_PARTY',
		level: 'PRODUCT',
	},
	{
		name: 'Altitude Sports',
		type: 'THIRD_PARTY',
		level: 'PRODUCT',
	},
	{
		name: 'Globetrotter',
		type: 'THIRD_PARTY',
		level: 'PRODUCT',
	},
	{
		name: 'Bluesign Product',
		type: 'THIRD_PARTY',
		level: 'PRODUCT',
	},
	{
		name: 'Fair Trade Annual Reporting',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
	},
	{
		name: 'Bluesign',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Fair Wear',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
	},
	{
		name: 'ISO 14000 - Environmental Management Systems',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
	},
	{
		name: 'ISO 26000 - Social Responsibility',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
	},
	{
		name: 'ZDHC Chemical Management System',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
	},
	{
		name: 'Adherence to ZDHC MRSL',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
	},
	{
		name: 'Detox to Zero',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
	},
	{
		name: 'Fair Trade Textile Standard',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
	},
	{
		name: 'Oeko-Tex Made in Green',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
	},
	{
		name: 'Oeko-Tex STeP',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
	},
	{
		name: 'BEPI',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
	},
	{
		name: 'Fair Labour Standard',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
	},
	{
		name: 'SMETA Audit',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
	},
	{
		name: 'WFTO Fair Trade Standard',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
	},
	{
		name: 'Worldwide Responsible Accredited Production (WRAP)',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
	},
	{
		name: 'Supplier Code of Conduct',
		type: 'INTERNAL',
		level: 'SUPPLIER',
	},
	{
		name: 'Restricted Substance Policy',
		type: 'INTERNAL',
		level: 'SUPPLIER',
	},
	{
		name: 'Code of Conduct Policy',
		type: 'INTERNAL',
		level: 'SUPPLIER',
	},
	{
		name: 'Environmental Policy',
		type: 'INTERNAL',
		level: 'SUPPLIER',
	},
	{
		name: 'Sustainability Policy',
		type: 'INTERNAL',
		level: 'SUPPLIER',
	},
	{
		name: 'ESG Policy',
		type: 'INTERNAL',
		level: 'SUPPLIER',
	},
	{
		name: 'Human Rights Policy',
		type: 'INTERNAL',
		level: 'SUPPLIER',
	},
	{
		name: 'Risk Management Policy',
		type: 'INTERNAL',
		level: 'SUPPLIER',
	},
	{
		name: 'Recycled Plant-Based',
		type: 'INTERNAL',
		level: 'MATERIAL',
	},
	{
		name: 'Recycled Synthetics',
		type: 'INTERNAL',
		level: 'MATERIAL',
	},
	{
		name: 'Recycled Plastics',
		type: 'INTERNAL',
		level: 'MATERIAL',
	},
	{
		name: 'Recycled Down',
		type: 'INTERNAL',
		level: 'MATERIAL',
	},
	{
		name: 'Recycled Leather',
		type: 'INTERNAL',
		level: 'MATERIAL',
	},
	{
		name: 'Recycled Wool',
		type: 'INTERNAL',
		level: 'MATERIAL',
	},
	{
		name: 'Recycled Organics',
		type: 'INTERNAL',
		level: 'MATERIAL',
	},
	{
		name: 'Recycled Viscose',
		type: 'INTERNAL',
		level: 'MATERIAL',
	},
	{
		name: 'Recycled Metals',
		type: 'INTERNAL',
		level: 'MATERIAL',
	},
	{
		name: 'Organic',
		type: 'INTERNAL',
		level: 'MATERIAL',
	},
	{
		name: 'Wood-based Viscose',
		type: 'INTERNAL',
		level: 'MATERIAL',
	},
	{
		name: 'Bio-based Synthetics',
		type: 'INTERNAL',
		level: 'MATERIAL',
	},
	{
		name: 'REACH (Registration, Evaluation, Authorisation and Restriction of Chemical)',
		type: 'THIRD_PARTY',
		level: 'PRODUCT',
	},
	{
		name: 'Carbon Border Adjustment Mechanism (CBAM)',
		type: 'THIRD_PARTY',
		level: 'PRODUCT',
	},
	{
		name: 'Digial Product Passport (DPP)',
		type: 'THIRD_PARTY',
		level: 'PRODUCT',
	},
	{
		name: 'Fashion Sustainability and Social Accountability Act',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
	},
	{
		name: 'Uses Rewneable Energy',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
	},
	{
		name: 'No Intentional PFAS',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
	},
	{
		name: 'PFAS',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Lead',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'BPA',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'AP & APEO',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Arylamines',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Dioxins & Furans',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Disperse Dyes',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Flame Retardants',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Formaldehyde',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Heavy Metals',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Organotin Compounds',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Polycyclic aromatic hydrocarbons (PAH)',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Pesticides',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Phthalates',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'Solvents',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'REACH',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
	{
		name: 'CA Proposition 65',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
	},
];

export async function seedSustainabilityAttributes() {
	await prisma.$connect();

	console.log(`Seeding Sustainability Attributes...`);

	let count = 0;
	await Promise.all(
		seeds.map(async (seed: any) => {
			const existing = await prisma.sustainability_attributes.findFirst({
				where: {
					name: seed.name,
					organization_id: null,
				},
			});

			if (existing?.id) {
				await prisma.sustainability_attributes.update({
					where: {
						id: existing.id,
					},
					data: seed,
				});

				console.log(`updated existing Sustainability Attribute (${count} of ${seeds.length}): ${seed.name}`, existing);
				count++;
				return;
			}

			const result = await prisma.sustainability_attributes.create({
				data: seed,
			});

			count++;
			console.log(`🌱 seeded (${count} of ${seeds.length}) Sustainability Attributes: ${seed.title} 🌱`, result);
		}),
	);

	console.log(`${count} sustainability attributes processed!`);

	await prisma.$disconnect();
}
