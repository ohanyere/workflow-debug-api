FROM node:20-bookworm-slim AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM deps AS build
COPY tsconfig.json ./
COPY src ./src
RUN npm run build
RUN npm prune --omit=dev

FROM node:20-bookworm-slim AS runtime
ENV NODE_ENV=production
WORKDIR /app
RUN apt-get update \
  && apt-get upgrade -y \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*
RUN groupadd --system --gid 10001 nodeapi \
  && useradd --system --uid 10001 --gid nodeapi --home-dir /app nodeapi
COPY --from=build --chown=nodeapi:nodeapi /app/node_modules ./node_modules
COPY --from=build --chown=nodeapi:nodeapi /app/dist ./dist
COPY --from=build --chown=nodeapi:nodeapi /app/package.json ./package.json
USER nodeapi
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/healthz').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "dist/src/index.js"]
