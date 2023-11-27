export interface Auth0OrganizationColors {
  primary: string;
  page_background: string;
}

export interface Auth0OrganizationBranding {
  logo_url: string;
  colors: Auth0OrganizationColors | any;
}

export interface Auth0OrganizationConnections {
  connection_id: string;
  assign_membership_on_login: boolean;
}

export interface Auth0Organization {
  id: string;
  name: string;
  display_name: string;
  branding: Auth0OrganizationBranding | any;
  metadata?: any[];
  enabled_connections?: Array<Auth0OrganizationConnections>;
}
