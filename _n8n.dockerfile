# ---- 1. start from the official Alpine-based n8n image ----
FROM docker.n8n.io/n8nio/n8n:latest

# ---- 2. switch to root so we can install bash & fix ownership ----
USER root

RUN apk add --no-cache bash

# ---- 3. copy our lightweight wrapper entrypoint ----
COPY n8n-entrypoint.sh /usr/local/bin/entrypoint.sh
COPY n8n-task-runners.json /home/node/.n8n/n8n-task-runners.json

# ---- 4. pre-create the data directory & give it to user 1000 (node) ----
ENV N8N_HOME=/home/node/.n8n
RUN mkdir -p ${N8N_HOME} && chown -R 1000:1000 ${N8N_HOME}

# ---- 5. environment defaults that fix the proxy/rate-limit warning ----
ENV N8N_PROXY_HOPS=1 \
    N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true

# ---- 6. drop back to the regular “node” user (UID 1000) ----
USER 1000

# ---- 7. call our wrapper; it execs the official n8n entrypoint ----
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
