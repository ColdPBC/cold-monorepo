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
  return [
    {
        "user_id": "auth0|651473cc8848c6e7bff7c93d",
        "email": "dan.lindquist+8-27_1@coldclimate.com",
        "picture": "https://s.gravatar.com/avatar/7d46eb6f870fdb314859d8dc4ce00783?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fda.png",
        "name": "dan.lindquist+8-27_1@coldclimate.com",
        "created_at": "2023-09-27T18:26:20.803Z",
        "email_verified": true,
        "identities": [
            {
                "connection": "cold-db",
                "provider": "auth0",
                "user_id": "651473cc8848c6e7bff7c93d",
                "isSocial": false
            }
        ],
        "nickname": "dan.lindquist+8-27_1",
        "updated_at": "2023-09-27T19:18:51.055Z",
        "family_name": "LindquistTest",
        "given_name": "DanTest",
        "last_ip": "152.117.79.48",
        "last_login": "2023-09-27T19:18:33.480Z",
        "logins_count": 2,
        "image": "https://s.gravatar.com/avatar/7d46eb6f870fdb314859d8dc4ce00783?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fda.png",
        "role": "company:admin"
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
                "access_token": "ya29.a0AfB_byDnu6fm1P64h0GzxTNf6jL4UPUZ6nT41eWWbJOnH8pbDtju4ziG_kJrrTfqITxDv6Xy3ot749XiK1ldKqyOZUn4NXygSp7SD2JADwhSy5_L6Ukihfl9lIGE-NGmjKsYptc2jZycpsLoLgN2P1GwiIp3vPfCH3IaCgYKAfgSARISFQGOcNnCa-2FvAEdyWrwTbV8BoyeQg0170",
                "expires_in": 3599,
                "user_id": "112288932075209720794",
                "connection": "google-oauth2",
                "isSocial": true
            }
        ],
        "locale": "en",
        "nickname": "qaalib.farah",
        "updated_at": "2023-09-27T19:11:28.072Z",
        "last_ip": "144.86.169.76",
        "last_login": "2023-09-27T19:11:28.071Z",
        "logins_count": 155,
        "image": "https://lh3.googleusercontent.com/a/ACg8ocI3Radr_TbXCuwTxpBe3jQpnQlTqrR1KuWXGqBMnE5Q=s96-c",
        "role": "cold:admin"
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
        "updated_at": "2023-09-27T18:57:50.161Z",
        "family_name": "Hanson",
        "given_name": "Brec",
        "last_ip": "45.152.180.164",
        "last_login": "2023-09-27T18:57:01.132Z",
        "logins_count": 2,
        "image": "https://s.gravatar.com/avatar/300427074c84e83fd4eb4afc64dd7751?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fbr.png",
        "role": "company:admin"
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
                "access_token": "ya29.a0AfB_byBAOSpSTTXgGfr5HG1CNdfMenAiuGV8zzaFHjTtMHMAtyTPn9JWSaTNi0nh1K7hMYQ2FzvRn418AbX00jOMsCOEiruQPs7hhKWZkoLKC_TxkVB1Gogwg9O_uuDw5LAl3yUdQIPxdsVm_SpIBMeGJbAQ_eOmD9v8aCgYKASQSARMSFQGOcNnC6Os2fkC9bnhCHRwkOkm7YA0171",
                "refresh_token": "1//06siB823B-G3YCgYIARAAGAYSNwF-L9Irwj_wdHji9wZiTyYfMHqWFqEpougrS3SyqS8B3RHlNgfAgBwhVpEQ4zDv0bkq1ZGbFgk",
                "expires_in": 3599,
                "user_id": "108739432357141314838",
                "connection": "google-oauth2",
                "isSocial": true
            }
        ],
        "locale": "en",
        "nickname": "dan.lindquist",
        "updated_at": "2023-09-27T15:21:49.474Z",
        "last_ip": "152.117.79.48",
        "last_login": "2023-09-27T15:21:49.474Z",
        "logins_count": 43,
        "image": "https://lh3.googleusercontent.com/a/ACg8ocIddSYR1oPP9L7juhb8uULln8tDoubwFNE75NFPzLPA=s96-c",
        "role": "cold:admin"
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
                "access_token": "ya29.a0AfB_byCLYmbYRCGsXWhB9O2nasCfuZZICi1N-1DrhHo8-P5PQtRTO4gGk7PVi2G-d_tfLvtHw0UzY37gKpsS8jrnhCg-dM2RMvCr8Wy0-tGl549Kb8_r3uFs9LIOhyI0OY299tz7egYwCq6UqCe6J7n8b6CFkTqBIvYxaCgYKASkSARESFQGOcNnCq0Dy1Pzkq-TJk5ikL_qHMw0171",
                "expires_in": 3599,
                "user_id": "107302069782487024936",
                "connection": "google-oauth2",
                "isSocial": true
            }
        ],
        "locale": "en",
        "nickname": "troy.morvant",
        "updated_at": "2023-09-25T21:10:13.045Z",
        "user_metadata": {
            "test": "Snoogins"
        },
        "last_ip": "73.94.32.122",
        "last_login": "2023-09-25T21:10:13.045Z",
        "logins_count": 74,
        "image": "https://lh3.googleusercontent.com/a/ACg8ocLmTs5NkxhkAK8JjCXpHpCO1NSVbE86tZyBZwABFX2d8w=s96-c",
        "role": "cold:admin"
    },
    {
      "id": "uinv_srZ1A7jLDAKi59XY",
      "client_id": "i8rCPXsLq9b2YKOOWUTfvgUj0iYD7dE3",
      "inviter": "Dan Lindquist",
      "invitee": {
        "email": "brec.hanson@coldclimate.com"
      },
      "invitation_url": "https://app.coldclimate.online/?invitation=SNqH110itUwHpjPUFMQtBTfQRMG6iQHw&organization=org_eXSvYzMD9Slo6oOV&organization_name=dan-co-pbc",
      "ticket_id": "SNqH110itUwHpjPUFMQtBTfQRMG6iQHw",
      "created_at": "2023-09-27T19:34:23.408Z",
      "expires_at": "2023-09-27T19:49:23.408Z",
      "organization_id": "org_eXSvYzMD9Slo6oOV",
      "roles": [
        "company:admin"
      ],
      "email": "brec.hanson@coldclimate.com",
      "invited_at": "2023-09-27T19:34:23.408Z"
    },
    {
      "id": "uinv_bKWkV0vpbuNsBvnl",
      "client_id": "i8rCPXsLq9b2YKOOWUTfvgUj0iYD7dE3",
      "inviter": "Dan Lindquist",
      "invitee": {
        "email": "troy.morvant+danco@coldclimate.com"
      },
      "invitation_url": "https://app.coldclimate.online/?invitation=eT1VM1rrjg1ea7GcpXqvijktXexzs6Ym&organization=org_eXSvYzMD9Slo6oOV&organization_name=dan-co-pbc",
      "ticket_id": "eT1VM1rrjg1ea7GcpXqvijktXexzs6Ym",
      "created_at": "2023-09-26T17:16:44.054Z",
      "expires_at": "2023-09-26T17:31:44.054Z",
      "organization_id": "org_eXSvYzMD9Slo6oOV",
      "roles": [
        "company:admin"
      ],
      "email": "troy.morvant+danco@coldclimate.com",
      "invited_at": "2023-09-26T17:16:44.054Z"
    }
];
};
