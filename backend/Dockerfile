# Use official Node.js 22 LTS Alpine base image
FROM node:22-alpine

# Set non-interactive production mode
ENV NODE_ENV=production

# Set working directory inside container
WORKDIR /app

# Copy package config files
COPY package*.json ./

# Install only production dependencies (skips node-gyp build dependencies where possible)
RUN npm ci --only=production && npm cache clean --force

# Copy all source files
COPY src/ ./src/

# Expose port 5000
EXPOSE 5050

# Start command
CMD ["npm", "start"]
