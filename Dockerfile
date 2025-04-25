FROM node:23-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

CMD ["npm", "run", "dev"]