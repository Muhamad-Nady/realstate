# frontend/Dockerfile
FROM node:16

# Set the working directory
WORKDIR /app

# Install xsel and other necessary packages
RUN apt-get update && apt-get install -y xsel

# Copy package.json and package-lock.json, then install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . /app

# Build the React app
RUN npm run build

# Install serve to serve the static files
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Command to serve the app
CMD ["serve", "-s", "build"]
