FROM node:10
WORKDIR /knights
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm","start"]
