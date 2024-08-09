import { MaterialsWithCertifications } from '@coldpbc/interfaces';

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
