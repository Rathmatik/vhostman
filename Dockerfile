FROM node:alpine

# Create app directory
RUN mkdir -p /opt/app
WORKDIR /opt/app

# Install app dependencies
COPY package.json /opt/app
RUN npm install

# Bundle app source
COPY . /opt/app

EXPOSE 80
CMD ["npm", "start"]
