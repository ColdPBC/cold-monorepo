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
          headerTitle: 'Name',
        },
        {
          size: 'w-80',
          field: 'name',
          cellStyle: '',
          headerStyle: '',
          headerTitle: 'Email',
        },
        {
          size: 'w-32',
          field: 'role',
          cellStyle: '',
          headerStyle: '',
          headerTitle: 'Role',
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
    "id": "org_g2zzR5rwTKVAIwCn",
    "name": "cold-climate-staging",
    "enabled_connections": [
        {
            "connection_id": "con_7DptYmJNrY0PYCrx",
            "assign_membership_on_login": false
        },
        {
            "connection_id": "con_kYFtdnBxyBdYzTtK",
            "assign_membership_on_login": false
        }
    ],
    "display_name": "Cold Climate",
    "branding": {
        "colors": {
            "primary": "#2892D7",
            "page_background": "#0A1C2B"
        },
        "logo_url": "https://cold-public-assets.s3.us-east-2.amazonaws.com/cold-climate-logo/black/Asset+2.svg"
    },
    "phone": null,
    "email": null,
    "street_address": null,
    "city": null,
    "state": null,
    "zip": null,
    "created_at": "2023-08-10T21:48:11.103Z",
    "updated_at": "2023-08-10T21:48:11.106Z",
    "members": [
        {
            "user_id": "auth0|651606e007e123aeb1b31a2c",
            "email": "api_user@coldclimate.com",
            "picture": "https://s.gravatar.com/avatar/c1b6f0448eeb35bc3babdd980c25f11e?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fap.png",
            "name": "api_user@coldclimate.com",
            "created_at": "2023-09-28T23:06:08.594Z",
            "email_verified": false,
            "identities": [
                {
                    "user_id": "651606e007e123aeb1b31a2c",
                    "provider": "auth0",
                    "connection": "cold-db",
                    "isSocial": false
                }
            ],
            "nickname": "api_user",
            "updated_at": "2023-10-12T10:23:10.690Z",
            "family_name": "Do Not Delete",
            "given_name": "API User",
            "last_ip": "107.21.25.247",
            "last_login": "2023-10-12T10:23:10.689Z",
            "logins_count": 675,
            "image": "https://s.gravatar.com/avatar/c1b6f0448eeb35bc3babdd980c25f11e?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fap.png"
        },
        {
            "user_id": "google-oauth2|107302069782487024936",
            "email": "troy.morvant@coldclimate.com",
            "picture": "https://lh3.googleusercontent.com/a/ACg8ocLmTs5NkxhkAK8JjCXpHpCO1NSVbE86tZyBZwABFX2d8w=s96-c",
            "name": "Troy Morvant",
            "created_at": "2023-04-06T00:56:27.630Z",
            "email_verified": true,
            "family_name": "Morvant",
            "given_name": "Troy",
            "identities": [
                {
                    "provider": "google-oauth2",
                    "access_token": "ya29.a0AfB_byAFO6o9zW5M8yxU6O_h_1tw5ySLtmmG5DOM-v1df9P77wCzi0xQoysiOk3lLRw2-FGmV6VwT3Fjw4yDx525LVJdFjMkvcmhvz2ZzjF4x_JoLdZFJCt87vQoyrpbizdn4lIl2lrohD3a4q8mqla6DGtHNf87bpIyaCgYKAXESARESFQGOcNnCkBaqgl1IIHw5LBIfF4f3vg0171",
                    "expires_in": 3599,
                    "user_id": "107302069782487024936",
                    "connection": "google-oauth2",
                    "isSocial": true
                }
            ],
            "locale": "en",
            "nickname": "troy.morvant",
            "updated_at": "2023-10-10T18:28:22.312Z",
            "user_metadata": {
                "test": "Snoogins"
            },
            "last_ip": "73.94.32.122",
            "last_login": "2023-10-10T18:28:22.312Z",
            "logins_count": 78,
            "image": "https://lh3.googleusercontent.com/a/ACg8ocLmTs5NkxhkAK8JjCXpHpCO1NSVbE86tZyBZwABFX2d8w=s96-c"
        },
        {
            "user_id": "google-oauth2|108739432357141314838",
            "email": "dan.lindquist@coldclimate.com",
            "picture": "https://lh3.googleusercontent.com/a/ACg8ocIddSYR1oPP9L7juhb8uULln8tDoubwFNE75NFPzLPA=s96-c",
            "name": "Dan Lindquist",
            "created_at": "2023-07-18T18:36:53.257Z",
            "email_verified": true,
            "family_name": "Lindquist",
            "given_name": "Dan",
            "identities": [
                {
                    "provider": "google-oauth2",
                    "access_token": "ya29.a0AfB_byBCtwIwazAEbpx4Tp4wU6cjUrQxYdZOfx69BIDWhVrGZePYG43-7nPLR5edqHzlX390J0PM4K4uo_tIeds6MVC7czqUkrhEryJSa0mzcpIszHPB43B0skMzaiN1n8CwUrtnFkL0gAg1BI-O6HM7l-WmjyK75P4aCgYKARgSARISFQGOcNnCFI_FZC0T51aKHkCgrCN1ew0170",
                    "expires_in": 3599,
                    "user_id": "108739432357141314838",
                    "connection": "google-oauth2",
                    "isSocial": true
                }
            ],
            "locale": "en",
            "nickname": "dan.lindquist",
            "updated_at": "2023-10-10T16:35:30.423Z",
            "last_ip": "152.117.79.48",
            "last_login": "2023-10-10T16:35:30.423Z",
            "logins_count": 52,
            "image": "https://lh3.googleusercontent.com/a/ACg8ocIddSYR1oPP9L7juhb8uULln8tDoubwFNE75NFPzLPA=s96-c"
        },
        {
            "user_id": "auth0|6514751f07e123aeb1b1a3cc",
            "email": "brec.hanson@coldclimate.com",
            "picture": "https://s.gravatar.com/avatar/300427074c84e83fd4eb4afc64dd7751?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fbr.png",
            "name": "brec.hanson@coldclimate.com",
            "created_at": "2023-09-27T18:31:59.569Z",
            "email_verified": true,
            "identities": [
                {
                    "connection": "cold-db",
                    "provider": "auth0",
                    "user_id": "6514751f07e123aeb1b1a3cc",
                    "isSocial": false
                }
            ],
            "nickname": "brec.hanson",
            "updated_at": "2023-10-02T20:16:25.683Z",
            "family_name": "Hanson",
            "given_name": "Brecker",
            "last_ip": "45.152.180.164",
            "last_login": "2023-10-02T20:16:25.683Z",
            "logins_count": 6,
            "image": "https://s.gravatar.com/avatar/300427074c84e83fd4eb4afc64dd7751?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fbr.png"
        },
        {
            "user_id": "google-oauth2|112288932075209720794",
            "email": "qaalib.farah@coldclimate.com",
            "picture": "https://lh3.googleusercontent.com/a/ACg8ocI3Radr_TbXCuwTxpBe3jQpnQlTqrR1KuWXGqBMnE5Q=s96-c",
            "name": "Qaalib Farah",
            "created_at": "2023-05-17T21:48:56.015Z",
            "email_verified": true,
            "family_name": "Farah",
            "given_name": "Qaalib",
            "identities": [
                {
                    "provider": "google-oauth2",
                    "access_token": "ya29.a0AfB_byBqUGo--Tj2X3GO_3gYvPp0nKMisCzlidObbc3lKW20vnG8K7RR0EoizoIGPHNcFIPl_7IJj_Xgygbs4VigVe_uBe2nmDBNarLtdRjxuvHACX5zh3EFDOhQBXQRBeJ9MgNsXYHfvrKvePfGLfwk0ZYNBH2BMpUaCgYKAZISARISFQGOcNnCzenZUiaWYa36trJB2KZZnQ0170",
                    "expires_in": 3599,
                    "user_id": "112288932075209720794",
                    "connection": "google-oauth2",
                    "isSocial": true
                }
            ],
            "locale": "en",
            "nickname": "qaalib.farah",
            "updated_at": "2023-10-06T18:14:26.730Z",
            "last_ip": "4.14.214.114",
            "last_login": "2023-10-06T18:14:26.729Z",
            "logins_count": 165,
            "image": "https://lh3.googleusercontent.com/a/ACg8ocI3Radr_TbXCuwTxpBe3jQpnQlTqrR1KuWXGqBMnE5Q=s96-c"
        },
        {
            "id": "uinv_V5SV760FrMXddJ8G",
            "client_id": "i8rCPXsLq9b2YKOOWUTfvgUj0iYD7dE3",
            "inviter": {
                "name": "Dan Lindquist"
            },
            "invitee": {
                "email": "troy.morvant+del1@coldclimate.com"
            },
            "invitation_url": "https://app.coldclimate.online/?invitation=lig95dCuFCo9pe2SpVhYGPI7FWon0nJo&organization=org_g2zzR5rwTKVAIwCn&organization_name=cold-climate-staging",
            "ticket_id": "lig95dCuFCo9pe2SpVhYGPI7FWon0nJo",
            "created_at": "2023-10-04T20:13:54.847Z",
            "expires_at": "2023-10-11T20:13:54.847Z",
            "organization_id": "org_g2zzR5rwTKVAIwCn",
            "roles": [
                "company:member"
            ],
            "email": "troy.morvant+del1@coldclimate.com",
            "invited_at": "2023-10-04T20:13:54.847Z"
        },
        {
            "id": "uinv_2HiXxoGZPXmp3cLf",
            "client_id": "i8rCPXsLq9b2YKOOWUTfvgUj0iYD7dE3",
            "inviter": {
                "name": "Dan Lindquist"
            },
            "invitee": {
                "email": "deleteme5@example.com"
            },
            "invitation_url": "https://app.coldclimate.online/?invitation=BKqxPYkIc22ZLyPamXG3eHexeBpbHV1I&organization=org_g2zzR5rwTKVAIwCn&organization_name=cold-climate-staging",
            "ticket_id": "BKqxPYkIc22ZLyPamXG3eHexeBpbHV1I",
            "created_at": "2023-09-30T02:51:56.176Z",
            "expires_at": "2023-09-30T03:06:56.176Z",
            "organization_id": "org_g2zzR5rwTKVAIwCn",
            "roles": [
                "company:member"
            ],
            "email": "deleteme5@example.com",
            "invited_at": "2023-09-30T02:51:56.176Z"
        },
        {
            "id": "uinv_N1umW6KSmKkOXwKc",
            "client_id": "i8rCPXsLq9b2YKOOWUTfvgUj0iYD7dE3",
            "inviter": {
                "name": "Dan Lindquist"
            },
            "invitee": {
                "email": "deleteme2@example.com"
            },
            "invitation_url": "https://app.coldclimate.online/?invitation=4i0WMfbAVVtDwvt4elwl1AkXQU7zHoSi&organization=org_g2zzR5rwTKVAIwCn&organization_name=cold-climate-staging",
            "ticket_id": "4i0WMfbAVVtDwvt4elwl1AkXQU7zHoSi",
            "created_at": "2023-09-30T02:39:54.297Z",
            "expires_at": "2023-09-30T02:54:54.297Z",
            "organization_id": "org_g2zzR5rwTKVAIwCn",
            "roles": [
                "company:member"
            ],
            "email": "deleteme2@example.com",
            "invited_at": "2023-09-30T02:39:54.297Z"
        },
        {
            "id": "uinv_UgcWJjiajlOCUVfm",
            "client_id": "i8rCPXsLq9b2YKOOWUTfvgUj0iYD7dE3",
            "inviter": {
                "name": "Dan Lindquist"
            },
            "invitee": {
                "email": "deleteme@example.com"
            },
            "invitation_url": "https://app.coldclimate.online/?invitation=wUGFEopc4he4qhzXLjPdWZmvyNK8VLfM&organization=org_g2zzR5rwTKVAIwCn&organization_name=cold-climate-staging",
            "ticket_id": "wUGFEopc4he4qhzXLjPdWZmvyNK8VLfM",
            "created_at": "2023-09-29T19:47:14.174Z",
            "expires_at": "2023-09-29T20:02:14.174Z",
            "organization_id": "org_g2zzR5rwTKVAIwCn",
            "roles": [
                "company:member"
            ],
            "email": "deleteme@example.com",
            "invited_at": "2023-09-29T19:47:14.174Z"
        },
        {
            "id": "uinv_IXOW0QUITjbiB3vE",
            "client_id": "i8rCPXsLq9b2YKOOWUTfvgUj0iYD7dE3",
            "inviter": {
                "name": "Dan Lindquist"
            },
            "invitee": {
                "email": "troy.morvant+TEST_OWNER@coldclimate.com"
            },
            "invitation_url": "https://app.coldclimate.online/?invitation=ciNyeA8odLy9sZcGvj1gaB0LEN6pyFLd&organization=org_g2zzR5rwTKVAIwCn&organization_name=cold-climate-staging",
            "ticket_id": "ciNyeA8odLy9sZcGvj1gaB0LEN6pyFLd",
            "created_at": "2023-09-28T17:47:20.089Z",
            "expires_at": "2023-09-28T18:02:20.089Z",
            "organization_id": "org_g2zzR5rwTKVAIwCn",
            "roles": [
                "company:owner"
            ],
            "email": "troy.morvant+TEST_OWNER@coldclimate.com",
            "invited_at": "2023-09-28T17:47:20.089Z"
        },
        {
            "id": "uinv_2VJTToz9yjQ6tCEI",
            "client_id": "i8rCPXsLq9b2YKOOWUTfvgUj0iYD7dE3",
            "inviter": {
                "name": "Dan Lindquist"
            },
            "invitee": {
                "email": "5wg-n3i-siz.1816694361943483633@synthetics-us5.dtdg.co"
            },
            "invitation_url": "https://app.coldclimate.online/?invitation=NzqGgpWOgaerYmMouRV16P6n5erBHG6P&organization=org_g2zzR5rwTKVAIwCn&organization_name=cold-climate-staging",
            "ticket_id": "NzqGgpWOgaerYmMouRV16P6n5erBHG6P",
            "created_at": "2023-09-28T15:05:59.589Z",
            "expires_at": "2023-09-28T15:20:59.589Z",
            "organization_id": "org_g2zzR5rwTKVAIwCn",
            "roles": [
                "company:owner"
            ],
            "email": "5wg-n3i-siz.1816694361943483633@synthetics-us5.dtdg.co",
            "invited_at": "2023-09-28T15:05:59.589Z"
        },
        {
            "id": "uinv_1A6bq3Q1F9sBJA7C",
            "client_id": "i8rCPXsLq9b2YKOOWUTfvgUj0iYD7dE3",
            "inviter": {
                "name": "Dan Lindquist"
            },
            "invitee": {
                "email": "5wg-n3i-siz.1399752846043329134@synthetics-us5.dtdg.co"
            },
            "invitation_url": "https://app.coldclimate.online/?invitation=6ETIDWlw73K36YRsco2mavo8r3YjKG58&organization=org_g2zzR5rwTKVAIwCn&organization_name=cold-climate-staging",
            "ticket_id": "6ETIDWlw73K36YRsco2mavo8r3YjKG58",
            "created_at": "2023-09-28T15:05:56.132Z",
            "expires_at": "2023-09-28T15:20:56.132Z",
            "organization_id": "org_g2zzR5rwTKVAIwCn",
            "roles": [
                "company:owner"
            ],
            "email": "5wg-n3i-siz.1399752846043329134@synthetics-us5.dtdg.co",
            "invited_at": "2023-09-28T15:05:56.132Z"
        },
        {
            "id": "uinv_qt3IUbHvZmoy3xO5",
            "client_id": "i8rCPXsLq9b2YKOOWUTfvgUj0iYD7dE3",
            "inviter": {
                "name": "Dan Lindquist"
            },
            "invitee": {
                "email": "5wg-n3i-siz.2396107489964832779@synthetics-us5.dtdg.co"
            },
            "invitation_url": "https://app.coldclimate.online/?invitation=kFT15GxHhVDT6D500xpH68cAZbxNkYpR&organization=org_g2zzR5rwTKVAIwCn&organization_name=cold-climate-staging",
            "ticket_id": "kFT15GxHhVDT6D500xpH68cAZbxNkYpR",
            "created_at": "2023-09-28T15:05:55.666Z",
            "expires_at": "2023-09-28T15:20:55.666Z",
            "organization_id": "org_g2zzR5rwTKVAIwCn",
            "roles": [
                "company:owner"
            ],
            "email": "5wg-n3i-siz.2396107489964832779@synthetics-us5.dtdg.co",
            "invited_at": "2023-09-28T15:05:55.666Z"
        },
        {
            "id": "uinv_FfEYJMZ3TXS5aTJ6",
            "client_id": "i8rCPXsLq9b2YKOOWUTfvgUj0iYD7dE3",
            "inviter": {
                "name": "Dan Lindquist"
            },
            "invitee": {
                "email": "troy.morvant+api_test@coldclimate.com"
            },
            "invitation_url": "https://app.coldclimate.online/?invitation=YUEPkQPn8uBxPF9ghcCFxdA90N65OlhT&organization=org_g2zzR5rwTKVAIwCn&organization_name=cold-climate-staging",
            "ticket_id": "YUEPkQPn8uBxPF9ghcCFxdA90N65OlhT",
            "created_at": "2023-09-28T14:31:34.809Z",
            "expires_at": "2023-09-28T14:46:34.809Z",
            "organization_id": "org_g2zzR5rwTKVAIwCn",
            "roles": [
                "company:admin"
            ],
            "email": "troy.morvant+api_test@coldclimate.com",
            "invited_at": "2023-09-28T14:31:34.809Z"
        }
    ]
  };
};
