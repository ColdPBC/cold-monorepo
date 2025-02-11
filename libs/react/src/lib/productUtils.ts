import { FilesWithAssurances, ProductsQuery } from '@coldpbc/interfaces';
import { forEach, get } from 'lodash';

export const parseDocumentsForProductDetails = (product: ProductsQuery, files: FilesWithAssurances[]): FilesWithAssurances[] => {
  const tier1SupplierId = product.organizationFacility?.id;
  const productId = product.id;
  const materialIds = product.productMaterials.map(productMaterial => get(productMaterial, 'material.id', '')).filter(Boolean);
  const tier2SupplierIds = product.productMaterials
    .map(productMaterial => productMaterial.material.organizationFacility?.id)
    .filter(Boolean);
  forEach(files, file => {
    file.attributeAssurances = file.attributeAssurances.filter(assurance => {
      const isTier1Supplier = assurance.organizationFacility === null || assurance.organizationFacility?.id === tier1SupplierId;
      const isTier2Supplier = assurance.organizationFacility === null || tier2SupplierIds.includes(assurance.organizationFacility?.id);
      const isMaterial = assurance.material === null || materialIds.includes(assurance.material?.id);
      const isProduct = assurance.product === null || assurance.product?.id === productId;
      // but at least one of the fields must exist
      const oneFieldExists = assurance.organizationFacility !== null || assurance.material !== null || assurance.product !== null;
      return oneFieldExists && (isTier1Supplier || isTier2Supplier) && isMaterial && isProduct;
    });
  });
  return files.filter(file => file.attributeAssurances.length > 0);
};
