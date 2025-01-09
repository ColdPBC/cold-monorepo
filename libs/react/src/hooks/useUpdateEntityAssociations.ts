import {useGraphQLMutation} from "./useGraphqlMutation";
import {EntityLevel} from "@coldpbc/enums";
import {FetchResult} from "@apollo/client";


export const useUpdateEntityAssociations = () => {
  // get the right graphQL mutation function i.e. delete/add entity associations

  const { mutateGraphQL: createMaterialSupplier } = useGraphQLMutation('CREATE_MATERIAL_SUPPLIER')
  const { mutateGraphQL: updateProduct } = useGraphQLMutation('UPDATE_PRODUCT');
  const { mutateGraphQL: deleteMaterialSuppliers } = useGraphQLMutation('DELETE_MATERIAL_SUPPLIERS')

  const ENTITY_MAP = {
    [EntityLevel.MATERIAL]: {
      createEntityAssociation: createMaterialSupplier,
      deleteEntityAssociation: deleteMaterialSuppliers,
    },
    [EntityLevel.PRODUCT]: {
      createEntityAssociation: updateProduct,
      deleteEntityAssociation: updateProduct,
    },
  }

  const callMutateFunction = (entityLevel: EntityLevel, entityToAddId: string, entityBeingAddedToId: string, orgId: string | undefined, create: boolean): (Promise<void> | Promise<FetchResult<any>>) => {
    const { createEntityAssociation, deleteEntityAssociation } = ENTITY_MAP[entityLevel]
    const mutateFunction = create ? createEntityAssociation : deleteEntityAssociation
    if(!create){
      if(entityLevel === EntityLevel.MATERIAL){
        // delete materialSupplier using material and supplier id
        return mutateFunction({
					filter: {
						material: {
							id: entityToAddId,
						},
						organizationFacility: {
              id: entityBeingAddedToId
            },
            organization: {
              id: orgId
            }
					},
				});
      } else {
        // delete supplier from product
        return mutateFunction({
          input: {
            id: entityToAddId,
            organizationFacility: null
          }
        })
      }
    } else {
      if(entityLevel === EntityLevel.MATERIAL){
        // need to delete the old one first and then add the new one
        const promises = [
          deleteEntityAssociation({
            filter: {
              material: {
                id: entityToAddId
              },
              organization: {
                id: orgId
              }
            }
          }),
          createEntityAssociation({
            input: {
              material: { id: entityToAddId },
              organizationFacility: { id: entityBeingAddedToId },
              organization: {
                id: orgId
              }
            }
          })
        ]
        return Promise.all(promises)
      } else {
        return mutateFunction({
          input: {
            id: entityToAddId,
            organizationFacility: null
          }
        })
      }
    }
  }

  return { callMutateFunction }
}
