import { claim_levels, claim_types, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
console.log('ENVIRONMENT:', process.env['NODE_ENV']);
// Add new form_definition row data to the seeds array
const baseUrl = 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes';
const seeds: Array<{
	name: string;
	type: claim_types;
	level: claim_levels;
	logo_url?: string;
}> = [
	{
		name: 'Oeko-Tex Standard 100',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/Okeo+Tex+Standard+100.png`,
	},
	{
		name: 'BIFMA (Business and Institutional Furniture Manufacturers Association)',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/BIFMA.png`,
	},
	{
		name: 'Blue Angel',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/Blue+Angel.png`,
	},
	{
		name: 'FSC (Forest Stewardship Council)',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/FSC.png`,
	},
	{
		name: 'MadeSafe',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/Made+Safe.png`,
	},
	{
		name: 'Leaping Bunny',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/Leaping+Bunny.png`,
	},
	{
		name: 'RWS (Responsible Wool Standard)',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/Responsible+Wool+Standard.png`,
	},
	{
		name: 'RDS (Responsible Down Standard)',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/Responsible+Down+Standard.png`,
	},
	{
		name: 'OCS (Organic Content Standard)',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/Organic+Content+Standard.png`,
	},
	{
		name: 'RCS (Recycled Claim Standard)',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/Recycled+Claim+Standard.png`,
	},
	{
		name: 'Leather Working Group Manufacturer Standard',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/Leather+Working+Group.png`,
	},
	{
		name: 'Wood-based Material',
		type: 'INTERNAL',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/Wood-based+Material.png`,
	},
	{
		name: 'GRS (Global Recycled Standard)',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/Global+Recycled+Standard.png`,
	},
	{
		name: 'PEFC (Programme for the Endorsement of Forest Certification)',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/PEFC.png`,
	},
	{
		name: 'GOTS Organic (Global Organic Textile Standard)',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/GOTS.png`,
	},
	{
		name: 'GOTS Made with Organic (Global Organic Textile Standard)',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/GOTS.png`,
	},
	{
		name: 'Better Cotton Initiative',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/Better+Cotton+Iniative.png`,
	},
	{
		name: 'bioRE Sustainable Cotton',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/bioRE+Sustainable+Cotton.png`,
	},
	{
		name: 'Fairtrade Cotton',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/Fairtrade+Cotton.png`,
	},
	{
		name: 'Oeko-Tex Organic Cotton',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/Okeo+Tex+Organic+Cotton.png`,
	},
	{
		name: 'Responsible Alpaca Standard',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/Responsible+Alpaca+Standard.png`,
	},
	{
		name: 'Responsible Mohair Standard',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/Responsible+Mohair+Standard.png`,
	},
	{
		name: 'Nativa',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/Nativa.png`,
	},
	{
		name: 'ZQ and ZQRX',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/ZQ.png`,
	},
	{
		name: 'Bio-based Content Certification (EU)',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/Biobased.png`,
	},
	{
		name: 'Down Codex',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/Down+Codex.png`,
	},
	{
		name: 'DownPass',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/Down+Pass.png`,
	},
	{
		name: 'Global Traceable Down Standard',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/Global+Traceable+Down.png`,
	},
	{
		name: 'Leather Working Group - Bronze',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/LWG+Bronze.png`,
	},
	{
		name: 'Leather Working Group - Silver',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/LWG+Silver.png`,
	},
	{
		name: 'Leather Working Group - Gold',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/LWG+Gold.png`,
	},
	{
		name: 'Oeko-Tex Leather Standard',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/Okeo+Tex+Leather+Standard.png`,
	},
	{
		name: 'TerraCare Leather',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/TerraCare+Leather.png`,
	},
	{
		name: 'Higg BRM (Brand & Retail Module)',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/Higg+Index.png`,
	},
	{
		name: 'Carbon Trust Carbon Neutral Certification',
		type: 'THIRD_PARTY',
		level: 'ORGANIZATION',
		logo_url: `${baseUrl}/Carbon+Trust+-+Carbon+Neutral.png`,
	},
	{
		name: 'Carbon Trust Carbon Reduction Certification',
		type: 'THIRD_PARTY',
		level: 'ORGANIZATION',
		logo_url: `${baseUrl}/Carbon+Trust+-+Carbon+Reduction+Certification.png`,
	},
	{
		name: 'Carbon Trust Lower Co2 Label',
		type: 'THIRD_PARTY',
		level: 'ORGANIZATION',
		logo_url: `${baseUrl}/Carbon+Trust+-+Lower+Co2+Lable.png`,
	},
	{
		name: 'Change Climate Certified',
		type: 'THIRD_PARTY',
		level: 'ORGANIZATION',
		logo_url: `${baseUrl}/Change+Climate+Certified.png`,
	},
	{
		name: 'South Pole Climate Neutral',
		type: 'THIRD_PARTY',
		level: 'ORGANIZATION',
		logo_url: `${baseUrl}/Climate+Neutral+-+South+Pole.png`,
	},
	{
		name: "SBTi Accreditation - Near Term Target (1.5'C by 2030)",
		type: 'THIRD_PARTY',
		level: 'ORGANIZATION',
		logo_url: `${baseUrl}/SBTI+-+ALL.png`,
	},
	{
		name: 'SBTi Accreditation - Long Term Target (Net Zero by 2040)',
		type: 'THIRD_PARTY',
		level: 'ORGANIZATION',
		logo_url: `${baseUrl}/SBTI+-+ALL.png`,
	},
	{
		name: 'SBTi Accreditation - Long Term Target (Net Zero by 2050)',
		type: 'THIRD_PARTY',
		level: 'ORGANIZATION',
		logo_url: `${baseUrl}/SBTI+-+ALL.png`,
	},
	{
		name: 'B-Corp Certification',
		type: 'THIRD_PARTY',
		level: 'ORGANIZATION',
		logo_url: `${baseUrl}/B-Corp+Certification.png`,
	},
	{
		name: 'Green Button',
		type: 'THIRD_PARTY',
		level: 'ORGANIZATION',
		logo_url: `${baseUrl}/Green+Button.png`,
	},
	{
		name: 'ISO 50001 - Energy Management',
		type: 'THIRD_PARTY',
		level: 'ORGANIZATION',
		logo_url: `${baseUrl}/ISO+50001.png`,
	},
	{
		name: 'BSCI (Business Social Compliance Initiative)',
		type: 'THIRD_PARTY',
		level: 'ORGANIZATION',
		logo_url: `${baseUrl}/BSCI.png`,
	},
	{
		name: 'Ethical Trading Initiative Base Code',
		type: 'THIRD_PARTY',
		level: 'ORGANIZATION',
		logo_url: `${baseUrl}/Ethical+Trading+Initiative+Base+Code.png`,
	},
	{
		name: 'Fair Trade Quarterly Reporting',
		type: 'THIRD_PARTY',
		level: 'PRODUCT',
		logo_url: `${baseUrl}/Fairtrade.png`,
	},
	{
		name: 'Cradle to Cradle',
		type: 'THIRD_PARTY',
		level: 'PRODUCT',
		logo_url: `${baseUrl}/Cradle+to+Cradle.png`,
	},
	{
		name: 'EU Ecolabel Textile Standard',
		type: 'THIRD_PARTY',
		level: 'PRODUCT',
		logo_url: `${baseUrl}/EU+Eco+Label.png`,
	},
	{
		name: 'Green Shape',
		type: 'THIRD_PARTY',
		level: 'PRODUCT',
		logo_url: `${baseUrl}/Green+Shape.png`,
	},
	{
		name: 'Bluesign Product',
		type: 'THIRD_PARTY',
		level: 'PRODUCT',
		logo_url: `${baseUrl}/Bluesign+Product.png`,
	},
	{
		name: 'Fair Trade Annual Reporting',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
		logo_url: `${baseUrl}/Fairtrade.png`,
	},
	{
		name: 'Bluesign',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/Bluesign.png`,
	},
	{
		name: 'Fair Wear',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
		logo_url: `${baseUrl}/Fair+Wear.png`,
	},
	{
		name: 'ISO 14000 - Environmental Management Systems',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
		logo_url: `${baseUrl}/ISO+14000.png`,
	},
	{
		name: 'ISO 26000 - Social Responsibility',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
		logo_url: `${baseUrl}/ISO+26000.png`,
	},
	{
		name: 'ZDHC Chemical Management System (Zero Discharge of Hazardous Chemicals)',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
		logo_url: `${baseUrl}/ZDHC.png`,
	},
	{
		name: 'ZDHC MRSL (Zero Discharge of Hazardous Chemicals Manufacturing Restricted Substances List)',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
		logo_url: `${baseUrl}/ZDHC.png`,
	},
	{
		name: 'Detox to Zero',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
		logo_url: `${baseUrl}/Detox+to+Zero.png`,
	},
	{
		name: 'Fair Trade Textile Standard',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
		logo_url: `${baseUrl}/Fairtrade+Textile+Standard.png`,
	},
	{
		name: 'Oeko-Tex Made in Green',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
		logo_url: `${baseUrl}/Okeo+Tex+Made+in+Green.png`,
	},
	{
		name: 'Oeko-Tex STeP (Sustainable Textile and Leather Production)',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
		logo_url: `${baseUrl}/Okeo+Tex+STeP.png`,
	},
	{
		name: 'BEPI (Business Environmental Performance Initiative)',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
		logo_url: `${baseUrl}/BEPI.png`,
	},
	{
		name: 'Fair Labour Standard',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
		logo_url: `${baseUrl}/Fair+Labor.png`,
	},
	{
		name: 'SMETA Audit (Sedex Members Ethical Trade Audit)',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
		logo_url: `${baseUrl}/SMETA+Audit.png`,
	},
	{
		name: 'WFTO Fair Trade Standard (World Fair Trade Organization)',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
		logo_url: `${baseUrl}/WFTO+Fair+Trade+Standard.png`,
	},
	{
		name: 'WRAP (Worldwide Responsible Accredited Production)',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
		logo_url: `${baseUrl}/Worldwide+Responsible+Accredited+Production.png`,
	},
	{
		name: 'Supplier Code of Conduct',
		type: 'INTERNAL',
		level: 'SUPPLIER',
		logo_url: `${baseUrl}/generics/Policy+or+Statement.png`,
	},
	{
		name: 'Restricted Substance Policy',
		type: 'INTERNAL',
		level: 'SUPPLIER',
		logo_url: `${baseUrl}/generics/Policy+or+Statement.png`,
	},
	{
		name: 'Code of Conduct Policy',
		type: 'INTERNAL',
		level: 'SUPPLIER',
		logo_url: `${baseUrl}/generics/Policy+or+Statement.png`,
	},
	{
		name: 'Environmental Policy',
		type: 'INTERNAL',
		level: 'SUPPLIER',
		logo_url: `${baseUrl}/generics/Policy+or+Statement.png`,
	},
	{
		name: 'Sustainability Policy',
		type: 'INTERNAL',
		level: 'SUPPLIER',
		logo_url: `${baseUrl}/generics/Policy+or+Statement.png`,
	},
	{
		name: 'ESG Policy (Environmental, Social, Governance)',
		type: 'INTERNAL',
		level: 'SUPPLIER',
		logo_url: `${baseUrl}/generics/Policy+or+Statement.png`,
	},
	{
		name: 'Human Rights Policy',
		type: 'INTERNAL',
		level: 'SUPPLIER',
		logo_url: `${baseUrl}/generics/Policy+or+Statement.png`,
	},
	{
		name: 'Risk Management Policy',
		type: 'INTERNAL',
		level: 'SUPPLIER',
		logo_url: `${baseUrl}/generics/Policy+or+Statement.png`,
	},
	{
		name: 'Recycled Plant-Based',
		type: 'INTERNAL',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/generics/Material+Composition.png`,
	},
	{
		name: 'Recycled Synthetics',
		type: 'INTERNAL',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/generics/Material+Composition.png`,
	},
	{
		name: 'Recycled Plastics',
		type: 'INTERNAL',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/generics/Material+Composition.png`,
	},
	{
		name: 'Recycled Down',
		type: 'INTERNAL',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/generics/Material+Composition.png`,
	},
	{
		name: 'Recycled Leather',
		type: 'INTERNAL',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/generics/Material+Composition.png`,
	},
	{
		name: 'Recycled Wool',
		type: 'INTERNAL',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/generics/Material+Composition.png`,
	},
	{
		name: 'Recycled Organics',
		type: 'INTERNAL',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/generics/Material+Composition.png`,
	},
	{
		name: 'Recycled Viscose',
		type: 'INTERNAL',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/generics/Material+Composition.png`,
	},
	{
		name: 'Recycled Metals',
		type: 'INTERNAL',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/generics/Material+Composition.png`,
	},
	{
		name: 'Organic',
		type: 'INTERNAL',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/generics/Material+Composition.png`,
	},
	{
		name: 'Wood-based Viscose',
		type: 'INTERNAL',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/generics/Material+Composition.png`,
	},
	{
		name: 'Bio-based Synthetics',
		type: 'INTERNAL',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/generics/RSL.png`,
	},
	{
		name: 'REACH Product (Registration, Evaluation, Authorisation and Restriction of Chemical)',
		type: 'THIRD_PARTY',
		level: 'PRODUCT',
		logo_url: `${baseUrl}/REACH.png`,
	},
	{
		name: 'CBAM (Carbon Border Adjustment Mechanism)',
		type: 'THIRD_PARTY',
		level: 'PRODUCT',
		logo_url: `${baseUrl}/generics/Policy+or+Statement.png`,
	},
	{
		name: 'DPP (Digital Product Passport)',
		type: 'THIRD_PARTY',
		level: 'PRODUCT',
		logo_url: `${baseUrl}/generics/Legislation.png`,
	},
	{
		name: 'Fashion Sustainability and Social Accountability Act',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
		logo_url: `${baseUrl}/generics/Legislation.png`,
	},
	{
		name: 'Uses Renewable Energy',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
		logo_url: `${baseUrl}/generics/Renewable+Energy.png`,
	},
	{
		name: 'No Intentional PFAS',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
		logo_url: `${baseUrl}/generics/RSL.png`,
	},
	{
		name: 'PFAS',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/generics/RSL.png`,
	},
	{
		name: 'Lead',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/generics/RSL.png`,
	},
	{
		name: 'BPA',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/generics/RSL.png`,
	},
	{
		name: 'AP & APEO',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/generics/RSL.png`,
	},
	{
		name: 'Arylamines',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/generics/RSL.png`,
	},
	{
		name: 'Dioxins & Furans',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/generics/RSL.png`,
	},
	{
		name: 'Disperse Dyes',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/generics/RSL.png`,
	},
	{
		name: 'Flame Retardants',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/generics/RSL.png`,
	},
	{
		name: 'Formaldehyde',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/generics/RSL.png`,
	},
	{
		name: 'Heavy Metals',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/generics/RSL.png`,
	},
	{
		name: 'Organotin Compounds',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/generics/RSL.png`,
	},
	{
		name: 'PAH (Polycyclic Aromatic Hydrocarbons)',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/generics/RSL.png`,
	},
	{
		name: 'Pesticides',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/generics/RSL.png`,
	},
	{
		name: 'Phthalates',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/generics/RSL.png`,
	},
	{
		name: 'Solvents',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/generics/RSL.png`,
	},
	{
		name: 'REACH Material (Registration, Evaluation, Authorisation and Restriction of Chemical)',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/REACH.png`,
	},
	{
		name: 'CA Proposition 65',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
		logo_url: `${baseUrl}/generics/Legislation.png`,
	},
	{
		name: 'Bluesign System Partner',
		type: 'THIRD_PARTY',
		level: 'ORGANIZATION',
		logo_url: `${baseUrl}/Bluesign.png`,
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
