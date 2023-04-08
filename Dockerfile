FROM node:18-alpine3.17
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
RUN rm -rf ./src
EXPOSE 3001
CMD [ "npm", "run", "prod" ]