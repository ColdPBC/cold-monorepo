import {useGraphQLMutation} from "./useGraphqlMutation";
import {EntityLevel} from "@coldpbc/enums";
import {FetchResult} from "@apollo/client";



export const useUpdateEntityAssociations = () => {
  // get the right graphQL mutation function i.e. delete/add entity associations

  const { mutateGraphQL: deleteAndCreateMaterialSupplier } = useGraphQLMutation('DELETE_AND_CREATE_MATERIAL_SUPPLIER')
  const { mutateGraphQL: updateProduct } = useGraphQLMutation('UPDATE_PRODUCT');
  const { mutateGraphQL: deleteMaterialSuppliers } = useGraphQLMutation('DELETE_MATERIAL_SUPPLIERS')
  const { mutateGraphQL: createProductMaterial } = useGraphQLMutation('CREATE_PRODUCT_MATERIAL')
  const { mutateGraphQL: deleteProductMaterials } = useGraphQLMutation('DELETE_PRODUCT_MATERIALS')

  const mutationMap = {
    [EntityLevel.MATERIAL]: {
      [EntityLevel.PRODUCT]: {
        add: {
          mutation: createProductMaterial,
          variables: (entityToAddId: string, entityBeingAddedToId: string, orgId: string | undefined) => ({
            input: {
              material: { id: entityToAddId },
              product: { id: entityBeingAddedToId },
              organization: { id: orgId }
            }
          })
        },
        delete: {
          mutation: deleteProductMaterials,
          variables: (entityToAddId: string, entityBeingAddedToId: string, orgId: string | undefined) => ({
            filter: {
              material: { id: entityToAddId },
              product: { id: entityBeingAddedToId },
              organization: { id: orgId }
            }
          })
        }
      },
      [EntityLevel.SUPPLIER]: {
        add: {
          mutation: deleteAndCreateMaterialSupplier,
          variables: (entityToAddId: string, entityBeingAddedToId: string, orgId: string | undefined) => ({
            deleteFilter: {
              material: { id: entityToAddId },
              organization: { id: orgId }
            },
            createInput: {
              material: { id: entityToAddId },
              organizationFacility: { id: entityBeingAddedToId },
              organization: { id: orgId }
            }
          })
        },
        delete: {
          mutation: deleteMaterialSuppliers,
          variables: (entityToAddId: string, entityBeingAddedToId: string, orgId: string | undefined) => ({
            filter: {
              material: { id: entityToAddId },
              organizationFacility: { id: entityBeingAddedToId },
              organization: { id: orgId }
            }
          })
        }
      }
    },
    [EntityLevel.PRODUCT]: {
      [EntityLevel.MATERIAL]: {
        add: {
          mutation: createProductMaterial,
          variables: (entityToAddId: string, entityBeingAddedToId: string, orgId: string | undefined) => ({
            input: {
              product: { id: entityToAddId },
              material: { id: entityBeingAddedToId },
              organization: { id: orgId }
            }
          })
        },
        delete: {
          mutation: deleteProductMaterials,
          variables: (entityToAddId: string, entityBeingAddedToId: string, orgId: string | undefined) => ({
            filter: {
              product: { id: entityToAddId },
              material: { id: entityBeingAddedToId },
              organization: { id: orgId }
            }
          })
        }
      }
    }
  };


  const callMutateFunction = (
    entityToAddLevel: EntityLevel,
    entityBeingAddedToLevel: EntityLevel,
    entityToAddId: string,
    entityBeingAddedToId: string,
    orgId: string | undefined,
    action: 'add' | 'delete'
  ): (Promise<void> | Promise<FetchResult<any>>) => {

    const mutationConfig = mutationMap[entityToAddLevel]?.[entityBeingAddedToLevel]?.[action];
    if (!mutationConfig) {
      throw new Error(`Unsupported entity types or action: ${entityToAddLevel}, ${entityBeingAddedToLevel}, ${action}`);
    }

    return mutationConfig.mutation(mutationConfig.variables(entityToAddId, entityBeingAddedToId, orgId));

    // if(create){
    //   return deleteAndCreateMaterialSupplier({
    //     deleteFilter: {
    //       material: {
    //         id: entityToAddId
    //       },
    //       organization: {
    //         id: orgId
    //       }
    //     },
    //     createInput: {
    //       material: { id: entityToAddId },
    //       organizationFacility: { id: entityBeingAddedToId },
    //       organization: {
    //         id: orgId
    //       }
    //     }
    //   })
    // } else {
    //   return deleteMaterialSuppliers({
    //     filter: {
    //       material: {
    //         id: entityToAddId,
    //       },
    //       organizationFacility: {
    //         id: entityBeingAddedToId
    //       },
    //       organization: {
    //         id: orgId
    //       }
    //     },
    //   });
    // }

    // if(entityLevel === EntityLevel.MATERIAL) {
    // } else {
    //   return updateProduct({
    //       input: {
    //         id: entityToAddId,
    //         organizationFacility: create ? { id: entityBeingAddedToId } : null
    //       }
    //     })
    // }
  }

  return { callMutateFunction }
}
