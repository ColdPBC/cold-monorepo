import { PrismaClient } from '@prisma/client';
import { omit, set } from 'lodash';

const prisma = new PrismaClient();
console.log('ENVIRONMENT:', process.env['NODE_ENV']);
// Add new form_definition row data to the seeds array

type supported_utilitity = {
  id?: string;
  service_definition_name: string;
  name: string;
  label: string;
  data?: any;
  created_at?: string;
  updated_at?: string;
};

const seeds: Array<supported_utilitity> = [
  {
    name: 'ameren',
    label: 'Ameren',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: 'Instant',
      usage_interval: 'Hourly',
    },
  },
  {
    name: 'arizona_public_service',
    label: 'Arizona Public Service',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: '48',
    },
  },
  {
    name: 'austin_utilities',
    label: 'Austin Utilities',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: '48',
      usage_interval: '15 Minute',
    },
  },
  {
    name: 'baltimore_gas_and_electric',
    label: 'Baltimore Gas and Electric',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: 'Instant',
      usage_interval: 'Hourly',
    },
  },
  {
    name: 'central_hudson',
    label: 'Central Hudson',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: 'Instant',
      usage_interval: '15 Minute',
    },
  },
  {
    name: 'central_maine_power',
    label: 'Central Maine Power',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: '48',
      usage_interval: 'Hourly',
    },
  },
  {
    name: 'commonwealth_edison',
    label: 'Commonwealth Edison',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: 'Instant',
      usage_interval: '15 Minute',
    },
  },
  {
    name: 'con_edison',
    label: 'Con Edison',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: 'Instant',
      usage_interval: '15 Minute',
    },
  },
  {
    name: 'consumers_energy',
    label: 'Consumers Energy',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: '48',
    },
  },
  {
    name: 'dte_energy',
    label: 'DTE Energy',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: '48',
    },
  },
  {
    name: 'duke_energy',
    label: 'Duke Energy',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: 'Instant',
    },
  },
  {
    name: 'el_paso_electric',
    label: 'El Paso Electric',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: '24',
    },
  },
  {
    name: 'entergy',
    label: 'Entergy',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: 'Instant',
    },
  },
  {
    name: 'eversource',
    label: 'Eversource',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: 'Instant',
      usage_interval: 'Available by request, schedule time to discuss in more detail.',
    },
  },
  {
    name: 'florida_power_and_light',
    label: 'Florida Power and Light',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: '48',
    },
  },
  {
    name: 'jersey_central_power_and_light',
    label: 'Jersey Central Power and Light',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: '48',
    },
  },
  {
    name: 'los_angeles_department_of_water_and_power',
    label: 'Los Angeles Department of Water and Power',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: '48',
      usage_interval: '15 min Intervals for customer meters that begin with A. For other customers, schedule time to discuss in more detail.',
    },
  },
  {
    name: 'national_grid_massachusetts',
    label: 'National Grid Massachusetts',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: 'Instant',
      usage_interval: 'Available by request, schedule time to discuss in more detail.',
    },
  },
  {
    name: 'national_grid_new_york',
    label: 'National Grid New York',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: 'Instant',
      usage_interval: 'Available by request, schedule time to discuss in more detail.',
    },
  },
  {
    name: 'nyseg',
    label: 'NYSEG',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: '48',
      usage_interval: 'Available by request, schedule time to discuss in more detail.',
    },
  },
  {
    name: 'orange_and_rockland',
    label: 'Orange and Rockland',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: 'Instant',
      usage_interval: '15 minute',
    },
  },
  {
    name: 'pacific_gas_and_electric',
    label: 'Pacific Gas and Electric',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: 'Instant',
      usage_interval: '15 minute',
    },
  },
  {
    name: 'pacific_power',
    label: 'Pacific Power',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: '48',
      usage_interval: '15 minute or hourly depending on the customer',
    },
  },
  {
    name: 'pepco',
    label: 'PEPCO',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: '48',
      usage_interval: 'Hourly',
    },
  },
  {
    name: 'portland_general_electric',
    label: 'Portland General Electric',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: '24',
      usage_interval: 'Hourly',
    },
  },
  {
    name: 'potomac_edison',
    label: 'Potomac Edison',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: '48',
      usage_interval: 'Available by request, schedule time to discuss in more detail.',
    },
  },
  {
    name: 'pseg_long_island',
    label: 'PSEG Long Island',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: '48',
      usage_interval: '15 minute',
    },
  },
  {
    name: 'pseg_new_jersey',
    label: 'PSEG New Jersey',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: '24',
      usage_interval: 'Available by request, schedule time to discuss in more detail.',
    },
  },
  {
    name: 'public_service_company_of_new_mexico',
    label: 'Public Service Company of New Mexico',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: '24',
      usage_interval: '',
    },
  },
  {
    name: 'puget_sound_energy',
    label: 'Puget Sound Energy',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: 'Instant',
      usage_interval: '15 minute',
    },
  },
  {
    name: 'sacramento_municipal_utility_district',
    label: 'Sacramento Municipal Utility District',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: '48',
      usage_interval: 'Hourly',
    },
  },
  {
    name: 'san_diego_gas_and_electric',
    label: 'San Diego Gas and Electric',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: '48',
      usage_interval: '15 minute',
    },
  },
  {
    name: 'seattle_city_light',
    label: 'Seattle City Light',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: 'Instant',
      usage_interval: 'Daily',
    },
  },
  {
    name: 'southern_california_edison',
    label: 'Southern California Edison',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: '48',
      usage_interval: '15 minute or hourly depending on the customer',
    },
  },
  {
    name: 'versant_power',
    label: 'Versant Power',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: '48',
      usage_interval: 'Hourly for customers within the Bangor Hydro District',
    },
  },
  {
    name: 'xcel_energy',
    label: 'Xcel Energy',
    service_definition_name: 'cold-platform-bayou',
    data: {
      delivery_interval: 'Instant',
      usage_interval: '15 minute or hourly depending on the customer',
    },
  },
];

export async function seedUtilities() {
  await prisma.$connect();

  console.log(`Seeding Utilities...`);

  let count = 0;
  await Promise.all(
    seeds.map(async (seed: any) => {
      const utility = omit(seed, ['service_definition_name']) as supported_utilitity;

      const service = await prisma.service_definitions.findUnique({
        where: {
          name: seed.service_definition_name,
        },
      });

      if (!service) {
        console.error(`Service definition ${seed.service_definition_name} not found! Skipping...`);
        return;
      }

      set(utility, 'service_definition_id', service.id);

      if (seed.data) {
        set(utility, 'data', seed.data);
      } else {
        set(utility, 'data', {});
      }

      const result = await prisma.supported_utilities.upsert({
        where: {
          name: seed.name,
        },
        update: utility,
        // @ts-expect-error weird
        create: {
          ...utility,
        },
      });

      count++;
      console.log(`🌱 seeded (${count} of ${seeds.length}) Utility: ${seed.name} 🌱`, result);
    }),
  );

  console.log(`${count} Utilities seeded!`);

  await prisma.$disconnect();
}
