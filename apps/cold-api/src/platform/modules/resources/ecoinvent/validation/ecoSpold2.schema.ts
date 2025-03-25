import { z } from 'zod';

export const EcoSpold2Schema = z.object({
	ecoSpold: z.object({
		// Attributes merged from the root element:
		xmlns: z.string(),
		'xmlns:xsi': z.string(),
		'xsi:schemaLocation': z.string(),
		childActivityDataset: z.object({
			activityDescription: z.object({
				activity: z.object({
					specialActivityType: z.string(),
					id: z.string(),
					activityNameId: z.string(),
					parentActivityId: z.string(),
					inheritanceDepth: z.string(),
					type: z.string(),
					activityName: z.object({
						_: z.string(), // text content
						'xml:lang': z.string(),
					}),
					includedActivitiesStart: z
						.object({
							_: z.string(),
							'xml:lang': z.string(),
						})
						.optional(),
					includedActivitiesEnd: z
						.object({
							_: z.string(),
							'xml:lang': z.string(),
						})
						.optional(),
					generalComment: z
						.object({
							text: z.union([
								z.object({ _: z.string(), 'xml:lang': z.string(), index: z.string() }),
								z.array(z.object({ _: z.string(), 'xml:lang': z.string(), index: z.string() })),
							]),
						})
						.optional(),
				}),
				classification: z
					.union([
						z.object({
							classificationId: z.string(),
							classificationSystem: z.object({
								_: z.string(),
								'xml:lang': z.string(),
							}),
							classificationValue: z.object({
								_: z.string(),
								'xml:lang': z.string(),
							}),
						}),
						z.array(
							z.object({
								classificationId: z.string(),
								classificationSystem: z.object({
									_: z.string(),
									'xml:lang': z.string(),
								}),
								classificationValue: z.object({
									_: z.string(),
									'xml:lang': z.string(),
								}),
							}),
						),
					])
					.optional(),
				geography: z.object({
					geographyId: z.string(),
					shortname: z.object({
						_: z.string(),
						'xml:lang': z.string(),
					}),
					comment: z
						.object({
							text: z.object({
								_: z.string(),
								'xml:lang': z.string(),
								index: z.string(),
							}),
						})
						.optional(),
				}),
				technology: z.any().optional(),
				timePeriod: z.object({
					startDate: z.string(),
					endDate: z.string(),
					isDataValidForEntirePeriod: z.string(),
				}),
				macroEconomicScenario: z.object({
					macroEconomicScenarioId: z.string(),
					name: z.object({
						_: z.string(),
						'xml:lang': z.string(),
					}),
				}),
			}),
			flowData: z
				.object({
					intermediateExchange: z.union([
						z.object({
							id: z.string(),
							unitId: z.string(),
							casNumber: z.string().optional(),
							amount: z.string(),
							intermediateExchangeId: z.string(),
							productionVolumeAmount: z.string().optional(),
							name: z.object({
								_: z.string(),
								'xml:lang': z.string(),
							}),
							unitName: z.object({
								_: z.string(),
								'xml:lang': z.string(),
							}),
							comment: z
								.object({
									_: z.string().optional(),
									'xml:lang': z.string().optional(),
								})
								.optional(),
							property: z
								.union([
									z.object({
										propertyId: z.string(),
										amount: z.string(),
										isDefiningValue: z.string(),
										isCalculatedAmount: z.string(),
										unitId: z.string(),
										name: z.object({
											_: z.string(),
											'xml:lang': z.string(),
										}),
										unitName: z.object({
											_: z.string(),
											'xml:lang': z.string(),
										}),
										comment: z
											.object({
												_: z.string().optional(),
												'xml:lang': z.string().optional(),
											})
											.optional(),
									}),
									z.array(
										z.object({
											propertyId: z.string(),
											amount: z.string(),
											isDefiningValue: z.string(),
											isCalculatedAmount: z.string(),
											unitId: z.string(),
											name: z.object({
												_: z.string(),
												'xml:lang': z.string(),
											}),
											unitName: z.object({
												_: z.string(),
												'xml:lang': z.string(),
											}),
											comment: z
												.object({
													_: z.string().optional(),
													'xml:lang': z.string().optional(),
												})
												.optional(),
										}),
									),
								])
								.optional(),
							classification: z
								.union([
									z.object({
										classificationId: z.string(),
										classificationSystem: z.object({
											_: z.string(),
											'xml:lang': z.string(),
										}),
										classificationValue: z.object({
											_: z.string(),
											'xml:lang': z.string(),
										}),
									}),
									z.array(
										z.object({
											classificationId: z.string(),
											classificationSystem: z.object({
												_: z.string(),
												'xml:lang': z.string(),
											}),
											classificationValue: z.object({
												_: z.string(),
												'xml:lang': z.string(),
											}),
										}),
									),
								])
								.optional(),
							inputGroup: z.string().optional(),
							outputGroup: z.string().optional(),
						}),
						z.array(
							z.object({
								id: z.string(),
								unitId: z.string(),
								casNumber: z.string().optional(),
								amount: z.string(),
								intermediateExchangeId: z.string(),
								productionVolumeAmount: z.string().optional(),
								name: z.object({
									_: z.string(),
									'xml:lang': z.string(),
								}),
								unitName: z.object({
									_: z.string(),
									'xml:lang': z.string(),
								}),
								comment: z
									.object({
										_: z.string().optional(),
										'xml:lang': z.string().optional(),
									})
									.optional(),
								property: z
									.union([
										z.object({
											propertyId: z.string(),
											amount: z.string(),
											isDefiningValue: z.string(),
											isCalculatedAmount: z.string(),
											unitId: z.string(),
											name: z.object({
												_: z.string(),
												'xml:lang': z.string(),
											}),
											unitName: z.object({
												_: z.string(),
												'xml:lang': z.string(),
											}),
											comment: z
												.object({
													_: z.string().optional(),
													'xml:lang': z.string().optional(),
												})
												.optional(),
										}),
										z.array(
											z.object({
												propertyId: z.string(),
												amount: z.string(),
												isDefiningValue: z.string(),
												isCalculatedAmount: z.string(),
												unitId: z.string(),
												name: z.object({
													_: z.string(),
													'xml:lang': z.string(),
												}),
												unitName: z.object({
													_: z.string(),
													'xml:lang': z.string(),
												}),
												comment: z
													.object({
														_: z.string().optional(),
														'xml:lang': z.string().optional(),
													})
													.optional(),
											}),
										),
									])
									.optional(),
								classification: z
									.union([
										z.object({
											classificationId: z.string(),
											classificationSystem: z.object({
												_: z.string(),
												'xml:lang': z.string(),
											}),
											classificationValue: z.object({
												_: z.string(),
												'xml:lang': z.string(),
											}),
										}),
										z.array(
											z.object({
												classificationId: z.string(),
												classificationSystem: z.object({
													_: z.string(),
													'xml:lang': z.string(),
												}),
												classificationValue: z.object({
													_: z.string(),
													'xml:lang': z.string(),
												}),
											}),
										),
									])
									.optional(),
								inputGroup: z.string().optional(),
								outputGroup: z.string().optional(),
							}),
						),
					]),
				})
				.optional(),
			modellingAndValidation: z
				.object({
					representativeness: z
						.object({
							systemModelId: z.string(),
							systemModelName: z.object({
								_: z.string(),
								'xml:lang': z.string(),
							}),
						})
						.optional(),
					review: z
						.union([
							z.object({
								reviewedMajorRelease: z.string(),
								reviewedMinorRelease: z.string(),
								reviewedMajorRevision: z.string(),
								reviewedMinorRevision: z.string(),
								reviewerId: z.string(),
								reviewerName: z.string(),
								reviewerEmail: z.string(),
								reviewDate: z.string(),
								otherDetails: z
									.object({
										_: z.string().optional(),
										'xml:lang': z.string().optional(),
									})
									.optional(),
							}),
							z.array(
								z.object({
									reviewedMajorRelease: z.string(),
									reviewedMinorRelease: z.string(),
									reviewedMajorRevision: z.string(),
									reviewedMinorRevision: z.string(),
									reviewerId: z.string(),
									reviewerName: z.string(),
									reviewerEmail: z.string(),
									reviewDate: z.string(),
									otherDetails: z
										.object({
											_: z.string().optional(),
											'xml:lang': z.string().optional(),
										})
										.optional(),
								}),
							),
						])
						.optional(),
				})
				.optional(),
			administrativeInformation: z
				.object({
					dataEntryBy: z
						.object({
							personId: z.string(),
							isActiveAuthor: z.string(),
							personName: z.string(),
							personEmail: z.string(),
						})
						.optional(),
					dataGeneratorAndPublication: z
						.object({
							personId: z.string(),
							personName: z.string(),
							personEmail: z.string(),
							isCopyrightProtected: z.string(),
							accessRestrictedTo: z.string(),
						})
						.optional(),
					fileAttributes: z
						.object({
							majorRelease: z.string(),
							minorRelease: z.string(),
							majorRevision: z.string(),
							minorRevision: z.string(),
							internalSchemaVersion: z.string(),
							defaultLanguage: z.string(),
							creationTimestamp: z.string(),
							lastEditTimestamp: z.string(),
							fileGenerator: z.string(),
							fileTimestamp: z.string(),
							contextId: z.string(),
							contextName: z.object({
								_: z.string(),
								'xml:lang': z.string(),
							}),
						})
						.optional(),
				})
				.optional(),
		}),
	}),
});

export type EcoSpoldType = z.infer<typeof EcoSpold2Schema>;
