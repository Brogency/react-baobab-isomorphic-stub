FROM node:4.2

WORKDIR /app
RUN npm install -g webpack
RUN npm install -g karma-cli
RUN npm install -g concurrently
RUN npm install -g webpack-dev-server
RUN npm install -g just-wait
RUN npm install -g forever
#ADD package.json ./package.json
#RUN npm i
ADD . /app/user/
WORKDIR /app/user/
RUN npm run build

