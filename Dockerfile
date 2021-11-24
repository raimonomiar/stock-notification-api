FROM node:14 as builder
WORKDIR /usr/src/app
COPY "package.json" "package-lock.json" "./"
RUN npm ci --production
RUN npm i typescript
COPY . "./"
RUN npm run build

FROM node:14 as app

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app "./"
RUN npm prune --production

CMD ["node", "dist/main.js"]
