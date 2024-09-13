import { Cuid2Generator, GuidPrefixes } from '../../src/lib/utility';
import { PrismaClient } from '@prisma/client';
import { get } from 'lodash';

type dependency_chain_data = {
	dependency_expression: string;
	dependent_question_id: string;
	dependent_question_key: string;
	dependent_section_key: string;
	dependent_section_group_id: string;
	dependent_definition_name: string;
	dependent_question_values: any[];
};
const prisma = new PrismaClient();

export async function buildSectionDependencyChains() {
	await prisma.$connect();
	/*const complianceDefinitions = await prisma.compliance_definitions.findMany();

  for (const complianceDefinition of complianceDefinitions) {
    const sections = await prisma.compliance_sections.findMany({
      where: {
        compliance_definition_name: complianceDefinition.name,
        dependency_expression: {
          not: null,
        },
      },
      select: {
        id: true,
        key: true,
        section_group: {
          select: {
            id: true,
          },
        },
        dependency_expression: true,
        compliance_definition_name: true,
      },
    });

    const seen: any[] = [];

    for (const section of sections) {
      const chains = await buildDependencyChain(section, seen, []);
      if (chains.length < 1) {
        console.log(`No chains found for section: ${section.key}`, { section, seen });
        continue;
      }
      const sectionDep = await prisma.compliance_section_dependency_chains.upsert({
        where: {
          defNameSecKeyGrpId: {
            compliance_section_group_id: section.section_group.id,
            compliance_section_key: section.key,
            compliance_definition_name: section.compliance_definition_name,
          },
        },
        create: {
          id: new Cuid2Generator(GuidPrefixes.ComplianceDependencyChain).scopedId,
          dependency_chain: chains,
          compliance_section_id: section.id,
          compliance_section_key: section.key,
          compliance_section_group_id: section.section_group.id,
          compliance_definition_name: section.compliance_definition_name,
          dependency_expression: section.dependency_expression ? section.dependency_expression : '',
        },
        update: {
          dependency_chain: chains,
          compliance_section_id: section.id,
          compliance_section_key: section.key,
          compliance_section_group_id: section.section_group.id,
          compliance_definition_name: section.compliance_definition_name,
          dependency_expression: section.dependency_expression ? section.dependency_expression : '',
        },
      });

      await prisma.compliance_sections.update({
        where: {
          id: section.id,
        },
        data: {
          compliance_section_dependency_chain_id: sectionDep.id,
        },
      });

      console.log(`🌱 seeded compliance dependency chain: ${section.key} 🌱`, { question: section, seen });
    }
  }*/

	await prisma.$disconnect();
}

async function buildDependencyChain(section: any, seen: any[], chains: dependency_chain_data[]): Promise<dependency_chain_data[]> {
	if (section.dependency_expression) {
		const split_expression = section.dependency_expression.split('and $');
		for (const part of split_expression) {
			const expression = part.startsWith('lookup') ? `$${part}` : part;
			const regex =
				/(?:(?<booleanValue>true|false) in \$map\(\$lookup\(definition\.sections\.\*\.follow_up, '(?<questionKeyMap>.+?)'\)\.value, function\(\$v\) { \$v in (?<valuesMap>.+?)(?= \}\) and|\}\)\$|$)|\$lookup\(definition\.sections\.\*\.follow_up, '(?<questionKey>.+?)'\)\.value = (?<values>true|false))/g;

			const matches = [...expression.matchAll(regex)];
			if (!matches || matches.length === 0) {
				continue;
			}
			for (const match of matches) {
				const dependent_question = await prisma.compliance_questions.findUnique({
					where: {
						compDefNameKey: {
							compliance_definition_name: section.compliance_definition_name,
							key: get(match, 'groups.questionKey', get(match, 'groups.questionKeyMap', '')),
						},
					},
					select: {
						id: true,
						key: true,
						dependency_expression: true,
						compliance_definition_name: true,
						compliance_section: {
							select: {
								id: true,
								key: true,
								compliance_section_group_id: true,
							},
						},
					},
				});

				if (!dependent_question) {
					console.warn(`🚨 Missing Question: ${get(match, 'groups.questionKey', get(match, 'groups.questionKeyMap', ''))} 🚨`, {
						match,
						section,
					});
					return chains;
				}

				const chainData: dependency_chain_data = {
					dependency_expression: dependent_question.dependency_expression,
					dependent_question_id: dependent_question.id,
					dependent_question_key: dependent_question.key,
					dependent_section_key: dependent_question.compliance_section.key,
					dependent_section_group_id: dependent_question.compliance_section.compliance_section_group_id,
					dependent_definition_name: dependent_question.compliance_definition_name,
					dependent_question_values: JSON.parse(
						get(match, 'groups.valuesMap', `[${get(match, 'groups.values', '')}]`)
							.replace(' })', '')
							.replaceAll("'", '"'),
					),
				} as dependency_chain_data;

				chains.push(chainData);

				if (seen.includes(section)) {
					console.warn(`🚨 Circular Dependency Detected: ${section.key} 🚨`, { section, seen });
					return chains;
				}

				seen.push(section);
				if (dependent_question.dependency_expression) {
					return await buildDependencyChain(dependent_question, seen, chains);
				}
			}
		}
	}

	return chains;
}
