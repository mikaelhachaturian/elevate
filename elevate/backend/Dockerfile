# Stage 1: Build the TypeScript app
FROM node:21-alpine as builder

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install dependencies, including 'devDependencies' for TypeScript compilation
RUN npm install

# Copy app source
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Stage 2: Setup the production environment and run the app
FROM node:21-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy compiled JavaScript from the builder stage
COPY --from=builder /app/dist ./dist

# Copy other necessary files such as .env (if applicable)
# COPY .env .

# Your app binds to port 3001, so use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3001

# Define the command to run your app using CMD which defines your runtime
CMD ["node", "dist/app.js"]
