export interface AuthenticatedUser {
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
