export const connectionValues = () => {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL is not set');
  }
  if (url) {
    const match = url.match(/postgresql|postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
    if (match) {
      const [, user, password, host, dbName] = match;
      return { user, password, host, port: 5432, dbName };
    }
  }
};
