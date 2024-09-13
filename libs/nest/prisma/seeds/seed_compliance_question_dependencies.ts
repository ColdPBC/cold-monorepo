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

export async function buildQuestionDependencyChains() {
	await prisma.$connect();
	/*const complianceDefinitions = await prisma.compliance_definitions.findMany();

  for (const complianceDefinition of complianceDefinitions) {
    const complianceQuestions = await prisma.compliance_questions.findMany({
      where: {
        compliance_definition_name: complianceDefinition.name,
        dependency_expression: {
          not: null,
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

    const seen: any[] = [];

    for (const question of complianceQuestions) {
      const chains = await buildDependencyChain(question, seen, []);

      if (chains.length < 1) {
        console.log(`No chains found for question: ${question.key}`, { question, seen });
      }

      try {
        const qDep = await prisma.compliance_question_dependency_chains.upsert({
          where: {
            defNameSecKeyQuestKey: {
              compliance_question_key: question.key,
              compliance_section_key: question.compliance_section.key,
              compliance_definition_name: question.compliance_definition_name,
            },
          },
          create: {
            id: new Cuid2Generator(GuidPrefixes.ComplianceDependencyChain).scopedId,
            dependency_chain: chains,
            compliance_question_id: question.id,
            compliance_question_key: question.key,
            compliance_section_id: question.compliance_section.id,
            compliance_section_key: question.compliance_section.key,
            compliance_section_group_id: question.compliance_section.compliance_section_group_id,
            compliance_definition_name: question.compliance_definition_name,
            dependency_expression: question.dependency_expression ? question.dependency_expression : '',
          },
          update: {
            dependency_chain: chains,
            compliance_question_id: question.id,
            compliance_question_key: question.key,
            compliance_section_id: question.compliance_section.id,
            compliance_section_key: question.compliance_section.key,
            compliance_section_group_id: question.compliance_section.compliance_section_group_id,
            compliance_definition_name: question.compliance_definition_name,
            dependency_expression: question.dependency_expression ? question.dependency_expression : '',
          },
        });

        await prisma.compliance_questions.update({
          where: {
            id: question.id,
          },
          data: {
            compliance_question_dependency_chain_id: qDep.id,
          },
        });
      } catch (e) {
        console.error(e);
      }

      console.log(`🌱 seeded compliance dependency chain: ${question.key} 🌱`, { question, seen });
    }
  }*/

	await prisma.$disconnect();
}

async function buildDependencyChain(question: any, seen: any[], chains: dependency_chain_data[]): Promise<dependency_chain_data[]> {
	if (question.dependency_expression) {
		const split_expression = question.dependency_expression.split('and $');
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
							compliance_definition_name: question.compliance_definition_name,
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
						question,
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

				if (seen.includes(question)) {
					console.warn(`🚨 Circular Dependency Detected: ${question.key} 🚨`, { question, seen });
					return chains;
				}

				seen.push(question);
				if (dependent_question.dependency_expression) {
					return await buildDependencyChain(dependent_question, seen, chains);
				}
			}
		}
	}

	return chains;
}
