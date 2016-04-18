FROM node:4.2

WORKDIR /app
#ADD package.json ./package.json
#RUN npm i
ADD . /app/user/
WORKDIR /app/user/
RUN npm run build
