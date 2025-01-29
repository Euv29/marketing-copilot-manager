FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY certs /usr/src/app/certs

EXPOSE 5000

CMD ["node", "index.js"]
