# source image
FROM node:12.16.3

# create app folder and copy the application in that folder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

# start the application
CMD [ "node", "index.js" ]