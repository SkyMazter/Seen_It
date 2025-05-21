# pull node image with alpine OS
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

#Copy both the package.json and package-lock.json files to the containers working dir
COPY package*.json ./

#Install Npm Dependancies
RUN npm install

#Copy the rest of the files
COPY . .

# Expose the port that the app will run on
EXPOSE 5173

#Run the app
CMD [ "npm", "start" ]

