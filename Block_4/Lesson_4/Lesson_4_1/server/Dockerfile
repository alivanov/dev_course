# source image
FROM node:12.16.3

# create app folder and copy the application in that folder
RUN mkdir -p //usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm install

# just declare that container shares the specified port
EXPOSE 4444

#ENV TZ Europe/Moscow

# start the application
CMD [ "npm", "start" ]