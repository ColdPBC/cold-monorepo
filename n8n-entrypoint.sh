#!/usr/bin/env bash
set -euo pipefail
if [ -d /opt/custom-certificates ]; then
  echo "Trusting custom certificates from /opt/custom-certificates."
  export NODE_OPTIONS="--use-openssl-ca $NODE_OPTIONS"
  export SSL_CERT_DIR=/opt/custom-certificates
  c_rehash /opt/custom-certificates
fi
# --- Parse $DATABASE_URL and export individual parts ------------------------
# Accepts schemes: postgres://  or  postgresql://
# Works whether port or password are present or not.

if [[ -z "$DATABASE_URL" ]]; then
  echo "ERROR: DATABASE_URL is not set"; exit 1
fi

regex='^postgres(?:ql)?://([^:/]+)(:([^@]*))?@([^:/]+)(:([0-9]+))?/([^?]+)'

if [[ "$DATABASE_URL" =~ $regex ]]; then
  export DB_TYPE=postgresdb
  export DB_POSTGRESDB_DATABASE="${BASH_REMATCH[7]}"
  export DB_POSTGRESDB_HOST="${BASH_REMATCH[4]}"
  export DB_POSTGRESDB_PORT=5432
  export DB_POSTGRESDB_USER="${BASH_REMATCH[1]}"
  export DB_POSTGRESDB_PASSWORD="${BASH_REMATCH[3]}"
  export DB_POSTGRESDB_SCHEMA=public
else
  echo "ERROR: DATABASE_URL does not match expected pattern"; exit 1
fi

if [ "$#" -gt 0 ]; then
  # Got started with arguments
  exec n8n "$@"
else
  # Got started without arguments
  exec n8n
fi
