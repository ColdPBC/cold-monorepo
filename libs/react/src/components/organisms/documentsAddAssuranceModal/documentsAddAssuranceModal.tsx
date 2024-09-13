import { ErrorFallback, Modal, Select, Spinner } from '@coldpbc/components';
import { ButtonTypes } from '@coldpbc/enums';
import React, { useEffect } from 'react';
import { FilesWithAssurances, InputOption, ToastMessage } from '@coldpbc/interfaces';
import { useSWRConfig } from 'swr';
import { useAddToastMessage, useAuth0Wrapper, useColdContext, useGraphQLMutation, useGraphQLSWR } from '@coldpbc/hooks';
import { get, has, lowerCase } from 'lodash';
import { withErrorBoundary } from 'react-error-boundary';
import { isApolloError } from '@apollo/client';

export const _DocumentsAddAssuranceModal = (props: {
	documentToAddAssurance: FilesWithAssurances;
	setDocumentToAddAssurance: (document: FilesWithAssurances | undefined) => void;
}) => {
	const { documentToAddAssurance, setDocumentToAddAssurance } = props;
	const [addingAssurance, setAddingAssurance] = React.useState(false);
	const [selectedEntityId, setSelectedEntityId] = React.useState<string | undefined>(undefined);
	const { addToastMessage } = useAddToastMessage();
	const { mutate } = useSWRConfig();
	const { logBrowser } = useColdContext();
	const { orgId } = useAuth0Wrapper();
	const sustainabilityAttribute = get(documentToAddAssurance, 'attributeAssurances[0].sustainabilityAttribute', undefined);
	const effectiveStartDate = get(documentToAddAssurance, 'attributeAssurances[0].effectiveStartDate', new Date().toISOString());
	const effectiveEndDate = get(documentToAddAssurance, 'attributeAssurances[0].effectiveEndDate', new Date().toISOString());

	const getQueryString = () => {
		if (documentToAddAssurance && sustainabilityAttribute) {
			// get the sustainability attribute level
			const level = sustainabilityAttribute.level;
			if (level === 'SUPPLIER') {
				return 'GET_ALL_SUPPLIERS_TO_ADD_ASSURANCE_TO_DOCUMENT';
			} else if (level === 'MATERIAL') {
				return 'GET_ALL_MATERIALS_TO_ADD_ASSURANCE_TO_DOCUMENT';
			} else {
				return null;
			}
		} else {
			return null;
		}
	};

	const allEntities = useGraphQLSWR(getQueryString(), {
		filter: {
			organization: {
				id: orgId,
			},
		},
	});
	const { mutateGraphQL: createAttributeAssurance } = useGraphQLMutation('CREATE_ATTRIBUTE_ASSURANCE_FOR_FILE');

	useEffect(() => {
		if (!allEntities.isLoading && !get(allEntities.data, 'errors', undefined)) {
			const entities = getEntities();
			setSelectedEntityId(get(entities, '[0].id', undefined));
		}
	}, [allEntities.data]);

	const addAssuranceToDocument = async (document: FilesWithAssurances) => {
		if (sustainabilityAttribute === undefined) return;
		let variables: { [key: string]: any } = {
			organizationFile: {
				id: document.id,
			},
			sustainabilityAttribute: {
				id: sustainabilityAttribute.id,
			},
			organization: {
				id: orgId,
			},
			effectiveStartDate: effectiveStartDate,
			effectiveEndDate: effectiveEndDate,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};
		if (sustainabilityAttribute.level === 'SUPPLIER') {
			variables = {
				...variables,
				organizationFacility: {
					id: selectedEntityId,
				},
			};
		} else if (sustainabilityAttribute.level === 'MATERIAL') {
			variables = {
				...variables,
				material: {
					id: selectedEntityId,
				},
			};
		}

		const response = await createAttributeAssurance({
			input: variables,
		})
			.then(response => {
				return response;
			})
			.catch(error => {
				return error;
			});

		if (has(response, 'errors') || isApolloError(response)) {
			addToastMessage({
				message: 'Error adding assurance',
				type: ToastMessage.FAILURE,
			});
			logBrowser('Error adding assurance', 'error', { response });
		} else {
			addToastMessage({
				message: 'Assurance added',
				type: ToastMessage.SUCCESS,
			});
			logBrowser('Successfully updated file', 'info', { response });
			setDocumentToAddAssurance(undefined);
		}
		await mutate('GET_ALL_FILES');
		await mutate('GET_ALL_SUS_ATTRIBUTES');
	};

	const getEntities = (): any[] => {
		if (allEntities.data === undefined) return [];
		let entities = get(allEntities.data, 'data.organizationFacilities', []);
		if (entities.length > 0) {
			entities = entities.filter((entity: any) => {
				return !documentToAddAssurance?.attributeAssurances.some((assurance: any) => {
					return assurance.organizationFacility?.id === entity.id;
				});
			});
		} else {
			// get the materials instead
			entities = get(allEntities.data, 'data.materials', null);
			// filter out the materials that are already in the document
			if (entities.length > 0) {
				entities = entities.filter((entity: any) => {
					return !documentToAddAssurance?.attributeAssurances.some((assurance: any) => {
						return assurance.material?.id === entity.id;
					});
				});
			}
		}

		return entities;
	};

	const getModalBody = () => {
		if (allEntities.isLoading) {
			return <Spinner />;
		}
		const name = get(sustainabilityAttribute, 'name', '');
		const level = get(sustainabilityAttribute, 'level', '');
		if (selectedEntityId === undefined) {
			return <div className={'text-body text-tc-primary'}>{`No new ${lowerCase(level)}s found to add.`}</div>;
		}

		const entities = getEntities();

		if (entities.length === 0) {
			return <div className={'text-body text-tc-primary'}>{`No new ${lowerCase(level)}s found to add.`}</div>;
		}
		const entityName = entities.find(entity => entity.id === selectedEntityId)?.name;
		// use the level to ask them to choose a supplier or material
		return (
			<div className={'w-full flex-col flex gap-4'}>
				<div className={'text-body text-tc-primary'}>{`Please select a ${level === 'SUPPLIER' ? 'supplier' : 'material'} to add an assurance for ${name}`}</div>
				<div className={'w-full'}>
					<Select
						options={entities.map((entity, index) => {
							return {
								id: index,
								name: entity.name,
								value: entity.id,
							};
						})}
						name={'entity'}
						value={entityName}
						onChange={(e: InputOption) => {
							setSelectedEntityId(e.value);
						}}
						buttonClassName={'w-full border-[1.5px] border-gray-90 rounded-[8px]'}
					/>
				</div>
			</div>
		);
	};

	const addButtonDisabled = () => {
		const entities = getEntities();
		return entities.length === 0 || addingAssurance;
	};

	logBrowser('DocumentsAddAssuranceModal rendered', 'info', {
		documentToAddAssurance,
		selectedEntity: selectedEntityId,
		addingAssurance,
	});

	return (
		<Modal
			show={documentToAddAssurance !== undefined}
			setShowModal={() => {
				setDocumentToAddAssurance(undefined);
			}}
			header={{
				title: `Add an assurance to to ${documentToAddAssurance?.originalName}`,
				cardProps: {
					glow: false,
				},
			}}
			body={getModalBody()}
			footer={{
				rejectButton: {
					label: 'Cancel',
					onClick: () => setDocumentToAddAssurance(undefined),
					variant: ButtonTypes.secondary,
				},
				resolveButton: {
					label: 'Add',
					onClick: async () => {
						setAddingAssurance(true);
						if (documentToAddAssurance) {
							await addAssuranceToDocument(documentToAddAssurance);
						}
						setAddingAssurance(false);
					},
					disabled: addButtonDisabled(),
					loading: addingAssurance,
					variant: ButtonTypes.primary,
				},
			}}
		/>
	);
};

export const DocumentsAddAssuranceModal = withErrorBoundary(_DocumentsAddAssuranceModal, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in DocumentsAddAssuranceModal: ', error);
	},
});
