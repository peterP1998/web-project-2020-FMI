FROM node:alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./

RUN npm install --legacy-peer-deps --silent

COPY . ./

EXPOSE 3000
EXPOSE 8888

CMD ["npm", "start"]
