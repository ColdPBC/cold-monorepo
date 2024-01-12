export const LocationBodyExample = {
  schema: {
    type: 'object',
    example: {
      name: 'Headquarters',
      address: '{{$randomStreetAddress}}',
      address_line_2: 'suite 100',
      city: '{{$randomCity}}',
      state: 'MN',
      postal_code: '55401',
      country: 'US',
    },
  },
};
