import { z } from 'zod';

export const emissions_categoriesSchema = z.enum(['ELECTRICITY','FUEL','WASTE','WATER','TRANSPORTATION','OTHER','TEST']);

export type emissions_categoriesType = `${z.infer<typeof emissions_categoriesSchema>}`

export default emissions_categoriesSchema;
