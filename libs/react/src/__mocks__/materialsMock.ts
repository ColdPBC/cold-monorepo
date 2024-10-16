import { MaterialsWithCertifications, MaterialsWithRelations } from '@coldpbc/interfaces';
import { addDays, subDays } from 'date-fns';

export function getMaterialsMock(): MaterialsWithCertifications[] {
  return [
    {
      id: 'mat_qg9aabgn9a81mb90bijv9dtf',
      name: 'Small Cotton Ball',
      material_suppliers: [
        {
          id: 'msup_s4k8zvnh7jfn2i4i86y85cwb',
          supplier: {
            id: 'ofac_rlpejwnhc2d7i3g28ize24rl',
            name: 'Supplier Gamma',
            city: 'Pittsburgh',
            country: 'US',
            address_line_2: '',
            address_line_1: '',
          },
          material: {
            id: 'mat_qg9aabgn9a81mb90bijv9dtf',
            name: 'Small Cotton Ball',
          },
        },
      ],
      organization_claims: [
        {
          id: 'claim_lqk0k3b1p5iv8tbpdvducqdh',
          material: {
            id: 'mat_qg9aabgn9a81mb90bijv9dtf',
            name: 'Small Cotton Ball',
          },
          facility: {
            id: 'ofac_rlpejwnhc2d7i3g28ize24rl',
            name: 'Supplier Gamma',
            city: 'Pittsburgh',
            country: 'US',
            address_line_2: '',
            address_line_1: '',
          },
          organization_file: {
            original_name: 'company_mission.txt',
            effective_start_date: '2024-08-08T05:00:00.000Z',
            effective_end_date: '2025-04-30T05:00:00.000Z',
            type: 'TEST_RESULTS',
          },
          claim: {
            id: 'cert_b4guvd418edqrrye04cgrcx5',
            name: 'Greensign',
            level: 'Material',
            type: 'TEST',
          },
          product: null,
        },
      ],
    },
    {
      id: 'mat_ly6o0o0dfqqpz8vy1dcpefyl',
      name: 'Ergonomic Cotton Bacon',
      material_suppliers: [
        {
          id: 'msup_jmkp6fnskwl75tzkx0xb6zmk',
          supplier: {
            id: 'ofac_rlpejwnhc2d7i3g28ize24rl',
            name: 'Supplier Gamma',
            city: 'Pittsburgh',
            country: 'US',
            address_line_2: '',
            address_line_1: '',
          },
          material: {
            id: 'mat_ly6o0o0dfqqpz8vy1dcpefyl',
            name: 'Ergonomic Cotton Bacon',
          },
        },
        {
          id: 'msup_wbzcd58odxts3o2cs5oy9hvj',
          supplier: {
            id: 'ofac_nhfgwti6s91duov4okyf0b6z',
            name: 'KNK',
            city: 'Pittsburgh',
            country: 'US',
            address_line_2: '',
            address_line_1: '',
          },
          material: {
            id: 'mat_ly6o0o0dfqqpz8vy1dcpefyl',
            name: 'Ergonomic Cotton Bacon',
          },
        },
      ],
      organization_claims: [
        {
          id: 'claim_weeo1u7kox8l7lh2ggstrhgl',
          material: {
            id: 'mat_ly6o0o0dfqqpz8vy1dcpefyl',
            name: 'Ergonomic Cotton Bacon',
          },
          product: null,
          facility: {
            id: 'ofac_rlpejwnhc2d7i3g28ize24rl',
            name: 'Supplier Gamma',
            city: 'Pittsburgh',
            country: 'US',
            address_line_2: '',
            address_line_1: '',
          },
          organization_file: {
            original_name: 'company_mission.txt',
            effective_start_date: '2024-08-08T05:00:00.000Z',
            effective_end_date: '2025-04-30T05:00:00.000Z',
            type: 'TEST_RESULTS',
          },
          claim: {
            id: 'cert_b4guvd418edqrrye04cgrcx5',
            name: 'Greensign',
            level: 'Material',
            type: 'TEST',
          },
        },
      ],
    },
    {
      id: 'mat_cdvjpbctliv2b0afo9inys2y',
      name: 'Handcrafted Frozen Tuna',
      material_suppliers: [],
      organization_claims: [],
    },
    {
      id: 'mat_j7xtvksv2jrlxdzrd2m6bvbt',
      name: 'Handmade Soft Shoes',
      material_suppliers: [],
      organization_claims: [],
    },
    {
      id: 'mat_ibakmtajuny03w5m7s82r10y',
      name: 'Fantastic Cotton Mouse',
      material_suppliers: [],
      organization_claims: [],
    },
    {
      id: 'mat_inry3efikrihb7yh2nr2zj9e',
      name: 'Generic Concrete Table',
      material_suppliers: [],
      organization_claims: [],
    },
  ];
}

export function getMaterialDetailMockById(id: string): MaterialsWithCertifications {
  return getMaterialsMock().find(material => material.id === id) || getMaterialsMock()[0];
}

export function getMaterialsMocksWithAssurances(): MaterialsWithRelations[] {
  return [
    {
      id: 'mat_qg9aabgn9a81mb90bijv9dtf',
      name: 'Small Cotton Ball',
      materialSuppliers: [
        {
          id: 'msup_s4k8zvnh7jfn2i4i86y85cwb',
          organizationFacility: {
            id: 'ofac_rlpejwnhc2d7i3g28ize24rl',
            name: 'Supplier Gamma',
            supplierTier: 2,
          },
        },
      ],
      attributeAssurances: [
        {
          id: 'claim_lqk0k3b1p5iv8tbpdvducqdh',
          effectiveEndDate: null,
          organizationFile: null,
          sustainabilityAttribute: {
            id: 'mat_qg9aabgn9a81mb90bijv9dtf',
            level: "MATERIAL",
            name: 'PFAS test',
          },
        },
        {
          id: 'claim_lqk0k3b1p5iv8tbpdvducqdh',
          effectiveEndDate: null,
          organizationFile: {
            id: '123',
          },
          sustainabilityAttribute: {
            id: 'mat_qg9aabgn9a81mb90bijv9dtf',
            level: "MATERIAL",
            name: 'Bluesign',
            logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Bluesign.png',
          },
        },
        {
          id: 'claim_lqk0k3b1p5iv8tbpdvducqdh',
          effectiveEndDate: subDays(new Date(), 5).toISOString(), // Expired
          organizationFile: {
            id: '123',
          },
          sustainabilityAttribute: {
            id: "c8396184-16c5-46fb-a772-44b097473a3d",
            level: "MATERIAL",
            name: "ISO 26000 - Social Responsibility",
            logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/ISO+26000.png',
          }
        },
        {
          id: 'claim_lqk0k3b1p5iv8tbpdvducqdh',
          effectiveEndDate: null,
          organizationFile: null,
          sustainabilityAttribute: {
            id: 'mat_qg9aabgn9a81mb90bijv9dtf',
            level: "MATERIAL",
            name: 'Certified Organic',
          },
        },
        {
          id: 'claim_lqk0k3b1p5iv8tbpdvducqdh',
          effectiveEndDate: addDays(new Date(), 25).toISOString(), // Expiring
          organizationFile: {
            id: '123',
          },
          sustainabilityAttribute: {
            id: "a99e4eff-72ee-40f4-a476-0385ac6f52d3",
            level: "MATERIAL",
            name: "Worldwide Responsible Accredited Production (WRAP)",
            logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Worldwide+Responsible+Accredited+Production.png',
          },
        },
        {
          id: 'abc',
          effectiveEndDate: addDays(new Date(), 25).toISOString(), // Expiring
          organizationFile: {
            id: '123',
          },
          sustainabilityAttribute: {
            id: "xyz",
            level: "MATERIAL",
            name: "Organic Wool",
            logoUrl: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Worldwide+Responsible+Accredited+Production.png',
          },
        }
      ],
      productMaterials: [
        {
          id: 'opm_abc',
          product: {
            id: 'op_abc',
            organizationFacility: {
              id: 'ofac_abc',
              name: 'Assembly Factory',
            },
          },
        },
      ]
    },
    {
      id: 'mat_ly6o0o0dfqqpz8vy1dcpefyl',
      name: 'Ergonomic Cotton Bacon',
      materialSuppliers: [
        {
          id: 'msup_jmkp6fnskwl75tzkx0xb6zmk',
          organizationFacility: {
            id: 'ofac_rlpejwnhc2d7i3g28ize24rl',
            name: 'Supplier Gamma',
            supplierTier: 2,
          },
        },
        {
          id: 'msup_wbzcd58odxts3o2cs5oy9hvj',
          organizationFacility: {
            id: 'ofac_nhfgwti6s91duov4okyf0b6z',
            name: 'KNK',
            supplierTier: 1,
          },
        },
      ],
      attributeAssurances: [
        {
          id: 'claim_weeo1u7kox8l7lh2ggstrhgl',
          effectiveEndDate: null,
          organizationFile: null,
          sustainabilityAttribute: {
            id: "61121ffb-a0d5-44d9-b553-22b11c53533b",
            level: "MATERIAL",
            name: "SBTi Accreditation - Long Term Target (Net Zero by 2050)"
          },
        },
      ],
      productMaterials: [
        {
          id: 'opm_abc',
          product: {
            id: 'op_abc',
            organizationFacility: {
              id: 'ofac_abc',
              name: 'Assembly Factory',
            },
          },
        },
        {
          id: 'opm_def',
          product: {
            id: 'op_def',
            organizationFacility: {
              id: 'ofac_def',
              name: 'Another Assembly Factory',
            },
          },
        },
      ]
    },
    {
      id: 'mat_cdvjpbctliv2b0afo9inys2y',
      name: 'Handcrafted Frozen Tuna',
      materialSuppliers: [
        {
          id: 'msup_s4k8zvnh7jfn2i4i86y85cwb',
          organizationFacility: {
            id: 'ofac_rlpejwnhc2d7i3g28ize24rl',
            name: 'Supplier Gamma',
            supplierTier: 2,
          },
        },
        {
          id: 'msup_wbzcd58odxts3o2cs5oy9hvj',
          organizationFacility: {
            id: 'ofac_nhfgwti6s91duov4okyf0b6z',
            name: 'KNK',
            supplierTier: 1,
          },
        },
      ],
      attributeAssurances: [],
      productMaterials: [],
    },
    {
      id: 'mat_j7xtvksv2jrlxdzrd2m6bvbt',
      name: 'Handmade Soft Shoes',
      materialSuppliers: [
        {
          id: 'msup_s4k8zvnh7jfn2i4i86y85cwb',
          organizationFacility: {
            id: 'ofac_rlpejwnhc2d7i3g28ize24rl',
            name: 'Supplier Gamma',
            supplierTier: 2,
          },
        },
      ],
      attributeAssurances: [
        {
          id: 'claim_lqk0k3b1p5iv8tbpdvducqdh',
          effectiveEndDate: null,
          organizationFile: null,
          sustainabilityAttribute: {
            id: 'mat_j7xtvksv2jrlxdzrd2m6bvbt',
            level: "MATERIAL",
            name: 'Certified Organic',
          },
        },
      ],
      productMaterials: [],
    },
    {
      id: 'mat_ibakmtajuny03w5m7s82r10y',
      name: 'Fantastic Cotton Mouse',
      materialSuppliers: [
        {
          id: 'msup_wbzcd58odxts3o2cs5oy9hvj',
          organizationFacility: {
            id: 'ofac_nhfgwti6s91duov4okyf0b6z',
            name: 'Supplier Delta',
            supplierTier: 1,
          },
        },
      ],
      attributeAssurances: [],
      productMaterials: [],
    },
    {
      id: 'mat_inry3efikrihb7yh2nr2zj9e',
      name: 'Generic Concrete Table',
      materialSuppliers: [
        {
          id: 'msup_wbzcd58odxts3o2cs5oy9hvj',
          organizationFacility: {
            id: 'ofac_nhfgwti6s91duov4okyf0b6z',
            name: 'Supplier Delta',
            supplierTier: 1,
          },
        },
      ],
      attributeAssurances: [],
      productMaterials: [],
    },
  ];
}
