import { MaterialsWithCertifications, MaterialsWithRelations } from '@coldpbc/interfaces';
import { addDays, subDays } from 'date-fns';
import { EntityLevel } from '@coldpbc/enums';

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
      id: "mat_lc4oufc9130spa0rpmsp6ou0",
      name: "Material 6",
      category: 'Category 1',
      subCategory: 'Sub Category 1',
      materialSuppliers: [
        {
          id: "msup_jhzunmfmnvq7knye5w5nwd2j",
          organizationFacility: {
            id: "ofac_vd809v326es9yz3rygkeb14f",
            name: "Supplier Delta",
            supplierTier: 2,
            attributeAssurances: [],
          },
        }
      ],
      attributeAssurances: [],
      productMaterials: [],
    },
    {
      id: "mat_u9lckkyqyii41q3by2wdt86i",
      name: "Material 8",
      category: 'Category 1',
      subCategory: 'Sub Category 2',
      materialSuppliers: [
        {
          id: "msup_sn673pues18vmk8l1d9jrehp",
          organizationFacility: {
            id: "ofac_vd809v326es9yz3rygkeb14f",
            name: "Supplier Delta",
            supplierTier: 2,
            attributeAssurances: [],
          },
        },
        {
          id: "msup_qb1t60n4bce506eouvjkri8d",
          organizationFacility: {
            id: "ofac_ziiewcq7wmehkgcnt6jhb6re",
            name: "Supplier 6",
            supplierTier: 2,
            attributeAssurances: [
              {
                id: "8ce77def-b624-4ce4-8b1b-f3ed0d6bd74e",
                effectiveEndDate: addDays(new Date(), 75).toISOString(),
                organizationFile: {
                  id: "f1b1b1b1-1b1b-1b1b-1b1b-1b1b1b1b1b1b",
                },
                sustainabilityAttribute: {
                  id: "24fd9960-7e35-45a1-8075-f99f2d841de6",
                  name: "Adherence to ZDHC MRSL",
                  level: EntityLevel.SUPPLIER,
                  logoUrl: "https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/ZDHC.png",
                },
              },
              {
                id: "16e53094-f98d-4051-9a39-8139e49f6acb",
                effectiveEndDate: subDays(new Date(), 75).toISOString(),
                organizationFile: {
                  id: "f1b1b1b1-1b1b-1b1b-1b1b-1b1b1b1b1b1b",
                },
                sustainabilityAttribute: {
                  id: "11739d63-10c6-4849-af49-e6a7f9e59f81",
                  name: "Altitude Sports",
                  level: EntityLevel.PRODUCT,
                },
              },
              {
                id: "b1a880e6-4c82-4b4d-bd84-cfe354c13129",
                effectiveEndDate: null,
                sustainabilityAttribute: {
                  id: "9d148721-1bf0-4e6f-bf7e-d037a30b8718",
                  name: "Arylamines",
                  level: EntityLevel.MATERIAL,
                },
                organizationFile: null,
              },
              {
                id: "5505336d-445f-4078-a25a-098f683a4710",
                effectiveEndDate: null,
                sustainabilityAttribute: {
                  id: "da1bcee4-5118-4dc6-9fa5-cdec1e26827d",
                  name: "B-Corp Certification",
                  level: EntityLevel.ORGANIZATION,
                },
                organizationFile: null,
              }
            ],
          },
        }
      ],
      attributeAssurances: [
        {
          id: "96ae4fab-9641-4488-b50e-da998dd786d6",
          effectiveEndDate: null,
          sustainabilityAttribute: {
            id: "6ebfad9b-39de-4ad3-aa45-4af4d2232ba7",
            name: "Bluesign Product",
            level: EntityLevel.PRODUCT,
            logoUrl: "https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Bluesign+Product.png",
          },
          organizationFile: null,
        },
        {
          id: "6fbefc76-53d3-446d-bb0e-120a15ba3fce",
          effectiveEndDate: null,
          sustainabilityAttribute: {
            id: "e200cb55-51b9-4851-82df-23b467c8aef4",
            name: "BSCI",
            level: EntityLevel.ORGANIZATION,
          },
          organizationFile: null,
        },
        {
          id: "aadc599d-5245-457c-9292-a95a3274322e",
          effectiveEndDate: null,
          sustainabilityAttribute: {
            id: "057a266f-ab44-4b34-876f-14fc3edb92fc",
            name: "BPA",
            level: EntityLevel.MATERIAL,
          },
          organizationFile: null,
        }
      ],
      productMaterials: [
        {
          id: "opm_kmubboc9e9q5v003p7xyu9k9",
          product: {
            id: "op_z8c0enfue023uirxi3xyneil",
            organizationFacility: {
              id: "ofac_wxxekywiila10puwj2j7gmwg",
              name: "Supplier 10",
            },
            attributeAssurances: [],
          },
        },
        {
          id: "opm_an0ygchf305yo1b2faro7au6",
          product: {
            id: "op_c0y7e5zsg09r0kxxlw2ha9cm",
            organizationFacility: {
              id: "ofac_wxxekywiila10puwj2j7gmwg",
              name: "Supplier 10",
            },
            attributeAssurances: [
              {
                id: "attrass_qtu8uc01hqportfm2cq4vfdi",
                effectiveEndDate: null,
                sustainabilityAttribute: {
                  id: "susatr_ctzexktkgpudh39j7fr5v506",
                  name: "Super Duper PFAS Free 2",
                  level: EntityLevel.PRODUCT,
                },
                organizationFile: null,
              }
            ],
          },
        }
      ],
    },
    {
      id: "mat_sdk8wipu9fq5a7ihxhthx5pv",
      name: "Example Nylon 1234",
      category: 'Category 1',
      subCategory: 'Sub Category 3',
      materialSuppliers: [
        {
          id: "matsup_e04icuz1dctp13hndqpvi3o1",
          organizationFacility: {
            id: "ofac_kjs428hjf9exhe4jqvi1sbr1",
            name: "Supplier 11",
            supplierTier: 2,
            attributeAssurances: [
              {
                id: "attrass_s3iebkcv577x77f697ujxo7d",
                effectiveEndDate: addDays(new Date(), 75).toISOString(),
                organizationFile: {
                  id: "f1b1b1b1-1b1b-1b1b-1b1b-1b1b1b1b1b1b",
                },
                sustainabilityAttribute: {
                  id: "7d061431-6c78-40e7-94ca-02bc55b32d9f",
                  name: "Oeko-Tex STeP",
                  level: EntityLevel.SUPPLIER,
                  logoUrl: "https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Okeo+Tex+STeP.png",
                },
              },
              {
                id: "attrass_mrq8zrxkwno9cc9kipog2kzf",
                effectiveEndDate: addDays(new Date(), 15).toISOString(),
                organizationFile: {
                  id: "f1b1b1b1-1b1b-1b1b-1b1b-1b1b1b1b1b1b",
                },
                sustainabilityAttribute: {
                  id: "b315a3e4-6cc2-4443-8c0e-09dc651b3ac8",
                  name: "Recycled Down",
                  level: EntityLevel.MATERIAL,
                },
              },
              {
                id: "attrass_po7apmssyulyanrti03n00xg",
                effectiveEndDate: null,
                sustainabilityAttribute: {
                  id: "be6fa78a-0794-4604-8ea3-2a801c031ed6",
                  name: "Recycled Claim Standard",
                  level: EntityLevel.MATERIAL,
                  logoUrl: "https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Recycled+Claim+Standard.png",
                },
                organizationFile: null,
              },
              {
                id: "attrass_ls1gtnhh2rx5jw1bahgpl9xo",
                effectiveEndDate: null,
                sustainabilityAttribute: {
                  id: "d06f8c69-f03a-42f0-8f2e-d5ae310b45b2",
                  name: "REACH (Registration, Evaluation, Authorisation and Restriction of Chemical)",
                  level: EntityLevel.PRODUCT,
                },
                organizationFile: null,
              },
              {
                id: "attrass_arg5b4fdkg5ubvfkgdzfd7s0",
                effectiveEndDate: null,
                sustainabilityAttribute: {
                  id: "fff12187-2e23-455b-8f11-1a263baf000e",
                  name: "Recycled Leather",
                  level: EntityLevel.MATERIAL,
                },
                organizationFile: null,
              }
            ],
          },
        },
        {
          id: "msup_i3819gq1c53fygmlcn4qyz8w",
          organizationFacility: {
            id: "ofac_vd809v326es9yz3rygkeb14f",
            name: "Supplier Delta",
            supplierTier: 2,
            attributeAssurances: [],
          },
        }
      ],
      attributeAssurances: [
        {
          id: "0a16a219-8d92-43fe-9bde-1e2d1fae78bd",
          effectiveEndDate: null,
          sustainabilityAttribute: {
            id: "59b67578-91b6-407f-8531-9e9b4a3f65ab",
            name: "BEPI",
            level: EntityLevel.SUPPLIER,
            logoUrl: "https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/BEPI.png",
          },
          organizationFile: null,
        },
        {
          id: "ada81b21-1006-4f1b-b429-2dd9fb90f466",
          effectiveEndDate: null,
          sustainabilityAttribute: {
            id: "c98cf2c7-961f-4301-ab91-d12334790376",
            name: "Better Cotton Initative",
            level: EntityLevel.MATERIAL,
            logoUrl: "https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Better+Cotton+Iniative.png",
          },
          organizationFile: null,
        },
        {
          id: "57ce4aad-9f75-44dc-b5d4-f7d715ebf4d2",
          effectiveEndDate: null,
          sustainabilityAttribute: {
            id: "336712cf-eead-4c51-87f1-263bcc636511",
            name: "Bio-based Synthetics",
            level: EntityLevel.MATERIAL,
          },
          organizationFile: null,
        },
        {
          id: "56c1a108-6d01-4d04-aa9b-76ededb1fb39",
          effectiveEndDate: null,
          sustainabilityAttribute: {
            id: "20218086-90ff-4cb4-a35e-4aefe347f5fa",
            name: "Blue Angel",
            level: EntityLevel.MATERIAL,
            logoUrl: "https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Blue+Angel.png",
          },
          organizationFile: null,
        }
      ],
      productMaterials: [
        {
          id: "opm_lg4rlg979blgkw6k5pezltj3",
          product: {
            id: "op_wvjr8v3tdzk6j3wl2x8a26bw",
            organizationFacility: {
              id: "ofac_wxxekywiila10puwj2j7gmwg",
              name: "Supplier 10",
            },
            attributeAssurances: [],
          },
        },
        {
          id: "opm_j39ropi5u7x0y1qzbme0tygf",
          product: {
            id: "op_z8c0enfue023uirxi3xyneil",
            organizationFacility: {
              id: "ofac_wxxekywiila10puwj2j7gmwg",
              name: "Supplier 10",
            },
            attributeAssurances: [],
          },
        },
        {
          id: "opm_l30omtgvn91n7bt8jm2aiu57",
          product: {
            id: "op_c0y7e5zsg09r0kxxlw2ha9cm",
            organizationFacility: {
              id: "ofac_wxxekywiila10puwj2j7gmwg",
              name: "Supplier 10",
            },
            attributeAssurances: [
              {
                id: "attrass_qtu8uc01hqportfm2cq4vfdi",
                effectiveEndDate: null,
                sustainabilityAttribute: {
                  id: "susatr_ctzexktkgpudh39j7fr5v506",
                  name: "Super Duper PFAS Free 2",
                  level: EntityLevel.PRODUCT,
                },
                organizationFile: null,
              }
            ],
          },
        }
      ],
    },
    {
      id: "39da1a03-22b2-4b97-ac3c-49dae6dbaa7c",
      name: "nylon test",
      category: 'Category 2',
      subCategory: 'Sub Category 1',
      materialSuppliers: [],
      attributeAssurances: [],
      productMaterials: [],
    },
    {
      id: "mat_beq7hd4e7efg5vzrzpp1xcb9",
      name: "Material 7",
      category: null,
      subCategory: null,
      materialSuppliers: [
        {
          id: "msup_mvldtl3a1y1y27i6dpuz7qs2",
          organizationFacility: {
            id: "ofac_zhgx5abrfsxx39nb5cc18nr9",
            name: "Kerluke - Armstrong",
            supplierTier: 2,
            attributeAssurances: [
              {
                id: "6fd8a117-76b3-431d-b766-556d0c437a3a",
                effectiveEndDate: addDays(new Date(), 75).toISOString(),
                organizationFile: {
                  id: "f1b1b1b1-1b1b-1b1b-1b1b-1b1b1b1b1b1b",
                },
                sustainabilityAttribute: {
                  id: "a99e4eff-72ee-40f4-a476-0385ac6f52d3",
                  name: "Worldwide Responsible Accredited Production (WRAP)",
                  level: EntityLevel.SUPPLIER,
                  logoUrl: "https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Worldwide+Responsible+Accredited+Production.png",
                },
              }
            ],
          },
        }
      ],
      attributeAssurances: [
        {
          id: "381c0b18-d9df-4734-84b8-d30e95ef454c",
          effectiveEndDate: addDays(new Date(), 15).toISOString(),
          organizationFile: {
            id: "f1b1b1b1-1b1b-1b1b-1b1b-1b1b1b1b1b1b",
          },
          sustainabilityAttribute: {
            id: "58421269-225a-4736-acdd-9acd7b4a1147",
            name: "Down Codex",
            level: EntityLevel.MATERIAL,
            logoUrl: "https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/Down+Codex.png",
          },
        },
        {
          id: "ded47c4c-8706-4db3-8716-ae4b3f891b67",
          effectiveEndDate: addDays(new Date(), 50).toISOString(),
          organizationFile: {
            id: "f1b1b1b1-1b1b-1b1b-1b1b-1b1b1b1b1b1b",
          },
          sustainabilityAttribute: {
            id: "7cb028eb-bafe-4dd3-b11a-dddaa535b807",
            name: "SMETA Audit",
            level: EntityLevel.SUPPLIER,
            logoUrl: "https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/SMETA+Audit.png",
          },
        },
        {
          id: "c43b195d-75ad-4a87-8d20-e47ea16d409e",
          effectiveEndDate: null,
          sustainabilityAttribute: {
            id: "ccac80fd-2c4a-4ca0-aec3-989b615461c0",
            name: "Green Button",
            level: EntityLevel.ORGANIZATION,
          },
          organizationFile: null,
        }
      ],
      productMaterials: [
        {
          id: "opm_ynpia336jl34ar26ikpje5sj",
          product: {
            id: "op_c0y7e5zsg09r0kxxlw2ha9cm",
            organizationFacility: {
              id: "ofac_wxxekywiila10puwj2j7gmwg",
              name: "Supplier 10",
            },
            attributeAssurances: [
              {
                id: "attrass_qtu8uc01hqportfm2cq4vfdi",
                effectiveEndDate: null,
                sustainabilityAttribute: {
                  id: "susatr_ctzexktkgpudh39j7fr5v506",
                  name: "Super Duper PFAS Free 2",
                  level: EntityLevel.PRODUCT,
                },
                organizationFile: null,
              }
            ],
          },
        },
        {
          id: "opm_zt3p4bfsa3ub3rxfe8witshb",
          product: {
            id: "op_wvjr8v3tdzk6j3wl2x8a26bw",
            organizationFacility: {
              id: "ofac_wxxekywiila10puwj2j7gmwg",
              name: "Supplier 10",
            },
            attributeAssurances: [],
          },
        }
      ],
    },
    {
      id: "32832c48-6794-4494-9437-aa14e44363c9",
      name: "Material 2",
      category: 'Category 2',
      subCategory: 'Sub Category 2',
      materialSuppliers: [
        {
          id: "msup_srmnw3c1k3kybgpic4govht9",
          organizationFacility: {
            id: "ofac_ziiewcq7wmehkgcnt6jhb6re",
            name: "Supplier 6",
            supplierTier: 2,
            attributeAssurances: [
              {
                id: "8ce77def-b624-4ce4-8b1b-f3ed0d6bd74e",
                effectiveEndDate: null,
                sustainabilityAttribute: {
                  id: "24fd9960-7e35-45a1-8075-f99f2d841de6",
                  name: "Adherence to ZDHC MRSL",
                  level: EntityLevel.SUPPLIER,
                  logoUrl: "https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/sustainability_attributes/ZDHC.png",
                },
                organizationFile: null,
              },
              {
                id: "16e53094-f98d-4051-9a39-8139e49f6acb",
                effectiveEndDate: null,
                sustainabilityAttribute: {
                  id: "11739d63-10c6-4849-af49-e6a7f9e59f81",
                  name: "Altitude Sports",
                  level: EntityLevel.PRODUCT,
                },
                organizationFile: null,
              },
              {
                id: "b1a880e6-4c82-4b4d-bd84-cfe354c13129",
                effectiveEndDate: null,
                sustainabilityAttribute: {
                  id: "9d148721-1bf0-4e6f-bf7e-d037a30b8718",
                  name: "Arylamines",
                  level: EntityLevel.MATERIAL,
                },
                organizationFile: null,
              },
              {
                id: "5505336d-445f-4078-a25a-098f683a4710",
                effectiveEndDate: null,
                sustainabilityAttribute: {
                  id: "da1bcee4-5118-4dc6-9fa5-cdec1e26827d",
                  name: "B-Corp Certification",
                  level: EntityLevel.ORGANIZATION,
                },
                organizationFile: null,
              }
            ],
          },
        }
      ],
      attributeAssurances: [],
      productMaterials: [],
    },
  ];
}
