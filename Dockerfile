FROM node:18

WORKDIR /app

COPY ./package.json ./package.json

RUN npm install -g pnpm

RUN pnpm install

COPY . .

EXPOSE 5210

CMD ["npm", "run", "start"]