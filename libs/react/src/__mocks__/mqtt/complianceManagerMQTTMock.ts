import { find, get } from 'lodash';

export const getSectionGroupList = (args: any) => {
  const name = get(args, 'name', '');
  const mockData = [
    {
      statuses: [],
      compliance_definition: {
        name: 'rei_pia_2024',
        title: 'REI Product Impact Assessment 2024',
        version: null,
        logo_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/3rdPartyLogos/compliance_svgs/rei_logo.svg',
        image_url: 'https://cold-public-assets.s3.us-east-2.amazonaws.com/complianceBackgroundImages/rei.png',
        compliance_section_groups: [
          {
            id: 'csg_ual97c2pos346hkf',
            title: 'Materials',
            metadata: null,
            compliance_definition_name: 'rei_pia_2024',
            question_count: 23,
            ai_answered_count: 0,
            user_answered_count: 0,
            bookmarked_count: 0,
            not_started_count: 23,
          },
          {
            id: 'csg_u52xp76tclba5djc',
            title: 'D & I',
            metadata: null,
            compliance_definition_name: 'rei_pia_2024',
            question_count: 18,
            ai_answered_count: 0,
            user_answered_count: 0,
            bookmarked_count: 0,
            not_started_count: 18,
          },
          {
            id: 'csg_mnjg81nrtfgsphp4',
            title: 'Practices',
            metadata: null,
            compliance_definition_name: 'rei_pia_2024',
            question_count: 32,
            ai_answered_count: 0,
            user_answered_count: 0,
            bookmarked_count: 0,
            not_started_count: 32,
          },
          {
            id: 'csg_xcv2gzlmrrucrzr5',
            title: 'Environment',
            metadata: null,
            compliance_definition_name: 'rei_pia_2024',
            question_count: 20,
            ai_answered_count: 0,
            user_answered_count: 0,
            bookmarked_count: 0,
            not_started_count: 20,
          },
          {
            id: 'csg_gnawsv7bv67xumws',
            title: 'Product',
            metadata: null,
            compliance_definition_name: 'rei_pia_2024',
            question_count: 20,
            ai_answered_count: 0,
            user_answered_count: 0,
            bookmarked_count: 0,
            not_started_count: 20,
          },
        ],
        metadata: {
          term: 'annual',
          due_date: '2024-12-31T00:00:00.000Z',
        },
      },
    },
  ];
  return find(mockData, item => item.compliance_definition.name === name);
};

export const getSectionList = (args: any) => {
  const name = get(args, 'name', '');
  const sectionGroupId = get(args, 'sectionGroupId', '');
  const mockData = [
    {
      name: 'rei_pia_2024',
      section_groups: [
        {
          sectionGroupId: 'csg_ual97c2pos346hkf',
          sections: [
            {
              id: 'cs_cr9ud1djx1h7xrem',
              key: 'WL',
              title: 'Wool',
              metadata: null,
              order: 9,
              compliance_section_group_id: 'csg_ual97c2pos346hkf',
              compliance_definition_name: 'rei_pia_2024',
              _count: {
                compliance_questions: 2,
              },
            },
            {
              id: 'cs_fkhppv9zp5yk4qg0',
              key: 'FR',
              title: 'Flame Retardant (FR) Chemicals',
              metadata: null,
              order: 7,
              compliance_section_group_id: 'csg_ual97c2pos346hkf',
              compliance_definition_name: 'rei_pia_2024',
              _count: {
                compliance_questions: 3,
              },
            },
            {
              id: 'cs_kvyvslvd8k9b6u9l',
              key: 'CHEM',
              title: 'Restricted Substances List & Chemicals Management',
              metadata: null,
              order: 2,
              compliance_section_group_id: 'csg_ual97c2pos346hkf',
              compliance_definition_name: 'rei_pia_2024',
              _count: {
                compliance_questions: 6,
              },
            },
            {
              id: 'cs_uzcancxkpelymuv9',
              key: 'DWN',
              title: 'Down',
              metadata: null,
              order: 8,
              compliance_section_group_id: 'csg_ual97c2pos346hkf',
              compliance_definition_name: 'rei_pia_2024',
              _count: {
                compliance_questions: 2,
              },
            },
            {
              id: 'cs_v4qmnk2ubja9ko3x',
              key: 'AFL',
              title: 'Animal Fur & Exotic Leather',
              metadata: null,
              order: 10,
              compliance_section_group_id: 'csg_ual97c2pos346hkf',
              compliance_definition_name: 'rei_pia_2024',
              _count: {
                compliance_questions: 3,
              },
            },
            {
              id: 'cs_w3a3maz46vkbwto0',
              key: 'BPA',
              title: 'Bisphenol A',
              metadata: null,
              order: 5,
              compliance_section_group_id: 'csg_ual97c2pos346hkf',
              compliance_definition_name: 'rei_pia_2024',
              _count: {
                compliance_questions: 2,
              },
            },
            {
              id: 'cs_w3yijeqzqzh5z4lw',
              key: 'SUN',
              title: 'Sunscreen Ingredients',
              metadata: null,
              order: 6,
              compliance_section_group_id: 'csg_ual97c2pos346hkf',
              compliance_definition_name: 'rei_pia_2024',
              _count: {
                compliance_questions: 3,
              },
            },
            {
              id: 'cs_xpfz8pcnz5l3q7hn',
              key: 'PFAS',
              title: 'Per- and Polyfluoroalkyl Substances',
              metadata: null,
              order: 4,
              compliance_section_group_id: 'csg_ual97c2pos346hkf',
              compliance_definition_name: 'rei_pia_2024',
              _count: {
                compliance_questions: 2,
              },
            },
          ],
        },
        {
          sectionGroupId: 'csg_u52xp76tclba5djc',
          sections: [
            {
              id: 'cs_g5prbr04liwq2iy6',
              key: 'INC',
              title: 'Diversity & Inclusion: General',
              metadata: null,
              order: 17,
              compliance_section_group_id: 'csg_u52xp76tclba5djc',
              compliance_definition_name: 'rei_pia_2024',
              _count: {
                compliance_questions: 6,
              },
            },
            {
              id: 'cs_m85htg8kkj8psfbc',
              key: 'MKT',
              title: 'Diversity & Inclusion: Marketing Diversity',
              metadata: null,
              order: 12,
              compliance_section_group_id: 'csg_u52xp76tclba5djc',
              compliance_definition_name: 'rei_pia_2024',
              _count: {
                compliance_questions: 3,
              },
            },
            {
              id: 'cs_mlwf1rptdl1nf0f5',
              key: 'APP',
              title: 'Diversity & Inclusion: Cultural Appropriation',
              metadata: null,
              order: 11,
              compliance_section_group_id: 'csg_u52xp76tclba5djc',
              compliance_definition_name: 'rei_pia_2024',
              _count: {
                compliance_questions: 2,
              },
            },
            {
              id: 'cs_oqro7y64jpwjauar',
              key: 'COL',
              title: 'Diversity & Inclusion: Inclusive Colorways',
              metadata: null,
              order: 14,
              compliance_section_group_id: 'csg_u52xp76tclba5djc',
              compliance_definition_name: 'rei_pia_2024',
              _count: {
                compliance_questions: 2,
              },
            },
            {
              id: 'cs_pjmqyrrfzbtqvbi7',
              key: 'COP',
              title: 'Diversity & Inclusion: Inclusive Copy',
              metadata: null,
              order: 13,
              compliance_section_group_id: 'csg_u52xp76tclba5djc',
              compliance_definition_name: 'rei_pia_2024',
              _count: {
                compliance_questions: 2,
              },
            },
            {
              id: 'cs_r8wflfvf7o7tfm2q',
              key: 'ISS',
              title: 'Diversity & Inclusion: Inclusive Sizing',
              metadata: null,
              order: 15,
              compliance_section_group_id: 'csg_u52xp76tclba5djc',
              compliance_definition_name: 'rei_pia_2024',
              _count: {
                compliance_questions: 2,
              },
            },
            {
              id: 'cs_v7aqyq1r17ndfh2i',
              key: 'DHT',
              title: 'Diversity & Inclusion: Diverse Hair Type Inclusion',
              metadata: null,
              order: 16,
              compliance_section_group_id: 'csg_u52xp76tclba5djc',
              compliance_definition_name: 'rei_pia_2024',
              _count: {
                compliance_questions: 1,
              },
            },
          ],
        },
        {
          sectionGroupId: 'csg_mnjg81nrtfgsphp4',
          sections: [
            {
              id: 'cs_a6ggbg5yueu9h3x9',
              key: 'MFG',
              title: 'Manufacturing Code of Conduct & Responsible Sourcing',
              metadata: null,
              order: 1,
              compliance_section_group_id: 'csg_mnjg81nrtfgsphp4',
              compliance_definition_name: 'rei_pia_2024',
              _count: {
                compliance_questions: 15,
              },
            },
            {
              id: 'cs_pfcuqh8485r84svr',
              key: 'GEN',
              title: 'Brand Information',
              metadata: null,
              order: 0,
              compliance_section_group_id: 'csg_mnjg81nrtfgsphp4',
              compliance_definition_name: 'rei_pia_2024',
              _count: {
                compliance_questions: 11,
              },
            },
            {
              id: 'cs_pj88et1zsce8ubf1',
              key: 'CRP',
              title: 'Core Practices',
              metadata: null,
              order: 22,
              compliance_section_group_id: 'csg_mnjg81nrtfgsphp4',
              compliance_definition_name: 'rei_pia_2024',
              _count: {
                compliance_questions: 6,
              },
            },
          ],
        },
        {
          sectionGroupId: 'csg_xcv2gzlmrrucrzr5',
          sections: [
            {
              id: 'cs_s6j2ed6vzawao8pd',
              key: 'GHG',
              title: 'GHG Emissions & Climate',
              metadata: null,
              order: 3,
              compliance_section_group_id: 'csg_xcv2gzlmrrucrzr5',
              compliance_definition_name: 'rei_pia_2024',
              _count: {
                compliance_questions: 20,
              },
            },
          ],
        },
        {
          sectionGroupId: 'csg_gnawsv7bv67xumws',
          sections: [
            {
              id: 'cs_hy7ogimm4bfnzvy9',
              key: 'PRD',
              title: 'Product Care, Repair, Reuse & End-of-life',
              metadata: null,
              order: 21,
              compliance_section_group_id: 'csg_gnawsv7bv67xumws',
              compliance_definition_name: 'rei_pia_2024',
              _count: {
                compliance_questions: 7,
              },
            },
            {
              id: 'cs_iwm8sg46j8thawb3',
              key: 'PSA',
              title: 'Product Sustainability & Preferred Attributes',
              metadata: null,
              order: 18,
              compliance_section_group_id: 'csg_gnawsv7bv67xumws',
              compliance_definition_name: 'rei_pia_2024',
              _count: {
                compliance_questions: 3,
              },
            },
            {
              id: 'cs_uooqzhc9ibc5uaaw',
              key: 'APK',
              title: 'Packaging - Apparel',
              metadata: null,
              order: 20,
              compliance_section_group_id: 'csg_gnawsv7bv67xumws',
              compliance_definition_name: 'rei_pia_2024',
              _count: {
                compliance_questions: 6,
              },
            },
            {
              id: 'cs_zjxjwkrlqbkkl7e6',
              key: 'PKG',
              title: 'Packaging - General',
              metadata: null,
              order: 19,
              compliance_section_group_id: 'csg_gnawsv7bv67xumws',
              compliance_definition_name: 'rei_pia_2024',
              _count: {
                compliance_questions: 4,
              },
            },
          ],
        },
      ],
    },
  ];
  // find mock data by compliance_definition_name and compliance_section_group_id
  const complianceData = find(mockData, item => item.name === name);
  if (!complianceData) return [];
  const sectionGroupData = find(complianceData.section_groups, group => group.sectionGroupId === sectionGroupId);
  if (!sectionGroupData) return [];
  return sectionGroupData.sections;
};

export const getQuestionList = (args: any) => {
  const name = get(args, 'name', '');
  const sectionGroupId = get(args, 'sectionGroupId', '');
  const sectionId = get(args, 'sectionId', '');
  const mockData = [
    {
      name: 'rei_pia_2024',
      section_groups: [
        {
          sectionGroupId: 'csg_ual97c2pos346hkf',
          sections: [
            {
              id: 'cs_cr9ud1djx1h7xrem',
              key: 'WL',
              title: 'Wool',
              questions: [],
            },
            {
              id: 'cs_fkhppv9zp5yk4qg0',
              key: 'FR',
              title: 'Flame Retardant (FR) Chemicals',
              questions: [],
            },
            {
              id: 'cs_kvyvslvd8k9b6u9l',
              key: 'CHEM',
              title: 'Restricted Substances List & Chemicals Management',
              questions: [],
            },
            {
              id: 'cs_uzcancxkpelymuv9',
              key: 'DWN',
              title: 'Down',
              questions: [],
            },
            {
              id: 'cs_v4qmnk2ubja9ko3x',
              key: 'AFL',
              title: 'Animal Fur & Exotic Leather',
              questions: [],
            },
            {
              id: 'cs_w3a3maz46vkbwto0',
              key: 'BPA',
              title: 'Bisphenol A',
              questions: [],
            },
            {
              id: 'cs_w3yijeqzqzh5z4lw',
              key: 'SUN',
              title: 'Sunscreen Ingredients',
              questions: [],
            },
            {
              id: 'cs_xpfz8pcnz5l3q7hn',
              key: 'PFAS',
              title: 'Per- and Polyfluoroalkyl Substances',
              questions: [],
            },
          ],
        },
        {
          sectionGroupId: 'csg_u52xp76tclba5djc',
          sections: [
            {
              id: 'cs_g5prbr04liwq2iy6',
              key: 'INC',
              title: 'Diversity & Inclusion: General',
              questions: [],
            },
            {
              id: 'cs_m85htg8kkj8psfbc',
              key: 'MKT',
              title: 'Diversity & Inclusion: Marketing Diversity',
              questions: [],
            },
            {
              id: 'cs_mlwf1rptdl1nf0f5',
              key: 'APP',
              title: 'Diversity & Inclusion: Cultural Appropriation',
              questions: [],
            },
            {
              id: 'cs_oqro7y64jpwjauar',
              key: 'COL',
              title: 'Diversity & Inclusion: Inclusive Colorways',
              questions: [],
            },
            {
              id: 'cs_pjmqyrrfzbtqvbi7',
              key: 'COP',
              title: 'Diversity & Inclusion: Inclusive Copy',
              questions: [],
            },
            {
              id: 'cs_r8wflfvf7o7tfm2q',
              key: 'ISS',
              title: 'Diversity & Inclusion: Inclusive Sizing',
              questions: [],
            },
            {
              id: 'cs_v7aqyq1r17ndfh2i',
              key: 'DHT',
              title: 'Diversity & Inclusion: Diverse Hair Type Inclusion',
              questions: [],
            },
          ],
        },
        {
          sectionGroupId: 'csg_mnjg81nrtfgsphp4',
          sections: [
            {
              id: 'cs_a6ggbg5yueu9h3x9',
              key: 'MFG',
              title: 'Manufacturing Code of Conduct & Responsible Sourcing',
              questions: [],
            },
            {
              id: 'cs_pfcuqh8485r84svr',
              key: 'GEN',
              title: 'Brand Information',
              questions: [],
            },
            {
              id: 'cs_pj88et1zsce8ubf1',
              key: 'CRP',
              title: 'Core Practices',
              questions: [],
            },
          ],
        },
        {
          sectionGroupId: 'csg_xcv2gzlmrrucrzr5',
          sections: [
            {
              id: 'cs_s6j2ed6vzawao8pd',
              key: 'GHG',
              title: 'GHG Emissions & Climate',
              questions: [],
            },
          ],
        },
        {
          sectionGroupId: 'csg_gnawsv7bv67xumws',
          sections: [
            {
              id: 'cs_hy7ogimm4bfnzvy9',
              key: 'PRD',
              title: 'Product Care, Repair, Reuse & End-of-life',
              questions: [],
            },
            {
              id: 'cs_iwm8sg46j8thawb3',
              key: 'PSA',
              title: 'Product Sustainability & Preferred Attributes',
              questions: [],
            },
            {
              id: 'cs_uooqzhc9ibc5uaaw',
              key: 'APK',
              title: 'Packaging - Apparel',
              questions: [],
            },
            {
              id: 'cs_zjxjwkrlqbkkl7e6',
              key: 'PKG',
              title: 'Packaging - General',
              questions: [],
            },
          ],
        },
      ],
    },
  ];

  // get the questions by compliance_definition_name, compliance_section_group_id, and section_id
  const complianceData = find(mockData, item => item.name === name);
  if (!complianceData) return [];
  const sectionGroupData = find(complianceData.section_groups, group => group.sectionGroupId === sectionGroupId);
  if (!sectionGroupData) return [];
  const sectionData = find(sectionGroupData.sections, section => section.id === sectionId);
  if (!sectionData) return [];
  return sectionData.questions;
};
