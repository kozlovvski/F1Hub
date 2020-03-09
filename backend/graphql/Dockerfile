FROM mhart/alpine-node:10

COPY package.json package-lock.json ./

RUN npm ci --prod

RUN npm install -g ts-node typescript

COPY . .

ENTRYPOINT npm run start