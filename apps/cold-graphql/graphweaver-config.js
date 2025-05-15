const connectionValues = () => {
	const url = process.env.DATABASE_URL;
	if (!url) {
		throw new Error('DATABASE_URL is not set');
	}
	const pattern = /postgres(?:ql)?:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/;
	const match = url.match(pattern);

	if (match) {
		const [, user, password, host, port, dbName] = match;
		return { user, password, host, port: +port, dbName };
	} else {
		throw new Error(`DATABASE_URL is not valid: ${url}`);
	}
};

module.exports = {
	backend: {
		introspection: true,
	},
	adminUI: {
		auth: {
			primaryMethods: ['AUTH_ZERO'],
		},
	},
	import: {
		source: 'postgresql',
		...connectionValues(),
		overwrite: false,
	},
};
