# Step 1: Build the application

# Use a Node.js base image
FROM node:21 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock if you use Yarn)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Build your app
RUN npm run build

# Step 2: Serve the application

# Use a lightweight Node.js base image
FROM node:21-alpine

# Install serve to run the application
RUN npm install -g serve

# Copy built assets from the build stage
COPY --from=build /app/dist /app

# Set the working directory to /app
WORKDIR /app

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["serve", "-s", "."]
