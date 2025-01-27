FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

# Atualizar npm para a versão 7
RUN npm install -g npm@7

# Aumentar o tempo limite do NPM
RUN npm config set fetch-retry-mintimeout 20000
RUN npm config set fetch-retry-maxtimeout 120000

# Usar registro alternativo
RUN npm config set registry https://registry.yarnpkg.com

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]