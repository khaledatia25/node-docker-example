FROM node:16 as base

FROM base as development

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 4000
CMD ["npm", "run", "dev"]

FROM base as production

WORKDIR /app
COPY package.json /app
RUN npm install --only=production
COPY . /app
EXPOSE 4000
CMD ["npm", "start"]
