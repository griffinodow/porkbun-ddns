FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY ./dist /usr/src/app/dist
RUN npm ci --production
CMD ["node", "dist/index.js"]
