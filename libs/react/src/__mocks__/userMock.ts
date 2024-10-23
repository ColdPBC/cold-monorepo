import { User } from '@auth0/auth0-react';

export const auth0UserMock: User = {
	user_id: 'google-oauth2|112288932075209720794',
	name: 'Qaalib Farah',
	given_name: 'Qaalib',
	family_name: 'Farah',
	picture: 'https://img.uefa.com/imgml/TP/players/1/2023/324x324/250103758.jpg',
	email: 'qaalib.farah@coldclimate.com',
	coldclimate_claims: {
		email: 'qaalib.farah+testing@coldclimate.com',
		id: 'auth0|652efc8a19800d6ce5b6d96b',
		org_id: 'org_123',
		roles: ['company:admin'],
	},
	nickname: 'qaalib.farah',
	updated_at: '2023-11-01T17:36:07.783Z',
	email_verified: true,
	sub: 'auth0|652efc8a19800d6ce5b6d96b',
	org_id: 'org_cAD7FM8ONewFumnY',
};

export const fullUser: User = {
	family_name: 'Morvant',
	given_name: 'Troy',
	picture: `https://lh3.googleusercontent.com/a/AGNmyxYMDJlIP6aEaIUVqeVy3O2H5_8O-bLZPluVYoTq=s96-c`,
	email: 'troy.morvant@coldclimate.com',
};

export const userWithNames: User = {
	family_name: 'Morvant',
	given_name: 'Troy',
};

export const invalidUser: User = {
	family_name: 'Morvant',
};

export const userWithEmail: User = {
	email: 'troy.morvant@coldclimate.com',
};
