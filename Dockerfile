FROM brogency/react-baobab-isomorphic-stub:2.1.0
WORKDIR /app
ADD package.json ./package.json
#Fix npm + docker bug
#https://github.com/npm/npm/issues/9863#issuecomment-246627668
RUN cd $(npm root -g)/npm \
    && npm install fs-extra \
    && sed -i -e s/graceful-fs/fs-extra/ -e s/fs\.rename/fs.move/ ./lib/utils/rename.js
RUN npm i
ADD . /app/user/
WORKDIR /app/user/
RUN npm run build
