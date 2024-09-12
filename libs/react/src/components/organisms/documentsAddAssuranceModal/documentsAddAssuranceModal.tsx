import { ErrorFallback, Modal, Select, Spinner } from '@coldpbc/components';
import { ButtonTypes } from '@coldpbc/enums';
import React, { useEffect } from 'react';
import { FilesWithAssurances, InputOption, ToastMessage } from '@coldpbc/interfaces';
import { useSWRConfig } from 'swr';
import { useAddToastMessage, useAuth0Wrapper, useColdContext, useGraphQLMutation, useGraphQLSWR } from '@coldpbc/hooks';
import { get, has } from 'lodash';
import { withErrorBoundary } from 'react-error-boundary';

export const _DocumentsAddAssuranceModal = (props: {
	documentToAddAssurance: FilesWithAssurances;
	setDocumentToAddAssurance: (document: FilesWithAssurances | undefined) => void;
}) => {
	const { documentToAddAssurance, setDocumentToAddAssurance } = props;
	const [addingAssurance, setAddingAssurance] = React.useState(false);
	const [selectedEntity, setSelectedEntity] = React.useState<string | undefined>(undefined);
	const { addToastMessage } = useAddToastMessage();
	const { mutate } = useSWRConfig();
	const { logBrowser } = useColdContext();
	const { orgId } = useAuth0Wrapper();
	const sustainabilityAttribute = get(documentToAddAssurance, 'attributeAssurances[0].sustainabilityAttribute', undefined);

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

	const allEntities = useGraphQLSWR(getQueryString());
	const { mutateGraphQL: createAttributeAssurance } = useGraphQLMutation('CREATE_ATTRIBUTE_ASSURANCE_FOR_FILE');

	useEffect(() => {
		if (!get(allEntities.data, 'errors', undefined)) {
			const entities = getEntities();
			setSelectedEntity(get(entities, '[0].name', undefined));
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
		};
		if (sustainabilityAttribute.level === 'SUPPLIER') {
			variables = {
				...variables,
				supplier: {
					id: selectedEntity,
				},
			};
		} else if (sustainabilityAttribute.level === 'MATERIAL') {
			variables = {
				...variables,
				material: {
					id: selectedEntity,
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

		if (has(response, 'errors')) {
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
		let entities = get(allEntities.data, 'data.suppliers', []);
		if (entities.length > 0) {
			entities = entities.filter((entity: any) => {
				return !documentToAddAssurance?.attributeAssurances.some((assurance: any) => {
					return assurance.supplier?.id === entity.id;
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
		if (selectedEntity === undefined) {
			return <div className={'text-body text-tc-primary'}>No entities found</div>;
		}
		// show them the sustainability attribute and ask them to select a supplier or material
		// show a list of suppliers or materials to create an assurance
		const name = get(sustainabilityAttribute, 'name', '');
		const level = get(sustainabilityAttribute, 'level', '');
		const entities = getEntities();
		// use the level to ask them to choose a supplier or material
		return (
			<div className={'w-full flex-col flex gap-4'}>
				<div className={'text-body text-tc-primary'}>{`Please select a ${level === 'SUPPLIER' ? 'supplier' : 'material'} to add an assurance for ${name}`}</div>
				<div className={'w-full'}>
					<Select
						options={entities.map((entity, index) => {
							return {
								id: entity.id,
								name: entity.name,
								value: entity.id,
							};
						})}
						name={'entity'}
						value={selectedEntity}
						onChange={(e: InputOption) => {
							setSelectedEntity(e.name);
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
		selectedEntity,
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
