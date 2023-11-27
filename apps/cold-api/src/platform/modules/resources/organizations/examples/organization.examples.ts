export const postOrganizationExample = {
  display_name: 'Test API Organization {{$randomAlphaNumeric}}{{$randomAlphaNumeric}}',
  branding: {},
  city: 'Minneapolis',
  email: 'info@example.com',
  phone: '18005551212',
  state: 'MN',
  street_address: '404 Washington Avenue North',
  zip: '55401',
};

export const postInviteOwnerExample = {
  user_email: 'test.owner@example.com',
  inviter_name: 'Cold Climate',
  roleId: 'company:owner',
};

export const postInviteMemberExample = {
  user_email: 'test.member@example.com',
  inviter_name: 'Cold Climate',
  roleId: 'company:member',
};

export const postInviteAdminExample = {
  user_email: 'test.admin@example.com',
  inviter_name: 'Cold Climate',
  roleId: 'company:admin',
};
