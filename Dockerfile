# Stage 1: Build Angular app
FROM node:20-alpine AS builder
# Set working directory
WORKDIR app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source files
COPY . .

# Build the Angular app (change "your-app-name" to your actual app name if needed)
RUN npm run build -- --configuration=production

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built Angular app to Nginx public directory
COPY --from=builder /app/dist/mcq4u-ui/browser /usr/share/nginx/html

# Optional: Replace default Nginx config (recommended for Angular routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
