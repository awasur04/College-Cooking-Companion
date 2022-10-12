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

# Navigate to directory with the Dockerfile
# run
# docker build -t express .
# When finished run 
# docker run -p 3000:3000 express
# Test by going to localhost:3000 and look for Hello World text