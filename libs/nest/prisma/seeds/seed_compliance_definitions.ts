import { PrismaClient } from '@prisma/client';
import process from 'process';
import { Cuid2Generator, GuidPrefixes } from '../../src/lib/utility';

const prisma = new PrismaClient();
console.log('ENVIRONMENT:', process.env['NODE_ENV']);

// Add new row data to the seeds array
const complianceDefSeeds = [
  {
    name: 'one_percent_for_planet_DEMO',
    logo_url: 'https://cold-public-assets.s3.amazonaws.com/3rdPartyLogos/compliance_svgs/1_percent_for_the_planet_logo.svg',
    surveys: ['one_percent_for_planet_DEMO'],
    title: '1% for the Planet',
    image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/complianceBackgroundImages/rei.png',
    order: 0,
    visible: true,
  },
  {
    name: 'b_corp_2024',
    logo_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/compliance_svgs/b_corp_logo.svg',
    surveys: ['b_corp_2024'],
    title: 'B Corp',
    image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/complianceBackgroundImages/rei.png',
    order: 3,
    visible: true,
  },
  {
    name: 'amazon',
    logo_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/compliance_svgs/amazon_logo.svg',
    surveys: ['b_corp_2024'],
    title: 'Amazon',
    image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/complianceBackgroundImages/rei.png',
    order: 2,
    visible: true,
  },
  {
    name: 'oia_climate_report_2023',
    logo_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/compliance_svgs/oia_logo.svg',
    surveys: ['oia_climate_report_2023'],
    title: 'OIA Climate Action Corps Progress Report 2023',
    image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/complianceBackgroundImages/rei.png',
    order: 4,
    visible: true,
  },
  {
    name: 'rei_pia_2024',
    logo_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/compliance_svgs/rei_logo.svg',
    surveys: ['rei_pia_2024'],
    title: 'REI Product Impact Assessment 2024',
    image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/complianceBackgroundImages/rei.png',
    order: 5,
    visible: true,
  },
];

export async function seedComplianceDefinitions() {
  await prisma.$connect();

  console.log(`Seeding Compliance Definitions...`);

  let count = 0;

  await Promise.all(
    complianceDefSeeds.map(async (seed: any) => {
      if (process.env.NODE_ENV === 'development') {
        const result = await prisma.compliance_definitions.upsert({
          where: {
            name: seed.name,
          },
          update: { ...seed },
          create: {
            id: new Cuid2Generator(GuidPrefixes.ComplianceDefinition).scopedId,
            ...seed,
            updated_at: new Date(),
          },
        });

        count++;
        console.log(`🌱 seeded (${count} of ${complianceDefSeeds.length}) Compliance Definitions: ${seed.title} 🌱`, result);
      }
    }),
  );

  console.log(`${count} Compliance Definitions seeded!`);

  await prisma.$disconnect();
}
