# FROM mysql:5.7.39-oracle

# # This should be done as a secret file, not environment variable
# ENV MYSQL_ROOT_PASSWORD=tmpPass1!
# #https://www.youtube.com/watch?v=FrKccQUeaUE

FROM node:14

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]