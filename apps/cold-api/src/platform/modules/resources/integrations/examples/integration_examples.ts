export const IntegrationBodySchema = {
  description:
    'Integration Body Schema: You can pass facility metadata to create a facility if you do not have a facility id. You can also pass a timeout number in milliseconds to override the default timeout for the service definition to define how long to wait before sending an async request',
  schema: {
    type: 'object',
    example: {
      service_definition_id: '{{test_service_definition_id}}',
      facility_id: '{{test_facility_id}}',
      metadata: {
        name: 'Headquarters',
        address: '{{$randomStreetAddress}}',
        address_line_2: 'suite 100',
        city: '{{$randomCity}}',
        state: 'MN',
        postal_code: '55401',
        utility: 'speculoos_power',
      },
    },
  },
};
