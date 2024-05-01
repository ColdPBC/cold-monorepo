import { compliance_definitions, PrismaClient } from '@prisma/client';
import { Cuid2Generator } from '../../src/lib/utility/cuid2-generator.service';

const prisma = new PrismaClient();
console.log('ENVIRONMENT:', process.env['NODE_ENV']);

export async function seedComplianceModels() {
  await prisma.$connect();

  let comp_def_count = 0;
  let comp_secg_count = 0;
  let comp_sec_count = 0;

  console.log('Getting Compliance Definitions...');
  const compliance_defs = (await prisma.compliance_definitions.findMany()) as compliance_definitions[];

  console.log('Getting Compliance Survey Definitions...');
  const survey_defs = await prisma.survey_definitions.findMany({
    where: {
      type: 'COMPLIANCE',
    },
  });

  if (!survey_defs.length) {
    console.warn('🚨 No Compliance Survey Definitions Found 🚨');
    return;
  }
  for (const survey of survey_defs) {
    if (survey.definition) {
      console.log(`Processing ${survey.name}...`);

      const surveyDef = survey.definition as any;
      const compliance_def = compliance_defs.find(cd => cd.name === survey.name) as compliance_definitions;

      if (!compliance_def) {
        console.warn(`🚨 Missing Compliance Definition: ${survey.name} 🚨`);
        if (process.env['NODE_ENV'] === 'production' || process.env['NODE_ENV'] === 'staging') {
          continue;
        }
      }

      const compliance_definition = await prisma.compliance_definitions.upsert({
        where: {
          name: survey.name,
        },
        create: {
          id: new Cuid2Generator('cmpdef').scopedId,
          name: survey.name,
          title: surveyDef.title,
          version: surveyDef.version,
          logo_url: '',
          surveys: [`${survey.name}`],
          order: 0,
          visible: false,
        },
        update: {
          name: survey.name,
          title: surveyDef.title,
          surveys: compliance_def?.surveys as string[],
          version: surveyDef.version || 2024,
          logo_url: '',
          order: 0,
          visible: true,
        },
      });

      comp_def_count++;
      console.log(`🌱 seeded (${comp_def_count} of ${survey_defs.length}) Compliance Definitions: ${survey.name} 🌱`, compliance_definition);

      if (surveyDef.sections) {
        for (const [key, value] of Object.entries(surveyDef.sections)) {
          const sectionKey = key;
          const sectionValue: any = value;

          const compliance_section_group = await prisma.compliance_section_groups.upsert({
            where: {
              compDefNameTitle: {
                compliance_definition_name: survey.name,
                title: sectionValue.section_type || surveyDef.title,
              },
            },
            create: {
              id: new Cuid2Generator(`csg`).scopedId,
              order: 0,
              title: sectionValue.section_type || surveyDef.title,
              compliance_definition_name: survey.name,
            },
            update: {
              title: sectionValue.section_type || surveyDef.title,
              compliance_definition_name: survey.name,
            },
          });

          comp_secg_count++;
          console.log(`🌱 seeded ${comp_secg_count} Compliance Section Group: ${sectionValue.title} 🌱`, compliance_section_group);

          const comp_section = await prisma.compliance_sections.upsert({
            where: {
              compSecGroupKey: {
                compliance_section_group_id: compliance_section_group.id,
                key: sectionKey,
              },
            },
            create: {
              id: new Cuid2Generator(`cs`).scopedId,
              key: sectionKey,
              title: sectionValue.title,
              order: sectionValue.category_idx as number,
              dependency_expression: sectionValue?.dependency?.expression,
              compliance_definition_name: survey.name,
              compliance_section_group_id: compliance_section_group.id,
            },
            update: {
              title: sectionValue.title,
              order: sectionValue.category_idx as number,
              dependency_expression: sectionValue?.dependency?.expression,
              compliance_definition_name: survey.name,
            },
          });

          comp_sec_count++;
          console.log(`🌱 seeded (${comp_sec_count} of ${survey_defs.length}) Compliance Section: ${sectionValue.title} 🌱`, comp_section);

          let comp_quest_count = 0;
          for (const [qkey, qvalue] of Object.entries(sectionValue.follow_up)) {
            const questionKey = qkey;
            const questionValue: any = qvalue;
            const questionData = {
              key: questionKey,
              order: questionValue.idx as number,
              prompt: questionValue.prompt,
              component: questionValue.component,
              tooltip: questionValue.tooltip,
              placeholder: questionValue.placeholder,
              rubric: questionValue.rubric,
              options: questionValue.options,
              corresponding_question: questionValue.corresponding_question,
              dependency_expression: questionValue?.dependency?.expression,
              question_summary: questionValue.question_summary,
              additional_context: questionValue.additional_context,
              compliance_section_id: comp_section.id,
            };

            if (!Array.isArray(questionValue.options) || questionValue.options.length < 1) {
              delete questionData.options;
            }

            const existing_question = await prisma.compliance_questions.upsert({
              where: {
                compSecKey: {
                  key: questionKey,
                  compliance_section_id: comp_section.id,
                },
              },
              create: {
                id: new Cuid2Generator(`cq`).scopedId,
                ...questionData,
              },
              update: {
                ...questionData,
              },
            });

            comp_quest_count++;
            console.log(`🌱 seeded (${comp_quest_count} of ${Object.entries(sectionValue.follow_up).length}) Compliance Question: ${questionKey} 🌱`, existing_question);
          }
        }
      }
    }
  }

  console.log('Getting Organization Compliances...');

  const org_compliances = await prisma.organization_compliances.findMany();
  for (const org_compliance of org_compliances) {
    const compliance_def = await prisma.compliance_definitions.findUnique({
      where: {
        id: org_compliance.compliance_id,
      },
    });

    if (!compliance_def) {
      console.warn(`🚨 Missing Compliance Definition: ${org_compliance.compliance_id} 🚨`);
      continue;
    }

    const existing_org_compliance = await prisma.organization_compliance.upsert({
      where: {
        orgIdCompNameKey: {
          organization_id: org_compliance.organization_id,
          compliance_definition_name: compliance_def.name,
        },
      },
      create: {
        id: new Cuid2Generator(`oc`).scopedId,
        organization_id: org_compliance.organization_id,
        compliance_definition_name: compliance_def.name,
        description: compliance_def.title,
      },
      update: {
        compliance_definition_name: compliance_def.name,
        description: compliance_def.title,
      },
    });

    console.log(`🌱 updated Organization Compliance: ${existing_org_compliance.compliance_definition_name} 🌱`, existing_org_compliance);
  }

  const compliance_definitions = await prisma.compliance_definitions.findMany();
  const cold_climate_org = await prisma.organizations.findUnique({
    where: {
      name: `cold-climate-development`,
    },
  });

  if (cold_climate_org && compliance_definitions.length > 0) {
    for (const comp_def of compliance_definitions) {
      const existing_org_compliance = await prisma.organization_compliance.upsert({
        where: {
          orgIdCompNameKey: {
            organization_id: cold_climate_org.id,
            compliance_definition_name: comp_def.name,
          },
        },
        create: {
          id: new Cuid2Generator(`oc`).scopedId,
          organization_id: cold_climate_org.id,
          compliance_definition_name: comp_def.name,
          description: comp_def.title,
        },
        update: {
          compliance_definition_name: comp_def.name,
          description: comp_def.title,
        },
      });

      console.log(`🌱 updated Organization Compliance: ${existing_org_compliance.compliance_definition_name} 🌱`, existing_org_compliance);
    }
  }
  console.log(`${comp_def_count} Compliance Definitions seeded!`);

  await prisma.$disconnect();
}
