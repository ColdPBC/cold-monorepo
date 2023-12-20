/* eslint-disable */
import {enhancePrisma} from './enhancedPrimsa';
import {PrismaClient} from '@prisma/client';

const EnhancedPrisma = enhancePrisma(PrismaClient);
export * from '@prisma/client';

module.exports = async function () {
  if (process.env.NODE_ENV == 'staging' || process.env.NODE_ENV == 'production') {
    // Put clean up logic here (e.g. stopping services, docker-compose, etc.).
    // Hint: `globalThis` is shared between setup and teardown.
    console.log('STARTED ON', globalThis.started_utc_on);

    const prisma = new EnhancedPrisma();

    await prisma.action_templates.deleteMany({
      where: {
        created_at: {
          gte: globalThis.started_utc_on,
        },
      },
    });
    await global._blitz_prismaClient.actions.deleteMany({
      where: {
        created_at: {
          gte: globalThis.started_utc_on,
        },
      },
    });
    await global._blitz_prismaClient.category_data.deleteMany({
      where: {
        created_at: {
          gte: globalThis.started_utc_on,
        },
      },
    });
    await global._blitz_prismaClient.category_definitions.deleteMany({
      where: {
        created_at: {
          gte: globalThis.started_utc_on,
        },
      },
    });
    await global._blitz_prismaClient.component_definitions.deleteMany({
      where: {
        created_at: {
          gte: globalThis.started_utc_on,
        },
      },
    });
    await global._blitz_prismaClient.news.deleteMany({
      where: {
        created_at: {
          gte: globalThis.started_utc_on,
        },
      },
    });
    await global._blitz_prismaClient.policy_data.deleteMany({
      where: {
        created_at: {
          gte: globalThis.started_utc_on,
        },
      },
    });
    await global._blitz_prismaClient.policy_definitions.deleteMany({
      where: {
        created_at: {
          gte: globalThis.started_utc_on,
        },
      },
    });
    await global._blitz_prismaClient.survey_data.deleteMany({
      where: {
        created_at: {
          gte: globalThis.started_utc_on,
        },
      },
    });
    await global._blitz_prismaClient.survey_definitions.deleteMany({
      where: {
        created_at: {
          gte: globalThis.started_utc_on,
        },
      },
    });

    const axios = globalThis.auth0Axios;
    try {
      const orgs = await axios.get(`/organizations?bpc=true`);
      for (const org of orgs.data) {
        if (!org.name.includes('cold-climate')) {
          try {
            await axios.delete(`/organizations/${org.id}?bpc=true`);
          } catch (error) {
            console.log(error.message, error.response?.data);
          }
        }
      }
    } catch (error) {
      console.log(error.message, error.response.data);
    }

    await global._blitz_prismaClient.organizations.deleteMany({
      where: {
        created_at: {
          gte: globalThis.started_utc_on,
        },
      },
    });

    console.log(globalThis.__TEARDOWN_MESSAGE__);
  }
};
