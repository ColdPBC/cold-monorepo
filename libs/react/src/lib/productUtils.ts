import { FilesWithAssurances, ProductsQuery } from '@coldpbc/interfaces';
import { forEach, get } from 'lodash';

export const parseDocumentsForProductDetails = (product: ProductsQuery, files: FilesWithAssurances[]): FilesWithAssurances[] => {
  const tier1SupplierId = product.organizationFacility?.id;
  const productId = product.id;
  const materialIds = product.productMaterials.map(productMaterial => get(productMaterial, 'material.id', '')).filter(Boolean);
  const tier2SupplierIds = product.productMaterials
    .map(productMaterial => get(productMaterial, 'material.materialSuppliers[0].organizationFacility.id', ''))
    .flat()
    .filter(Boolean);
  forEach(files, file => {
    file.attributeAssurances = file.attributeAssurances.filter(assurance => {
      // remove all assurances not connected to an entity
      if (!assurance.organizationFacility && !assurance.material && !assurance.product) {
        return false;
      }

      // remove all assurances connected to a different product
      if (assurance.product && assurance.product.id !== productId) {
        return false;
      }

      // remove all assurances connected to a different supplier than one of the Tier 1 or Tier 2 suppliers
      if (assurance.organizationFacility && (assurance.organizationFacility.id !== tier1SupplierId || !tier2SupplierIds.includes(assurance.organizationFacility.id))) {
        return false;
      }

      // remove all assurances connected to a different material
      if (assurance.material && !materialIds.includes(assurance.material.id)) {
        return false;
      }

      return true;
    });
  });
  return files.filter(file => file.attributeAssurances.length > 0);
};
