FROM node:10

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN yarn

COPY . /app

ENV NODE_ENV=production

RUN yarn build

EXPOSE 9000

CMD ["yarn", "start"]
