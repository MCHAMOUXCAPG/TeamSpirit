# pull official base image
FROM node:alpine AS build

# create working directory
RUN mkdir -p /app

# set working directory. All command below will be executed on this folder
WORKDIR /app
COPY . /app

# copy dependencies reference file i.e. package.json to app folder
COPY package.json ./

# install app dependencies and ignore package-lock.json if in case its present
RUN yarn
RUN yarn build

FROM node:alpine

RUN yarn global add serve

WORKDIR /app
COPY --from=build /app/build .

# Port to be exposed
EXPOSE 4200

CMD ["serve", "-p", "4200", "-s", "."]