FROM node:20-alpine

# Create app directory
WORKDIR /app

ENV NODE_ENV production
# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Ensure the application binds to port 3000
ENV PORT=3360
EXPOSE 3360

CMD [ "npm", "start" ]
