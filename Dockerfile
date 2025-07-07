# Use official Node.js LTS image
FROM node:22

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all other files
COPY . .

# Expose Vite default port
EXPOSE 3000

# Start Vite dev server
CMD ["npm", "run", "dev", "--", "--host"]
