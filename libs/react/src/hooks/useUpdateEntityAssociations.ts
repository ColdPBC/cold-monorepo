import {useGraphQLMutation} from "./useGraphqlMutation";
import {EntityLevel} from "@coldpbc/enums";
import {FetchResult} from "@apollo/client";


export const useUpdateEntityAssociations = () => {
  // get the right graphQL mutation function i.e. delete/add entity associations

  const { mutateGraphQL: deleteAndCreateMaterialSupplier } = useGraphQLMutation('DELETE_AND_CREATE_MATERIAL_SUPPLIER')
  const { mutateGraphQL: updateProduct } = useGraphQLMutation('UPDATE_PRODUCT');
  const { mutateGraphQL: deleteMaterialSuppliers } = useGraphQLMutation('DELETE_MATERIAL_SUPPLIERS')

  const callMutateFunction = (entityLevel: EntityLevel, entityToAddId: string, entityBeingAddedToId: string, orgId: string | undefined, create: boolean): (Promise<void> | Promise<FetchResult<any>>) => {
    if(!create){
      if(entityLevel === EntityLevel.MATERIAL){
        // delete materialSupplier using material and supplier id
        return deleteMaterialSuppliers({
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
        return updateProduct({
          input: {
            id: entityToAddId,
            organizationFacility: null
          }
        })
      }
    } else {
      if(entityLevel === EntityLevel.MATERIAL){
        // need to delete the old one first and then add the new one
        return deleteAndCreateMaterialSupplier({
          deleteFilter: {
            material: {
              id: entityToAddId
            },
            organization: {
              id: orgId
            }
          },
          createInput: {
            material: { id: entityToAddId },
            organizationFacility: { id: entityBeingAddedToId },
            organization: {
              id: orgId
            }
          }
        })
      } else {
        return updateProduct({
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
