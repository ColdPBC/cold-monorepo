#!/bin/sh
if [ -d /opt/custom-certificates ]; then
  echo "Trusting custom certificates from /opt/custom-certificates."
  export NODE_OPTIONS="--use-openssl-ca $NODE_OPTIONS"
  export SSL_CERT_DIR=/opt/custom-certificates
  c_rehash /opt/custom-certificates
fi

# POSIX‑compliant parser for postgres URLs
# Expected formats:
#   postgres://user:pass@host:5432/db
#   postgresql://user@host/db
#   postgres://user:pass@host/db

case "${DATABASE_URL:-}" in
  postgres://*|postgresql://*)
    parsed=$(printf '%s\n' "$DATABASE_URL" |
      sed -E 's#^postgres(ql)?://([^:/]+)(:([^@]*))?@([^:/]+)(:([0-9]+))?/([^?]+).*#DB_POSTGRESDB_USER="\2" DB_POSTGRESDB_PASSWORD="\4" DB_POSTGRESDB_HOST="\5" DB_POSTGRESDB_PORT="\7" DB_NAME="\8"#')
    # shellcheck disable=SC2086
    eval "$parsed"
    : "${DB_PORT:=5432}"   # default port
    export DB_POSTGRESDB_DATABASE=n8n
    export DB_POSTGRESDB_USER DB_POSTGRESDB_PASSWORD DB_POSTGRESDB_HOST DB_POSTGRESDB_PORT
    ;;
  *)
    echo "ERROR: DATABASE_URL is empty or malformed" >&2
    exit 1
    ;;
esac

if [ "$#" -gt 0 ]; then
  # Got started with arguments
  exec n8n "$@"
else
  # Got started without arguments
  exec n8n
fi
