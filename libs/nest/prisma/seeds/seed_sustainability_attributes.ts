import { claim_levels, claim_types, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
console.log('ENVIRONMENT:', process.env['NODE_ENV']);
// Add new form_definition row data to the seeds array
const baseUrl = 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes'
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
		name: 'BIFMA Level',
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
		name: 'FSC',
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
		name: 'Responsible Wool Standard',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
    logo_url: `${baseUrl}/Responsible+Wool+Standard.png`,
	},
	{
		name: 'Responsible Down Standard',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
    logo_url: `${baseUrl}/Responsible+Down+Standard.png`,
	},
	{
		name: 'Organic Content Standard',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
    logo_url: `${baseUrl}/Organic+Content+Standard.png`,
	},
	{
		name: 'Recycled Claim Standard',
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
		name: 'Global Recycled Standard',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
    logo_url: `${baseUrl}/Global+Recycled+Standard.png`,
	},
	{
		name: 'PEFC Programme for the Endorsement of Forest Certification (PEFC)',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
    logo_url: `${baseUrl}/PEFC.png`,
	},
	{
		name: 'GOTS - Organic',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
    logo_url: `${baseUrl}/GOTS.png`,
	},
	{
		name: 'GOTS - Made with X% Organic',
		type: 'THIRD_PARTY',
		level: 'MATERIAL',
    logo_url: `${baseUrl}/GOTS.png`,
	},
  {
    name: 'Better Cotton Initative',
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
		name: 'Carbon Trust - Carbon Neutral Certification',
		type: 'THIRD_PARTY',
		level: 'ORGANIZATION',
    logo_url: `${baseUrl}/Carbon+Trust+-+Carbon+Neutral.png`,
	},
	{
		name: 'Carbon Trust - Carbon Reduction Certification',
		type: 'THIRD_PARTY',
		level: 'ORGANIZATION',
    logo_url: `${baseUrl}/Carbon+Trust+-+Carbon+Reduction+Certification.png`,
	},
	{
		name: 'Carbon Trust - Lower Co2 Lable',
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
		name: 'Climate Neutral - South Pole',
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
		name: '1% for the Planet',
		type: 'THIRD_PARTY',
		level: 'ORGANIZATION',
    logo_url: `${baseUrl}/1%25+for+the+planet.png`,
	},
	{
		name: 'BSCI',
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
		name: 'Fair Trade Quaterly Reporting',
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
		name: 'Yonderland',
		type: 'THIRD_PARTY',
		level: 'PRODUCT',
    logo_url: `${baseUrl}/Yonderland.png`,
	},
	{
		name: 'Altitude Sports',
		type: 'THIRD_PARTY',
		level: 'PRODUCT',
    logo_url: `${baseUrl}/Altitude+Sports.png`,
	},
	{
		name: 'Globetrotter',
		type: 'THIRD_PARTY',
		level: 'PRODUCT',
    logo_url: `${baseUrl}/Globetrotter.png`,
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
		name: 'ZDHC Chemical Management System',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
    logo_url: `${baseUrl}/ZDHC.png`,
	},
	{
		name: 'Adherence to ZDHC MRSL',
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
		name: 'Oeko-Tex STeP',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
    logo_url: `${baseUrl}/Okeo+Tex+STeP.png`,
	},
	{
		name: 'BEPI',
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
		name: 'SMETA Audit',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
    logo_url: `${baseUrl}/SMETA+Audit.png`,
	},
	{
		name: 'WFTO Fair Trade Standard',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
    logo_url: `${baseUrl}/WFTO+Fair+Trade+Standard.png`,
	},
	{
		name: 'Worldwide Responsible Accredited Production (WRAP)',
		type: 'THIRD_PARTY',
		level: 'SUPPLIER',
    logo_url: `${baseUrl}/Worldwide+Responsible+Accredited+Production.png`,
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
    logo_url: `${baseUrl}/REACH.png`,
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
    logo_url: `${baseUrl}/REACH.png`,
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
