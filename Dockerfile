FROM node:alpine AS build

ENV NEW_RELIC_NO_CONFIG_FILE=true
ENV NEW_RELIC_DISTRIBUTED_TRACING_ENABLED=true \
NEW_RELIC_LOG=stdout

WORKDIR /app

COPY . .

RUN npm install

FROM node:alpine

COPY --from=build /app /app

WORKDIR /app


EXPOSE 8080

CMD ["node", "app.js"]
