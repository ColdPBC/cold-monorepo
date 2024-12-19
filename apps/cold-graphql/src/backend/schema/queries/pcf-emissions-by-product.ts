import { graphweaverMetadata, ResolverOptions } from '@exogee/graphweaver';
import { GraphQLJSONObject } from '@exogee/graphweaver-scalars';
import { cache_pcf_emissions } from '../../services/emissions/cache_pcf_emissions';

graphweaverMetadata.addQuery({
	name: 'cache_pcf_emissions',
	getType: () => GraphQLJSONObject,
	intentionalOverride: true,
	args: {
		organizationId: {
			type: () => String,
			description: 'Organization ID',
			nullable: false,
		},
	},
	resolver: async options => await cache_pcf_emissions(options),
});
