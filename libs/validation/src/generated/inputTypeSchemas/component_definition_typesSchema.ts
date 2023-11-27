import { z } from 'zod';

export const component_definition_typesSchema = z.enum(['UNKNOWN','FORM','NAVIGATION_SIDE','NAVIGATION_HEADER','NAVIGATION_FOOTER','DATAGRID','TEST']);

export type component_definition_typesType = `${z.infer<typeof component_definition_typesSchema>}`

export default component_definition_typesSchema;
