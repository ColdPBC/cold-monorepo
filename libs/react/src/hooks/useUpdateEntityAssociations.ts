import {useGraphQLMutation} from "./useGraphqlMutation";
import {EntityLevel} from "@coldpbc/enums";
import {FetchResult} from "@apollo/client";
import { axiosFetcher } from '@coldpbc/fetchers';



export const useUpdateEntityAssociations = () => {
  // get the right graphQL mutation function i.e. delete/add entity associations

  const { mutateGraphQL: updateProduct } = useGraphQLMutation('UPDATE_PRODUCT');
  const { mutateGraphQL: updateMaterial } = useGraphQLMutation('UPDATE_MATERIAL');
  const { mutateGraphQL: createProductMaterial } = useGraphQLMutation('CREATE_PRODUCT_MATERIAL')
  const { mutateGraphQL: deleteProductMaterials } = useGraphQLMutation('DELETE_PRODUCT_MATERIALS')

  // use axios for removing/updating associations to suppliers
  const removeSupplierFromProduct = (variables: {
    productId: string,
    orgId: string | undefined
  }) => {
    const {productId, orgId} = variables;

    return axiosFetcher([`/organizations/${orgId}/products/${productId}`, 'PATCH', {
      id: productId,
      supplier_id: null,
    }])
  };

  const removeSupplierFromMaterial = (variables: {
    materialId: string,
    orgId: string | undefined
  }) => {
    const {materialId, orgId} = variables;

    return axiosFetcher([`/organizations/${orgId}/materials/${materialId}`, 'PATCH', {
      id: materialId,
      organization_facility_id: null,
    }])
  };

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
          mutation: updateMaterial,
          variables: (entityToAddId: string, entityBeingAddedToId: string, orgId: string | undefined) => ({
            input: {
              id: entityToAddId,
              organizationFacility: { id: entityBeingAddedToId },
              organization: { id: orgId }
            }
          })
        },
        delete: {
          mutation: removeSupplierFromMaterial,
          variables: (entityToAddId: string, entityBeingAddedToId: string, orgId: string | undefined) => ({
            materialId: entityToAddId,
            orgId,
          })
        }
      }
    },
    [EntityLevel.PRODUCT]: {
      [EntityLevel.SUPPLIER]: {
        add: {
          mutation: updateProduct,
          variables: (entityToAddId: string, entityBeingAddedToId: string, orgId: string | undefined) => ({
            input: {
              id: entityToAddId,
              organizationFacility: { id: entityBeingAddedToId }
            }
          })
        },
        delete: {
          mutation: removeSupplierFromProduct,
          variables: (entityToAddId: string, entityBeingAddedToId: string, orgId: string | undefined) => ({
            productId: entityToAddId,
            orgId
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
