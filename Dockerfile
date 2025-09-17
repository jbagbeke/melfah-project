# Use the same base image as in your docker-compose
FROM node:20-bullseye

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching installs)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files from the directory where the Dockerfile is located
COPY . .

# Expose Next.js default port
EXPOSE 3000

# Default command to run the development server
# CMD ["npm", "run", "dev"]
CMD ["sleep", "infinity"]

