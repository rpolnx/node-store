# Builder image

FROM node:12-alpine3.11 AS builder

WORKDIR /usr/src/builder
COPY package*.json ./

RUN npm install --only=production
RUN cp -R node_modules /home/prod_modules
RUN npm install
COPY . .
RUN npm run test
RUN npm run build

# Application

FROM node:12-alpine3.11

WORKDIR /home/src/app
COPY --from=builder /home/prod_modules ./node_modules
COPY --from=builder /usr/src/builder/dist ./dist
COPY package.json .
COPY prod.env .env

CMD ["npm", "run", "start:prod"]
