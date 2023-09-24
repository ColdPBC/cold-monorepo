import { companies } from './companies';

export const getTeamMemberDataGridMock = () => {
  return {
    id: '5cb72cf3-b782-4b55-8117-bbb7c47fa91d',
    name: 'team_member_table',
    description: 'Provides a table for managing team members',
    created_at: '2023-05-31T22:40:25.408Z',
    updated_at: '2023-05-31T22:40:25.426Z',
    definition: {
      items: [
        {
          size: 'w-80',
          field: 'name',
          cellStyle: '',
          headerStyle: '',
          headerTitle: 'NAME',
        },
        {
          size: 'w-32',
          field: 'role',
          cellStyle: '',
          headerStyle: '',
          headerTitle: 'ROLE',
        },
        {
          size: 'w-32',
          field: 'status',
          cellStyle: '',
          headerStyle: '',
          headerTitle: 'STATUS',
        },
        {
          size: 'w-8',
          field: 'actions',
          cellStyle: '',
          hideTitle: 'true',
          headerStyle: '',
          headerTitle: 'Table Actions',
        },
      ],
    },
  };
};

export const getDefaultFormDefinitionGridMock = () => {
  return {
    id: '5cb72cf3-b782-4b55-8117-bbb7c47fa91d',
    name: 'team_member_table',
    description: 'Provides a table for managing team members',
    created_at: '2023-05-31T22:40:25.408Z',
    updated_at: '2023-05-31T22:40:25.426Z',
    definition: {
      items: [
        {
          size: 'w-8',
          field: 'image',
          cellStyle: '',
          hideTitle: 'true',
          headerStyle: 'py-4',
          headerTitle: 'Profile Image',
        },
        {
          field: 'name',
          cellStyle: 'h-16 bg-cold-starkWhite',
          headerStyle: 'py-4',
          headerTitle: 'NAME',
        },
        {
          field: 'role',
          cellStyle: 'h-16 bg-cold-starkWhite',
          headerStyle: 'py-4',
          headerTitle: 'ROLE',
        },
        {
          field: 'status',
          cellStyle: 'h-16 bg-cold-starkWhite',
          headerStyle: 'py-4',
          headerTitle: 'STATUS',
        },
        {
          size: 'w-8',
          field: 'actions',
          cellStyle: 'justify-end grid content-center h-16 bg-cold-starkWhite',
          hideTitle: 'true',
          headerStyle: 'py-4',
          headerTitle: 'Table Actions',
        },
      ],
    },
  };
};

export const getDefaultFormDataGridMock = () => {
  return [
    {
      id: '4ccdaf7f-75cb-41c1-9c4c-5527dd2bc1c8',
      company_id: '1',
      password: '',
      nickname: 'qaalib.farah',
      family_name: 'Farah',
      given_name: 'Qaalib',
      name: 'Qaalib Farah',
      email: 'qaalib.farah@coldclimate.com',
      image:
        'https://lh3.googleusercontent.com/a/AGNmyxYMDJlIP6aEaIUVqeVy3O2H5_8O-bLZPluVYoTq=s96-c',
      role: 'company:admin',
      status: 'invited',
      created_at: '2021-07-20T09:00:00.000Z',
      invited_at: '2021-07-20T09:00:00.000Z',
    },
    {
      id: '4ccdaf7f-75cb-41c1-9c4c-5527dd2bc1c8',
      company_id: '1',
      password: '',
      nickname: 'sergio.aguero',
      family_name: 'Aguero',
      given_name: 'Sergio',
      name: 'Sergio Aguero',
      email: 'sergio.aguero@coldclimate.com',
      image:
        'https://img.a.transfermarkt.technology/portrait/big/26399-1580460866.jpg',
      role: 'company:admin',
      status: 'active',
      created_at: '2021-07-20T09:00:00.000Z',
    },
    {
      id: '4ccdaf7f-75cb-41c1-9c4c-5527dd2bc1c8',
      company_id: '1',
      password: '',
      nickname: 'erling.haaland',
      family_name: 'Erling',
      given_name: 'Haaland',
      name: 'Erling Haaland',
      email: 'erling.haaland@coldclimate.com',
      image:
        'https://img.uefa.com/imgml/TP/players/1/2023/324x324/250103758.jpg',
      role: 'company:owner',
      status: 'active',
      created_at: '2021-07-20T09:00:00.000Z',
    },
  ];
};

export const getDataGridUsersMock = () => {
  return [
    {
      id: '4ccdaf7f-75cb-41c1-9c4c-5527dd2bc1c8',
      company_id: '1',
      users: {
        password: '',
        nickname: 'qaalib.farah',
        family_name: 'Farah',
        given_name: 'Qaalib',
        name: 'Qaalib Farah',
        email: 'qaalib.farah@coldclimate.com',
        role: 'company:admin',
        status: 'invited',
        created_at: '2021-07-20T09:00:00.000Z',
        invited_at: '2021-07-20T09:00:00.000Z',
      },
    },
    {
      id: '4ccdaf7f-75cb-41c1-9c4c-5527dd2bc1c8',
      company_id: '1',
      users: {
        password: '',
        nickname: 'sergio.aguero',
        family_name: 'Aguero',
        given_name: 'Sergio',
        name: 'Sergio Aguero',
        email: 'sergio.aguero@coldclimate.com',
        picture:
          'https://img.a.transfermarkt.technology/portrait/big/26399-1580460866.jpg',
        role: 'company:admin',
        status: 'active',
        created_at: '2021-07-20T09:00:00.000Z',
      },
    },
    {
      id: '4ccdaf7f-75cb-41c1-9c4c-5527dd2bc1c8',
      company_id: '1',
      users: {
        password: '',
        nickname: 'erling.haaland',
        family_name: 'Haaland',
        given_name: 'Erling',
        name: 'Erling Haaland',
        email: 'erling.haaland@coldclimate.com',
        picture:
          'https://img.uefa.com/imgml/TP/players/1/2023/324x324/250103758.jpg',
        role: 'company:owner',
        status: 'active',
        created_at: '2021-07-20T09:00:00.000Z',
      },
    },
  ];
};

export const getDataGridCompaniesMock = (id: string) => {
  return companies.filter((company: { id: string }) => company.id === id)[0];
};

export const getOrganizationMembersMock = () => {
  return {
    id: 'fdf957d1-8ea4-4d2b-a4d0-4534490e77ae',
    name: 'Cold Climate PBC',
    email: 'info@coldclimate.com',
    logo: null,
    phone: null,
    address: null,
    city: null,
    state: null,
    zip: null,
    country: null,
    org_id: 'org_123',
    created_at: '2023-05-21T20:14:11.458Z',
    updated_at: '2023-05-21T20:14:11.471Z',
    members: [
      {
        id: '4ccdaf7f-75cb-41c1-9c4c-5527dd2bc1c8',
        password: '',
        nickname: 'qaalib.farah',
        family_name: 'Farah',
        given_name: 'Qaalib',
        name: 'Qaalib Farah',
        email: 'qaalib.farah@coldclimate.com',
        picture: 'null',
        roles: 'company:admin',
        status: 'invited',
        created_at: '2021-07-20T09:00:00.000Z',
        invited_at: '2021-07-20T09:00:00.000Z',
        identities: ['google-oauth2|1'],
      },
      {
        id: '4ccdaf7f-75cb-41c1-9c4c-5527dd2bc1c8',
        password: '',
        nickname: 'sergio.aguero',
        family_name: 'Aguero',
        given_name: 'Sergio',
        name: 'Sergio Aguero',
        email: 'sergio.aguero@coldclimate.com',
        picture:
          'https://img.a.transfermarkt.technology/portrait/big/26399-1580460866.jpg',
        roles: 'company:admin',
        status: 'active',
        created_at: '2021-07-20T09:00:00.000Z',
        identities: ['google-oauth2|2'],
      },
      {
        id: '4ccdaf7f-75cb-41c1-9c4c-5527dd2bc1c8',
        company_id: '1',
        password: '',
        nickname: 'erling.haaland',
        family_name: 'Erling',
        given_name: 'Haaland',
        name: 'Erling Haaland',
        email: 'erling.haaland@coldclimate.com',
        picture:
          'https://img.uefa.com/imgml/TP/players/1/2023/324x324/250103758.jpg',
        roles: 'company:owner',
        status: 'active',
        created_at: '2021-07-20T09:00:00.000Z',
        identities: ['google-oauth2|3'],
      },
      {
        id: 'uinv_xAqnlWnI5r4SG3NK',
        client_id: '55HO8UG23lJxnvGctLdYs8wJycRSRWpG',
        inviter: {
          name: 'Snoochie Boochies',
        },
        invitee: {
          email: 'troy.morvant+7-one-to-one-y@gmail.com',
        },
        invitation_url:
          'https://app.coldclimate.online/login?invitation=JJRJ7q8ZByizPBIcgGes5NKQgq5Klvew&organization=org_g2zzR5rwTKVAIwCn&organization_name=cold-climate-staging',
        ticket_id: 'JJRJ7q8ZByizPBIcgGes5NKQgq5Klvew',
        created_at: '2023-07-12T22:44:52.532Z',
        expires_at: '2023-07-12T22:59:52.532Z',
        organization_id: 'org_g2zzR5rwTKVAIwCn',
        roles: ['rol_nmCofc57y1SN3W7g'],
        status: 'invited',
        email: 'troy.morvant+7-one-to-one-y@gmail.com',
        invited_at: '2023-07-12T22:44:52.532Z',
      },
      {
        id: 'd0940f13-a487-4e96-ade2-17162a68a8bc',
        company_id: null,
        password: '',
        nickname: 'troy.morvant',
        family_name: 'Morvant',
        given_name: 'Troy',
        name: 'Troy Morvant',
        email: 'troy.morvant@coldclimate.com',
        email_verified: null,
        status: 'active',
        phone_number: 'null',
        phone_verified: null,
        picture:
          'https://lh3.googleusercontent.com/a/AAcHTteoPtKUlPcawHAQhkINbB0ut1YoJubKYREVEqUQ=s96-c',
        last_login: '2023-05-31T20:02:04.000Z',
        last_ip: '4.14.214.114',
        last_password_reset: null,
        roles: 'cold:admin',
        org_name: 'null',
        org_display_name: 'null',
        org_id: 'null',
        org_metadata: null,
        permissions: null,
        app_metadata: null,
        identities: ['google-oauth2|107302069782487024936'],
        multifactor: [],
        multifactor_updated: null,
        tenant: 'cold-climate-staging',
        blocked: false,
        blocked_for: null,
        guardian_authenticators: null,
        created_at: '2023-05-31T20:02:04.000Z',
        updated_at: '2023-05-18T19:17:59.568Z',
      },
    ],
  };
};
