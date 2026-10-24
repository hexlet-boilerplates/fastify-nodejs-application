FROM node:26-slim

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

ENV NODE_ENV=production
RUN npm run build

CMD ["bash", "-c", "node server/db/migrate.js && npm start"]
