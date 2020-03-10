FROM mhart/alpine-node:10

COPY package.json package-lock.json ./

RUN npm ci --prod

RUN npm install -g typescript

COPY . .

RUN npm run build

ENTRYPOINT npm run start