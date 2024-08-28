
export const connectionValues = () => {
    const url = process.env.DATABASE_URL;
    if (url) {
        const match = url.match(/postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
        if (match) {
            const [, user, password, host, port, dbName] = match;
            return { user, password, host, port, dbName };
        }
    }

    throw new Error('DATABASE_URL is not set');
}
