FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN apk update && apk add openssl
RUN npm ci
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout key.pem -out cert.pem -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"

CMD ["npm", "run", "dev"]