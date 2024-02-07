export interface IAuthenticatedUser {
  company_id: string | null;
  coldclimate_claims: {
    email: string;
    org_id: string;
    id: string;
    roles: string[];
  };
  iss: string;
  sub: string;
  aud: string[];
  iat: number;
  exp: number;
  azp: string;
  scope: string;
  permissions: string[];
  isAdmin: boolean;
  isOwner: boolean;
  isColdAdmin: boolean;
  isMember: boolean;
}

export interface Auth0InviteUserData {
  mimeType: string;
  text: {
    inviter: {
      name: string;
    };
    invitee: {
      email: string;
    };
    client_id?: string;
    connection_id?: string;
    ttl_sec: number;
    roles: string[];
    send_invitation_email: boolean;
  };
}

export class AuthenticatedUser {
  coldclimate_claims: {
    email: string;
    org_id: string;
    id: string;
    roles: string[];
  };
  iss: string;
  sub: string;
  aud: string[];
  iat: number;
  exp: number;
  azp: string;
  scope: string;
  permissions: string[];
  isAdmin: boolean;
  isOwner: boolean;
  isColdAdmin: boolean;
  isMember: boolean;

  constructor(user) {
    this.coldclimate_claims = user.coldclimate_claims;
    this.iss = user.iss;
    this.sub = user.sub;
    this.aud = user.aud;
    this.iat = user.iat;
    this.exp = user.exp;
    this.azp = user.azp;
    this.scope = user.scope;
    this.permissions = user.permissions;
    this.isAdmin = user.isAdmin;
    this.isOwner = user.isOwner;
    this.isColdAdmin = user.isColdAdmin;
    this.isMember = user.isMember;
  }
}
