import { AddAttributesToMaterialModal, BaseButton, Card, ComboBox, CreateMaterialAttributesTable, Input, MainContent, Modal, Spinner } from '@coldpbc/components';
import React, { useEffect, useState } from 'react';
import { useAddToastMessage, useAuth0Wrapper, useColdContext, useGraphQLMutation, useGraphQLSWR } from '@coldpbc/hooks';
import { Claims, InputOption, SuppliersWithAssurances, ToastMessage } from '@coldpbc/interfaces';
import { get, has } from 'lodash';
import { ButtonTypes, IconNames } from '@coldpbc/enums';
import { useNavigate } from 'react-router-dom';
import {attributes} from "js-cookie";

// todo: Add required styling to name field
// todo: Look into how to add the checkbox to the mui datagrid
// todo: Storybook support
// todo: add feature flag

export const CreateMaterialPage = () => {
  const {addToastMessage} = useAddToastMessage();
  const {logBrowser} = useColdContext();
	const { orgId } = useAuth0Wrapper();
  const navigate = useNavigate();
  const placeHolderOption: InputOption = {
    id: -1,
    name: 'Tier 2 Supplier',
    value: '-1',
  };
	const [name, setName] = useState('');
	const [supplier, setSupplier] = useState<InputOption>(placeHolderOption);
	const [suppliers, setSuppliers] = useState<SuppliersWithAssurances[]>([]);
	const [attributes, setAttributes] = useState<Claims[]>([]);
	const [attributesToAdd, setAttributesToAdd] = useState<Claims[]>([]);
  const [showAddAttributesModal, setShowAddAttributesModal] = useState(false);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);
  const [saveButtonLoading, setSaveButtonLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const {mutateGraphQL: createMaterial} = useGraphQLMutation('CREATE_MATERIAL');
  const {mutateGraphQL: createAttributeAssurance} = useGraphQLMutation('CREATE_ATTRIBUTE_ASSURANCE_FOR_FILE');
  const {mutateGraphQL: createMaterialSupplier} = useGraphQLMutation('CREATE_MATERIAL_SUPPLIER');

	const suppliersQuery = useGraphQLSWR<{
		organizationFacilities: SuppliersWithAssurances[];
	}>(orgId ? 'GET_ALL_SUPPLIERS_FOR_ORG' : null, {
		filter: {
			organization: {
				id: orgId,
			},
			supplier: true,
			supplierTier: 2,
		},
	});

	const allSustainabilityAttributes = useGraphQLSWR<{
    sustainabilityAttributes: Claims[];
  }>('GET_ALL_SUS_ATTRIBUTES');

	useEffect(() => {
		if (suppliersQuery.data) {
			if (has(suppliersQuery.data, 'errors')) {
				setSuppliers([]);
			} else {
				const suppliers = get(suppliersQuery.data, 'data.organizationFacilities', []);
				setSuppliers(suppliers);
			}
		}
	}, [suppliersQuery.data]);

	useEffect(() => {
		if (allSustainabilityAttributes.data) {
			if (has(allSustainabilityAttributes.data, 'errors')) {
				setAttributes([]);
			} else {
				const attributes = get(allSustainabilityAttributes.data, 'data.sustainabilityAttributes', []);
				setAttributes(attributes);
			}
		}
	}, [allSustainabilityAttributes.data]);

	if (suppliersQuery.isLoading || allSustainabilityAttributes.isLoading) {
		return <Spinner />;
	}

	const supplierOptions: InputOption[] = suppliers.map((supplier, index) => {
		return {
			id: index,
			name: supplier.name,
			value: supplier.id,
		};
	});

  const onSaveButtonClick = async () => {
    setSaveButtonLoading(true);
    try {
      const createMaterialResponse = await createMaterial({
        input: {
          name: name,
          organization: {
            id: orgId,
          },
        },
      })
      const materialId = get(createMaterialResponse, 'data.createMaterial.id');
      if (materialId) {
        const promises: Promise<any>[] = [];
        if(supplier.id !== -1) {
          promises.push(
            createMaterialSupplier({
              input: {
                material: {
                  id: materialId,
                },
                organizationFacility: {
                  id: supplier.value,
                },
              },
            })
          );
        }
        if(attributesToAdd.length !== 0) {
          const attributeAssurances = attributesToAdd.map((attribute) => {
            return createAttributeAssurance({
              input: {
                material: {
                  id: materialId,
                },
                sustainabilityAttribute: {
                  id: attribute.id,
                },
              },
            });
          })
          promises.push(...attributeAssurances);
        }
        await Promise.all(promises).then((response) => {
          logBrowser('Material created with assurances successfully', 'error', {
            orgId,
            response,
            materialId,
          });
          addToastMessage({
            message: 'Material created successfully',
            type: ToastMessage.SUCCESS,
          })
          navigate('/materials');
        }).catch((e) => {
          logBrowser('Error creating material assurances for new material', 'error', {
            orgId,
            error: e,
            materialId,
          });
          addToastMessage({
            message: 'Error creating material',
            type: ToastMessage.FAILURE,
          })
        });
      } else {
        logBrowser('Error creating material', 'error', {
          orgId,
          response: createMaterialResponse,
        });
        addToastMessage({
          message: 'Error creating material',
          type: ToastMessage.FAILURE,
        })
      }
    } catch (e) {
      logBrowser('Error creating material', 'error', {
        orgId,
        error: e,
      });
      addToastMessage({
        message: 'Error creating material',
        type: ToastMessage.FAILURE,
      })
    }
    setSaveButtonLoading(false);
  }

  const pageButtons = () => {
    return (
      <div className={'flex flex-row gap-[16px] h-full items-center'}>
        <BaseButton
          label={'Cancel'}
          variant={ButtonTypes.warning}
          onClick={() => {
            setShowCancelModal(true);
          }}
          className={'h-[40px]'}
          />
        <BaseButton
          label={'Save'}
          variant={ButtonTypes.primary}
          onClick={onSaveButtonClick}
          disabled={saveButtonDisabled}
          loading={saveButtonLoading}
          className={'h-[40px]'}
        />
      </div>
    )
  }

	return (
		<MainContent
			title={'Create New Material'}
			breadcrumbs={[
				{
					label: 'Materials',
					href: '/materials',
				},
				{
					label: 'Create New',
				},
			]}
      className={'w-full'}
      headerElement={pageButtons()}
    >
			<div className={'flex flex-row gap-[40px] w-full'}>
				<div className={'flex flex-col w-1/2 gap-[40px]'}>
          <div className={'flex flex-col gap-[8px] w-full'}>
            <div className={'text-eyebrow'}>
              Name
            </div>
					<Input
						input_props={{
							name: 'name',
							value: name,
							onChange: e => setName(e.target.value),
							onValueChange: e => setName(e),
							className: 'text-body p-4 rounded-[8px] border-[1.5px] border-gray-90 w-full focus:border-[1.5px] focus:border-gray-90 focus:ring-0',
							placeholder: 'Name',
						}}
            container_classname={'w-full'}
					/>
          </div>
				</div>
				<div className={'flex flex-col w-1/2 gap-[40px]'}>
          <div className={'flex flex-col gap-[8px] w-full'}>
            <div className={'text-eyebrow'}>
              Tier 2 Supplier
            </div>
            <ComboBox options={[placeHolderOption, ...supplierOptions]} value={supplier} name={'tier 2 supplier'} onChange={option => setSupplier(option)} />
          </div>
					<Card title={'Sustainability Attributes'} glow={true}>
						<BaseButton
              label={'Add'}
              iconLeft={IconNames.PlusIcon}
              variant={ButtonTypes.secondary}
              onClick={() => setShowAddAttributesModal(true)}
            />
            <div className={'w-full h-[400px]'}>
              <CreateMaterialAttributesTable
                attributes={attributesToAdd}
                removeAttribute={(id) => {
                  const newAttributes = attributesToAdd.filter((attr) => attr.id !== id);
                  setAttributesToAdd(newAttributes);
                }}
              />
            </div>
					</Card>
				</div>
			</div>
      <AddAttributesToMaterialModal
        show={showAddAttributesModal}
        onClose={() => {
          setShowAddAttributesModal(false);
        }}
        attributes={attributes}
        addAttributes={(attributeIds) => {
          const newAttributes: Claims[] = [];
          attributeIds.forEach((id) => {
            const foundAttribute = attributes.find((attr) => attr.id === id);
            if(foundAttribute) {
              newAttributes.push(foundAttribute);
            }
          });
          setAttributesToAdd(newAttributes);
          setShowAddAttributesModal(false);
        }}
      />
      <Modal
        show={showCancelModal}
        setShowModal={setShowCancelModal}
        header={{
          title: 'Cancel without saving?',
        }}
        body={<div>All progress made on creating this material will be lost.</div>}
        footer={{
          rejectButton: {
            label: 'Cancel',
            onClick: () => setShowCancelModal(false),
            variant: ButtonTypes.secondary,
          },
          resolveButton: {
            label: 'Cancel Without Saving',
            onClick: () => {
              setShowCancelModal(false);
              navigate('/materials');
            },
            variant: ButtonTypes.warning,
          }
      }}
      />
		</MainContent>
	);
};
