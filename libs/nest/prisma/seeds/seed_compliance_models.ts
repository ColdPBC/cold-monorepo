import { compliance_definitions, PrismaClient } from '@prisma/client';
import { Cuid2Generator, GuidPrefixes } from '../../src/lib/utility';
import * as fs from 'fs';

const prisma = new PrismaClient();
console.log('ENVIRONMENT:', process.env['NODE_ENV']);

async function writeErrorFile(errorName: string, errorPath: string, data: any) {
	if (!fs.existsSync(errorPath)) {
		fs.mkdirSync(errorPath, { recursive: true });
	}

	if (!fs.existsSync(`${errorPath}/${errorName}.json`)) {
		await fs.writeFileSync(`${errorPath}/${errorName}`, JSON.stringify(data), 'utf-8');
	} else {
		await fs.appendFileSync(`${errorPath}/${errorName}`, JSON.stringify(data), 'utf-8');
	}
}

export async function seedComplianceModels(this: any) {
	await prisma.$connect();

	const comp_secg_count = 0;
	const comp_sec_count = 0;

	console.log('Getting Compliance Definitions...');
	const compliance_defs = (await prisma.compliance_definitions.findMany()) as compliance_definitions[];
	/*
	for (const complianceDef of compliance_defs) {
		if (Array.isArray(complianceDef.surveys) && complianceDef.surveys.length > 0) {
			console.log('Getting Compliance Survey Definitions...');
			const survey_def = await prisma.survey_definitions.findFirst({
				where: {
					name: complianceDef.name,
				},
			});

			if (!survey_def) {
				console.warn('🚨 No Compliance Survey Definitions Found 🚨');
				continue;
			}
			if (survey_def.definition) {
				console.log(`Processing ${survey_def.name}...`);

				const surveyDef = survey_def.definition as any;

				if (surveyDef.sections) {
					for (const [key, value] of Object.entries(surveyDef.sections)) {
						const sectionKey = key;
						const sectionValue: any = value;

						const compliance_section_group = await prisma.compliance_section_groups.upsert({
							where: {
								compDefNameTitle: {
									compliance_definition_name: complianceDef.name,
									title: sectionValue.section_type || complianceDef.name,
								},
							},
							create: {
								id: new Cuid2Generator(GuidPrefixes.SectionGroup).scopedId,
								order: 0,
								title: sectionValue.section_type || complianceDef.name,
								compliance_definition_name: complianceDef.name,
							},
							update: {
								title: sectionValue.section_type || complianceDef.name,
								compliance_definition_name: complianceDef.name,
							},
						});

						comp_secg_count++;
						console.log(`🌱 seeded ${comp_secg_count} Compliance Section Groups: ${sectionValue.title} 🌱`, compliance_section_group);

						const comp_section = await prisma.compliance_sections.upsert({
							where: {
								compSecGroupKey: {
									compliance_section_group_id: compliance_section_group.id,
									key: sectionKey,
								},
							},
							create: {
								id: new Cuid2Generator(GuidPrefixes.ComplianceSection).scopedId,
								key: sectionKey,
								title: sectionValue.title,
								order: sectionValue.category_idx as number,
								dependency_expression: sectionValue?.dependency?.expression,
								compliance_definition_name: complianceDef.name,
								compliance_section_group_id: compliance_section_group.id,
							},
							update: {
								title: sectionValue.title,
								order: sectionValue.category_idx as number,
								dependency_expression: sectionValue?.dependency?.expression,
								compliance_definition_name: complianceDef.name,
							},
						});

						comp_sec_count++;
						console.log(`🌱 seeded (${comp_sec_count} of ${Object.entries(surveyDef.sections).length}) Compliance Section: ${sectionValue.title} 🌱`, comp_section);

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
								compliance_definition_name: complianceDef.name,
								coresponding_question: questionValue.coresponding_question,
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
									id: new Cuid2Generator(GuidPrefixes.ComplianceQuestion).scopedId,
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
	}

	console.log('Getting Organization Compliances...');

	const org_compliances = await prisma.organization_compliances_old.findMany();
	for (const org_compliance of org_compliances) {
		let filter: any = {
			id: org_compliance.compliance_id,
		};
		if (org_compliance?.surveys_override && org_compliance?.surveys_override['length'] > 0) {
			filter = {
				name: org_compliance?.surveys_override[0],
			};
		}

		const compliance_def = await prisma.compliance_definitions.findUnique({
			where: filter,
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
				id: new Cuid2Generator(GuidPrefixes.OrganizationCompliance).scopedId,
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
		if (existing_org_compliance) {
			const existing = await prisma.organization_compliance_statuses.findFirst({
				where: {
					organization_compliance_id: existing_org_compliance.id,
				},
				orderBy: {
					created_at: 'desc',
				},
			});

			if (!existing) {
				const status_data = {
					id: new Cuid2Generator(GuidPrefixes.OrganizationComplianceStatus).scopedId,
					organization_compliance_id: existing_org_compliance.id,
					type: 'draft',
					email: 'unknown',
				};

				const status_record = await prisma.organization_compliance_statuses.create({
					data: status_data,
				});

				console.log(`🌱 updated Organization Compliance Status: ${'draft'} 🌱`, status_record);
			}
		}
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
					id: new Cuid2Generator(GuidPrefixes.OrganizationCompliance).scopedId,
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
	}*/

	/*console.log('Migrating Compliance Data Table...');
  const survey_data = (await prisma.survey_data.findMany()) as any[];
  for (const data of survey_data) {
    const survey_def = await prisma.survey_definitions.findUnique({
      where: {
        id: data.survey_definition_id,
        type: 'COMPLIANCE',
      },
    });

    if (!survey_def) {
      console.warn(`🚨 Missing Survey Definition: ${data.survey_definition_id} 🚨`);
      const errorPath = `./errors/${process.env['NODE_ENV']}/${data.data.name}/${data.organization_id}`;
      await writeErrorFile.call(this, 'missing_survey_definition', errorPath, data.data);

      continue;
    }

    const comp_def = await prisma.compliance_definitions.findUnique({
      where: {
        name: survey_def.name,
      },
    });

    if (!comp_def) {
      console.warn(`🚨 Missing Compliance Definition for Survey Definition ID: ${data.survey_definition_id} 🚨`);
      continue;
    }

    const org_compliance = await prisma.organization_compliance.findUnique({
      where: {
        orgIdCompNameKey: {
          organization_id: data.organization_id,
          compliance_definition_name: comp_def.name,
        },
      },
    });

    if (!org_compliance) {
      console.warn(`🚨 Missing Organization Compliance: ${data.organization_id} - ${comp_def.name} 🚨`);
      continue;
    }

    const status = data.data.submitted ? 'submitted' : 'draft';
    const existing = await prisma.organization_compliance_statuses.findFirst({
      where: {
        organization_compliance_id: org_compliance.id,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    if (!existing || existing?.type !== status) {
      const status_data = {
        id: new Cuid2Generator(GuidPrefixes.OrganizationComplianceStatus).scopedId,
        organization_compliance_id: org_compliance.id,
        type: status,
        email: 'unknown',
      };

      const status_record = await prisma.organization_compliance_statuses.create({
        data: status_data,
      });

      console.log(`🌱 updated Organization Compliance Status: ${status} 🌱`, status_record);
    }

    if (!data?.data?.sections) {
      console.warn(`🚨 Missing Section Data: ${data.id} 🚨`, data?.data);
      const errorPath = `./errors/${process.env['NODE_ENV']}/${comp_def.name}/${data.organization_id}`;
      await writeErrorFile.call(this, 'missing_section_data', errorPath, data?.data);

      continue;
    }
    const sections = Object.keys(data.data.sections);
    // Iterate over each section
    for (const sectionKey of sections) {
      const section = await prisma.compliance_sections.findFirst({
        where: {
          key: sectionKey,
          compliance_definition_name: comp_def.name,
        },
      });

      if (!section) {
        console.warn(`🚨 Missing Compliance Section: ${sectionKey} 🚨`);
        const errorPath = `./errors/${process.env['NODE_ENV']}/${comp_def.name}/${data.organization_id}/sections/${sectionKey}`;
        await writeErrorFile.call(this, 'missing_compliance_section', errorPath, data?.data);

        continue;
      }
      if (!data.data.sections[`${sectionKey}`].follow_up) {
        console.warn(`🚨 Missing Follow Up Data: ${sectionKey} 🚨`, data.data.sections[`${sectionKey}`]);
        const errorPath = `./errors/${process.env['NODE_ENV']}/${comp_def.name}/${data.organization_id}/sections/${sectionKey}/follow_up`;
        await writeErrorFile.call(this, 'missing_followup_questions', errorPath, data.data);

        continue;
      }
      const followUP = Object.keys(data.data.sections[`${sectionKey}`].follow_up);
      // Iterate over each follow_up question
      for (const questionKey of followUP) {
        const question = await prisma.compliance_questions.findUniqueOrThrow({
          where: {
            compSecKey: {
              key: questionKey,
              compliance_section_id: section.id,
            },
          },
        });

        const qData = data.data.sections[`${sectionKey}`].follow_up[`${questionKey}`] as any;
        // Check if the question has an ai_response property
        let response: any;
        if (Object.prototype.hasOwnProperty.call(qData, 'value')) {
          response = await prisma.organization_compliance_responses.upsert({
            where: {
              orgCompQuestId: {
                compliance_question_id: question.id,
                organization_compliance_id: org_compliance.id,
              },
            },
            create: {
              id: new Cuid2Generator(GuidPrefixes.OrganizationComplianceResponse).scopedId,
              organization_compliance_id: org_compliance.id,
              compliance_question_id: question.id,
              value: Array.isArray(qData.value) ? qData.value : [qData.value],
            },
            update: {
              value: Array.isArray(qData.value) ? qData.value : [qData.value],
            },
          });

          console.log(`🌱 updated Org Response 🌱`, { response });

          const comp_responses_data = {
            compliance_question_id: question.id,
            compliance_section_id: section.id,
            compliance_section_group_id: section.compliance_section_group_id,
            organization_id: data.organization_id,
            compliance_definition_name: comp_def.name,
            organization_compliance_id: org_compliance.id,
            organization_compliance_response_id: response?.id,
          };

          if (!response?.id) {
            delete comp_responses_data.organization_compliance_response_id;
          }

          const comp_responses = await prisma.compliance_responses.upsert({
            where: {
              orgCompQuestId: {
                compliance_question_id: question.id,
                organization_compliance_id: org_compliance.id,
              },
            },
            create: {
              ...comp_responses_data,
            },
            update: {
              ...comp_responses_data,
            },
          });

          console.log(`🌱 Upserted Compliance Response Join 🌱`, { comp_responses });
        }
        if (qData.ai_response) {
          // Insert a new ai_response object

          if (Array.isArray(qData.ai_response.references)) {
            qData.ai_response.references.map((ref: any) => {
              let parsed;
              if (typeof ref?.text === 'string') {
                ref.text = ref.text.replace(/\r/g, ' ');
              }
              if (parsed) {
                ref.text = parsed;
              }
            });
          }

          if (!qData?.ai_response?.justification) {
            console.warn(`🚨 Warning Justification is empty 🚨`, { ...qData?.ai_response });
            const errorPath = `./errors/${process.env['NODE_ENV']}/${comp_def.name}/${data.organization_id}`;
            await writeErrorFile.call(this, 'missing_ai_justification', errorPath, qData);
            continue;
          }

          const ai_response = await prisma.organization_compliance_ai_responses.upsert({
            where: {
              orgCompQuestId: {
                compliance_question_id: question.id,
                organization_compliance_id: org_compliance.id,
              },
            },
            create: {
              id: new Cuid2Generator(GuidPrefixes.OrganizationComplianceAIResponse).scopedId,
              organization_compliance_id: org_compliance.id,
              compliance_question_id: question.id,
              organization_id: data.organization_id,
              answer: qData?.ai_response?.answer,
              justification: qData?.ai_response?.justification,
              references: qData?.ai_response?.references,
              sources: qData?.ai_response?.source,
            },
            update: {
              answer: qData?.ai_response?.answer,
              justification: qData?.ai_response?.justification,
              references: qData?.ai_response?.references,
              sources: qData?.ai_response?.source,
            },
          });

          console.log(`🌱 Upserted AI Response 🌱`, { ai_response });

          const comp_responses_data = {
            compliance_question_id: question.id,
            compliance_section_id: section.id,
            compliance_section_group_id: section.compliance_section_group_id,
            organization_id: data.organization_id,
            compliance_definition_name: comp_def.name,
            organization_compliance_id: org_compliance.id,
            organization_compliance_ai_response_id: ai_response?.id,
            organization_compliance_response_id: response?.id,
          };

          if (!response?.id) {
            delete comp_responses_data.organization_compliance_response_id;
          }

          const comp_responses = await prisma.compliance_responses.upsert({
            where: {
              orgCompQuestId: {
                compliance_question_id: question.id,
                organization_compliance_id: org_compliance.id,
              },
            },
            create: {
              ...comp_responses_data,
            },
            update: {
              ...comp_responses_data,
            },
          });

          console.log(`🌱 Upserted Compliance Response Join 🌱`, { comp_responses });

          if (!qData?.ai_response?.references || !Array.isArray(qData.ai_response.references)) {
            console.warn(`🚨 Missing AI Response References: ${questionKey} 🚨`);
            const errorPath = `./errors/${process.env['NODE_ENV']}/${comp_def.name}/${org_compliance.organization_id}`;
            await writeErrorFile.call(this, 'missing_ai_response_references', errorPath, data);
          } else {
            console.log(`updating AI Response ${ai_response.id} files:`, { source: qData.ai_response.source });
            for (const filename of qData.ai_response.references) {
              if (!filename) {
                console.warn(`🚨 Missing AI Response File: ${filename} 🚨`, filename);
                const errorPath = `./errors/${process.env['NODE_ENV']}/${comp_def.name}/${org_compliance.organization_id}`;
                await writeErrorFile.call(this, 'missing_ai_response_files', errorPath, data);
                continue;
              }
              if (filename?.url) {
                console.log(`🚨 Skipping URL: ${filename.url} 🚨`);
                continue;
              }

              const file = await prisma.organization_files.findFirst({
                where: {
                  original_name: filename.file,
                  organization_id: data.organization_id,
                },
              });

              if (!file) {
                console.warn(`🚨 Missing AI Response File: ${filename} 🚨`);
                const errorPath = `./errors/${process.env['NODE_ENV']}/${comp_def.name}/${data.organization_id}`;
                await writeErrorFile.call(this, 'missing_ai_response_files', errorPath, data);

                continue;
              }

              const ai_response_file = await prisma.organization_compliance_ai_response_files.upsert({
                where: {
                  orgCompFileId: {
                    organization_compliance_id: org_compliance.id,
                    organization_files_id: file.id,
                  },
                },
                create: {
                  id: new Cuid2Generator(GuidPrefixes.OrganizationComplianceAiResponseFile).scopedId,
                  organization_compliance_ai_response_id: ai_response.id,
                  organization_files_id: file.id,
                  organization_id: data.organization_id,
                  organization_compliance_id: org_compliance.id,
                },
                update: {
                  organization_files_id: file.id,
                },
              });
              console.log(`🌱 updated AI Response file: ${filename} 🌱`, { ai_response, ai_response_file });
            }
          }
        }
      }
    }
  }*/

	console.log(`🌱 seeding done!  🌱`);

	await prisma.$disconnect();
}
