import { PrismaClient } from '@prisma/client';
import { v4 } from 'uuid';

const prisma = new PrismaClient();
// Add new form_definition row data to the seeds array
const seeds: Array<{
  id: string;
  title: string;
  url: string;
  image_url: string;
  published_at: string;
  source_name: string;
}> = [
  {
    id: v4(),
    title: 'Carbon credit market confidence ebbs as big names retreat',
    url: 'https://www.reuters.com/sustainability/carbon-credit-market-confidence-ebbs-big-names-retreat-2023-09-01/',
    image_url:
      'https://www.reuters.com/resizer/19ZnOlXJL0lqbq588RsYF5Z-cAM=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/6ELBCZRUIRK7FNNQCF66P47QIA.jpg',
    published_at: '2023-09-01T09:00:08.000Z',
    source_name: 'Reuters',
  },
  {
    id: v4(),
    title: 'Save the Planet, Put Down that Hamburger',
    url: 'https://www.nytimes.com/2023/07/21/climate/diet-vegan-meat-emissions.html',
    image_url: 'https://static01.nyt.com/images/2023/07/21/science/21CLI-VEGAN/21CLI-VEGAN-facebookJumbo.jpg',
    published_at: '2023-07-21T09:00:08.000Z',
    source_name: 'New York Times',
  },
];

export async function seedNews() {
  await prisma.$connect();

  console.log(`Seeding News...`);

  let count = 0;
  await Promise.all(
    seeds.map(async (seed: any) => {
      const result = await prisma.news.upsert({
        where: {
          id: seed.id,
        },
        update: seed,
        create: {
          ...seed,
          created_at: new Date(),
        },
      });

      count++;
      console.log(`🌱 seeded (${count} of ${seeds.length}) News stories: ${seed.title} 🌱`, result);
    }),
  );

  console.log(`${count} News stories seeded!`);

  await prisma.$disconnect();
}
