FROM node:18-slim as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Nginx for serving static files
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Include custom nginx config if needed for SPA routing, 
# but for simple MVP default might work if we just use hash router or proper nginx config.
# Adding simple config for SPA fallback
RUN echo 'server { listen 80; root /usr/share/nginx/html; index index.html; location / { try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
